import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../database/users/entity/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from 'src/database/users/dto/create-user.dto'
import { getHash } from '../auth/bcrypt'

export type NewUser = Omit<User, 'password'>
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findOne(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ username: userName })
  }

  async create(createUserDto: CreateUserDto): Promise<NewUser> {
    const user = new User()
    user.username = createUserDto.username
    user.password = await getHash(createUserDto.password)

    const createdUser = await this.usersRepository.save(user)
    return { id: createdUser.id, username: createdUser.username }
  }
}
