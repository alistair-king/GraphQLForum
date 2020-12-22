import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { Repository, DeleteResult} from 'typeorm'

import { Constants } from '@server/common/constants'

import { ForumsService } from '@server/forums/service'
import { UsersService } from '@server/users/service'

import { NewThreadInput } from './dto/new-thread.input'
import { UpdateThreadInput } from './dto/update-thread.input'
import { DeleteThreadInput } from './dto/delete-thread.input'
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
    thread.whenLastActivity = new Date()
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
      .skip(args.page * 10)
      .take(10)
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
    return thread
  }

  async delete(id: string): Promise<Thread> {
    const thread = await this.findOneById(id);
    if (thread) {
      await this.threadsRepository.delete(thread)
    }
    return thread
  }
}
