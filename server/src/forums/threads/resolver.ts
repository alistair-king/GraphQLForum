import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { NewThreadInput } from './dto/new-thread.input'
import { ThreadsArgs } from './dto/threads.args'
import { Thread } from './model'
import { ThreadsService } from './service'

const pubSub = new PubSub()

@Resolver(of => Thread)
export class ThreadsResolver {
  constructor(private readonly threadsService: ThreadsService) {}

  @Query(returns => Thread)
  async thread(@Args('id') id: string): Promise<Thread> {
    const thread = await this.threadsService.findOneById(id)
    if (!thread) {
      throw new NotFoundException(id)
    }
    return thread
  }

  @Query(returns => [Thread])
  threads(@Args() threadsArgs: ThreadsArgs): Promise<Thread[]> {
    return this.threadsService.findAll(threadsArgs)
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
