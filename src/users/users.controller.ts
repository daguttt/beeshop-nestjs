import {
  Controller,
  Get,
  //  SetMetadata,
  // UseGuards
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { MessageHandler } from 'src/shared/enums/message-handler.enum';
// import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import {
  GetUser,
  //  RolesProtected
} from 'src/auth/decorators';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
// import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  // @SetMetadata('roles', ['admin', 'super-admin'])
  // @RolesProtected(ValidRoles.ADMIN)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  @Auth()
  @ApiOkResponse({ description: MessageHandler.OK_RESPONSE })
  findAll(@GetUser() user: User, @GetUser('email') userEmail: string) {
    console.log({ user, userEmail });
    return this.usersService.findAll();
  }
}
