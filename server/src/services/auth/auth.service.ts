import { Injectable } from '@nestjs/common'
import { NewUser, UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/database/users/dto/create-user.dto'
import { User } from '../../database/users/entity/user.entity'
import { compare } from './bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(username)

    if (!user) {
      return null
    }

    return compare(pass, user.password) ? user : null
  }

  async logIn(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signIn(user: CreateUserDto): Promise<NewUser> {
    return await this.usersService.create(user)
  }
}
