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
  return (
    <div>
      <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 AIに「どんなエンジニアとして振る舞って欲しいか」を伝えます
        </p>
      </div>

      <p className="mb-4 text-sm font-medium text-black dark:text-zinc-50">
        プリセットから選択（複数選択可、主要なもの1つを推奨）
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {AI_ROLES.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            isSelected={selectedRoles.includes(role.id)}
            onToggle={onToggleRole}
          />
        ))}
      </div>
    </div>
  )
}
