'use client'

import { useWizard } from '@/features/wizard/context'
import { useWizardNavigation } from '@/features/wizard/hooks'
import {
  WizardHeader,
  RoleSelector,
  CustomRoleInput,
  RoleExamples,
  PreviewArea,
  WizardFooter,
} from '@/features/wizard/components'
import { TOTAL_STEPS } from '@/features/wizard/types'

export default function Step2Page() {
  const { formData, toggleRole, setCustomRole, previewMarkdown, canGoNext } =
    useWizard()

  const { navigateToNextStep } = useWizardNavigation()

  const handleNext = () => {
    navigateToNextStep(2)
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <WizardHeader
        currentStep={2}
        totalSteps={TOTAL_STEPS}
        title="AIの役割"
      />

      <main className="flex flex-1 overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-6">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-4xl pb-80">
              <h2 className="mb-8 text-2xl font-bold text-black dark:text-zinc-50">
                AIの役割
              </h2>

              <div className="space-y-8">
                <RoleSelector
                  selectedRoles={formData.selectedRoles}
                  onToggleRole={toggleRole}
                />

                <CustomRoleInput
                  value={formData.customRole}
                  onChange={setCustomRole}
                />

                <RoleExamples />
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
