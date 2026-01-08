import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { TechCategoryTabs } from './tech-category-tabs'
import type { TechCategory } from '../types'

describe('TechCategoryTabs', () => {
  const mockCategorySelectionCount: Record<TechCategory, number> = {
    frontend: 2,
    backend: 0,
    database: 1,
    styling: 0,
    testing: 3,
    tools: 0,
  }

  it('renders all 6 category tabs', () => {
    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={() => {}}
        categorySelectionCount={mockCategorySelectionCount}
      />
    )

    expect(screen.getByRole('button', { name: /Frontend/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Backend/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Database/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Styling/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Testing/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Tools/i })).toBeInTheDocument()
  })

  it('active category has border-black class', () => {
    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={() => {}}
        categorySelectionCount={mockCategorySelectionCount}
      />
    )

    const frontendTab = screen.getByRole('button', { name: /Frontend/i })
    expect(frontendTab).toHaveClass('border-black')
  })

  it('inactive category has border-transparent class', () => {
    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={() => {}}
        categorySelectionCount={mockCategorySelectionCount}
      />
    )

    const backendTab = screen.getByRole('button', { name: /Backend/i })
    expect(backendTab).toHaveClass('border-transparent')
  })

  it('calls onCategoryChange when tab clicked', async () => {
    const onCategoryChange = vi.fn()
    const user = userEvent.setup()

    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={onCategoryChange}
        categorySelectionCount={mockCategorySelectionCount}
      />
    )

    const backendTab = screen.getByRole('button', { name: /Backend/i })
    await user.click(backendTab)

    expect(onCategoryChange).toHaveBeenCalledWith('backend')
  })

  it('shows selection count badge when count > 0', () => {
    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={() => {}}
        categorySelectionCount={mockCategorySelectionCount}
      />
    )

    // Frontend has 2 selections
    expect(screen.getByText('2')).toBeInTheDocument()

    // Database has 1 selection
    expect(screen.getByText('1')).toBeInTheDocument()

    // Testing has 3 selections
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('does not show badge when count === 0', () => {
    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={() => {}}
        categorySelectionCount={mockCategorySelectionCount}
      />
    )

    // Backend, Styling, and Tools have 0 selections
    // Should not show "0" badge
    const backendTab = screen.getByRole('button', { name: /Backend/i })
    expect(backendTab.textContent).not.toContain('0')
  })

  it('badge shows correct number', () => {
    const counts: Record<TechCategory, number> = {
      frontend: 5,
      backend: 0,
      database: 0,
      styling: 0,
      testing: 0,
      tools: 0,
    }

    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={() => {}}
        categorySelectionCount={counts}
      />
    )

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('displays category icons', () => {
    render(
      <TechCategoryTabs
        activeCategory="frontend"
        onCategoryChange={() => {}}
        categorySelectionCount={mockCategorySelectionCount}
      />
    )

    // Check that icons are rendered (emojis from TECH_CATEGORIES)
    expect(screen.getByText('🖥️')).toBeInTheDocument() // Frontend
    expect(screen.getByText('⚙️')).toBeInTheDocument() // Backend
    expect(screen.getByText('💾')).toBeInTheDocument() // Database
    expect(screen.getByText('🎨')).toBeInTheDocument() // Styling
    expect(screen.getByText('🧪')).toBeInTheDocument() // Testing
    expect(screen.getByText('🔧')).toBeInTheDocument() // Tools
  })
})
