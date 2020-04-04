import { Module } from '@nestjs/common'
import { ForumsResolver } from './forums.resolver'
import { ForumsService } from './forums.service'

@Module({
  providers: [ForumsResolver, ForumsService],
})
export class ForumsModule {}
