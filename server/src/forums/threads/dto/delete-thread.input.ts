import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class DeleteThreadInput {
  @Field()
  @IsNotEmpty()
  id: string
}
