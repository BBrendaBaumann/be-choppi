import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
        user: any;
    }>;
}
