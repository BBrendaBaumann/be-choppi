import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
dotenv.config();

export type JwtPayload = {
  sub: number;
  email: string;
  isAdmin: boolean;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret'
    });
  }

  async validate(payload: JwtPayload) {
    console.log('✅ JWT payload validado:', payload);
     if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }    
    return {
      id: payload.sub,
      email: payload.email,
      isAdmin: payload.isAdmin
    };
  }
}
