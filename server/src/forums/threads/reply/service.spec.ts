import { describe, expect, it, vi } from 'vitest'

import { ForbiddenException } from '@nestjs/common'

import { RepliesService } from './service'
import { Reply } from './entity'
import { Thread } from '../entity'
import { User } from '../../../users/entity'
import { UsersService } from '../../../users/service'
import { Repository } from 'typeorm'

const makeRepos = () => ({
  repliesRepository: {
    create: vi.fn(),
    save: vi.fn(async (reply: Reply) => reply),
    // mimic TypeORM: remove() detaches the entity and nulls its id
    remove: vi.fn(async (reply: Reply) => {
      reply.id = undefined as unknown as string
      return reply
    }),
    findOne: vi.fn(),
    createQueryBuilder: vi.fn(),
  },
  threadsRepository: {
    findOneBy: vi.fn(),
    save: vi.fn(async (thread: Thread) => thread),
  },
})

const makeUser = (overrides: Partial<User> = {}): User =>
  ({
    id: 'author-1',
    code: 'auth0|author',
    email: '',
    name: 'Author',
    picture: '',
    logins: 0,
    ...overrides,
  }) as User

const makeReply = (author: User): Reply =>
  ({
    id: 'reply-1',
    when: new Date(),
    content: '<p>hello</p>',
    author,
  }) as Reply

const authorActor = { sub: 'auth0|author', roles: [] }
const strangerActor = { sub: 'auth0|stranger', roles: [] }
const adminActor = { sub: 'auth0|admin', roles: ['Administrator'] }

describe('RepliesService authorization', () => {
  it('lets the author update their own reply', async () => {
    const repos = makeRepos()
    const service = new RepliesService(
      repos.repliesRepository as unknown as Repository<Reply>,
      repos.threadsRepository as unknown as Repository<Thread>,
      {} as UsersService,
    )
    const author = makeUser()
    vi.spyOn(service, 'findOneById').mockResolvedValue(makeReply(author))

    const updated = await service.update(
      { id: 'reply-1', content: '<p>edited</p>' },
      authorActor,
    )

    expect(updated.content).toBe('<p>edited</p>')
    expect(repos.repliesRepository.save).toHaveBeenCalled()
  })

  it('blocks a stranger from updating someone else\'s reply', async () => {
    const repos = makeRepos()
    const service = new RepliesService(
      repos.repliesRepository as unknown as Repository<Reply>,
      repos.threadsRepository as unknown as Repository<Thread>,
      {} as UsersService,
    )
    vi.spyOn(service, 'findOneById').mockResolvedValue(makeReply(makeUser()))

    await expect(
      service.update({ id: 'reply-1', content: 'x' }, strangerActor),
    ).rejects.toThrow(ForbiddenException)
    expect(repos.repliesRepository.save).not.toHaveBeenCalled()
  })

  it('lets an administrator update anyone\'s reply', async () => {
    const repos = makeRepos()
    const service = new RepliesService(
      repos.repliesRepository as unknown as Repository<Reply>,
      repos.threadsRepository as unknown as Repository<Thread>,
      {} as UsersService,
    )
    vi.spyOn(service, 'findOneById').mockResolvedValue(makeReply(makeUser()))

    await expect(
      service.update({ id: 'reply-1', content: 'x' }, adminActor),
    ).resolves.toBeDefined()
  })

  it('lets the author delete their own reply', async () => {
    const repos = makeRepos()
    const service = new RepliesService(
      repos.repliesRepository as unknown as Repository<Reply>,
      repos.threadsRepository as unknown as Repository<Thread>,
      {} as UsersService,
    )
    const author = makeUser()
    const reply = makeReply(author)
    vi.spyOn(service, 'findOneById').mockResolvedValue(reply)

    const deleted = await service.delete('reply-1', authorActor)

    expect(deleted.id).toBe('reply-1')
    expect(repos.repliesRepository.remove).toHaveBeenCalledWith(reply)
  })

  it('blocks a stranger from deleting someone else\'s reply', async () => {
    const repos = makeRepos()
    const service = new RepliesService(
      repos.repliesRepository as unknown as Repository<Reply>,
      repos.threadsRepository as unknown as Repository<Thread>,
      {} as UsersService,
    )
    vi.spyOn(service, 'findOneById').mockResolvedValue(makeReply(makeUser()))

    await expect(
      service.delete('reply-1', strangerActor),
    ).rejects.toThrow(ForbiddenException)
    expect(repos.repliesRepository.remove).not.toHaveBeenCalled()
  })
})

describe('RepliesService.create', () => {
  it('creates a reply and bumps thread activity', async () => {
    const repos = makeRepos()
    const service = new RepliesService(
      repos.repliesRepository as unknown as Repository<Reply>,
      repos.threadsRepository as unknown as Repository<Thread>,
      {} as UsersService,
    )
    const author = makeUser()
    const thread = { id: 'thread-1', userLastReply: null, whenLastActivity: new Date() } as Thread
    repos.threadsRepository.findOneBy.mockResolvedValue(thread)
    repos.repliesRepository.create.mockReturnValue({
      id: 'new-reply',
    } as Reply)

    await service.create({ threadId: 'thread-1', content: '<p>hi</p>' }, author)

    expect(repos.repliesRepository.save).toHaveBeenCalled()
    expect(thread.userLastReply).toBe(author)
    expect(repos.threadsRepository.save).toHaveBeenCalledWith(thread)
  })

  it('rejects replies to unknown threads', async () => {
    const repos = makeRepos()
    const service = new RepliesService(
      repos.repliesRepository as unknown as Repository<Reply>,
      repos.threadsRepository as unknown as Repository<Thread>,
      {} as UsersService,
    )
    repos.threadsRepository.findOneBy.mockResolvedValue(undefined)

    await expect(
      service.create(
        { threadId: 'nope', content: 'x' },
        makeUser(),
      ),
    ).rejects.toThrow()
  })
})
