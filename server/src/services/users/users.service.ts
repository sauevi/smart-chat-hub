import { Injectable } from '@nestjs/common'

export type User = {
  username: string
  password: string
}

export type NewUser = {
  userId: number
  username: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'sau',
      password: 'pass',
    },
    {
      userId: 2,
      username: 'rox',
      password: 'pass',
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }

  async create(user: User): Promise<NewUser> {
    const oldUser = await this.findOne(user.username)

    if (oldUser) {
      throw new Error('User already exists')
    }

    const newUser = {
      userId: this.users.length + 1,
      ...user,
    }

    this.users.push(newUser)
    return newUser
  }
}
