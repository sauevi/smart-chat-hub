import { AuthService } from '../../services/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(req: any): Promise<{
        access_token: string;
    }>;
}
