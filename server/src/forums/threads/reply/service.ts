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

  async findAll(args: RepliesArgs): Promise<[Reply[], number]> {
    return this.repliesRepository.createQueryBuilder('reply')
      .where("reply.threadid = :id", { id: args.threadId })
      .skip(args.skip)
      .take(args.take)
      .leftJoinAndSelect("reply.author", "User")
      .getManyAndCount()
  }

  async findLastReply(args: RepliesArgs): Promise<[Reply[], number]> {
    return this.repliesRepository.createQueryBuilder('reply')
      .where("reply.threadid = :id", { id: args.threadId })
      .orderBy('reply.id', 'DESC')
      .take(1)
      .leftJoinAndSelect("reply.author", "User")
      .getManyAndCount()
  }

  // async remove(id: string): Promise<boolean> {
  //   return this.repliesRepository.delete(id)
  // }
}
