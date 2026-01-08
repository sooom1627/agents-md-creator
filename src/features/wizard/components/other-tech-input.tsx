'use client'

import { useState } from 'react'

type OtherTechInputProps = {
  value: string
  onChange: (value: string) => void
}

export const OtherTechInput = ({ value, onChange }: OtherTechInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-black dark:text-zinc-50"
      >
        <span
          style={{
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          ▶
        </span>
        リストにない技術を追加
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="例: Zod, React Hook Form, Framer Motion"
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            カンマ区切りで複数指定できます
          </p>
        </div>
      )}
    </div>
  )
}
