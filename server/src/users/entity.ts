import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string

  @Column({ type: 'varchar' })
  @Field()
  email: string

  /** Auth0 `sub` for this user; never exposed over GraphQL. */
  @Column({ type: 'varchar' })
  code: string

  @Column({ type: 'varchar' })
  @Field()
  name: string

  @Column({ type: 'varchar' })
  @Field()
  picture: string

  @Column({ type: 'int' })
  @Field()
  logins: number

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  lastLogin: Date
}
