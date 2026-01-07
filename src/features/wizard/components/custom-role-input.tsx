'use client'

import { useState } from 'react'

type CustomRoleInputProps = {
  value: string
  onChange: (value: string) => void
}

export const CustomRoleInput = ({ value, onChange }: CustomRoleInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-400"
      >
        <span className="transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          ▶
        </span>
        さらに細かく指定する（上級者向け）
      </button>

      {isExpanded && (
        <div className="mt-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`例:\n「あなたはNext.jsのApp Routerに精通し、\nReact Server Componentsを最大限活用する\nシニアエンジニアです」`}
            rows={6}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-white dark:focus:ring-white"
          />
        </div>
      )}
    </div>
  )
}
