import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { TechStackTips } from './tech-stack-tips'

describe('TechStackTips', () => {
  it('is collapsed by default', () => {
    render(<TechStackTips />)

    expect(screen.queryByText(/コア技術は5〜8個/i)).not.toBeInTheDocument()
  })

  it('expands when clicked', async () => {
    const user = userEvent.setup()
    render(<TechStackTips />)

    const button = screen.getByRole('button', { name: /Tech Stack の書き方のコツ/i })
    await user.click(button)

    expect(screen.getByText(/コア技術は5〜8個/i)).toBeInTheDocument()
  })

  it('shows good example when expanded', async () => {
    const user = userEvent.setup()
    render(<TechStackTips />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/✅ 良い例:/i)).toBeInTheDocument()
    expect(screen.getByText(/Next.js 15 \(App Router\)/i)).toBeInTheDocument()
  })

  it('shows bad example when expanded', async () => {
    const user = userEvent.setup()
    render(<TechStackTips />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/❌ 悪い例:/i)).toBeInTheDocument()
  })

  it('shows recommendations list when expanded', async () => {
    const user = userEvent.setup()
    render(<TechStackTips />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText(/推奨:/i)).toBeInTheDocument()
    expect(screen.getByText(/コア技術は5〜8個に絞る/i)).toBeInTheDocument()
  })
})
