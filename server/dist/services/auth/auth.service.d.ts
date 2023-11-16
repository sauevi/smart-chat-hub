import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<User | null>;
    logIn(user: any): Promise<{
        access_token: string;
    }>;
}
