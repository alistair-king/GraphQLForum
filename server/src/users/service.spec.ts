import { describe, expect, it, vi } from 'vitest'

import { UsersService } from './service'
import { User } from './entity'

const makeRepo = () => ({
  findOneBy: vi.fn(),
  find: vi.fn(),
  save: vi.fn(async (user: User) => user),
})

describe('UsersService', () => {
  const authUser = {
    sub: 'auth0|123456',
    email: 'alistair@example.com',
    name: 'Alistair',
    picture: 'https://example.com/pic.png',
    roles: [],
  }

  it('creates a user on first login and counts the login', async () => {
    const repo = makeRepo()
    repo.findOneBy.mockResolvedValue(undefined)
    const service = new UsersService(repo as any)

    const user = await service.login(authUser)

    expect(user.code).toBe('auth0|123456')
    expect(user.email).toBe('alistair@example.com')
    expect(user.logins).toBe(1)
    expect(user.lastLogin).toBeInstanceOf(Date)
    expect(repo.save).toHaveBeenCalledTimes(1)
  })

  it('updates profile and increments logins for an existing user', async () => {
    const repo = makeRepo()
    repo.findOneBy.mockResolvedValue({
      id: 'existing-id',
      code: 'auth0|123456',
      email: 'old@example.com',
      name: 'Old Name',
      picture: '',
      logins: 4,
      lastLogin: new Date('2020-01-01'),
    })
    const service = new UsersService(repo as any)

    const user = await service.login(authUser)

    expect(user.id).toBe('existing-id')
    expect(user.name).toBe('Alistair')
    expect(user.logins).toBe(5)
  })

  it('me() creates the user without counting a login', async () => {
    const repo = makeRepo()
    repo.findOneBy.mockResolvedValue(undefined)
    const service = new UsersService(repo as any)

    const user = await service.me(authUser)

    expect(user.logins).toBe(0)
    expect(user.lastLogin).toBeUndefined()
  })

  it('findAll honours skip/take', async () => {
    const repo = makeRepo()
    repo.find.mockResolvedValue([])
    const service = new UsersService(repo as any)

    await service.findAll({ skip: 10, take: 5 })

    expect(repo.find).toHaveBeenCalledWith({ skip: 10, take: 5 })
  })
})
