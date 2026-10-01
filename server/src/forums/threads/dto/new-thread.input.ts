import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class NewThreadInput {
  @Field()
  @MinLength(1)
  @MaxLength(255)
  title: string

  @Field()
  @MinLength(1)
  @MaxLength(65535)
  content: string

  @Field(type => String)
  forumId: string
}
