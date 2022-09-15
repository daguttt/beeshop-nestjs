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

@Injectable()
export class AuthService {
  logger: Logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userProperties } = createUserDto;
    const user = this.userRepository.create({
      ...userProperties,
      // Encrypt user password using bcrypt
      password: bcrypt.hashSync(password, 10),
    });
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      this.handleDbExceptions(err);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return user;
    // TODO: Return JWT
  }

  private handleDbExceptions(err: any) {
    this.logger.error(err.detail);
    this.logger.error(err);

    // In case the user already exists
    if (err.code === '23505') throw new BadRequestException(err.detail);

    throw new InternalServerErrorException('Unhandled exception');
    // TODO: User not found
  }
}
