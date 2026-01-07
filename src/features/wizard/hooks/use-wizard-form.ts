import { useState, useMemo } from 'react'
import { generateMarkdownPreview } from '../utils'
import type { DevelopmentPhase, WizardFormData } from '../types'

export const useWizardForm = () => {
  const [projectName, setProjectName] = useState('')
  const [projectPurpose, setProjectPurpose] = useState('')
  const [developmentPhase, setDevelopmentPhase] = useState<DevelopmentPhase | null>(null)

  const formData: WizardFormData = useMemo(
    () => ({
      projectName,
      projectPurpose,
      developmentPhase,
    }),
    [projectName, projectPurpose, developmentPhase]
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
    previewMarkdown,
  }
}
