import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Thread } from '@server/forums/threads/model'
import { User } from '@server/users/model'

@ObjectType()
export class Reply {
  @Field(type => ID)
  id: string

  @Field()
  when: Date

  @Field()
  content: string

  @Field(type => Thread)
  thread: Thread
  
  @Field(type => User)
  author: User
}
