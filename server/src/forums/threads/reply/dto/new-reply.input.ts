import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength, IsNotEmpty } from 'class-validator'

@InputType()
export class NewReplyInput {
  @Field(type => String)
  @IsNotEmpty()
  threadId: string

  @Field(type => String)
  @MinLength(1)
  @MaxLength(65535)
  content: string
}
