import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { Home } from './Home'
import { IForum } from '../types'

const forums: IForum[] = [
  {
    id: 'f1',
    name: 'General Discussion',
    description: 'Talk about anything',
    threads: { items: [], count: 4 },
  },
  {
    id: 'f2',
    name: 'Photo Critique',
    description: 'Share your shots',
    threads: { items: [], count: 2 },
  },
]

describe('Home', () => {
  it('renders the table headings', () => {
    render(
      <MemoryRouter>
        <Home forums={forums} />
      </MemoryRouter>
    )
    expect(screen.getByText('Forum')).toBeDefined()
    expect(screen.getByText('Last Post')).toBeDefined()
  })

  it('lists every forum name and description', () => {
    render(
      <MemoryRouter>
        <Home forums={forums} />
      </MemoryRouter>
    )
    expect(screen.getByText('General Discussion')).toBeDefined()
    expect(screen.getByText('Talk about anything')).toBeDefined()
    expect(screen.getByText('Photo Critique')).toBeDefined()
  })

  it('links each forum to its url', () => {
    render(
      <MemoryRouter>
        <Home forums={forums} />
      </MemoryRouter>
    )
    const link = screen.getByText('General Discussion').closest('a')
    expect(link?.getAttribute('href')).toBe('/f1')
  })
})
