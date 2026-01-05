export type DevelopmentPhase = 'new' | 'feature-add' | 'refactoring' | 'maintenance'

export type WizardFormData = {
  // Step 1: プロジェクト基本情報
  projectName: string
  projectPurpose: string
  developmentPhase: DevelopmentPhase | null
}

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6

export const TOTAL_STEPS = 6 as const
