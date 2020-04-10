import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Query,
  Parent,
  Resolver,
  ResolveField,
  Subscription
} from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { UsersService } from '../../users/service'

import { NewThreadInput } from './dto/new-thread.input'
import { ThreadsArgs } from './dto/threads.args'
import { Thread } from './model'
import { ThreadsService } from './service'

import { RepliesService } from './reply/service'

const pubSub = new PubSub()

@Resolver(of => Thread)
export class ThreadsResolver {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly repliesService: RepliesService
  ) {}

  @Query(returns => Thread)
  async thread(@Args('id') id: string): Promise<Thread> {
    const thread = await this.threadsService.findOneById(id)
    if (!thread) {
      throw new NotFoundException(id)
    }
    return thread
  }

  @ResolveField()
  async replies(
    @Parent() thread: Thread,
    @Args('skip', { type: () => Int }) skip: number
  ) {
    const { id } = thread;
    const result = await this.repliesService.findAll({
      threadId: id,
      skip,
      take: 10
    })
    return {
      items: result[0],
      count: result[1]
    }
  }

  @ResolveField()
  async lastReply(
    @Parent() thread: Thread,    
  ) {
    const { id } = thread;
    const result = await this.repliesService.findLastReply({
      threadId: id,
      skip: 0,
      take: 1
    })
    const replies = result[0]
    const reply = replies.length > 0
      ? replies[0]
      : undefined
    return {
      reply,
      count: result[1]
    }
  }

  @Mutation(returns => Thread)
  async addThread(
    @Args('newThreadData') newThreadData: NewThreadInput,
  ): Promise<Thread> {
    const thread = await this.threadsService.create(newThreadData)
    pubSub.publish('threadAdded', { threadAdded: thread })
    return thread
  }

  // @Mutation(returns => Boolean)
  // async removeThread(@Args('id') id: string) {
  //   return this.threadsService.remove(id)
  // }

  @Subscription(returns => Thread)
  threadAdded() {
    return pubSub.asyncIterator('threadAdded')
  }
}
