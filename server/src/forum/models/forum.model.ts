import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Forum {
  @Field(type => ID)
  id: string

  @Field()
  name: string
}
