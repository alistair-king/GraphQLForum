import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthUser } from '../auth/auth-user'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql-auth.guard'

import { UsersArgs } from './dto/users.args'
import { User } from './entity'
import { UsersService } from './service'

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  me(@CurrentUser() authUser: AuthUser): Promise<User> {
    return this.usersService.me(authUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => User)
  login(@CurrentUser() authUser: AuthUser): Promise<User> {
    return this.usersService.login(authUser)
  }

  @Query(returns => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs)
  }
}
