import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { Forum } from '@server/forums/model'
import { Reply } from '@server/forums/threads/reply/model'
import { User } from '@server/users/model'


@ObjectType({ isAbstract: true })
abstract class PaginatedReplies {
  @Field(type => [Reply])
  items: Reply[];

  @Field(type => Int)
  count: number;
}

@ObjectType({ isAbstract: true })
abstract class LastReply {
  @Field(type => Reply, { nullable: true })
  reply: Reply;

  @Field(type => Int)
  count: number;
}

@ObjectType()
export class Thread {
  @Field(type => ID)
  id: string

  @Field()
  when: Date

  @Field()
  title: string

  @Field()
  content: string

  @Field(type => Forum)
  forum: Forum
  
  @Field(type => User)
  author: User

  @Field(type => PaginatedReplies)
  replies: PaginatedReplies

  @Field(type => LastReply)
  lastReply: LastReply
}
