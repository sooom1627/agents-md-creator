import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { RoleCard } from './role-card'
import type { AIRole } from '../types'

const mockRole: AIRole = {
  id: 'fullstack',
  icon: '🎯',
  title: 'フルスタック重視',
  description: 'フロントエンドからバックエンドまで一貫した設計',
  tooltip: {
    whenToUse: [
      'フロント/バック両方を触るプロジェクト',
      'APIとUIの整合性を保ちたい',
    ],
    generatedExample: 'You are a senior full-stack engineer...',
  },
}

describe('RoleCard', () => {
  it('renders role information', () => {
    render(<RoleCard role={mockRole} isSelected={false} onToggle={() => {}} />)

    expect(screen.getByText('🎯')).toBeInTheDocument()
    expect(screen.getByText('フルスタック重視')).toBeInTheDocument()
    expect(
      screen.getByText('フロントエンドからバックエンドまで一貫した設計')
    ).toBeInTheDocument()
  })

  it('shows selected state', () => {
    render(<RoleCard role={mockRole} isSelected={true} onToggle={() => {}} />)

    const card = screen.getByRole('button')
    expect(card).toHaveClass('ring-2')
  })

  it('shows unselected state', () => {
    render(<RoleCard role={mockRole} isSelected={false} onToggle={() => {}} />)

    const card = screen.getByRole('button')
    expect(card).not.toHaveClass('ring-2')
  })

  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<RoleCard role={mockRole} isSelected={false} onToggle={onToggle} />)

    const card = screen.getByRole('button')
    await user.click(card)

    expect(onToggle).toHaveBeenCalledWith('fullstack')
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()
    render(<RoleCard role={mockRole} isSelected={false} onToggle={() => {}} />)

    const card = screen.getByRole('button')
    await user.hover(card)

    expect(
      screen.getByText(/フロント\/バック両方を触るプロジェクト/)
    ).toBeInTheDocument()
  })
})
