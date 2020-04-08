import { Module } from '@nestjs/common'

import { DateScalar } from '../../../common/scalars/date.scalar'
import { DatabaseModule } from '../../../db/module'

import { ReplyProviders } from './providers'
import { RepliesResolver } from './resolver'
import { RepliesService } from './service'
import { Reply } from './entity'

@Module({
  imports: [
    DatabaseModule
  ],
  exports: [
    RepliesService
  ],
  providers: [
    ...ReplyProviders,
    RepliesResolver,
    RepliesService,
    DateScalar
  ]
})
export class RepliesModule {}