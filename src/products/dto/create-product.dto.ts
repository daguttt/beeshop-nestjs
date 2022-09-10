import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ uniqueItems: true })
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  inventory?: number;

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({ enum: ['men', 'women', 'kid', 'unisex'], example: 'women' })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}
