import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Min, IsNotEmpty } from 'class-validator'

@ArgsType()
export class ThreadsArgs {
  @Field(type => String)
  @IsNotEmpty()
  forumId: string

  @Field(type => Int)
  @Min(0)
  page: number = 0
}
