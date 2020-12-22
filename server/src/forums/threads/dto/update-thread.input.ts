import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class UpdateThreadInput {
  @Field()
  id: string

  @Field()
  @MaxLength(255)
  title: string

  @Field()
  content: string
}
