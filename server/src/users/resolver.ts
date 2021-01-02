import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { LoginUserInput } from './dto/login-user.input'
import { NewUserInput } from './dto/new-user.input'
import { UsersArgs } from './dto/users.args'
import { User } from './model'
import { UsersService } from './service'

const pubSub = new PubSub()

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(
    @Args('email') email: string,
    @Args('code') code: string,
  ): Promise<User> {
    return await this.usersService.currentUser(email, code)
  }

  @Query(returns => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs)
  }

  @Mutation(returns => User)
  async loginUser(
    @Args('loginUserData') loginUserData: LoginUserInput,
  ): Promise<User> {
    console.log('AJK login user', loginUserData)

    const user = await this.usersService.login(loginUserData)
    pubSub.publish('userLoggedIn', { userLoggedIn: user })
    return user
  }

  // @Mutation(returns => Boolean)
  // async removeUser(@Args('id') id: string) {
  //   return this.usersService.remove(id)
  // }

  @Subscription(returns => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded')
  }
}
