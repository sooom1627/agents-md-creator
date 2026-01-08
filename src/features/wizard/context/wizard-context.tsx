'use client'

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import type { DevelopmentPhase, AIRolePreset, WizardFormData, WizardStep, TechCategory, TechSelection } from '../types'
import { generateMarkdownPreview } from '../utils'

type WizardContextValue = {
  formData: WizardFormData
  currentStep: WizardStep
  setProjectName: (value: string) => void
  setProjectPurpose: (value: string) => void
  setDevelopmentPhase: (value: DevelopmentPhase) => void
  toggleRole: (roleId: AIRolePreset) => void
  setCustomRole: (value: string) => void
  toggleTech: (category: TechCategory, techId: string) => void
  setTechVersion: (category: TechCategory, techId: string, version: string) => void
  setOtherTechs: (value: string) => void
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

  // Tech Stack state
  const [frontendTechs, setFrontendTechs] = useState<TechSelection[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).techStack?.frontend || []
      } catch {
        return []
      }
    }
    return []
  })

  const [backendTechs, setBackendTechs] = useState<TechSelection[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).techStack?.backend || []
      } catch {
        return []
      }
    }
    return []
  })

  const [databaseTechs, setDatabaseTechs] = useState<TechSelection[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).techStack?.database || []
      } catch {
        return []
      }
    }
    return []
  })

  const [stylingTechs, setStylingTechs] = useState<TechSelection[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).techStack?.styling || []
      } catch {
        return []
      }
    }
    return []
  })

  const [testingTechs, setTestingTechs] = useState<TechSelection[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).techStack?.testing || []
      } catch {
        return []
      }
    }
    return []
  })

  const [toolsTechs, setToolsTechs] = useState<TechSelection[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).techStack?.tools || []
      } catch {
        return []
      }
    }
    return []
  })

  const [otherTechs, setOtherTechs] = useState<string>(() => {
    if (typeof window === 'undefined') return ''
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved).techStack?.other || ''
      } catch {
        return ''
      }
    }
    return ''
  })

  const toggleRole = useCallback((roleId: AIRolePreset) => {
    setSelectedRoles((prev) => {
      // If role is already selected, deselect it
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId)
      }

      // If already have 3 roles selected, don't add more
      if (prev.length >= 3) {
        return prev
      }

      // Add the new role
      return [...prev, roleId]
    })
  }, [])

  // Tech Stack functions
  const toggleTech = useCallback((category: TechCategory, techId: string) => {
    const setterMap = {
      frontend: setFrontendTechs,
      backend: setBackendTechs,
      database: setDatabaseTechs,
      styling: setStylingTechs,
      testing: setTestingTechs,
      tools: setToolsTechs,
    }

    const setter = setterMap[category]

    setter((prev) => {
      const exists = prev.find((t) => t.id === techId)
      if (exists) {
        // Remove if already selected
        return prev.filter((t) => t.id !== techId)
      }
      // Add new tech
      return [...prev, { id: techId }]
    })
  }, [])

  const setTechVersion = useCallback(
    (category: TechCategory, techId: string, version: string) => {
      const setterMap = {
        frontend: setFrontendTechs,
        backend: setBackendTechs,
        database: setDatabaseTechs,
        styling: setStylingTechs,
        testing: setTestingTechs,
        tools: setToolsTechs,
      }

      const setter = setterMap[category]

      setter((prev) =>
        prev.map((t) => (t.id === techId ? { ...t, version } : t))
      )
    },
    []
  )

  const formData: WizardFormData = useMemo(
    () => ({
      projectName,
      projectPurpose,
      developmentPhase,
      selectedRoles,
      customRole,
      techStack: {
        frontend: frontendTechs,
        backend: backendTechs,
        database: databaseTechs,
        styling: stylingTechs,
        testing: testingTechs,
        tools: toolsTechs,
        other: otherTechs,
      },
    }),
    [
      projectName,
      projectPurpose,
      developmentPhase,
      selectedRoles,
      customRole,
      frontendTechs,
      backendTechs,
      databaseTechs,
      stylingTechs,
      testingTechs,
      toolsTechs,
      otherTechs,
    ]
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
    toggleTech,
    setTechVersion,
    setOtherTechs,
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
