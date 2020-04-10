import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Constants } from '../../common/constants'

import { NewThreadInput } from './dto/new-thread.input'
import { ThreadsArgs } from './dto/threads.args'
import { Thread } from './model'

@Injectable()
export class ThreadsService {
  constructor(
    @Inject(Constants.THREAD_REPO)
    private threadsRepository: Repository<Thread>
  ) {}

  async create(data: NewThreadInput): Promise<Thread> {
    return {} as any
  }

  async findOneById(id: string): Promise<Thread> {
    return this.threadsRepository.findOne(id)
  }

  async findThreads(args: ThreadsArgs): Promise<[Thread[], number]> {
    return this.threadsRepository.createQueryBuilder('thread')
      .where("thread.forumid = :id", { id: args.forumId })
      .skip(args.skip)
      .take(args.take)
      .leftJoinAndSelect("thread.author", "User")
      .getManyAndCount()
  }
  
  // async remove(id: string): Promise<boolean> {
  //   return true
  // }
}
