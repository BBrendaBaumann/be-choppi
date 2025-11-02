import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateStoreProductDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productId!: number;

  @ApiProperty({ example: 100.5 })
  @IsNumber()
  price!: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  stock!: number;
}
