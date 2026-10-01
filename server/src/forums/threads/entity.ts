import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Forum } from '../entity'
import { User } from '../../users/entity'

@Entity()
@ObjectType()
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  when: Date

  @Column({ type: 'varchar' })
  @Field()
  title: string

  @Column('text')
  @Field()
  content: string

  @ManyToOne(type => User, { nullable: true })
  @JoinColumn()
  @Field(type => User, { nullable: true })
  userLastReply: User | null

  @Column({ type: 'timestamp' })
  @Field()
  whenLastActivity: Date

  @ManyToOne(type => Forum)
  @JoinColumn()
  @Field(type => Forum)
  forum: Forum

  @ManyToOne(type => User)
  @JoinColumn()
  @Field(type => User)
  author: User
}
