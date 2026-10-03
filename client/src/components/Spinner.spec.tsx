import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders without crashing (guards against CJS interop breakage)', () => {
    const { container } = render(<Spinner className="test-class" />)
    expect(container.firstChild).toBeDefined()
  })
})
