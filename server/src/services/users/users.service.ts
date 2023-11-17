import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from 'src/database/users/dto/create-user.dto'
import { getHash } from '../auth/bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findOne(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User()
    user.userName = createUserDto.userName
    user.password = await getHash(createUserDto.password)

    return this.usersRepository.save(user)
  }
}
