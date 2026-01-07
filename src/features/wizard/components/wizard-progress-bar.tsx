import type { WizardStep } from '../types'

type WizardProgressBarProps = {
  currentStep: WizardStep
  totalSteps: number
}

export const WizardProgressBar = ({
  currentStep,
  totalSteps,
}: WizardProgressBarProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
    >
      <div
        className="h-full bg-black transition-all duration-300 dark:bg-white"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  )
}
