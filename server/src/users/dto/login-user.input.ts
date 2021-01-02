import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class LoginUserInput {
  @Field()
  @MaxLength(255)
  email: string

  @Field()
  @MaxLength(255)
  code: string

  @Field()
  @MaxLength(255)
  name: string

  @Field()
  @MaxLength(255)
  picture: string
}
