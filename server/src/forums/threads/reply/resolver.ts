import { Inject, NotFoundException, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'

import { AuthUser } from '../../../auth/auth-user'
import { CurrentUser } from '../../../auth/current-user.decorator'
import { GqlAuthGuard } from '../../../auth/gql-auth.guard'
import { Constants } from '../../../common/constants'
import { UsersService } from '../../../users/service'

import { NewReplyInput } from './dto/new-reply.input'
import { UpdateReplyInput } from './dto/update-reply.input'
import { DeleteReplyInput } from './dto/delete-reply.input'
import { Reply } from './entity'
import { RepliesService } from './service'

@Resolver(of => Reply)
export class RepliesResolver {
  constructor(
    private readonly repliesService: RepliesService,
    private readonly usersService: UsersService,
    @Inject(Constants.PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(returns => Reply)
  async reply(@Args('id') id: string): Promise<Reply> {
    const reply = await this.repliesService.findOneById(id)
    if (!reply) {
      throw new NotFoundException(id)
    }
    return reply
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Reply)
  async addReply(
    @Args('newReplyData') newReplyData: NewReplyInput,
    @CurrentUser() authUser: AuthUser,
  ): Promise<Reply> {
    const author = await this.usersService.getOrCreateByAuthUser(authUser)
    const reply = await this.repliesService.create(newReplyData, author)
    this.pubSub.publish('replyAdded', { replyAdded: reply })
    return reply
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Reply)
  async updateReply(
    @Args('updateReplyData') updateReplyData: UpdateReplyInput,
    @CurrentUser() authUser: AuthUser,
  ): Promise<Reply> {
    return this.repliesService.update(updateReplyData, authUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Reply)
  async deleteReply(
    @Args('data') data: DeleteReplyInput,
    @CurrentUser() authUser: AuthUser,
  ): Promise<Reply> {
    return this.repliesService.delete(data.id, authUser)
  }

  @Subscription(returns => Reply)
  replyAdded() {
    return this.pubSub.asyncIterableIterator('replyAdded')
  }
}
