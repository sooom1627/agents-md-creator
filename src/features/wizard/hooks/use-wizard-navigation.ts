import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import type { WizardStep } from '../types'

const STEP_PATHS: Record<WizardStep, string> = {
  1: '/wizard',
  2: '/wizard/step2',
  3: '/wizard/step3',
  4: '/wizard/step4',
  5: '/wizard/step5',
  6: '/wizard/step6',
}

export const useWizardNavigation = () => {
  const router = useRouter()

  const navigateToStep = useCallback(
    (step: WizardStep) => {
      const path = STEP_PATHS[step]
      if (path) {
        router.push(path)
      }
    },
    [router]
  )

  const navigateToNextStep = useCallback(
    (currentStep: WizardStep) => {
      const nextStep = (currentStep + 1) as WizardStep
      if (nextStep <= 6) {
        navigateToStep(nextStep)
      }
    },
    [navigateToStep]
  )

  const navigateToPreviousStep = useCallback(
    (currentStep: WizardStep) => {
      const previousStep = (currentStep - 1) as WizardStep
      if (previousStep >= 1) {
        navigateToStep(previousStep)
      }
    },
    [navigateToStep]
  )

  return {
    navigateToStep,
    navigateToNextStep,
    navigateToPreviousStep,
  }
}
