import type { AIRolePreset } from '../types'

type RoleDefinitionTemplate = {
  roleId: AIRolePreset
  description: string
  keywords: string[]
}

const ROLE_DEFINITIONS: Record<AIRolePreset, RoleDefinitionTemplate> = {
  fullstack: {
    roleId: 'fullstack',
    description:
      'a senior full-stack engineer who considers both frontend UX and backend architecture, ensuring consistency across the entire application',
    keywords: ['full-stack', 'frontend', 'backend', 'end-to-end'],
  },
  'ui-ux': {
    roleId: 'ui-ux',
    description:
      'a UI/UX specialist who prioritizes user experience, accessibility (a11y), and design consistency',
    keywords: ['UI/UX', 'user experience', 'accessibility', 'design'],
  },
  security: {
    roleId: 'security',
    description:
      'a security-focused engineer who implements best practices for authentication, authorization, and data protection',
    keywords: ['security', 'authentication', 'authorization', 'protection'],
  },
  performance: {
    roleId: 'performance',
    description:
      'a performance engineer who optimizes for speed, scalability, and efficient resource usage',
    keywords: ['performance', 'optimization', 'scalability', 'efficiency'],
  },
  documentation: {
    roleId: 'documentation',
    description:
      'a documentation-focused engineer who writes clear code comments, maintains comprehensive docs, and prioritizes code readability',
    keywords: ['documentation', 'comments', 'readability', 'maintainability'],
  },
  tdd: {
    roleId: 'tdd',
    description:
      'a TDD practitioner who writes tests first, follows red-green-refactor cycle, and maintains high code coverage',
    keywords: ['test-driven development', 'TDD', 'testing', 'quality'],
  },
}

export const generateAIRoleDefinition = (
  selectedRoles: AIRolePreset[],
  customRole: string
): string => {
  // No roles and no custom description
  if (selectedRoles.length === 0 && !customRole) {
    return ''
  }

  // Only custom role provided
  if (selectedRoles.length === 0 && customRole) {
    return `You are an engineer with the following specialization:\n\n${customRole}`
  }

  // Build role description from selected presets
  const roleDescriptions = selectedRoles
    .map((roleId) => {
      const template = ROLE_DEFINITIONS[roleId]
      return template ? template.description : null
    })
    .filter(Boolean)

  let definition = ''

  if (roleDescriptions.length === 1) {
    definition = `You are ${roleDescriptions[0]}.`
  } else if (roleDescriptions.length === 2) {
    definition = `You are ${roleDescriptions[0]}, and ${roleDescriptions[1]}.`
  } else if (roleDescriptions.length === 3) {
    definition = `You are ${roleDescriptions[0]}, ${roleDescriptions[1]}, and ${roleDescriptions[2]}.`
  }

  // Append custom role if provided
  if (customRole) {
    definition += `\n\nAdditional specialization:\n${customRole}`
  }

  return definition
}
