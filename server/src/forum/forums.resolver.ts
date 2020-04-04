import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'
import { NewForumInput } from './dto/new-forum.input'
import { ForumsArgs } from './dto/forums.args'
import { Forum } from './models/forum.model'
import { ForumsService } from './forums.service'

const pubSub = new PubSub()

@Resolver(of => Forum)
export class ForumsResolver {
  constructor(private readonly forumsService: ForumsService) {}

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

  @Mutation(returns => Forum)
  async addForum(
    @Args('newForumData') newForumData: NewForumInput,
  ): Promise<Forum> {
    const forum = await this.forumsService.create(newForumData)
    pubSub.publish('forumAdded', { forumAdded: forum })
    return forum
  }

  @Mutation(returns => Boolean)
  async removeForum(@Args('id') id: string) {
    return this.forumsService.remove(id)
  }

  @Subscription(returns => Forum)
  forumAdded() {
    return pubSub.asyncIterator('forumAdded')
  }
}
