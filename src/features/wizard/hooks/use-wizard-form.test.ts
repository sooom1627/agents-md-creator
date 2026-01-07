import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useWizardForm } from './use-wizard-form'

describe('useWizardForm', () => {
  it('initializes with empty form values', () => {
    const { result } = renderHook(() => useWizardForm())

    expect(result.current.formData.projectName).toBe('')
    expect(result.current.formData.projectPurpose).toBe('')
    expect(result.current.formData.developmentPhase).toBeNull()
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
})
