import { Module, forwardRef } from '@nestjs/common'

import { DateScalar } from '@server/common/scalars/date.scalar'
import { DatabaseModule } from '@server/db/module'

import { UsersModule } from '@server/users/module'
import { UserProviders } from '@server/users/providers'
import { UsersService } from '@server/users/service'

import { ForumsModule } from '@server/forums/module'
import { ForumProviders } from '@server/forums/providers'
import { ForumsService } from '@server/forums/service'

import { ThreadsModule } from '@server/forums/threads/module'
import { ThreadProviders } from '@server/forums/threads/providers'
import { ThreadsService } from '@server/forums/threads/service'

import { ReplyProviders } from './providers'
import { RepliesResolver } from './resolver'
import { RepliesService } from './service'

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => ForumsModule),
    forwardRef(() => ThreadsModule),
    forwardRef(() => UsersModule)
  ],
  exports: [
    RepliesService
  ],
  providers: [
    ...ThreadProviders,
    ...ForumProviders,
    ...ReplyProviders,
    ...UserProviders,
    RepliesResolver,
    RepliesService,
    ForumsService,
    ThreadsService,
    UsersService,
    DateScalar
  ]
})
export class RepliesModule {}
