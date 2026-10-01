import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { AppModule } from '../src/app.module'

// The smoke tests need a reachable MySQL instance (see .env.example /
// docker-compose.yml); they are skipped when none is configured.
const describeIfDb = process.env.DB_DATABASE ? describe : describe.skip

describeIfDb('GraphQL API (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    await app.init()
  })

  afterAll(async () => {
    await app?.close()
  })

  const gql = (query: string, variables?: Record<string, unknown>) =>
    request(app.getHttpServer())
      .post('/graphql')
      .send({ query, variables })

  it('lists forums', async () => {
    const response = await gql('{ forums { id name description } }')
    expect(response.status).toBe(200)
    expect(response.body.errors).toBeUndefined()
    expect(Array.isArray(response.body.data.forums)).toBe(true)
  })

  it('requires authentication for mutations', async () => {
    const response = await gql(
      `mutation ($data: NewForumInput!) {
        addForum(newForumData: $data) { id }
      }`,
      { data: { name: 'e2e forum', description: 'e2e' } },
    )
    expect(response.status).toBe(200)
    expect(response.body.data).toBeNull()
    expect(response.body.errors).toBeDefined()
  })

  it('requires authentication for the me query', async () => {
    const response = await gql('{ me { id name } }')
    expect(response.status).toBe(200)
    expect(response.body.data).toBeNull()
    expect(response.body.errors).toBeDefined()
  })

  it('returns an error for a missing thread', async () => {
    const response = await gql(
      '{ thread(id: "00000000-0000-0000-0000-000000000000") { id } }',
    )
    expect(response.status).toBe(200)
    expect(response.body.data).toBeNull()
    expect(response.body.errors).toBeDefined()
  })
})
