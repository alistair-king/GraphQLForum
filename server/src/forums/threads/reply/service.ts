import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Constants } from '@server/common/constants'

import { ThreadsService } from '@server/forums/threads/service'
import { UsersService } from '@server/users/service'

import { NewReplyInput } from './dto/new-reply.input'
import { RepliesArgs } from './dto/replies.args'
import { Reply } from './model'

@Injectable()
export class RepliesService {
  constructor(
    @Inject(Constants.REPLY_REPO)
    private repliesRepository: Repository<Reply>,

    @Inject(forwardRef(() => ThreadsService))
    private threadsService: ThreadsService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async create(data: NewReplyInput): Promise<Reply> {
    const {
      threadId,
      authorId,
      ...rest
    } = data
    const reply = this.repliesRepository.create(rest)
    reply.thread = await this.threadsService.findOneById(threadId)
    reply.author = await this.usersService.findOneById(authorId)
    await this.repliesRepository.save(reply)
    
    this.threadsService.recordActivity(reply.thread, reply)
    
    return reply
  }

  async findOneById(id: string): Promise<Reply> {
    return this.repliesRepository.findOne(id)
  }

  async findAll(args: RepliesArgs): Promise<[Reply[], number]> {
    return this.repliesRepository.createQueryBuilder('reply')
      .where("reply.threadid = :id", { id: args.threadId })
      .skip(args.page * 10)
      .take(10)
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
