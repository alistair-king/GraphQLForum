import { Inject, NotFoundException, UseGuards } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { AuthUser } from '../auth/auth-user'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { Constants } from '../common/constants'

import { ForumsArgs } from './dto/forums.args'
import { NewForumInput } from './dto/new-forum.input'
import { Forum } from './entity'
import { PaginatedThreads } from './model'
import { ForumsService } from './service'
import { ThreadsService } from './threads/service'

@Resolver(of => Forum)
export class ForumsResolver {
  constructor(
    private readonly forumsService: ForumsService,
    private readonly threadsService: ThreadsService,
    @Inject(Constants.PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(returns => Forum)
  async forum(@Args('id') id: string): Promise<Forum> {
    const forum = await this.forumsService.findOneById(id)
    if (!forum) {
      throw new NotFoundException(id)
    }
    return forum
  }

  @Query(returns => [Forum])
  forums(@Args() forumsArgs: ForumsArgs): Promise<Forum[]> {
    return this.forumsService.findAll(forumsArgs)
  }

  @ResolveField(returns => PaginatedThreads)
  async threads(
    @Parent() forum: Forum,
    @Args('page', { type: () => Int }) page: number,
  ) {
    const result = await this.threadsService.findThreads({
      forumId: forum.id,
      page,
    })
    return {
      items: result[0],
      count: result[1],
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Forum)
  async addForum(
    @Args('newForumData') newForumData: NewForumInput,
    @CurrentUser() _authUser: AuthUser,
  ): Promise<Forum> {
    const forum = await this.forumsService.create(newForumData)
    this.pubSub.publish('forumAdded', { forumAdded: forum })
    return forum
  }

  @Subscription(returns => Forum)
  forumAdded() {
    return this.pubSub.asyncIterableIterator('forumAdded')
  }
}
