import { describe, it, expect } from 'vitest'
import { generateMarkdownPreview } from './generate-markdown'
import type { WizardFormData } from '../types'

const createEmptyTechStack = () => ({
  frontend: [],
  backend: [],
  database: [],
  styling: [],
  testing: [],
  tools: [],
  other: '',
})

describe('generateMarkdownPreview', () => {
  it('generates markdown with project name', () => {
    const formData: WizardFormData = {
      projectName: 'my-awesome-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
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
      techStack: createEmptyTechStack(),
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## AI Role Definition')
    expect(result).toContain('full-stack')
    expect(result).toContain('GraphQL')
  })

  it('generates Tech Stack section with frontend techs', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
      techStack: {
        frontend: [{ id: 'nextjs', version: '15' }, { id: 'react' }],
        backend: [],
        database: [],
        styling: [],
        testing: [],
        tools: [],
        other: '',
      },
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## Tech Stack')
    expect(result).toContain('### Frontend')
    expect(result).toContain('Next.js 15')
    expect(result).toContain('React')
  })

  it('shows tech without version when version not specified', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
      techStack: {
        frontend: [{ id: 'react' }],
        backend: [],
        database: [],
        styling: [],
        testing: [],
        tools: [],
        other: '',
      },
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('### Frontend')
    expect(result).toContain('- React')
    expect(result).not.toContain('React undefined')
  })

  it('does not render category section when no techs selected', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
      techStack: {
        frontend: [{ id: 'react' }],
        backend: [],
        database: [],
        styling: [],
        testing: [],
        tools: [],
        other: '',
      },
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('### Frontend')
    expect(result).not.toContain('### Backend')
    expect(result).not.toContain('### Database')
  })

  it('renders all 6 tech categories when all have selections', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
      techStack: {
        frontend: [{ id: 'nextjs', version: '15' }],
        backend: [{ id: 'nodejs' }],
        database: [{ id: 'postgresql', version: '16' }],
        styling: [{ id: 'tailwind' }],
        testing: [{ id: 'vitest' }],
        tools: [{ id: 'typescript' }],
        other: '',
      },
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('### Frontend')
    expect(result).toContain('### Backend')
    expect(result).toContain('### Database')
    expect(result).toContain('### Styling')
    expect(result).toContain('### Testing')
    expect(result).toContain('### Tools')
  })

  it('renders Other section when otherTechs has value', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
      techStack: {
        frontend: [],
        backend: [],
        database: [],
        styling: [],
        testing: [],
        tools: [],
        other: 'Zod, React Hook Form, Framer Motion',
      },
    }

    const result = generateMarkdownPreview(formData)

    expect(result).toContain('## Tech Stack')
    expect(result).toContain('### Other')
    expect(result).toContain('Zod, React Hook Form, Framer Motion')
  })

  it('does not render Tech Stack section when no techs selected', () => {
    const formData: WizardFormData = {
      projectName: 'test-app',
      projectPurpose: '',
      developmentPhase: null,
      selectedRoles: [],
      customRole: '',
      techStack: createEmptyTechStack(),
    }

    const result = generateMarkdownPreview(formData)

    expect(result).not.toContain('## Tech Stack')
  })
})
