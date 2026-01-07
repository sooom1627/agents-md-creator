'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { AIRole, AIRolePreset } from '../types'

type RoleCardProps = {
  role: AIRole
  isSelected: boolean
  onToggle: (roleId: AIRolePreset) => void
  /**
   * カードのインデックス（0始まり）
   * グリッドレイアウトでの位置を判定し、プレビューの表示位置を調整するために使用
   */
  index: number
}

export const RoleCard = ({
  role,
  isSelected,
  onToggle,
  index,
}: RoleCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onToggle(role.id)
  }

  // レスポンシブグリッドでの位置判定
  // md: 2列グリッド → 右列（奇数index）はプレビューを左揃え
  // lg: 3列グリッド → 右列（index % 3 === 2）はプレビューを左揃え
  const isRightColumnMd = index % 2 === 1
  const isRightColumnLg = index % 3 === 2

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isSelected}
      aria-expanded={isHovered}
      aria-describedby={isHovered ? `role-preview-${role.id}` : undefined}
      className={cn(
        'group relative flex min-h-[200px] w-full flex-col gap-3 rounded-lg border-2 p-5 text-left',
        'transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057A7] focus-visible:ring-offset-2',
        isSelected
          ? 'border-black ring-2 ring-black ring-offset-2 dark:border-white dark:ring-white'
          : 'border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600'
      )}
    >
      <div className="text-3xl" aria-hidden="true">
        {role.icon}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-black dark:text-zinc-50">
          {role.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {role.description}
        </p>
      </div>

      {isHovered && (
        <div
          id={`role-preview-${role.id}`}
          role="tooltip"
          className={cn(
            'absolute top-full z-50 mt-2 min-w-[320px] max-w-[400px] rounded-lg',
            'border-2 border-[#0057A7] bg-white p-4 shadow-xl',
            'dark:border-[#0057A7] dark:bg-zinc-900',
            'pointer-events-none',
            // モバイル: 常に左揃え
            'left-0',
            // md画面: 2列グリッドの右列は右揃え
            isRightColumnMd && 'md:left-auto md:right-0',
            // lg画面: 3列グリッドの右列は右揃え
            isRightColumnLg && 'lg:left-auto lg:right-0'
          )}
        >
          <p className="mb-2 text-xs font-semibold text-[#212529] dark:text-zinc-50">
            こんな時に選ぶ:
          </p>
          <ul className="mb-3 space-y-1 text-xs text-[#6C757D] dark:text-zinc-400">
            {role.tooltip.whenToUse.map((use, idx) => (
              <li key={idx}>・{use}</li>
            ))}
          </ul>
          <p className="mb-1 text-xs font-semibold text-[#212529] dark:text-zinc-50">
            生成される指示の例:
          </p>
          <p className="text-xs italic text-[#6C757D] dark:text-zinc-400">
            &quot;{role.tooltip.generatedExample}&quot;
          </p>
        </div>
      )}
    </button>
  )
}
