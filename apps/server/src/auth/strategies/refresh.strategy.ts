import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';

import { IJwtPayload } from 'src/common/interfaces';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token: string | null = null;

          if (request && request.cookies) {
            token = request.cookies['refresh_token'] as string;
          }

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  async validate(req: Request, payload: IJwtPayload) {
    const refreshToken = req.cookies['refresh_token'] as string;

    if (!refreshToken) {
      throw new Error('Refresh token not found in cookies');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { isActive: true, isBanned: true },
    });

    if (!user || user.isBanned) {
      throw new UnauthorizedException("User doesn't exist or is banned");
    }

    return { ...payload, refreshToken };
  }
}
