import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Reply } from './reply/entity'

@ObjectType({ isAbstract: true })
export class PaginatedReplies {
  @Field(type => [Reply])
  items: Reply[]

  @Field(type => Int)
  count: number
}

@ObjectType({ isAbstract: true })
export class LastReply {
  @Field(type => Reply, { nullable: true })
  reply: Reply

  @Field(type => Int)
  count: number
}
