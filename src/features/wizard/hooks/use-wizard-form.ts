import { useState, useMemo, useCallback } from 'react'
import { generateMarkdownPreview } from '../utils'
import type { DevelopmentPhase, AIRolePreset, WizardFormData } from '../types'

export const useWizardForm = () => {
  const [projectName, setProjectName] = useState('')
  const [projectPurpose, setProjectPurpose] = useState('')
  const [developmentPhase, setDevelopmentPhase] = useState<DevelopmentPhase | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<AIRolePreset[]>([])
  const [customRole, setCustomRole] = useState('')

  const toggleRole = useCallback((roleId: AIRolePreset) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    )
  }, [])

  const formData: WizardFormData = useMemo(
    () => ({
      projectName,
      projectPurpose,
      developmentPhase,
      selectedRoles,
      customRole,
      techStack: {
        frontend: [],
        backend: [],
        database: [],
        styling: [],
        testing: [],
        tools: [],
        other: '',
      },
    }),
    [projectName, projectPurpose, developmentPhase, selectedRoles, customRole]
  )

  const previewMarkdown = useMemo(
    () => generateMarkdownPreview(formData),
    [formData]
  )

  return {
    formData,
    setProjectName,
    setProjectPurpose,
    setDevelopmentPhase,
    toggleRole,
    setCustomRole,
    previewMarkdown,
  }
}
