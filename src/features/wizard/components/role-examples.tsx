'use client'

import { useState } from 'react'

export const RoleExamples = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
      >
        <span className="font-medium text-black dark:text-zinc-50">
          良い役割定義の例
        </span>
        <span className="transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-green-600 dark:text-green-400">
                ✅ 良い例:
              </p>
              <div className="rounded-md bg-green-50 p-3 dark:bg-green-950">
                <code className="text-sm text-green-900 dark:text-green-100">
                  &quot;You are a senior TypeScript engineer who prioritizes
                  type safety and follows functional programming patterns.&quot;
                </code>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-red-600 dark:text-red-400">
                ❌ 悪い例:
              </p>
              <div className="rounded-md bg-red-50 p-3 dark:bg-red-950">
                <code className="text-sm text-red-900 dark:text-red-100">
                  &quot;You are a good developer.&quot;
                </code>
              </div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                → 抽象的すぎて、AIの行動が変わりません
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://github.blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                📖 GitHub公式: 効果的な役割定義の書き方
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
