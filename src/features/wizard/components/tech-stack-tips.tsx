'use client'

import { useState } from 'react'

export const TechStackTips = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <span className="font-medium text-black dark:text-zinc-50">
          💡 Tech Stack の書き方のコツ
        </span>
        <span
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="space-y-3 border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div>
            <p className="mb-2 text-sm font-semibold text-green-600 dark:text-green-400">
              ✅ 良い例:
            </p>
            <div className="rounded-md bg-green-50 p-3 dark:bg-green-950">
              <code className="text-sm text-green-900 dark:text-green-100">
                &quot;Next.js 15 (App Router), TypeScript (strict mode), Tailwind
                CSS v3&quot;
              </code>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-red-600 dark:text-red-400">
              ❌ 悪い例:
            </p>
            <div className="rounded-md bg-red-50 p-3 dark:bg-red-950">
              <code className="text-sm text-red-900 dark:text-red-100">
                &quot;React, TypeScript, いろいろ&quot;
              </code>
            </div>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              → バージョンや重要な詳細が不足
            </p>
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium text-black dark:text-zinc-50">
              推奨:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>• コア技術は5〜8個に絞る</li>
              <li>• バージョンは重要な技術のみ指定</li>
              <li>• &quot;TypeScript (strict mode)&quot; のように詳細を添える</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
