/// <reference types="@testing-library/jest-dom" />
import { render } from '@testing-library/react'
import { MemoryRouter, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('shows loading spinner when loading', () => {
    const { getByRole, getByText, getByTestId } = render(<Button loading>Loading</Button>)
    expect(getByRole('button')).toBeDisabled()
    expect(getByText('Loading')).toBeInTheDocument()
    expect(getByTestId('loader')).toBeInTheDocument()
  })

  const { getByRole, getByText } = render(
    <MemoryRouter>
      <Button>
        <Link to='/test'>Go to test</Link>
      </Button>
    </MemoryRouter>
  )
  expect(getByRole('link')).toHaveAttribute('href', '/test')
  expect(getByText('Go to test')).toBeInTheDocument()
})
