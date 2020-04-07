import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Thread } from '../model'
import { User } from '../../../users/model'

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
