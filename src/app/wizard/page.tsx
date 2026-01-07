'use client'

import { useWizardForm } from '@/features/wizard/hooks'
import {
  WizardHeader,
  ProjectNameInput,
  ProjectPurposeInput,
  DevelopmentPhaseRadioGroup,
  PreviewArea,
  WizardFooter,
} from '@/features/wizard/components'
import { TOTAL_STEPS } from '@/features/wizard/types'

export default function WizardPage() {
  const {
    formData,
    setProjectName,
    setProjectPurpose,
    setDevelopmentPhase,
    previewMarkdown,
  } = useWizardForm()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <WizardHeader
        currentStep={1}
        totalSteps={TOTAL_STEPS}
        title="プロジェクト基本情報"
      />

      <main className="flex flex-1 overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-6">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-2xl font-bold text-black dark:text-zinc-50">
                プロジェクト基本情報
              </h2>

              <div className="space-y-6">
                <ProjectNameInput
                  value={formData.projectName}
                  onChange={setProjectName}
                />
                <ProjectPurposeInput
                  value={formData.projectPurpose}
                  onChange={setProjectPurpose}
                />
                <DevelopmentPhaseRadioGroup
                  value={formData.developmentPhase}
                  onChange={setDevelopmentPhase}
                />
              </div>
            </div>
          </div>

          <PreviewArea markdown={previewMarkdown} />
        </div>
      </main>

      <WizardFooter />
    </div>
  )
}
