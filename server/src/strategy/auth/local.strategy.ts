import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../../services/auth/auth.service'
import { User } from 'src/database/users/entity/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
