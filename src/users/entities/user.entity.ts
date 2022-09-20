import { Product } from 'src/products/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column('text', {
    select: false,
  })
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

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }
}
