import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from '@/common/dto/login.dto';
import { User } from '@/entities/user.entity'; 

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'JWT token generado', schema: { example: { accessToken: 'jwt.token.aqui' } } })
  async login(@Body() dto: LoginDto) {
    const valid: User = await this.authService.validateUser(dto.email, dto.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(valid);
  }
}
