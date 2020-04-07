import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { Thread } from '../entity'
import { User } from '../../../users/entity'

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  when: string;

  @Column()
  content: string;

  @OneToOne(type => Thread)
  @JoinColumn()
  thread: Thread;
  
  @OneToOne(type => User) 
  @JoinColumn()
  author: User
}
