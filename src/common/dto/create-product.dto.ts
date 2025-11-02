import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Manzana' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Manzana roja orgánica', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
