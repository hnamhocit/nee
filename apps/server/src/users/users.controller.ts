import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { IJwtPayload } from '@repo/shared';
import { User } from 'src/common/decorators/user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/profile')
  @UseGuards(AuthGuard('jwt-access'))
  getProfile(@User() user: IJwtPayload) {
    return this.usersService.getProfile(user.sub);
  }
}
