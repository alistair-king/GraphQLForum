import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Thread } from './threads/entity'

@Entity()
@ObjectType()
export class Forum {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string

  @Column({ type: 'varchar' })
  @Field()
  name: string

  @Column('text')
  @Field()
  description: string

  // not exposed directly: Forum.threads is paginated via a field resolver
  @OneToMany(type => Thread, thread => thread.forum)
  threads: Thread[]
}
