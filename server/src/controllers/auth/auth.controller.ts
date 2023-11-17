import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common'
import { LocalAuthGuard } from '../../guard/local-auth.guard'
import { AuthService } from '../../services/auth/auth.service'
import { Public } from 'src/decorators/setMetadata.decorator'
import { CreateUserDto } from 'src/database/users/dto/create-user.dto'
import { NewUser } from 'src/services/users/users.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  @Public()
  logIn(@Request() req: any) {
    return this.authService.logIn(req.user)
  }

  @Post('sign-in')
  @Public()
  signIn(@Body() createUserDto: CreateUserDto): Promise<NewUser> {
    return this.authService.signIn(createUserDto)
  }
}
