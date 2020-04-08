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

  async findAll(threadsArgs: ThreadsArgs): Promise<Thread[]> {
    return this.threadsRepository.createQueryBuilder('thread')
      .where("thread.forumid = :id", { id: threadsArgs.forumId })
      .leftJoinAndSelect("thread.author", "User")
      .getMany()
  }

  // async remove(id: string): Promise<boolean> {
  //   return true
  // }
}
