import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { TechSelector } from './tech-selector'
import type { TechStackData } from '../types'

const mockTechStack: TechStackData = {
  frontend: [{ id: 'nextjs', version: '15' }],
  backend: [],
  database: [{ id: 'postgresql' }],
  styling: [],
  testing: [],
  tools: [{ id: 'typescript', version: '5' }],
  other: '',
}

describe('TechSelector', () => {
  it('renders TechCategoryTabs', () => {
    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /Frontend/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Backend/i })).toBeInTheDocument()
  })

  it('renders tech cards for active category (default: frontend)', () => {
    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    // Should show frontend techs by default
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Vite')).toBeInTheDocument()
  })

  it('switches to backend category when tab clicked', async () => {
    const user = userEvent.setup()

    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    const backendTab = screen.getByRole('button', { name: /Backend/i })
    await user.click(backendTab)

    // Should show backend techs (BaaS)
    expect(screen.getByText('Supabase')).toBeInTheDocument()
  })

  it('shows correct total selection count', () => {
    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    // 1 frontend + 1 database + 1 tools = 3 total
    expect(screen.getByText('3 個')).toBeInTheDocument()
  })

  it('passes techStack data to children correctly', () => {
    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    // Next.js should be selected (has version 15)
    const nextjsCard = screen.getByText('Next.js').closest('div')
    expect(nextjsCard).toHaveClass('border-black')
  })

  it('calls onToggleTech with correct category and techId', async () => {
    const onToggleTech = vi.fn()
    const user = userEvent.setup()

    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={onToggleTech}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    // Click on Vite card (in frontend category)
    const viteButton = screen.getByText('Vite')
    await user.click(viteButton)

    expect(onToggleTech).toHaveBeenCalledWith('frontend', 'vite')
  })

  it('calls onVersionChange with correct parameters', async () => {
    const onVersionChange = vi.fn()
    const user = userEvent.setup()

    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={onVersionChange}
        onOtherChange={() => {}}
      />
    )

    // Next.js is selected, so version dropdown should be visible
    const versionSelect = screen.getByDisplayValue('15')
    await user.selectOptions(versionSelect, '16')

    expect(onVersionChange).toHaveBeenCalledWith('frontend', 'nextjs', '16')
  })

  it('renders OtherTechInput with value', () => {
    const techStackWithOther = { ...mockTechStack, other: 'Zod, React Hook Form' }

    render(
      <TechSelector
        techStack={techStackWithOther}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /リストにない技術を追加/i })).toBeInTheDocument()
  })

  it('renders TechStackTips', () => {
    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /Tech Stack の書き方のコツ/i })).toBeInTheDocument()
  })

  it('shows info box with recommendation text', () => {
    render(
      <TechSelector
        techStack={mockTechStack}
        onToggleTech={() => {}}
        onVersionChange={() => {}}
        onOtherChange={() => {}}
      />
    )

    expect(screen.getByText(/5〜8個を推奨/i)).toBeInTheDocument()
  })
})
