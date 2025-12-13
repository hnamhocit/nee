import { Controller, Get, UseGuards } from '@nestjs/common';

import type { IJwtPayload } from '@repo/shared';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/profile')
  getProfile(@User() user: IJwtPayload) {
    return this.usersService.getProfile(user.sub);
  }
}
