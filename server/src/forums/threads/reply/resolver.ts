import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { ThreadsService } from '@server/forums/threads/service'
import { UsersService } from '@server/users/service'

import { NewReplyInput } from './dto/new-reply.input'
import { UpdateReplyInput } from './dto/update-reply.input'
import { DeleteReplyInput } from './dto/delete-reply.input'
import { RepliesArgs } from './dto/replies.args'
import { Reply } from './model'
import { RepliesService } from './service'


const pubSub = new PubSub()

@Resolver(of => Reply)
export class RepliesResolver {
  constructor(
    private readonly repliesService: RepliesService
  ) {}

  @Query(returns => Reply)
  async reply(@Args('id') id: string): Promise<Reply> {
    const reply = await this.repliesService.findOneById(id)
    if (!reply) {
      throw new NotFoundException(id)
    }
    return reply
  }

  @Mutation(returns => Reply)
  async addReply(
    @Args('newReplyData') newReplyData: NewReplyInput,
  ): Promise<Reply> {
    const reply = await this.repliesService.create(newReplyData)
    pubSub.publish('replyAdded', { replyAdded: reply })
    return reply
  }

  @Mutation(returns => Reply)
  async updateReply(
    @Args('updateReplyData') updateReplyData: UpdateReplyInput,
  ): Promise<Reply> {
    const thread = await this.repliesService.update(updateReplyData)
    pubSub.publish('replyUpdated', { threadAdded: thread })
    return thread
  }

  @Mutation(returns => Reply)
  async deleteReply(
    @Args('DeleteReplyInput') deletereplyinput: DeleteReplyInput) {
    const result = await this.repliesService.delete(`${deletereplyinput.id}`)
    console.log('AJK', result)
    return result
  }

  @Subscription(returns => Reply)
  replyAdded() {
    return pubSub.asyncIterator('replyAdded')
  }
}
