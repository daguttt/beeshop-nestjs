import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  logger: Logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      this.handleDbExceptions(err);
    }
    return {};
  }

  private handleDbExceptions(err: any) {
    this.logger.error(err.detail);

    // In case the user already exists
    if (err.code === '23505') throw new BadRequestException(err.detail);

    throw new InternalServerErrorException('Unhandled exception');
    // TODO: User not found
  }
}
