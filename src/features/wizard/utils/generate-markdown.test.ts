import { describe, it, expect } from 'vitest'
import { generateMarkdownPreview } from './generate-markdown'
import type { WizardFormData } from '../types'

describe('generateMarkdownPreview', () => {
  it('generates markdown with project name', () => {
    const formData: WizardFormData = {
      projectName: 'my-awesome-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('# Project: my-awesome-app')
  })

  it('generates markdown with project purpose', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: 'テストアプリケーション',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('> テストアプリケーション')
  })

  it('generates markdown with development phase', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: 'new',
      selectedRoles: [],
      customRole: '',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('Phase: 新規開発')
  })

  it('generates markdown with selected roles', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: ['fullstack', 'tdd'],
      customRole: '',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## AI Role')
    expect(result).toContain('- フルスタック重視')
    expect(result).toContain('- テスト駆動開発')
  })

  it('generates markdown with custom role', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: 'カスタムロール説明',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## AI Role')
    expect(result).toContain('カスタムロール説明')
  })

  it('generates markdown with both selected roles and custom role', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: ['fullstack'],
      customRole: 'さらに詳しい説明',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## AI Role')
    expect(result).toContain('- フルスタック重視')
    expect(result).toContain('さらに詳しい説明')
  })

  it('generates complete markdown with all fields', () => {
    const formData: WizardFormData = {
      projectName: 'complete-app',
      projectPurpose: '完全なアプリケーション',
      developmentPhase: 'new',
      selectedRoles: ['fullstack', 'security'],
      customRole: 'セキュリティを重視した設計',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('# Project: complete-app')
    expect(result).toContain('> 完全なアプリケーション')
    expect(result).toContain('Phase: 新規開発')
    expect(result).toContain('## AI Role')
    expect(result).toContain('- フルスタック重視')
    expect(result).toContain('- セキュリティ第一')
    expect(result).toContain('セキュリティを重視した設計')
  })

  it('generates AI role definition in code block', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: ['fullstack', 'tdd'],
      customRole: '',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## AI Role Definition')
    expect(result).toContain('```')
    expect(result).toContain('You are')
    expect(result).toContain('full-stack')
    expect(result).toContain('TDD')
  })

  it('includes AI role definition with custom role', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: ['fullstack'],
      customRole: 'GraphQL APIに精通',
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## AI Role Definition')
    expect(result).toContain('full-stack')
    expect(result).toContain('GraphQL')
  })
})
