import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/database/users/dto/create-user.dto'
import { User } from '../users/user.entity'

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

  async signIn(user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user)
  }
}
