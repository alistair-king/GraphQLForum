import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Length, MaxLength } from 'class-validator'

import { User } from '@server/users/model'


@InputType()
export class NewReplyInput {
  @Field()
  @MaxLength(255)
  name: string

  @Field()
  @MaxLength(255)
  email: string

  @Field()
  @MaxLength(255)
  password: string
}
