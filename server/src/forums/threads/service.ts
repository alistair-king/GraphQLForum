import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Constants } from '@server/common/constants'

import { ForumsService } from '@server/forums/service'
import { UsersService } from '@server/users/service'

import { NewThreadInput } from './dto/new-thread.input'
import { ThreadsArgs } from './dto/threads.args'
import { Thread } from './model'

@Injectable()
export class ThreadsService {
  constructor(
    @Inject(Constants.THREAD_REPO)
    private threadsRepository: Repository<Thread>,

    @Inject(forwardRef(() => ForumsService))
    private forumsService: ForumsService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async create(data: NewThreadInput): Promise<Thread> {
    const {
      forumId,
      authorId,
      ...rest
    } = data
    const reply = this.threadsRepository.create(rest)
    reply.forum = await this.forumsService.findOneById(forumId)
    reply.author = await this.usersService.findOneById(authorId)
    this.threadsRepository.save(reply)
    return reply
  }

  async findOneById(id: string): Promise<Thread> {
    return this.threadsRepository.createQueryBuilder('thread')
      .where('thread.id = :id', { id })
      .leftJoinAndSelect('thread.forum', 'Forum') 
      .leftJoinAndSelect('thread.author', 'User') 
      // .take(1)
      .getOne()
  }

  async findThreads(args: ThreadsArgs): Promise<[Thread[], number]> {
    return this.threadsRepository.createQueryBuilder('thread')
      .where('thread.forumid = :id', { id: args.forumId })
      .skip(args.skip)
      .take(args.take)
      .leftJoinAndSelect('thread.author', 'User')
      .getManyAndCount()
  }
  
  // async remove(id: string): Promise<boolean> {
  //   return true
  // }
}
