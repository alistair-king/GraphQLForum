import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  code: string

  @Column()
  name: string

  @Column()
  picture: string

  @Column()
  logins: number

  @Column()
  lastLogin: Date
}
