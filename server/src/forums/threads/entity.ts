import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

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

  @Column()
  content: string

  @OneToOne(type => Forum)
  @JoinColumn()
  forum: Forum;
  
  @OneToOne(type => User) 
  @JoinColumn()
  author: User
}