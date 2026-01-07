import { WizardProgressBar } from './wizard-progress-bar'
import type { WizardStep } from '../types'

type WizardHeaderProps = {
  currentStep: WizardStep
  totalSteps: number
  title: string
}

export const WizardHeader = ({
  currentStep,
  totalSteps,
  title,
}: WizardHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-lg font-semibold text-black dark:text-zinc-50">
          Step {currentStep}/{totalSteps}: {title}
        </h1>
        <WizardProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
    </header>
  )
}
