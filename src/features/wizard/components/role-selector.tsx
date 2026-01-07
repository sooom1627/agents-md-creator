import { RoleCard } from './role-card'
import { AI_ROLES } from '../constants'
import type { AIRolePreset } from '../types'

type RoleSelectorProps = {
  selectedRoles: AIRolePreset[]
  onToggleRole: (roleId: AIRolePreset) => void
}

export const RoleSelector = ({
  selectedRoles,
  onToggleRole,
}: RoleSelectorProps) => {
  const maxSelections = 3
  const isMaxReached = selectedRoles.length >= maxSelections

  return (
    <div>
      <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 AIに「どんなエンジニアとして振る舞って欲しいか」を伝えます
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-black dark:text-zinc-50">
          プリセットから選択（最大3つまで選択可能、主要なもの1つを推奨）
        </p>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(maxSelections)].map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index < selectedRoles.length
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
                aria-label={`選択肢 ${index + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {selectedRoles.length}/{maxSelections}
          </span>
        </div>
      </div>

      {isMaxReached && (
        <div className="mb-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-950">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            ✓ 最大選択数に達しました。変更する場合は、既存の選択を解除してください。
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {AI_ROLES.map((role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            isSelected={selectedRoles.includes(role.id)}
            onToggle={onToggleRole}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
