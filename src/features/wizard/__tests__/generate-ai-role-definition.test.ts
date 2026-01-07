import { describe, it, expect } from 'vitest'
import { generateAIRoleDefinition } from '../utils/generate-ai-role-definition'
import type { AIRolePreset } from '../types'

describe('generateAIRoleDefinition', () => {
  it('generates definition for single role', () => {
    const selectedRoles: AIRolePreset[] = ['fullstack']
    const customRole = ''

    const result = generateAIRoleDefinition(selectedRoles, customRole)

    expect(result).toContain('full-stack engineer')
    expect(result).toContain('frontend')
    expect(result).toContain('backend')
  })

  it('generates definition for multiple roles', () => {
    const selectedRoles: AIRolePreset[] = ['fullstack', 'tdd', 'security']
    const customRole = ''

    const result = generateAIRoleDefinition(selectedRoles, customRole)

    expect(result).toContain('full-stack')
    expect(result).toContain('TDD')
    expect(result).toContain('security')
  })

  it('includes custom role when provided', () => {
    const selectedRoles: AIRolePreset[] = ['fullstack']
    const customRole = 'GraphQL APIの設計に精通しており、スキーマファーストな開発を行います'

    const result = generateAIRoleDefinition(selectedRoles, customRole)

    expect(result).toContain('GraphQL')
    expect(result).toContain('スキーマファースト')
  })

  it('generates definition from custom role only', () => {
    const selectedRoles: AIRolePreset[] = []
    const customRole = 'Reactのパフォーマンス最適化に特化したエンジニア'

    const result = generateAIRoleDefinition(selectedRoles, customRole)

    expect(result).toContain('React')
    expect(result).toContain('パフォーマンス最適化')
  })

  it('returns empty string when no roles and no custom role', () => {
    const selectedRoles: AIRolePreset[] = []
    const customRole = ''

    const result = generateAIRoleDefinition(selectedRoles, customRole)

    expect(result).toBe('')
  })

  it('combines all selected roles into coherent description', () => {
    const selectedRoles: AIRolePreset[] = ['ui-ux', 'performance']
    const customRole = ''

    const result = generateAIRoleDefinition(selectedRoles, customRole)

    expect(result).toContain('UI/UX')
    expect(result).toContain('performance')
    expect(result).toContain('user experience')
  })

  it('generates professional English prompt format', () => {
    const selectedRoles: AIRolePreset[] = ['fullstack', 'tdd']
    const customRole = ''

    const result = generateAIRoleDefinition(selectedRoles, customRole)

    expect(result).toMatch(/^You are/)
    expect(result).toContain('who')
  })
})
