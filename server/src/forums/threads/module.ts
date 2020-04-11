import { Module } from '@nestjs/common'

import { DateScalar } from '@server/common/scalars/date.scalar'
import { DatabaseModule } from '@server/db/module'

import { ThreadProviders } from './providers'
import { ThreadsResolver } from './resolver'
import { ThreadsService } from './service'
import { Thread } from './entity'

import { RepliesModule } from './reply/module'
import { RepliesService } from './reply/service'


@Module({
  imports: [
    DatabaseModule,
    RepliesModule
  ],
  exports: [
    ThreadsService
  ],
  providers: [
    ...ThreadProviders,
    ThreadsResolver,
    ThreadsService,
    DateScalar
  ],
})
export class ThreadsModule {}
