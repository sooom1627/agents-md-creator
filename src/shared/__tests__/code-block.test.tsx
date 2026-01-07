import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CodeBlock } from '../components/code-block'

describe('CodeBlock', () => {
  it('renders code content', () => {
    const testCode = '# Test Code'
    render(<CodeBlock code={testCode} />)

    expect(screen.getByText(testCode)).toBeInTheDocument()
  })

  it('displays default language as markdown', () => {
    render(<CodeBlock code="test" />)

    expect(screen.getByText('markdown')).toBeInTheDocument()
  })

  it('displays custom language when provided', () => {
    render(<CodeBlock code="test" language="typescript" />)

    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('renders code in a pre element', () => {
    const testCode = 'const x = 1'
    const { container } = render(<CodeBlock code={testCode} />)

    const pre = container.querySelector('pre')
    expect(pre).toBeInTheDocument()
    expect(pre).toHaveTextContent(testCode)
  })
})
