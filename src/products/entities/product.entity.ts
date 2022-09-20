import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float')
  price: number;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('int', {
    default: 0,
  })
  inventory: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;
}
