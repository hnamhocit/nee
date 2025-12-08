import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtPayload } from 'src/common/interfaces';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { isActive: true, isBanned: true },
    });

    if (!user || user.isBanned) {
      throw new UnauthorizedException("User doesn't exist or is banned");
    }

    return payload;
  }
}
