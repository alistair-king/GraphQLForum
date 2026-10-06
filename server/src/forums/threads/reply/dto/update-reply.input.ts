import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateReplyInput {
  @Field()
  @IsNotEmpty()
  id: string

  @Field()
  @MinLength(1)
  @MaxLength(65535)
  content: string
}
