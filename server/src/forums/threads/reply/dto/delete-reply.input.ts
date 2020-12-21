import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteReplyInput {
  @Field()
  id: number
}
