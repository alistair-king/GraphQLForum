import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class ForumsArgs {
  @Field(type => Int)
  @Min(0)
  page: number = 0
}
