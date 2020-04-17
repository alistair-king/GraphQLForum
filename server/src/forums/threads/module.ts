import { Module, forwardRef } from '@nestjs/common'

import { DateScalar } from '@server/common/scalars/date.scalar'
import { DatabaseModule } from '@server/db/module'

import { ForumsModule } from '@server/forums/module'
import { ForumProviders } from '@server/forums/providers'
import { ForumsService } from '@server/forums/service'

import { ThreadProviders } from './providers'
import { ThreadsResolver } from './resolver'
import { ThreadsService } from './service'
import { Thread } from './entity'

import { RepliesModule } from './reply/module'
import { RepliesService } from './reply/service'

import { UsersModule } from '@server/users/module'
import { UserProviders } from '@server/users/providers'
import { UsersService } from '@server/users/service'

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => ForumsModule),
    forwardRef(() => RepliesModule),
    forwardRef(() => UsersModule)
  ],
  exports: [
    ThreadsService
  ],
  providers: [
    ...ThreadProviders,
    ...ForumProviders,
    ...UserProviders,
    ThreadsResolver,
    ThreadsService,
    ForumsService,
    UsersService,
    DateScalar
  ],
})
export class ThreadsModule {}
