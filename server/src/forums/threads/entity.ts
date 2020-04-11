import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { Forum } from '@server/forums/entity'
import { User } from '@server/users/entity'

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  when: Date

  @Column()
  title: string

  @Column('text')
  content: string

  @ManyToOne(type => Forum)
  @JoinColumn()
  forum: Forum;
  
  @ManyToOne(type => User)
  @JoinColumn()
  author: User
}