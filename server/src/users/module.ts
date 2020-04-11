import { Module } from '@nestjs/common'

import { DatabaseModule } from '@server/db/module'

import { UserProviders } from './providers'
import { UsersResolver } from './resolver'
import { UsersService } from './service'
import { User } from './entity'

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...UserProviders,
    UsersResolver,
    UsersService
  ]
})
export class UsersModule {}
