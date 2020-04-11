import { Module, forwardRef } from '@nestjs/common'

import { DateScalar } from '@server/common/scalars/date.scalar'
import { DatabaseModule } from '@server/db/module'

import { UsersModule } from '@server/users/module'
import { UserProviders } from '@server/users/providers'
import { UsersService } from '@server/users/service'

import { ThreadsModule } from '@server/forums/threads/module'
import { ThreadProviders } from '@server/forums/threads/providers'
import { ThreadsService } from '@server/forums/threads/service'

import { ReplyProviders } from './providers'
import { RepliesResolver } from './resolver'
import { RepliesService } from './service'
import { Reply } from './entity'

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => ThreadsModule),
    forwardRef(() => UsersModule)
  ],
  exports: [
    RepliesService
  ],
  providers: [
    ...ReplyProviders,
    ...ThreadProviders,
    ...UserProviders,
    RepliesResolver,
    RepliesService,
    ThreadsService,
    UsersService,
    DateScalar
  ]
})
export class RepliesModule {}
