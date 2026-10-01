import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Thread } from './threads/entity'

@ObjectType({ isAbstract: true })
export class PaginatedThreads {
  @Field(type => [Thread])
  items: Thread[]

  @Field(type => Int)
  count: number
}
