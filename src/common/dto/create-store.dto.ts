import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ example: 'Choppi Central' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Sucursal principal de Choppi', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
