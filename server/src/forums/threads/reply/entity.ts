import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Thread } from '../entity'
import { User } from '../../../users/entity'

@Entity()
@ObjectType()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  when: Date

  @Column('text')
  @Field()
  content: string

  @ManyToOne(type => Thread)
  @JoinColumn()
  @Field(type => Thread)
  thread: Thread

  @ManyToOne(type => User)
  @JoinColumn()
  @Field(type => User)
  author: User
}
