import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Credenciales inválidas');

    return user;
  }

  async login(user: User): Promise<{ access_token: string; user: any }> {
  const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  };
}


}
