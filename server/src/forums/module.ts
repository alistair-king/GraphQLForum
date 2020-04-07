import { Module } from '@nestjs/common'

import { DatabaseModule } from '../db/module'

import { ForumProviders } from './providers'
import { ForumsResolver } from './resolver'
import { ForumsService } from './service'
import { Forum } from './entity'

import { ThreadProviders } from './threads/providers'
import { ThreadsModule } from './threads/module'
import { ThreadsService } from './threads/service'
import { Thread } from './threads/entity'

@Module({
  imports: [
    DatabaseModule,
    ThreadsModule
  ],
  providers: [
    ...ForumProviders,
    ForumsResolver,
    ForumsService
  ]
})
export class ForumsModule {}
