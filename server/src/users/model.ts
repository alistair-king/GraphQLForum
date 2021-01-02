import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field()
  email: string

  @Field()
  code: string

  @Field()
  name: string

  @Field()
  picture: string

  @Field()
  logins: number

  @Field()
  lastLogin: Date
}
