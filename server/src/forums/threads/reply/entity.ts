import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Thread } from '@server/forums/threads/entity'
import { User } from '@server/users/entity'

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  when: Date

  @Column()
  content: string

  @ManyToOne(type => Thread)
  @JoinColumn()
  thread: Thread
  
  @ManyToOne(type => User) 
  @JoinColumn()
  author: User
}
