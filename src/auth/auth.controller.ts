import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

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
  @ApiBadRequestResponse({ description: 'User already exists' })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('loginUser')
  @ApiUnauthorizedResponse({ description: 'Not valid credentials' })
  @ApiCreatedResponse({ description: 'User logged in successfully' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
