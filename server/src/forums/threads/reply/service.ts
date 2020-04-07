import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Constants } from '../../../common/constants'

import { NewReplyInput } from './dto/new-reply.input'
import { RepliesArgs } from './dto/replies.args'
import { Reply } from './model'

@Injectable()
export class RepliesService {
  constructor(
    @Inject(Constants.REPLY_REPO)
    private repliesRepository: Repository<Reply>
  ) {}

  async create(data: NewReplyInput): Promise<Reply> {
    return {} as any
  }

  async findOneById(id: string): Promise<Reply> {
    return this.repliesRepository.findOne(id)
  }

  async findAll(repliesArgs: RepliesArgs): Promise<Reply[]> {
    return this.repliesRepository.find()
  }

  // async remove(id: string): Promise<boolean> {
  //   return this.repliesRepository.delete(id)
  // }
}
