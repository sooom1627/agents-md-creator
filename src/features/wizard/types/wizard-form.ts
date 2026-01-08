import type { TechStackData } from './tech-stack'

export type DevelopmentPhase = 'new' | 'feature-add' | 'refactoring' | 'maintenance'

export type AIRolePreset =
  | 'fullstack'
  | 'ui-ux'
  | 'security'
  | 'performance'
  | 'documentation'
  | 'tdd'

export type WizardFormData = {
  // Step 1: プロジェクト基本情報
  projectName: string
  projectPurpose: string
  developmentPhase: DevelopmentPhase | null

  // Step 2: AIの役割
  selectedRoles: AIRolePreset[]
  customRole: string

  // Step 3: Tech Stack
  techStack: TechStackData
}

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6

export const TOTAL_STEPS = 6 as const
