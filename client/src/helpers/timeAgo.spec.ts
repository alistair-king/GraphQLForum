import { describe, expect, it } from 'vitest'

import { timeAgo } from './timeAgo'

describe('timeAgo', () => {
  it('returns empty string for undefined', () => {
    expect(timeAgo(undefined)).toBe('')
  })

  it('formats seconds', () => {
    expect(timeAgo(Date.now() - 5_000)).toBe('5 seconds ago')
  })

  it('formats hours', () => {
    expect(timeAgo(Date.now() - 2 * 60 * 60 * 1000)).toBe('2 hours ago')
  })

  it('formats days', () => {
    expect(timeAgo(Date.now() - 3 * 24 * 60 * 60 * 1000)).toBe('3 days ago')
  })

  it('formats months', () => {
    expect(timeAgo(Date.now() - 100 * 24 * 60 * 60 * 1000)).toBe('3 months ago')
  })

  it('formats years', () => {
    expect(timeAgo(Date.now() - 800 * 24 * 60 * 60 * 1000)).toBe('2 years ago')
  })

  it('accepts Date objects', () => {
    expect(timeAgo(new Date(Date.now() - 2 * 60 * 60 * 1000))).toBe('2 hours ago')
  })
})
