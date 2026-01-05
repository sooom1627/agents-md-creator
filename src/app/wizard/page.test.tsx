import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
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

  describe('Preview Area', () => {
    it('renders preview area heading', () => {
      render(<WizardPage />)
      const heading = screen.getByRole('heading', { name: /プレビュー/i })
      expect(heading).toBeInTheDocument()
    })

    it('displays preview content in code block', () => {
      render(<WizardPage />)
      const codeBlock = screen.getByText(/# Project:/)
      expect(codeBlock).toBeInTheDocument()
    })

    it('updates preview when project name is entered', async () => {
      const user = userEvent.setup()
      render(<WizardPage />)

      const input = screen.getByLabelText(/プロジェクト名/i)
      await user.type(input, 'my-awesome-app')

      expect(screen.getByText(/# Project: my-awesome-app/)).toBeInTheDocument()
    })

    it('updates preview when project purpose is entered', async () => {
      const user = userEvent.setup()
      render(<WizardPage />)

      const textarea = screen.getByLabelText(/プロジェクトの目的/i)
      await user.type(textarea, '素晴らしいプロジェクト')

      expect(screen.getByText(/> 素晴らしいプロジェクト/)).toBeInTheDocument()
    })

    it('updates preview when development phase is selected', async () => {
      const user = userEvent.setup()
      render(<WizardPage />)

      const radio = screen.getByLabelText(/新規開発/i)
      await user.click(radio)

      expect(screen.getByText(/Phase: 新規開発/)).toBeInTheDocument()
    })
  })
})
