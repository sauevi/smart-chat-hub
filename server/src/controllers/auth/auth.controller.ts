import { Controller, Post, UseGuards, Request } from '@nestjs/common'
import { LocalAuthGuard } from '../../guard/local-auth.guard'
import { AuthService } from '../../services/auth/auth.service'
import { Public } from 'src/decorators/setMetadata.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  signIn(@Request() req: any) {
    return this.authService.logIn(req.user)
  }
}
