import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Step2Page from './page'

describe('Wizard Step 2 Page', () => {
  it('renders the wizard header with step 2 indicator', () => {
    render(<Step2Page />)
    const stepIndicator = screen.getByText(/Step 2\/6/)
    expect(stepIndicator).toBeInTheDocument()
  })

  it('renders progress bar', () => {
    render(<Step2Page />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '2')
  })

  it('renders Step 2 heading', () => {
    render(<Step2Page />)
    const heading = screen.getByRole('heading', {
      name: /^AIの役割$/i,
      level: 2,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders info box', () => {
    render(<Step2Page />)
    expect(
      screen.getByText(/AIに「どんなエンジニアとして振る舞って欲しいか」を伝えます/)
    ).toBeInTheDocument()
  })

  it('renders all 6 role cards', () => {
    render(<Step2Page />)
    expect(screen.getByText('フルスタック重視')).toBeInTheDocument()
    expect(screen.getByText('UI/UX スペシャリスト')).toBeInTheDocument()
    expect(screen.getByText('セキュリティ第一')).toBeInTheDocument()
    expect(screen.getByText('パフォーマンス最適化')).toBeInTheDocument()
    expect(screen.getByText('ドキュメンテーション')).toBeInTheDocument()
    expect(screen.getByText('テスト駆動開発')).toBeInTheDocument()
  })

  it('allows selecting multiple roles', async () => {
    const user = userEvent.setup()
    render(<Step2Page />)

    const fullstackCard = screen
      .getByText('フルスタック重視')
      .closest('button')
    const tddCard = screen.getByText('テスト駆動開発').closest('button')

    await user.click(fullstackCard!)
    expect(fullstackCard).toHaveClass('ring-2')

    await user.click(tddCard!)
    expect(tddCard).toHaveClass('ring-2')
    expect(fullstackCard).toHaveClass('ring-2') // Still selected
  })

  it('renders custom role input section', () => {
    render(<Step2Page />)
    expect(
      screen.getByText(/さらに細かく指定する（上級者向け）/)
    ).toBeInTheDocument()
  })

  it('renders role examples accordion', () => {
    render(<Step2Page />)
    expect(screen.getByText('良い役割定義の例')).toBeInTheDocument()
  })

  it('renders next button', () => {
    render(<Step2Page />)
    const nextButton = screen.getByRole('button', { name: /次へ/i })
    expect(nextButton).toBeInTheDocument()
  })

  it('renders preview area', () => {
    render(<Step2Page />)
    const heading = screen.getByRole('heading', { name: /プレビュー/i })
    expect(heading).toBeInTheDocument()
  })
})
