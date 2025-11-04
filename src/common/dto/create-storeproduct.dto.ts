import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateStoreProductDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productId!: number;

  @ApiProperty({ example: 100.5 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  price?: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  stock!: number;
}
