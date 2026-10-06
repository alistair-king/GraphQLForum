import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from '../../../common/common.module'
import { UsersModule } from '../../../users/module'

import { Thread } from '../entity'
import { Reply } from './entity'
import { RepliesResolver } from './resolver'
import { RepliesService } from './service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Reply, Thread]),
    CommonModule,
    UsersModule,
  ],
  providers: [RepliesResolver, RepliesService],
  exports: [RepliesService],
})
export class RepliesModule {}
