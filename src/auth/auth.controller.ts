import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerUser')
  @ApiBadRequestResponse({
    description: `
      When: 
      - It doesn't match the DTO.
      - The user is already registered.
    `,
  })
  @ApiCreatedResponse({ description: 'User registered successfully ' })
  @UseInterceptors(ClassSerializerInterceptor)
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.authService.registerUser(createUserDto);
    return new ReadUserDto(userCreated);
  }
}
