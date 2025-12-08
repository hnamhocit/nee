import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { IJwtPayload } from '../interfaces';

export const User = createParamDecorator(
  (data: keyof IJwtPayload | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request.user as IJwtPayload;

    return data ? user?.[data] : user;
  },
);
