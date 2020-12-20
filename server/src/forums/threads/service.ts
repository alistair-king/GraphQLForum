import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Constants } from '@server/common/constants'

import { ForumsService } from '@server/forums/service'
import { UsersService } from '@server/users/service'

import { NewThreadInput } from './dto/new-thread.input'
import { UpdateThreadInput } from './dto/update-thread.input'
import { ThreadsArgs } from './dto/threads.args'

import { Thread } from './model'
import { Reply } from './reply/model'

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
    const thread = this.threadsRepository.create(rest)
    thread.forum = await this.forumsService.findOneById(forumId)
    thread.author = await this.usersService.findOneById(authorId)
    this.threadsRepository.save(thread)
    return thread
  }

  async findOneById(id: string): Promise<Thread> {
    return this.threadsRepository.createQueryBuilder('thread')
      .where('thread.id = :id', { id })
      .leftJoinAndSelect('thread.forum', 'Forum') 
      .leftJoinAndSelect('thread.author', 'User') 
      .getOne()
  }

  async findThreads(args: ThreadsArgs): Promise<[Thread[], number]> {
    return this.threadsRepository.createQueryBuilder('thread')
      .where('thread.forumid = :id', { id: args.forumId })
      .orderBy('thread.whenLastActivity', 'DESC')
      .skip(args.skip)
      .take(args.take)
      .leftJoinAndSelect('thread.author', 'User')
      .getManyAndCount()
  }
  
  async recordActivity(thread: Thread, reply: Reply) {
    thread.userLastReply = reply.author
    thread.whenLastActivity = reply.when
    this.threadsRepository.save(thread)
  }

  async update(updateData: UpdateThreadInput): Promise<Thread> {
    const { id, ...rest } = updateData;
    const thread = {
      ...(await this.findOneById(`${id}`)),
      ...rest
    }
    await this.threadsRepository.save(thread)
    return thread;
  }

  // async remove(id: string): Promise<boolean> {
  //   return true
  // }
}
