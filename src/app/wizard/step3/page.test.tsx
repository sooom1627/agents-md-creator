import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { WizardProvider } from '@/features/wizard/context'
import Step3Page from './page'

vi.mock('@/features/wizard/hooks', async () => {
  const actual = await vi.importActual('@/features/wizard/hooks')
  return {
    ...actual,
    useWizardNavigation: () => ({
      navigateToStep: vi.fn(),
      navigateToNextStep: vi.fn(),
      navigateToPreviousStep: vi.fn(),
    }),
  }
})

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<WizardProvider>{ui}</WizardProvider>)
}

describe('Wizard Step 3 Page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the wizard header with step 3 indicator', () => {
    renderWithProvider(<Step3Page />)
    const stepIndicator = screen.getByText(/Step 3\/6/)
    expect(stepIndicator).toBeInTheDocument()
  })

  it('renders progress bar', () => {
    renderWithProvider(<Step3Page />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '3')
  })

  it('renders Step 3 heading', () => {
    renderWithProvider(<Step3Page />)
    const heading = screen.getByRole('heading', {
      name: /^使用技術$/i,
      level: 2,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders TechSelector component', () => {
    renderWithProvider(<Step3Page />)
    // TechSelector should render category tabs
    expect(screen.getByRole('button', { name: /Frontend/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Backend/i })).toBeInTheDocument()
  })

  it('renders preview area', () => {
    renderWithProvider(<Step3Page />)
    const heading = screen.getByRole('heading', { name: /プレビュー/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders next button', () => {
    renderWithProvider(<Step3Page />)
    const nextButton = screen.getByRole('button', { name: /次へ/i })
    expect(nextButton).toBeInTheDocument()
  })

  it('allows selecting tech stack items', async () => {
    const user = userEvent.setup()
    renderWithProvider(<Step3Page />)

    // Find Next.js tech card button
    const nextjsButton = screen.getByText('Next.js').closest('button')

    // Before click - should not be pressed
    expect(nextjsButton).toHaveAttribute('aria-pressed', 'false')

    // Click to select
    await user.click(nextjsButton!)

    // After click - should be pressed
    expect(nextjsButton).toHaveAttribute('aria-pressed', 'true')

    // And the parent card div should have selected styling
    const nextjsCard = nextjsButton!.closest('div[class*="group relative flex"]')
    expect(nextjsCard).toHaveClass('ring-2')
    expect(nextjsCard).toHaveClass('border-black')
  })

  it('allows switching between tech categories', async () => {
    const user = userEvent.setup()
    renderWithProvider(<Step3Page />)

    // Initially on Frontend category - should see Next.js
    expect(screen.getByText('Next.js')).toBeInTheDocument()

    // Switch to Backend category
    const backendTab = screen.getByRole('button', { name: /Backend/i })
    await user.click(backendTab)

    // Should see Backend technologies
    expect(screen.getByText('Node.js + Express')).toBeInTheDocument()
  })

  it('renders info box with tech stack guidance', () => {
    renderWithProvider(<Step3Page />)
    expect(
      screen.getByText(/プロジェクトで使用する主要な技術スタック/)
    ).toBeInTheDocument()
  })

  it('renders tech stack tips accordion', () => {
    renderWithProvider(<Step3Page />)
    expect(
      screen.getByText(/Tech Stack の書き方のコツ/i)
    ).toBeInTheDocument()
  })
})
