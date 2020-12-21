import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class ThreadsArgs {
  @Field(type => String)
  forumId: string

  @Field(type => Int)
  @Min(0)
  page: number = 0
}
