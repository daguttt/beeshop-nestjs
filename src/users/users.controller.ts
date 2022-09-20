import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { MessageHandler } from 'src/shared/enums/message-handler.enum';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ description: MessageHandler.OK_RESPONSE })
  findAll(@GetUser() user: User, @GetUser('email') userEmail: string) {
    console.log({ user, userEmail });
    return this.usersService.findAll();
  }
}
