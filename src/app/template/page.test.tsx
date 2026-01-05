import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TemplatePage from './page'

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
})
