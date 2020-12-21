import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class UpdateReplyInput {
  @Field()
  id: number

  @Field()
  content: string
}
