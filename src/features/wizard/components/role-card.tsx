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

  // グリッドレイアウトでの行判定
  // mobile (1列): 全て下に表示
  // md (2列): 0-1が上段、2-3が下段、4-5が下段
  // lg (3列): 0-2が上段、3-5が下段
  const isTopRowMd = index <= 1 // 2列グリッドで最初の行
  const isTopRowLg = index <= 2 // 3列グリッドで最初の行
  const isRightmostLg = index % 3 === 2 // 3列グリッドで右端の列

  return (
    <div className="relative">
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
          'transition-all duration-300 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057A7] focus-visible:ring-offset-2',
          isSelected
            ? 'border-black bg-zinc-50 ring-2 ring-black ring-offset-2 dark:border-white dark:bg-zinc-900 dark:ring-white'
            : 'border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600'
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
      </button>

      {/* Tooltip - positioned outside button for better z-index control */}
      {isHovered && (
        <div
          id={`role-preview-${role.id}`}
          role="tooltip"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            // Base styles
            'absolute left-0 right-0 z-100',
            'w-full rounded-lg border-2 border-[#0057A7] bg-white p-4 shadow-2xl',
            'dark:border-[#0057A7] dark:bg-zinc-900',
            // Mobile: always below
            'top-[calc(100%+0.5rem)]',
            // md (2-column grid): top row below, bottom row above
            isTopRowMd
              ? 'md:top-[calc(100%+0.5rem)] md:bottom-auto'
              : 'md:top-auto md:bottom-[calc(100%+0.5rem)]',
            // lg (3-column grid): top row below, bottom row above
            isTopRowLg
              ? 'lg:top-[calc(100%+0.5rem)] lg:bottom-auto'
              : 'lg:top-auto lg:bottom-[calc(100%+0.5rem)]',
            // lg (3-column grid): rightmost column align right to prevent overflow
            isRightmostLg ? 'lg:right-0 lg:left-auto' : ''
          )}
        >
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs font-bold text-black dark:text-zinc-50">
                こんな時に選ぶ:
              </p>
              <ul className="space-y-1.5 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {role.tooltip.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-1.5">
                    <span className="text-[#0057A7]">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
              <p className="mb-1.5 text-xs font-bold text-black dark:text-zinc-50">
                生成される指示の例:
              </p>
              <p className="text-xs italic leading-relaxed text-zinc-600 dark:text-zinc-400">
                &quot;{role.tooltip.generatedExample}&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
