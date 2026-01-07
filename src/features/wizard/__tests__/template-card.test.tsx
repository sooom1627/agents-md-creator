import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { TemplateCard } from '../components/template-card'
import type { Template } from '../types'

const mockTemplate: Template = {
  id: 'test-template',
  name: 'Test Template',
  description: 'This is a test template',
  icon: '🧪',
  popular: true,
  techStack: ['Next.js', 'TypeScript', 'Tailwind'],
}

describe('TemplateCard', () => {
  it('renders template name', () => {
    render(<TemplateCard template={mockTemplate} />)
    expect(screen.getByText('Test Template')).toBeInTheDocument()
  })

  it('renders template description', () => {
    render(<TemplateCard template={mockTemplate} />)
    expect(screen.getByText('This is a test template')).toBeInTheDocument()
  })

  it('renders template icon', () => {
    render(<TemplateCard template={mockTemplate} />)
    expect(screen.getByText('🧪')).toBeInTheDocument()
  })

  it('displays popular badge when template is popular', () => {
    render(<TemplateCard template={mockTemplate} />)
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('does not display popular badge when template is not popular', () => {
    const nonPopularTemplate = { ...mockTemplate, popular: false }
    render(<TemplateCard template={nonPopularTemplate} />)
    expect(screen.queryByText('Popular')).not.toBeInTheDocument()
  })

  it('displays tech stack on hover', async () => {
    const user = userEvent.setup()
    render(<TemplateCard template={mockTemplate} />)

    const card = screen.getByRole('button')
    await user.hover(card)

    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<TemplateCard template={mockTemplate} onClick={handleClick} />)

    const card = screen.getByRole('button')
    await user.click(card)

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(mockTemplate.id)
  })

  it('shows selected state when isSelected is true', () => {
    render(<TemplateCard template={mockTemplate} isSelected={true} />)

    const card = screen.getByRole('button')
    expect(card).toHaveClass('ring-2')
  })
})
