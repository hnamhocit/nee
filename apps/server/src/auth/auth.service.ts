import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { ulid } from 'ulid';

import { CodeType } from '@repo/db';
import { IJwtPayload } from '@repo/shared';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async register(data: RegisterDTO) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email or Username already exists');
    }

    const passwordHash = await hash(data.password);

    const newUser = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: passwordHash,
          profile: {
            create: {
              displayName: data.username,
            },
          },
        },
      });

      const activationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      await tx.verificationCode.create({
        data: {
          userId: user.id,
          type: CodeType.EMAIL_VERIFICATION,
          code: activationCode,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        },
      });

      return { user, activationCode };
    });

    this.mailService
      .sendConfirmationEmail(data.email, data.username, newUser.activationCode)
      .catch((err) => {
        console.error(
          `Failed to send confirmation email to ${newUser.user.email}:`,
          err,
        );
      });

    return null;
  }

  async login(data: LoginDTO & { ipAddress?: string; userAgent?: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        username: true,
        password: true,
        isBanned: true,
        banReason: true,
        bannedUntil: true,
        role: true,
        profile: {
          select: {
            avatarURL: true,
          },
        },
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.isBanned) {
      throw new ForbiddenException(`Account banned. Reason: ${user.banReason}`);
    }

    const isPasswordMatch = await verify(user.password, data.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    const sessionId = ulid().toString();

    const payload: IJwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      sessionId: sessionId,
      avatarURL: user.profile?.avatarURL ?? null,
    };

    const tokens = await this.generateTokens(payload);

    const refreshTokenHash = await hash(tokens.refreshToken);

    await this.prisma.session.create({
      data: {
        id: sessionId,
        userId: user.id,
        tokenHash: refreshTokenHash,
        deviceInfo: data.userAgent || 'Unknown Device',
        ipAddress: data.ipAddress || 'Unknown IP',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return tokens;
  }

  async logout(sessionId: string) {
    await this.prisma.session.delete({
      where: { id: sessionId },
    });

    return null;
  }

  async refresh(userId: string, sessionId: string) {
    const foundSession = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!foundSession) {
      await this.prisma.session.deleteMany({ where: { userId } });
      throw new ForbiddenException('Access Denied - Token Reuse Detected');
    }

    if (new Date() > foundSession.expiresAt) {
      await this.prisma.session.delete({
        where: { id: foundSession.id },
      });

      throw new UnauthorizedException('Session expired');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        profile: {
          select: {
            avatarURL: true,
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException('User not found');

    const payload: IJwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      avatarURL: user.profile?.avatarURL ?? null,
      sessionId: foundSession.id,
    };

    const tokens = await this.generateTokens(payload);
    const newRefreshTokenHash = await hash(tokens.refreshToken);

    await this.prisma.session.update({
      where: { id: foundSession.id },
      data: {
        tokenHash: newRefreshTokenHash,
        lastUsedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return tokens;
  }

  // HELPER METHODS
  private async generateTokens(payload: IJwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
