import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { MessageHandler } from 'src/shared/enums/message-handler.enum';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  logger: Logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const { password, ...userProperties } = createUserDto;
    const user = this.userRepository.create({
      ...userProperties,
      // Encrypt user password using bcrypt
      password: bcrypt.hashSync(password, 10),
    });
    try {
      await this.userRepository.save(user);
      user.password = undefined;
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (err) {
      this.handleDbExceptions(err);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!user)
      throw new UnauthorizedException(
        MessageHandler.NOT_VALID_CREDENTIALS_EMAIL,
      );
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        MessageHandler.NOT_VALID_CREDENTIALS_PASSWORD,
      );

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private handleDbExceptions(err: any) {
    this.logger.error(err.detail);
    this.logger.error(err);

    // In case the user already exists
    if (err.code === '23505') throw new BadRequestException(err.detail);

    throw new InternalServerErrorException(MessageHandler.UNHANDLED);
    // TODO: User not found
  }
}
