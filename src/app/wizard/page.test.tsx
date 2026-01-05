import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WizardPage from './page'

describe('Wizard Page', () => {
  it('renders the wizard header with step indicator', () => {
    render(<WizardPage />)
    const stepIndicator = screen.getByText(/Step 1\/6/)
    expect(stepIndicator).toBeInTheDocument()
  })

  it('renders progress bar', () => {
    render(<WizardPage />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
  })

  it('renders Step 1 heading', () => {
    render(<WizardPage />)
    const heading = screen.getByRole('heading', {
      name: /^プロジェクト基本情報$/i,
      level: 2,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders project name input', () => {
    render(<WizardPage />)
    const input = screen.getByLabelText(/プロジェクト名/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders project purpose textarea', () => {
    render(<WizardPage />)
    const textarea = screen.getByLabelText(/プロジェクトの目的/i)
    expect(textarea).toBeInTheDocument()
  })

  it('renders development phase radio buttons', () => {
    render(<WizardPage />)
    expect(screen.getByLabelText(/新規開発/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/機能追加/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/リファクタリング/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/保守・運用/i)).toBeInTheDocument()
  })

  it('renders next button', () => {
    render(<WizardPage />)
    const nextButton = screen.getByRole('button', { name: /次へ/i })
    expect(nextButton).toBeInTheDocument()
  })
})
