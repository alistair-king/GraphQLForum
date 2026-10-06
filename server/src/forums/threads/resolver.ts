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

import { AuthUser } from '../../auth/auth-user'
import { CurrentUser } from '../../auth/current-user.decorator'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'
import { Constants } from '../../common/constants'
import { UsersService } from '../../users/service'

import { NewThreadInput } from './dto/new-thread.input'
import { UpdateThreadInput } from './dto/update-thread.input'
import { DeleteThreadInput } from './dto/delete-thread.input'
import { Thread } from './entity'
import { LastReply, PaginatedReplies } from './model'
import { ThreadsService } from './service'
import { RepliesService } from './reply/service'

@Resolver(of => Thread)
export class ThreadsResolver {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly repliesService: RepliesService,
    private readonly usersService: UsersService,
    @Inject(Constants.PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(returns => Thread)
  async thread(@Args('id') id: string): Promise<Thread> {
    const thread = await this.threadsService.findOneById(id)
    if (!thread) {
      throw new NotFoundException(id)
    }
    return thread
  }

  @ResolveField(returns => PaginatedReplies)
  async replies(
    @Parent() thread: Thread,
    @Args('page', { type: () => Int }) page: number,
  ) {
    const result = await this.repliesService.findAll({
      threadId: thread.id,
      page,
    })
    return {
      items: result[0],
      count: result[1],
    }
  }

  @ResolveField(returns => LastReply)
  async lastReply(
    @Parent() thread: Thread,
  ) {
    const result = await this.repliesService.findLastReply({
      threadId: thread.id,
      page: 0,
    })
    const replies = result[0]
    const reply = replies.length > 0
      ? replies[0]
      : undefined
    return {
      reply,
      count: result[1],
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Thread)
  async addThread(
    @Args('newThreadData') newThreadData: NewThreadInput,
    @CurrentUser() authUser: AuthUser,
  ): Promise<Thread> {
    const author = await this.usersService.getOrCreateByAuthUser(authUser)
    const thread = await this.threadsService.create(newThreadData, author)
    this.pubSub.publish('threadAdded', { threadAdded: thread })
    return thread
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Thread)
  async updateThread(
    @Args('updateThreadData') updateThreadData: UpdateThreadInput,
    @CurrentUser() authUser: AuthUser,
  ): Promise<Thread> {
    return this.threadsService.update(updateThreadData, authUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Thread)
  async deleteThread(
    @Args('data') data: DeleteThreadInput,
    @CurrentUser() authUser: AuthUser,
  ): Promise<Thread> {
    return this.threadsService.delete(data.id, authUser)
  }

  @Subscription(returns => Thread)
  threadAdded() {
    return this.pubSub.asyncIterableIterator('threadAdded')
  }
}
