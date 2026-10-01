import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Forum } from './entity'
import { ForumsArgs } from './dto/forums.args'
import { NewForumInput } from './dto/new-forum.input'

@Injectable()
export class ForumsService {
  constructor(
    @InjectRepository(Forum)
    private forumsRepository: Repository<Forum>,
  ) {}

  async create(data: NewForumInput): Promise<Forum> {
    const forum = this.forumsRepository.create(data)
    return this.forumsRepository.save(forum)
  }

  async findOneById(id: string): Promise<Forum> {
    return this.forumsRepository.findOneBy({ id })
  }

  async findAll(_args: ForumsArgs): Promise<Forum[]> {
    return this.forumsRepository.find()
  }
}
