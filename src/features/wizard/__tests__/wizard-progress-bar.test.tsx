import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WizardProgressBar } from '../components/wizard-progress-bar'

describe('WizardProgressBar', () => {
  it('renders progress bar with correct aria attributes', () => {
    render(<WizardProgressBar currentStep={1} totalSteps={6} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '1')
    expect(progressBar).toHaveAttribute('aria-valuemin', '1')
    expect(progressBar).toHaveAttribute('aria-valuemax', '6')
  })

  it('calculates correct width percentage for step 1 of 6', () => {
    render(<WizardProgressBar currentStep={1} totalSteps={6} />)

    const progressBar = screen.getByRole('progressbar')
    const innerBar = progressBar.querySelector('div')

    expect(innerBar).toHaveStyle({ width: '16.666666666666664%' })
  })

  it('calculates correct width percentage for step 3 of 6', () => {
    render(<WizardProgressBar currentStep={3} totalSteps={6} />)

    const progressBar = screen.getByRole('progressbar')
    const innerBar = progressBar.querySelector('div')

    expect(innerBar).toHaveStyle({ width: '50%' })
  })

  it('shows 100% width for final step', () => {
    render(<WizardProgressBar currentStep={6} totalSteps={6} />)

    const progressBar = screen.getByRole('progressbar')
    const innerBar = progressBar.querySelector('div')

    expect(innerBar).toHaveStyle({ width: '100%' })
  })
})
