import type { WizardFormData, TechCategory, TechSelection } from '../types'
import { AI_ROLES, TECH_STACK, TECH_CATEGORIES } from '../constants'
import { generateAIRoleDefinition } from './generate-ai-role-definition'

const PHASE_LABELS: Record<string, string> = {
  new: '新規開発',
  'feature-add': '機能追加',
  refactoring: 'リファクタリング',
  maintenance: '保守・運用',
}

const formatTechList = (techSelections: TechSelection[]): string => {
  return techSelections
    .map((selection) => {
      const tech = TECH_STACK.find((t) => t.id === selection.id)
      if (!tech) return null

      const versionSuffix = selection.version ? ` ${selection.version}` : ''
      return `${tech.name}${versionSuffix}`
    })
    .filter(Boolean)
    .join(', ')
}

export const generateMarkdownPreview = (formData: WizardFormData): string => {
  const {
    projectName,
    projectPurpose,
    developmentPhase,
    selectedRoles,
    customRole,
    techStack,
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

    // AI Role Definition (generated prompt)
    const roleDefinition = generateAIRoleDefinition(selectedRoles, customRole)
    if (roleDefinition) {
      sections.push('\n## AI Role Definition\n\n```\n' + roleDefinition + '\n```')
    }
  }

  // Tech Stack
  const hasTechStack =
    techStack.frontend.length > 0 ||
    techStack.backend.length > 0 ||
    techStack.database.length > 0 ||
    techStack.styling.length > 0 ||
    techStack.testing.length > 0 ||
    techStack.tools.length > 0 ||
    techStack.other

  if (hasTechStack) {
    sections.push('\n## Tech Stack\n\n```yaml')

    // Iterate through each category
    const categories: TechCategory[] = [
      'frontend',
      'backend',
      'database',
      'styling',
      'testing',
      'tools',
    ]

    categories.forEach((category) => {
      const categoryTechs = techStack[category]
      if (categoryTechs.length > 0) {
        const categoryLabel = TECH_CATEGORIES[category].label
        const techList = formatTechList(categoryTechs)
        sections.push(`${categoryLabel}: ${techList}`)
      }
    })

    // Other techs
    if (techStack.other) {
      sections.push(`Other: ${techStack.other}`)
    }

    sections.push('```')
  }

  return sections.join('\n')
}
