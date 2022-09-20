import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { MessageHandler } from 'src/shared/enums/message-handler.enum';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user)
      throw new InternalServerErrorException(MessageHandler.USER_NOT_FOUND);
    return !data ? user : user[data];
  },
);
