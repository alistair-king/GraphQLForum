import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { Thread } from './threads/entity'

@Entity()
export class Forum {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  description: string

  @OneToMany(type => Thread, thread => thread.forum)
  threads: Thread[]
}
