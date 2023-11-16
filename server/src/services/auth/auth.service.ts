import { Injectable } from '@nestjs/common'
import { NewUser, User, UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(username)

    return user && user.password === pass ? user : null
  }

  async logIn(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signIn(user: User): Promise<NewUser> {
    return await this.usersService.create(user)
  }
}
