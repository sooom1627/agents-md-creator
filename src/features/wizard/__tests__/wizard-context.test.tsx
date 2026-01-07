import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { WizardProvider, useWizard } from '../context/wizard-context'
import type { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <WizardProvider>{children}</WizardProvider>
)

describe('WizardContext - Role Selection Limit', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('allows selecting up to 3 roles', () => {
    const { result } = renderHook(() => useWizard(), { wrapper })

    act(() => {
      result.current.toggleRole('fullstack')
    })
    expect(result.current.formData.selectedRoles).toEqual(['fullstack'])

    act(() => {
      result.current.toggleRole('tdd')
    })
    expect(result.current.formData.selectedRoles).toEqual(['fullstack', 'tdd'])

    act(() => {
      result.current.toggleRole('security')
    })
    expect(result.current.formData.selectedRoles).toEqual([
      'fullstack',
      'tdd',
      'security',
    ])
  })

  it('prevents selecting more than 3 roles', () => {
    const { result } = renderHook(() => useWizard(), { wrapper })

    // Select 3 roles
    act(() => {
      result.current.toggleRole('fullstack')
      result.current.toggleRole('tdd')
      result.current.toggleRole('security')
    })

    expect(result.current.formData.selectedRoles).toHaveLength(3)

    // Try to select a 4th role
    act(() => {
      result.current.toggleRole('performance')
    })

    // Should still have only 3 roles
    expect(result.current.formData.selectedRoles).toHaveLength(3)
    expect(result.current.formData.selectedRoles).toEqual([
      'fullstack',
      'tdd',
      'security',
    ])
    expect(result.current.formData.selectedRoles).not.toContain('performance')
  })

  it('allows deselecting and then selecting a different role', () => {
    const { result } = renderHook(() => useWizard(), { wrapper })

    // Select 3 roles
    act(() => {
      result.current.toggleRole('fullstack')
      result.current.toggleRole('tdd')
      result.current.toggleRole('security')
    })

    expect(result.current.formData.selectedRoles).toHaveLength(3)

    // Deselect one role
    act(() => {
      result.current.toggleRole('fullstack')
    })

    expect(result.current.formData.selectedRoles).toEqual(['tdd', 'security'])

    // Now can select a different role
    act(() => {
      result.current.toggleRole('performance')
    })

    expect(result.current.formData.selectedRoles).toEqual([
      'tdd',
      'security',
      'performance',
    ])
  })

  it('toggles off selected role when clicked again', () => {
    const { result } = renderHook(() => useWizard(), { wrapper })

    act(() => {
      result.current.toggleRole('fullstack')
    })
    expect(result.current.formData.selectedRoles).toContain('fullstack')

    act(() => {
      result.current.toggleRole('fullstack')
    })
    expect(result.current.formData.selectedRoles).not.toContain('fullstack')
  })
})
