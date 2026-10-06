import { ValidationPipe } from '@nestjs/common'
import { describe, expect, it } from 'vitest'

import { NewThreadInput } from './new-thread.input'

// mirrors main.ts: whitelist strips properties that lack validation
// decorators, so every input field must carry one
const pipe = new ValidationPipe({
  transform: true,
  whitelist: true,
})

describe('NewThreadInput whitelist handling', () => {
  it('keeps forumId through the whitelist (regression: it used to be stripped)', async () => {
    const result = await pipe.transform(
      { title: 'Hello', content: '<p>world</p>', forumId: 'forum-1' },
      { type: 'body', metatype: NewThreadInput },
    )
    expect((result as NewThreadInput).forumId).toBe('forum-1')
    expect((result as NewThreadInput).title).toBe('Hello')
  })

  it('rejects a missing forumId', async () => {
    await expect(
      pipe.transform(
        { title: 'Hello', content: '<p>world</p>' },
        { type: 'body', metatype: NewThreadInput },
      ),
    ).rejects.toThrow()
  })
})
