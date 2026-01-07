import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useWizardForm } from '../hooks/use-wizard-form'

describe('useWizardForm', () => {
  it('initializes with empty form values', () => {
    const { result } = renderHook(() => useWizardForm())

    expect(result.current.formData.projectName).toBe('')
    expect(result.current.formData.projectPurpose).toBe('')
    expect(result.current.formData.developmentPhase).toBeNull()
    expect(result.current.formData.selectedRoles).toEqual([])
    expect(result.current.formData.customRole).toBe('')
  })

  it('updates project name', () => {
    const { result } = renderHook(() => useWizardForm())

    act(() => {
      result.current.setProjectName('my-awesome-app')
    })

    expect(result.current.formData.projectName).toBe('my-awesome-app')
  })

  it('updates project purpose', () => {
    const { result } = renderHook(() => useWizardForm())

    act(() => {
      result.current.setProjectPurpose('A great project')
    })

    expect(result.current.formData.projectPurpose).toBe('A great project')
  })

  it('updates development phase', () => {
    const { result } = renderHook(() => useWizardForm())

    act(() => {
      result.current.setDevelopmentPhase('new')
    })

    expect(result.current.formData.developmentPhase).toBe('new')
  })

  it('generates preview markdown', () => {
    const { result } = renderHook(() => useWizardForm())

    expect(result.current.previewMarkdown).toContain('# Project:')
  })

  it('updates preview when form data changes', () => {
    const { result } = renderHook(() => useWizardForm())

    act(() => {
      result.current.setProjectName('test-project')
    })

    expect(result.current.previewMarkdown).toContain('# Project: test-project')
  })

  it('toggles role selection', () => {
    const { result } = renderHook(() => useWizardForm())

    act(() => {
      result.current.toggleRole('fullstack')
    })

    expect(result.current.formData.selectedRoles).toContain('fullstack')

    act(() => {
      result.current.toggleRole('fullstack')
    })

    expect(result.current.formData.selectedRoles).not.toContain('fullstack')
  })

  it('updates custom role', () => {
    const { result } = renderHook(() => useWizardForm())

    act(() => {
      result.current.setCustomRole('Custom role description')
    })

    expect(result.current.formData.customRole).toBe('Custom role description')
  })
})
