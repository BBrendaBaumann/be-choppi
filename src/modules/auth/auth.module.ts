import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service'; 
import { AuthController } from './auth.controller'; 
import { JwtStrategy } from './jwt.strategy'; 


dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600', 10)}
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
