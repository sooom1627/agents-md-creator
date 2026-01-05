import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './page'

describe('Landing Page', () => {
  it('renders the application title', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /agents\.md master generator/i
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the value proposition', () => {
    render(<Home />)
    const description = screen.getByText(/AIエージェントが正確にプロジェクトコンテキストを理解/i)
    expect(description).toBeInTheDocument()
  })

  it('renders primary CTA button', () => {
    render(<Home />)
    const primaryCTA = screen.getByRole('link', { name: /テンプレートから始める/i })
    expect(primaryCTA).toBeInTheDocument()
  })

  it('renders secondary CTA button', () => {
    render(<Home />)
    const secondaryCTA = screen.getByRole('link', { name: /ゼロから作る/i })
    expect(secondaryCTA).toBeInTheDocument()
  })

  it('renders example preview section heading', () => {
    render(<Home />)
    const previewHeading = screen.getByRole('heading', {
      name: /生成されるファイルの例/i
    })
    expect(previewHeading).toBeInTheDocument()
  })

  it('renders example code block with agents.md content', () => {
    render(<Home />)
    const codeBlock = screen.getByText(/# Project:/i)
    expect(codeBlock).toBeInTheDocument()
  })
})
