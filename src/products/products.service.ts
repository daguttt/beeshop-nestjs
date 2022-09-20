import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHandler } from 'src/shared/enums/message-handler.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const product = this.productRepository.create({
      ...createProductDto,
      user,
    });

    try {
      await this.productRepository.save(product);
      return product;
    } catch (err) {
      this.handleDbExceptions(err);
    }
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOneByOrFail({ id });
      return product;
    } catch (err) {
      this.logger.error(err.detail);
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    try {
      product.user = user;
      return await this.productRepository.save(product);
    } catch (err) {
      this.handleDbExceptions(err);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDbExceptions(err: any) {
    this.logger.error(err.detail);
    // In case the product already exists
    if (err.code === '23505') throw new BadRequestException(err.detail);
    throw new InternalServerErrorException(MessageHandler.UNHANDLED);
    // TODO: Product not found
  }
}
