import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import TemplatePage from '../template/page'

describe('Template Selection Page', () => {
  it('renders the page heading', () => {
    render(<TemplatePage />)
    const heading = screen.getByRole('heading', {
      name: /あなたのプロジェクトに近いものは？/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders instruction text', () => {
    render(<TemplatePage />)
    const instruction = screen.getByText(/後で細かく調整できます/i)
    expect(instruction).toBeInTheDocument()
  })

  it('renders skip option link', () => {
    render(<TemplatePage />)
    const skipLink = screen.getByRole('link', {
      name: /テンプレートを使わず、空白から作成する/i,
    })
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '/wizard')
  })

  it('renders all template cards', () => {
    render(<TemplatePage />)
    expect(screen.getByText('SaaS アプリケーション')).toBeInTheDocument()
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Eコマース')).toBeInTheDocument()
    expect(screen.getByText('ブログ / CMS')).toBeInTheDocument()
    expect(screen.getByText('ランディングページ')).toBeInTheDocument()
    expect(screen.getByText('API バックエンド')).toBeInTheDocument()
  })

  it('displays popular badges on popular templates', () => {
    render(<TemplatePage />)
    const popularBadges = screen.getAllByText('Popular')
    expect(popularBadges.length).toBeGreaterThan(0)
  })

  it('allows selecting a template', async () => {
    const user = userEvent.setup()
    render(<TemplatePage />)

    const saasCard = screen.getByText('SaaS アプリケーション').closest('button')
    expect(saasCard).not.toBeNull()

    await user.click(saasCard!)

    expect(saasCard).toHaveClass('ring-2')
  })

  it('shows continue button when template is selected', async () => {
    const user = userEvent.setup()
    render(<TemplatePage />)

    const continueButton = screen.queryByRole('link', { name: /次へ進む/i })
    expect(continueButton).not.toBeInTheDocument()

    const saasCard = screen.getByText('SaaS アプリケーション').closest('button')
    await user.click(saasCard!)

    const continueButtonAfter = screen.getByRole('link', { name: /次へ進む/i })
    expect(continueButtonAfter).toBeInTheDocument()
    expect(continueButtonAfter).toHaveAttribute('href', '/wizard?template=saas-app')
  })
})
