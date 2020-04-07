import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Thread } from './threads/model'

@ObjectType()
export class Forum {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => [Thread])
  threads: Thread[];
}
