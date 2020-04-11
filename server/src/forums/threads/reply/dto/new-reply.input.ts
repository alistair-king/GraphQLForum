import { Field, InputType, Int } from '@nestjs/graphql'
import { IsOptional, Length, MaxLength } from 'class-validator'

import { Thread } from '@server/forums/threads/model'
import { User } from '@server/users/model'


@InputType()
export class NewReplyInput {
  @Field(type => String)
  threadId: string

  @Field(type => String)
  authorId: string

  @Field(type => String)
  content: string
}
