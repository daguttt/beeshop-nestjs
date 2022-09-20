import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { MessageHandler } from 'src/shared/enums/message-handler.enum';
import { User } from 'src/users/entities/user.entity';
import { META_ROLES } from '../decorators/roles-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    // Route is not protected
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if (!user)
      throw new InternalServerErrorException(MessageHandler.USER_NOT_FOUND);

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }
    throw new ForbiddenException(MessageHandler.USER_INVALID_ROLE);
  }
}
