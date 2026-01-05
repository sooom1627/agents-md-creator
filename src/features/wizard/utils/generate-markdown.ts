import type { WizardFormData } from '../types'

const PHASE_LABELS: Record<string, string> = {
  new: '新規開発',
  'feature-add': '機能追加',
  refactoring: 'リファクタリング',
  maintenance: '保守・運用',
}

export const generateMarkdownPreview = (formData: WizardFormData): string => {
  const { projectName, projectPurpose, developmentPhase } = formData

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

  return sections.join('\n')
}
