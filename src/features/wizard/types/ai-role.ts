import type { AIRolePreset } from './wizard-form'

export type AIRole = {
  id: AIRolePreset
  icon: string
  title: string
  description: string
  tooltip: {
    whenToUse: string[]
    generatedExample: string
  }
}
