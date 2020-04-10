import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { Forum } from '../entity'
import { User } from '../../users/entity'

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
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