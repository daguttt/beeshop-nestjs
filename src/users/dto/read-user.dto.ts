import { Exclude } from 'class-transformer';

export class ReadUserDto {
  id: string;
  name: string;
  lastname: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  active: boolean;

  @Exclude()
  roles: string[];

  constructor(partial: Partial<ReadUserDto>) {
    Object.assign(this, partial);
  }
}
