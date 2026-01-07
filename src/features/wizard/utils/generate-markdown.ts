import type { WizardFormData } from '../types'
import { AI_ROLES } from '../constants'

const PHASE_LABELS: Record<string, string> = {
  new: '新規開発',
  'feature-add': '機能追加',
  refactoring: 'リファクタリング',
  maintenance: '保守・運用',
}

export const generateMarkdownPreview = (formData: WizardFormData): string => {
  const {
    projectName,
    projectPurpose,
    developmentPhase,
    selectedRoles,
    customRole,
  } = formData

  const sections: string[] = []

  // Project Title
  sections.push(`# Project: ${projectName || '(未入力)'}`)

  // Project Purpose
  if (projectPurpose) {
    sections.push(`\n> ${projectPurpose}`)
  }

  // Development Phase
  if (developmentPhase) {
    sections.push(`\nPhase: ${PHASE_LABELS[developmentPhase] || developmentPhase}`)
  }

  // AI Role
  if (selectedRoles.length > 0 || customRole) {
    sections.push('\n## AI Role')

    // Selected role presets
    if (selectedRoles.length > 0) {
      const roleLabels = selectedRoles
        .map((roleId) => {
          const role = AI_ROLES.find((r) => r.id === roleId)
          return role ? `- ${role.title}` : null
        })
        .filter(Boolean)

      if (roleLabels.length > 0) {
        sections.push(roleLabels.join('\n'))
      }
    }

    // Custom role description
    if (customRole) {
      sections.push(`\n${customRole}`)
    }
  }

  return sections.join('\n')
}
