import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from '../common/common.module'

import { Forum } from './entity'
import { ForumsResolver } from './resolver'
import { ForumsService } from './service'
import { ThreadsModule } from './threads/module'

@Module({
  imports: [TypeOrmModule.forFeature([Forum]), CommonModule, ThreadsModule],
  providers: [ForumsResolver, ForumsService],
})
export class ForumsModule {}
