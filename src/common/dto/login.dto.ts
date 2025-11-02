import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({ example: 'demo@choppi.test' })
  @IsEmail()
  email!: string;

   @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
