import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AuthUser } from '../../../auth/auth-user'
import { ROLE_ADMIN, PAGE_SIZE } from '../../../common/constants'
import { UsersService } from '../../../users/service'

import { Thread } from '../entity'

import { NewReplyInput } from './dto/new-reply.input'
import { UpdateReplyInput } from './dto/update-reply.input'
import { RepliesArgs } from './dto/replies.args'
import { Reply } from './entity'
import { User } from '../../../users/entity'

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private repliesRepository: Repository<Reply>,

    @InjectRepository(Thread)
    private threadsRepository: Repository<Thread>,

    private readonly usersService: UsersService,
  ) {}

  async create(data: NewReplyInput, author: User): Promise<Reply> {
    const { threadId, ...rest } = data
    const thread = await this.threadsRepository.findOneBy({ id: threadId })
    if (!thread) {
      throw new NotFoundException(`Thread ${threadId} not found`)
    }
    const reply = this.repliesRepository.create(rest)
    reply.when = new Date()
    reply.thread = thread
    reply.author = author
    await this.repliesRepository.save(reply)

    thread.userLastReply = author
    thread.whenLastActivity = reply.when
    await this.threadsRepository.save(thread)

    return reply
  }

  async findOneById(id: string): Promise<Reply> {
    return this.repliesRepository.findOne({
      where: { id },
      relations: { thread: true, author: true },
    })
  }

  async findAll(args: RepliesArgs): Promise<[Reply[], number]> {
    return this.repliesRepository
      .createQueryBuilder('reply')
      .where('reply.threadId = :id', { id: args.threadId })
      .orderBy('reply.when', 'ASC')
      .skip(args.page * PAGE_SIZE)
      .take(PAGE_SIZE)
      .leftJoinAndSelect('reply.author', 'author')
      .getManyAndCount()
  }

  async findLastReply(args: RepliesArgs): Promise<[Reply[], number]> {
    // count is the thread's total reply count; the single item is the newest
    return this.repliesRepository
      .createQueryBuilder('reply')
      .where('reply.threadId = :id', { id: args.threadId })
      .orderBy('reply.when', 'DESC')
      .take(1)
      .leftJoinAndSelect('reply.author', 'author')
      .getManyAndCount()
  }

  async update(data: UpdateReplyInput, actor: AuthUser): Promise<Reply> {
    const { id, content } = data
    const reply = await this.findOneById(id)
    if (!reply) {
      throw new NotFoundException(`Reply ${id} not found`)
    }
    this.assertCanModify(reply, actor)
    reply.content = content
    return this.repliesRepository.save(reply)
  }

  async delete(id: string, actor: AuthUser): Promise<Reply> {
    const reply = await this.findOneById(id)
    if (!reply) {
      throw new NotFoundException(`Reply ${id} not found`)
    }
    this.assertCanModify(reply, actor)
    // remove() nulls the entity's id; keep a copy for the return value
    const deleted = { ...reply }
    await this.repliesRepository.remove(reply)
    return deleted
  }

  private assertCanModify(reply: Reply, actor: AuthUser): void {
    if (actor.roles.includes(ROLE_ADMIN)) {
      return
    }
    if (reply.author?.code === actor.sub) {
      return
    }
    throw new ForbiddenException('You can only modify your own replies')
  }
}
