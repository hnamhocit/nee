import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import type { IJwtPayload } from '@repo/shared';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage(
    'Registration successful. Please check your email to verify account.',
  )
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDTO) {
    await this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
    @Req() req: Request,
  ) {
    const realIp = (req.headers['x-forwarded-for'] as string) || ip;

    const loginData = {
      ...dto,
      ipAddress: realIp,
      userAgent: userAgent,
    };

    const { accessToken, refreshToken } =
      await this.authService.login(loginData);

    this.setRefreshTokenCookie(res, refreshToken);

    return { accessToken };
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('logout')
  @ResponseMessage('Logged out successfully')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @User() user: IJwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.sessionId);

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/auth/refresh',
    });
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @User() user: IJwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      user.sub,
      user.sessionId,
    );

    this.setRefreshTokenCookie(res, refreshToken);

    return { accessToken };
  }

  private setRefreshTokenCookie(res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true, // Chống XSS
      secure: true, // Bắt buộc HTTPS (Dev local vẫn chạy nếu browser hỗ trợ localhost)
      sameSite: 'lax', // Chống CSRF
      path: '/api/auth/refresh', // Chỉ gửi cookie này khi gọi đúng API refresh
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
  }
}
