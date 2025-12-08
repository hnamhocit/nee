import { Controller, Get } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import type { IJwtPayload } from 'src/common/interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/profile')
  getProfile(@User() user: IJwtPayload) {
    return this.usersService.getProfile(user.sub);
  }
}
