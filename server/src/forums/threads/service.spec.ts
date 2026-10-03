import { describe, expect, it, vi } from 'vitest'

import { ForbiddenException } from '@nestjs/common'

import { ThreadsService } from './service'
import { Thread } from './entity'
import { Reply } from './reply/entity'
import { User } from '../../users/entity'
import { Repository } from 'typeorm'
import { Forum } from '../entity'

const makeRepos = () => ({
  threadsRepository: {
    create: vi.fn(),
    save: vi.fn(async (thread: Thread) => thread),
    // mimic TypeORM: remove() detaches the entity and nulls its id
    remove: vi.fn(async (thread: Thread) => {
      thread.id = undefined as unknown as string
      return thread
    }),
    findOne: vi.fn(),
    createQueryBuilder: vi.fn(),
  },
  forumsRepository: {
    findOneBy: vi.fn(),
  },
  usersRepository: {
    findOneBy: vi.fn(),
  },
  repliesRepository: {
    delete: vi.fn(async () => ({})),
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

const makeThread = (author: User): Thread =>
  ({
    id: 'thread-1',
    when: new Date(),
    title: 'A thread',
    content: '<p>body</p>',
    author,
  }) as Thread

const authorActor = { sub: 'auth0|author', roles: [] }
const strangerActor = { sub: 'auth0|stranger', roles: [] }
const adminActor = { sub: 'auth0|admin', roles: ['Administrator'] }

describe('ThreadsService authorization', () => {
  it('lets the author update their own thread', async () => {
    const repos = makeRepos()
    const service = new ThreadsService(
      repos.threadsRepository as unknown as Repository<Thread>,
      repos.forumsRepository as unknown as Repository<Forum>,
      repos.usersRepository as unknown as Repository<User>,
      repos.repliesRepository as unknown as Repository<Reply>,
    )
    const author = makeUser()
    vi.spyOn(service, 'findOneById').mockResolvedValue(makeThread(author))

    const updated = await service.update(
      { id: 'thread-1', title: 'New title', content: '<p>new</p>' },
      authorActor,
    )

    expect(updated.title).toBe('New title')
    expect(repos.threadsRepository.save).toHaveBeenCalled()
  })

  it('blocks a stranger from updating someone else\'s thread', async () => {
    const repos = makeRepos()
    const service = new ThreadsService(
      repos.threadsRepository as unknown as Repository<Thread>,
      repos.forumsRepository as unknown as Repository<Forum>,
      repos.usersRepository as unknown as Repository<User>,
      repos.repliesRepository as unknown as Repository<Reply>,
    )
    vi.spyOn(service, 'findOneById').mockResolvedValue(makeThread(makeUser()))

    await expect(
      service.update(
        { id: 'thread-1', title: 'hacked', content: 'x' },
        strangerActor,
      ),
    ).rejects.toThrow(ForbiddenException)
    expect(repos.threadsRepository.save).not.toHaveBeenCalled()
  })

  it('lets an administrator delete any thread', async () => {
    const repos = makeRepos()
    const service = new ThreadsService(
      repos.threadsRepository as unknown as Repository<Thread>,
      repos.forumsRepository as unknown as Repository<Forum>,
      repos.usersRepository as unknown as Repository<User>,
      repos.repliesRepository as unknown as Repository<Reply>,
    )
    const thread = makeThread(makeUser())
    vi.spyOn(service, 'findOneById').mockResolvedValue(thread)

    const deleted = await service.delete('thread-1', adminActor)

    expect(deleted.id).toBe('thread-1')
    expect(repos.threadsRepository.remove).toHaveBeenCalledWith(thread)
  })

  it('blocks a stranger from deleting someone else\'s thread', async () => {
    const repos = makeRepos()
    const service = new ThreadsService(
      repos.threadsRepository as unknown as Repository<Thread>,
      repos.forumsRepository as unknown as Repository<Forum>,
      repos.usersRepository as unknown as Repository<User>,
      repos.repliesRepository as unknown as Repository<Reply>,
    )
    vi.spyOn(service, 'findOneById').mockResolvedValue(makeThread(makeUser()))

    await expect(
      service.delete('thread-1', strangerActor),
    ).rejects.toThrow(ForbiddenException)
    expect(repos.threadsRepository.remove).not.toHaveBeenCalled()
  })
})

describe('ThreadsService.create', () => {
  it('creates a thread with author, forum and activity timestamp', async () => {
    const repos = makeRepos()
    const service = new ThreadsService(
      repos.threadsRepository as unknown as Repository<Thread>,
      repos.forumsRepository as unknown as Repository<Forum>,
      repos.usersRepository as unknown as Repository<User>,
      repos.repliesRepository as unknown as Repository<Reply>,
    )
    const author = makeUser()
    const forum = { id: 'forum-1' }
    repos.forumsRepository.findOneBy.mockResolvedValue(forum)
    repos.threadsRepository.create.mockImplementation(props => props as Thread)

    const thread = await service.create(
      { forumId: 'forum-1', title: 'Hello', content: '<p>world</p>' },
      author,
    )

    expect(thread.title).toBe('Hello')
    expect(thread.forum).toBe(forum)
    expect(thread.author).toBe(author)
    expect(thread.whenLastActivity).toBeInstanceOf(Date)
    expect(thread.whenLastActivity).toBe(thread.when)
  })

  it('rejects threads in unknown forums', async () => {
    const repos = makeRepos()
    const service = new ThreadsService(
      repos.threadsRepository as unknown as Repository<Thread>,
      repos.forumsRepository as unknown as Repository<Forum>,
      repos.usersRepository as unknown as Repository<User>,
      repos.repliesRepository as unknown as Repository<Reply>,
    )
    repos.forumsRepository.findOneBy.mockResolvedValue(undefined)

    await expect(
      service.create(
        { forumId: 'nope', title: 'x', content: 'y' },
        makeUser(),
      ),
    ).rejects.toThrow()
  })
})
