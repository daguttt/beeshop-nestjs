import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 60,
  })
  name: string;

  @Column('varchar', {
    length: 10,
  })
  lastname: string;

  @Column('varchar', {
    length: 60,
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', {
    default: true,
  })
  active: boolean;

  @Column('varchar', {
    length: 8,
    array: true,
    default: ['user'],
  })
  roles: string[];
}
