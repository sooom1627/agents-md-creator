import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { TechCard } from './tech-card'
import type { Tech } from '../types'

const mockTech: Tech = {
  id: 'nextjs',
  name: 'Next.js',
  icon: '▲',
  description: 'React × SSR/SSG の統合フレームワーク',
  category: 'frontend',
  isPopular: true,
  hasVersions: true,
  versions: ['16', '15', '14'],
  tooltip: {
    whenToUse: [
      'SEOが重要なサイト（ブログ、EC）',
      'サーバーとクライアントを統合管理したい',
    ],
    agentsMdExample: 'Next.js 15 App Router with React Server Components',
  },
}

const mockTechWithoutVersions: Tech = {
  id: 'vite',
  name: 'Vite',
  icon: '⚡',
  description: '高速ビルドツール',
  category: 'frontend',
  isPopular: true,
  hasVersions: false,
  tooltip: {
    whenToUse: ['開発時の高速なHMRが欲しい', 'モダンなビルド環境'],
    agentsMdExample: 'Vite for fast development',
  },
}

describe('TechCard', () => {
  it('renders tech information', () => {
    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    expect(screen.getByText('▲')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('React × SSR/SSG の統合フレームワーク')).toBeInTheDocument()
  })

  it('shows selected state with border and ring', () => {
    render(
      <TechCard
        tech={mockTech}
        isSelected={true}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const container = screen.getByRole('button').parentElement
    expect(container).toHaveClass('border-black')
    expect(container).toHaveClass('ring-2')
  })

  it('shows unselected state', () => {
    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const container = screen.getByRole('button').parentElement
    expect(container).toHaveClass('border-zinc-200')
    expect(container).not.toHaveClass('ring-2')
  })

  it('calls onToggle when card clicked', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()

    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={onToggle}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(onToggle).toHaveBeenCalledWith('nextjs')
  })

  it('shows version dropdown when selected and hasVersions is true', () => {
    render(
      <TechCard
        tech={mockTech}
        isSelected={true}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
  })

  it('does not show version dropdown when not selected', () => {
    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const select = screen.queryByRole('combobox')
    expect(select).not.toBeInTheDocument()
  })

  it('does not show version dropdown when hasVersions is false', () => {
    render(
      <TechCard
        tech={mockTechWithoutVersions}
        isSelected={true}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const select = screen.queryByRole('combobox')
    expect(select).not.toBeInTheDocument()
  })

  it('version dropdown has correct options', () => {
    render(
      <TechCard
        tech={mockTech}
        isSelected={true}
        selectedVersion="15"
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('15')

    const options = Array.from(select.options).map((opt) => opt.value)
    expect(options).toContain('')
    expect(options).toContain('16')
    expect(options).toContain('15')
    expect(options).toContain('14')
  })

  it('calls onVersionChange when version selected', async () => {
    const onVersionChange = vi.fn()
    const user = userEvent.setup()

    render(
      <TechCard
        tech={mockTech}
        isSelected={true}
        onToggle={() => {}}
        onVersionChange={onVersionChange}
        index={0}
      />
    )

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '16')

    expect(onVersionChange).toHaveBeenCalledWith('nextjs', '16')
  })

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup()

    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const button = screen.getByRole('button')
    await user.hover(button)

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
    expect(screen.getByText(/SEOが重要なサイト/)).toBeInTheDocument()
    expect(screen.getByText(/Next.js 15 App Router/)).toBeInTheDocument()
  })

  it('shows popular badge when isPopular is true', () => {
    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    expect(screen.getByText('⭐')).toBeInTheDocument()
  })

  it('does not show popular badge when isPopular is false', () => {
    const techWithoutPopular = { ...mockTech, isPopular: false }

    render(
      <TechCard
        tech={techWithoutPopular}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    expect(screen.queryByText('⭐')).not.toBeInTheDocument()
  })

  it('has proper ARIA attribute aria-pressed', () => {
    const { rerender } = render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'false')

    rerender(
      <TechCard
        tech={mockTech}
        isSelected={true}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('positions tooltip on right for rightmost column in lg grid (index % 3 === 2)', async () => {
    const user = userEvent.setup()

    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={2}
      />
    )

    const button = screen.getByRole('button')
    await user.hover(button)

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('lg:right-0')
    expect(tooltip).toHaveClass('lg:left-auto')
  })

  it('positions tooltip on left for left/center columns in lg grid (index % 3 !== 2)', async () => {
    const user = userEvent.setup()

    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={0}
      />
    )

    const button = screen.getByRole('button')
    await user.hover(button)

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).not.toHaveClass('lg:right-0')
  })

  it('positions tooltip above for bottom row in lg grid (index > 2)', async () => {
    const user = userEvent.setup()

    render(
      <TechCard
        tech={mockTech}
        isSelected={false}
        onToggle={() => {}}
        onVersionChange={() => {}}
        index={3}
      />
    )

    const button = screen.getByRole('button')
    await user.hover(button)

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('lg:top-auto')
    expect(tooltip).toHaveClass('lg:bottom-[calc(100%+0.5rem)]')
  })
})
