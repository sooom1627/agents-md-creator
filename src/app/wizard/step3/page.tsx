'use client'

import { useWizard } from '@/features/wizard/context'
import { useWizardNavigation } from '@/features/wizard/hooks'
import {
  WizardHeader,
  TechSelector,
  PreviewArea,
  WizardFooter,
} from '@/features/wizard/components'
import { TOTAL_STEPS } from '@/features/wizard/types'

export default function Step3Page() {
  const {
    formData,
    toggleTech,
    setTechVersion,
    setOtherTechs,
    previewMarkdown,
    canGoNext,
  } = useWizard()

  const { navigateToNextStep } = useWizardNavigation()

  const handleNext = () => {
    navigateToNextStep(3)
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <WizardHeader
        currentStep={3}
        totalSteps={TOTAL_STEPS}
        title="使用技術"
      />

      <main className="flex flex-1 overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-6">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-4xl pb-80">
              <h2 className="mb-8 text-2xl font-bold text-black dark:text-zinc-50">
                使用技術
              </h2>

              <div className="space-y-8">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    💡
                    プロジェクトで使用する主要な技術スタックを選択してください。カテゴリごとに整理されています。
                  </p>
                </div>

                <TechSelector
                  techStack={formData.techStack}
                  onToggleTech={toggleTech}
                  onVersionChange={setTechVersion}
                  onOtherChange={setOtherTechs}
                />
              </div>
            </div>
          </div>

          <PreviewArea markdown={previewMarkdown} />
        </div>
      </main>

      <WizardFooter onNext={handleNext} nextDisabled={!canGoNext} />
    </div>
  )
}
