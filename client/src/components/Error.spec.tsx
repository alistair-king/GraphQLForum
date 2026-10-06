import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Error } from './Error'

describe('Error', () => {
  it('shows the code and message', () => {
    render(<Error code={404} message="Page not found!" />)
    expect(screen.getByText('404')).toBeDefined()
    expect(screen.getByText('Page not found!')).toBeDefined()
  })

  it('defaults to code 500', () => {
    render(<Error />)
    expect(screen.getByText('500')).toBeDefined()
  })
})
