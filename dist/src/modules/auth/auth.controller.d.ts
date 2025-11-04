import { AuthService } from './auth.service';
import { LoginDto } from '@/common/dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: any;
    }>;
}
