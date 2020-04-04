import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Length, MaxLength } from 'class-validator'

@InputType()
export class NewForumInput {
  @Field()
  @MaxLength(255)
  name: string
}
