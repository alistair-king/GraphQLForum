import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AuthUser } from '../../auth/auth-user'
import { ROLE_ADMIN, PAGE_SIZE } from '../../common/constants'

import { Forum } from '../entity'
import { User } from '../../users/entity'

import { NewThreadInput } from './dto/new-thread.input'
import { UpdateThreadInput } from './dto/update-thread.input'
import { ThreadsArgs } from './dto/threads.args'
import { Thread } from './entity'
import { Reply } from './reply/entity'

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadsRepository: Repository<Thread>,

    @InjectRepository(Forum)
    private forumsRepository: Repository<Forum>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Reply)
    private repliesRepository: Repository<Reply>,
  ) {}

  async create(data: NewThreadInput, author: User): Promise<Thread> {
    const { forumId, ...rest } = data
    const forum = await this.forumsRepository.findOneBy({ id: forumId })
    if (!forum) {
      throw new NotFoundException(`Forum ${forumId} not found`)
    }
    const thread = this.threadsRepository.create(rest)
    thread.forum = forum
    thread.author = author
    thread.when = new Date()
    thread.whenLastActivity = thread.when
    return this.threadsRepository.save(thread)
  }

  async findOneById(id: string): Promise<Thread> {
    return this.threadsRepository.findOne({
      where: { id },
      relations: { forum: true, author: true },
    })
  }

  async findThreads(args: ThreadsArgs): Promise<[Thread[], number]> {
    return this.threadsRepository
      .createQueryBuilder('thread')
      .where('thread.forumId = :id', { id: args.forumId })
      .orderBy('thread.whenLastActivity', 'DESC')
      .skip(args.page * PAGE_SIZE)
      .take(PAGE_SIZE)
      .leftJoinAndSelect('thread.author', 'author')
      .getManyAndCount()
  }

  async update(data: UpdateThreadInput, actor: AuthUser): Promise<Thread> {
    const { id, title, content } = data
    const thread = await this.findOneById(id)
    if (!thread) {
      throw new NotFoundException(`Thread ${id} not found`)
    }
    this.assertCanModify(thread, actor)
    thread.title = title
    thread.content = content
    return this.threadsRepository.save(thread)
  }

  async delete(id: string, actor: AuthUser): Promise<Thread> {
    const thread = await this.findOneById(id)
    if (!thread) {
      throw new NotFoundException(`Thread ${id} not found`)
    }
    this.assertCanModify(thread, actor)
    // remove the thread's replies first: reply.threadId references the
    // thread and the FK would otherwise reject the delete
    await this.repliesRepository.delete({ thread: { id: thread.id } })
    // remove() nulls the entity's id; keep a copy for the return value
    const deleted = { ...thread }
    await this.threadsRepository.remove(thread)
    return deleted
  }

  private assertCanModify(thread: Thread, actor: AuthUser): void {
    if (actor.roles.includes(ROLE_ADMIN)) {
      return
    }
    if (thread.author?.code === actor.sub) {
      return
    }
    throw new ForbiddenException('You can only modify your own threads')
  }
}
