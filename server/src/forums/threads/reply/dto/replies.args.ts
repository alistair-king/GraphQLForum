import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class RepliesArgs {
  @Field(type => String)
  threadId: string

  @Field(type => Int)
  @Min(0)
  page: number = 0
}
