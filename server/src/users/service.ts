import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Constants } from '@server/common/constants'

import { LoginUserInput } from './dto/login-user.input'
import { UsersArgs } from './dto/users.args'
import { User } from './model'

@Injectable()
export class UsersService {
  constructor(
    @Inject(Constants.USER_REPO)
    private usersRepository: Repository<User>
  ) {}

  async currentUser(code: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        code
      }
    })
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    return this.usersRepository.find()
  }

  async login(data: LoginUserInput): Promise<User> {
    let user = await this.usersRepository.findOne({
      where: {
        email: data.email,
        code: data.code
      }
    })
    if (!user) {
      user = new User()
      user.email = data.email
      user.code = data.code
      user.name = data.name
      user.logins = 0
    }
    user.picture = data.picture
    user.logins++
    user.lastLogin = new Date()
    return this.usersRepository.save(user)
  }


  // async remove(id: string): Promise<boolean> {
  //   return this.usersRepository.delete(id)
  // }
}
