import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

import { Forum } from '../../model'
import { User } from '../../../users/model'

@InputType()
export class NewThreadInput {
  @Field()
  @MaxLength(255)
  name: string

  @Field()
  body: string
  
  @Field(type => Int)
  authorid: number
  
  @Field(type => Int)
  forumid: number
}
