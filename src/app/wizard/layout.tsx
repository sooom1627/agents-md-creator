import { WizardProvider } from '@/features/wizard/context'
import type { ReactNode } from 'react'

export default function WizardLayout({ children }: { children: ReactNode }) {
  return <WizardProvider>{children}</WizardProvider>
}
