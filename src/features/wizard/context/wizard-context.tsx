'use client'

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import type { DevelopmentPhase, AIRolePreset, WizardFormData, WizardStep } from '../types'
import { generateMarkdownPreview } from '../utils'

type WizardContextValue = {
  formData: WizardFormData
  currentStep: WizardStep
  setProjectName: (value: string) => void
  setProjectPurpose: (value: string) => void
  setDevelopmentPhase: (value: DevelopmentPhase) => void
  toggleRole: (roleId: AIRolePreset) => void
  setCustomRole: (value: string) => void
  previewMarkdown: string
  goToStep: (step: WizardStep) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  canGoNext: boolean
  canGoPrevious: boolean
}

const WizardContext = createContext<WizardContextValue | null>(null)

const STORAGE_KEY = 'wizard-form-data'
const TOTAL_STEPS = 6

type WizardProviderProps = {
  children: ReactNode
  initialStep?: WizardStep
}

export const WizardProvider = ({ children, initialStep = 1 }: WizardProviderProps) => {
  // Initialize state from localStorage or defaults
  const [currentStep, setCurrentStep] = useState<WizardStep>(() => {
    if (typeof window === 'undefined') return initialStep
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return (parsed.currentStep as WizardStep) || initialStep
      } catch {
        return initialStep
      }
    }
    return initialStep
  })

  const [projectName, setProjectName] = useState(() => {
    if (typeof window === 'undefined') return ''
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).projectName || ''
      } catch {
        return ''
      }
    }
    return ''
  })

  const [projectPurpose, setProjectPurpose] = useState(() => {
    if (typeof window === 'undefined') return ''
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).projectPurpose || ''
      } catch {
        return ''
      }
    }
    return ''
  })

  const [developmentPhase, setDevelopmentPhase] = useState<DevelopmentPhase | null>(() => {
    if (typeof window === 'undefined') return null
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).developmentPhase || null
      } catch {
        return null
      }
    }
    return null
  })

  const [selectedRoles, setSelectedRoles] = useState<AIRolePreset[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).selectedRoles || []
      } catch {
        return []
      }
    }
    return []
  })

  const [customRole, setCustomRole] = useState(() => {
    if (typeof window === 'undefined') return ''
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).customRole || ''
      } catch {
        return ''
      }
    }
    return ''
  })

  const toggleRole = useCallback((roleId: AIRolePreset) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]
    )
  }, [])

  const formData: WizardFormData = useMemo(
    () => ({
      projectName,
      projectPurpose,
      developmentPhase,
      selectedRoles,
      customRole,
    }),
    [projectName, projectPurpose, developmentPhase, selectedRoles, customRole]
  )

  const previewMarkdown = useMemo(() => generateMarkdownPreview(formData), [formData])

  // Save to localStorage whenever form data changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    const dataToSave = {
      currentStep,
      ...formData,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }, [currentStep, formData])

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step)
  }, [])

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS) as WizardStep)
  }, [])

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as WizardStep)
  }, [])

  const canGoNext = currentStep < TOTAL_STEPS
  const canGoPrevious = currentStep > 1

  const value: WizardContextValue = {
    formData,
    currentStep,
    setProjectName,
    setProjectPurpose,
    setDevelopmentPhase,
    toggleRole,
    setCustomRole,
    previewMarkdown,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoPrevious,
  }

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
}

export const useWizard = () => {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider')
  }
  return context
}
