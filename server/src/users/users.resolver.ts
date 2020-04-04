import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'
import { NewUserInput } from './dto/new-user.input'
import { UsersArgs } from './dto/users.args'
import { User } from './models/user.model'
import { UsersService } from './users.service'

const pubSub = new PubSub()

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }

  @Query(returns => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs)
  }

  @Mutation(returns => User)
  async addUser(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    const user = await this.usersService.create(newUserData)
    pubSub.publish('userAdded', { userAdded: user })
    return user
  }

  @Mutation(returns => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.usersService.remove(id)
  }

  @Subscription(returns => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded')
  }
}
