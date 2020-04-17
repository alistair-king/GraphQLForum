import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

import { Forum } from '@server/forums/model'
import { User } from '@server/users/model'

@InputType()
export class NewThreadInput {
  @Field()
  @MaxLength(255)
  title: string

  @Field()
  content: string
  
  @Field(type => String)
  authorId: string
  
  @Field(type => String)
  forumId: string
}
