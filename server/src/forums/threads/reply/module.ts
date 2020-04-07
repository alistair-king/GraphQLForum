import { Module } from '@nestjs/common'

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
    RepliesService
  ]
})
export class RepliesModule {}
