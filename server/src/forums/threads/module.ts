import { Module } from '@nestjs/common'

import { DatabaseModule } from '../../db/module'

import { ThreadProviders } from './providers'
import { ThreadsResolver } from './resolver'
import { ThreadsService } from './service'
import { Thread } from './entity'

@Module({
  imports: [
    DatabaseModule
  ],
  exports: [
    ThreadsService
  ],
  providers: [
    ...ThreadProviders,
    ThreadsResolver,
    ThreadsService
  ],
})
export class ThreadsModule {}
