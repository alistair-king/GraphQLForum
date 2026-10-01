import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from '../../common/common.module'
import { UsersModule } from '../../users/module'

import { Forum } from '../entity'
import { Thread } from './entity'
import { User } from '../../users/entity'
import { ThreadsResolver } from './resolver'
import { ThreadsService } from './service'
import { RepliesModule } from './reply/module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Thread, Forum, User]),
    CommonModule,
    UsersModule,
    RepliesModule,
  ],
  providers: [ThreadsResolver, ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
