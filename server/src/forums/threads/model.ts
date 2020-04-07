import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Forum } from '../model'
import { User } from '../../users/model'

@ObjectType()
export class Thread {
  @Field(type => ID)
  id: string

  @Field()
  when: Date

  @Field()
  title: string
  
  @Field(type => Forum)
  forum: Forum
  
  @Field(type => User)
  author: User
}
