import { IsOptional, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStoreProductDto {
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  stock?: number;
}
