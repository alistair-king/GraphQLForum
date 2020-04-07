import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { NewForumInput } from './dto/new-forum.input'
import { ForumsArgs } from './dto/forums.args'
import { Forum } from './model'

import { Thread } from './threads/model'

@Injectable()
export class ForumsService {
  constructor(
    @Inject('FORUM_REPOSITORY')
    private forumsRepository: Repository<Forum>
  ) {}

  async create(data: NewForumInput): Promise<Forum> {
    return {} as any
  }

  async findOneById(id: string): Promise<Forum> {
    return this.forumsRepository.findOne(id)
  }

  async findAll(forumsArgs: ForumsArgs): Promise<Forum[]> {
    return this.forumsRepository.find()
  }

  // async remove(id: string): Promise<boolean> {
  //   return true
  // }
}
