import { Type } from '@nestjs/common';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { Thread } from './threads/model'

@ObjectType({ isAbstract: true })
abstract class PaginatedThreads {
  @Field(type => [Thread])
  items: Thread[];

  @Field(type => Int)
  count: number;
}

@ObjectType()
export class Forum {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => PaginatedThreads)
  threads: PaginatedThreads;
}


