import { Injectable } from '@nestjs/common'
import { NewForumInput } from './dto/new-forum.input'
import { ForumsArgs } from './dto/forums.args'
import { Forum } from './models/forum.model'

@Injectable()
export class ForumsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewForumInput): Promise<Forum> {
    return {} as any
  }

  async findOneById(id: string): Promise<Forum> {
    return {} as any
  }

  async findAll(forumsArgs: ForumsArgs): Promise<Forum[]> {
    return [] as Forum[]
  }

  async remove(id: string): Promise<boolean> {
    return true
  }
}
