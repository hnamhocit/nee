import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Role } from '@repo/db';
import { IJwtPayload } from '@repo/shared';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as IJwtPayload;

    if (!user || !user.role) {
      return false;
    }

    if (user.role === Role.ADMIN) return true;

    return requiredRoles.some((role) => user.role === role);
  }
}
