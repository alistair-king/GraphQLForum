import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AuthUser } from '../auth/auth-user'

import { User } from './entity'
import { UsersArgs } from './dto/users.args'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Finds the local user record for an authenticated AuthUser, creating
   * (but not counting) it on first sight. Does not update login stats.
   */
  async getOrCreateByAuthUser(authUser: AuthUser): Promise<User> {
    let user = await this.usersRepository.findOneBy({ code: authUser.sub })
    if (!user) {
      user = new User()
      user.code = authUser.sub
      user.email = authUser.email ?? ''
      user.name = authUser.name ?? authUser.sub
      user.picture = authUser.picture ?? ''
      user.logins = 0
    }
    return user
  }

  /** Records a login: upserts the user and bumps login stats. */
  async login(authUser: AuthUser): Promise<User> {
    const user = await this.getOrCreateByAuthUser(authUser)
    if (authUser.email) {
      user.email = authUser.email
    }
    if (authUser.name) {
      user.name = authUser.name
    }
    if (authUser.picture) {
      user.picture = authUser.picture
    }
    user.logins++
    user.lastLogin = new Date()
    return this.usersRepository.save(user)
  }

  async me(authUser: AuthUser): Promise<User> {
    return this.getOrCreateByAuthUser(authUser)
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id })
  }

  async findAll(args: UsersArgs): Promise<User[]> {
    return this.usersRepository.find({
      skip: args.skip,
      take: args.take,
    })
  }
}
