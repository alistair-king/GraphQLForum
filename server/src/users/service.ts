import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Constants } from '../common/constants'

import { NewUserInput } from './dto/new-user.input'
import { UsersArgs } from './dto/users.args'
import { User } from './model'

@Injectable()
export class UsersService {
  constructor(
    @Inject(Constants.USER_REPO)
    private usersRepository: Repository<User>
  ) {}

  async create(data: NewUserInput): Promise<User> {
    return {} as any
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    return this.usersRepository.find()
  }

  // async remove(id: string): Promise<boolean> {
  //   return this.usersRepository.delete(id)
  // }
}
