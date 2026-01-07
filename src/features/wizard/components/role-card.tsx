'use client'

import { useState } from 'react'
import type { AIRole, AIRolePreset } from '../types'

type RoleCardProps = {
  role: AIRole
  isSelected: boolean
  onToggle: (roleId: AIRolePreset) => void
}

export const RoleCard = ({ role, isSelected, onToggle }: RoleCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onToggle(role.id)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex min-h-[200px] w-full flex-col gap-3 rounded-lg border-2 p-5 text-left
        transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1
        ${
          isSelected
            ? 'border-black ring-2 ring-black ring-offset-2 dark:border-white dark:ring-white'
            : 'border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600'
        }
      `}
    >
      <div className="text-3xl">{role.icon}</div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-black dark:text-zinc-50">
          {role.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {role.description}
        </p>
      </div>

      {isHovered && (
        <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-xs font-semibold text-black dark:text-zinc-50">
            こんな時に選ぶ:
          </p>
          <ul className="mb-3 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            {role.tooltip.whenToUse.map((use, index) => (
              <li key={index}>・{use}</li>
            ))}
          </ul>
          <p className="mb-1 text-xs font-semibold text-black dark:text-zinc-50">
            生成される指示の例:
          </p>
          <p className="text-xs italic text-zinc-600 dark:text-zinc-400">
            &quot;{role.tooltip.generatedExample}&quot;
          </p>
        </div>
      )}
    </button>
  )
}
