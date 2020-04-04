import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  email: string

  @Field()
  password: string
}
