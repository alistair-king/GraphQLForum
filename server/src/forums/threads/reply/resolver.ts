import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { NewReplyInput } from './dto/new-reply.input'
import { RepliesArgs } from './dto/replies.args'
import { Reply } from './model'
import { RepliesService } from './service'

const pubSub = new PubSub()

@Resolver(of => Reply)
export class RepliesResolver {
  constructor(private readonly replysService: RepliesService) {}

  @Query(returns => Reply)
  async reply(@Args('id') id: string): Promise<Reply> {
    const reply = await this.replysService.findOneById(id)
    if (!reply) {
      throw new NotFoundException(id)
    }
    return reply
  }

  @Mutation(returns => Reply)
  async addReply(
    @Args('newReplyData') newReplyData: NewReplyInput,
  ): Promise<Reply> {
    const reply = await this.replysService.create(newReplyData)
    pubSub.publish('replyAdded', { replyAdded: reply })
    return reply
  }

  // @Mutation(returns => Boolean)
  // async removeReply(@Args('id') id: string) {
  //   return this.replysService.remove(id)
  // }

  @Subscription(returns => Reply)
  replyAdded() {
    return pubSub.asyncIterator('replyAdded')
  }
}
