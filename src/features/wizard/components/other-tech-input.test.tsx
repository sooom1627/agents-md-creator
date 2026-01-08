import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { OtherTechInput } from './other-tech-input'

describe('OtherTechInput', () => {
  it('is collapsed by default', () => {
    render(<OtherTechInput value="" onChange={() => {}} />)

    const input = screen.queryByRole('textbox')
    expect(input).not.toBeInTheDocument()
  })

  it('expands when button clicked', async () => {
    const user = userEvent.setup()
    render(<OtherTechInput value="" onChange={() => {}} />)

    const button = screen.getByRole('button', { name: /リストにない技術を追加/i })
    await user.click(button)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('shows input field when expanded', async () => {
    const user = userEvent.setup()
    render(<OtherTechInput value="" onChange={() => {}} />)

    const button = screen.getByRole('button')
    await user.click(button)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute(
      'placeholder',
      expect.stringContaining('Zod')
    )
  })

  it('calls onChange when input changes', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<OtherTechInput value="" onChange={onChange} />)

    // Expand first
    const button = screen.getByRole('button')
    await user.click(button)

    const input = screen.getByRole('textbox')
    await user.type(input, 'Zod')

    expect(onChange).toHaveBeenCalled()
    // user.type calls onChange for each character, so check call count
    expect(onChange).toHaveBeenCalledTimes(3) // Z, o, d
  })

  it('shows placeholder text', async () => {
    const user = userEvent.setup()
    render(<OtherTechInput value="" onChange={() => {}} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(
      screen.getByPlaceholderText(/Zod, React Hook Form, Framer Motion/i)
    ).toBeInTheDocument()
  })

  it('displays current value', async () => {
    const user = userEvent.setup()
    render(<OtherTechInput value="Zod, React Hook Form" onChange={() => {}} />)

    const button = screen.getByRole('button')
    await user.click(button)

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('Zod, React Hook Form')
  })
})
