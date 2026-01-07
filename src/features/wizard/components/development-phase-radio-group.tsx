import type { DevelopmentPhase } from '../types'

type DevelopmentPhaseRadioGroupProps = {
  value: DevelopmentPhase | null
  onChange: (value: DevelopmentPhase) => void
}

type PhaseOption = {
  value: DevelopmentPhase
  icon: string
  label: string
  description: string
}

const PHASE_OPTIONS: PhaseOption[] = [
  {
    value: 'new',
    icon: '🆕',
    label: '新規開発',
    description: 'ゼロから立ち上げるプロジェクト',
  },
  {
    value: 'feature-add',
    icon: '➕',
    label: '機能追加',
    description: '既存システムに新しい機能を実装',
  },
  {
    value: 'refactoring',
    icon: '🔄',
    label: 'リファクタリング',
    description: 'コードの整理や技術スタックの更新',
  },
  {
    value: 'maintenance',
    icon: '🛠️',
    label: '保守・運用',
    description: 'バグ修正や小さな改善が中心',
  },
]

export const DevelopmentPhaseRadioGroup = ({
  value,
  onChange,
}: DevelopmentPhaseRadioGroupProps) => {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-black dark:text-zinc-50">
        開発フェーズ
      </p>
      <div className="space-y-3">
        {PHASE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          >
            <input
              type="radio"
              name="developmentPhase"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value as DevelopmentPhase)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-black dark:text-zinc-50">
                {option.icon} {option.label}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
