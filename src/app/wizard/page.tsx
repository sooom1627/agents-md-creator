'use client'

import { useState, useMemo } from 'react'
import { CodeBlock } from '@/shared/components'
import { generateMarkdownPreview } from '@/features/wizard/utils'
import type { DevelopmentPhase } from '@/features/wizard/types'

export default function WizardPage() {
  const [projectName, setProjectName] = useState('')
  const [projectPurpose, setProjectPurpose] = useState('')
  const [developmentPhase, setDevelopmentPhase] = useState<DevelopmentPhase | null>(null)

  const previewMarkdown = useMemo(
    () =>
      generateMarkdownPreview({
        projectName,
        projectPurpose,
        developmentPhase,
      }),
    [projectName, projectPurpose, developmentPhase]
  )

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-lg font-semibold text-black dark:text-zinc-50">
            Step 1/6: プロジェクト基本情報
          </h1>
          {/* Progress Bar */}
          <div
            role="progressbar"
            aria-valuenow={1}
            aria-valuemin={1}
            aria-valuemax={6}
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
          >
            <div
              className="h-full bg-black transition-all duration-300 dark:bg-white"
              style={{ width: `${(1 / 6) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-6">
          {/* Input Area */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-8 text-2xl font-bold text-black dark:text-zinc-50">
                プロジェクト基本情報
              </h2>

              <div className="space-y-6">
                {/* Project Name */}
                <div>
                  <label
                    htmlFor="projectName"
                    className="mb-2 block text-sm font-medium text-black dark:text-zinc-50"
                  >
                    プロジェクト名
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="my-saas-app"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-white dark:focus:ring-white"
                  />
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    💡 GitHubのリポジトリ名と同じにしておくと管理しやすいです
                  </p>
                </div>

                {/* Project Purpose */}
                <div>
                  <label
                    htmlFor="projectPurpose"
                    className="mb-2 block text-sm font-medium text-black dark:text-zinc-50"
                  >
                    プロジェクトの目的
                  </label>
                  <textarea
                    id="projectPurpose"
                    value={projectPurpose}
                    onChange={(e) => setProjectPurpose(e.target.value)}
                    placeholder="中小企業向けの請求書管理SaaS"
                    rows={3}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-white dark:focus:ring-white"
                  />
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    💡 AIがコードを書く時の「方向性」を理解するために重要です
                  </p>
                </div>

                {/* Development Phase */}
                <div>
                  <p className="mb-3 text-sm font-medium text-black dark:text-zinc-50">
                    開発フェーズ
                  </p>
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600">
                      <input
                        type="radio"
                        name="developmentPhase"
                        value="new"
                        checked={developmentPhase === 'new'}
                        onChange={(e) => setDevelopmentPhase(e.target.value as DevelopmentPhase)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-black dark:text-zinc-50">
                          🆕 新規開発
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          ゼロから立ち上げるプロジェクト
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600">
                      <input
                        type="radio"
                        name="developmentPhase"
                        value="feature-add"
                        checked={developmentPhase === 'feature-add'}
                        onChange={(e) => setDevelopmentPhase(e.target.value as DevelopmentPhase)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-black dark:text-zinc-50">
                          ➕ 機能追加
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          既存システムに新しい機能を実装
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600">
                      <input
                        type="radio"
                        name="developmentPhase"
                        value="refactoring"
                        checked={developmentPhase === 'refactoring'}
                        onChange={(e) => setDevelopmentPhase(e.target.value as DevelopmentPhase)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-black dark:text-zinc-50">
                          🔄 リファクタリング
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          コードの整理や技術スタックの更新
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600">
                      <input
                        type="radio"
                        name="developmentPhase"
                        value="maintenance"
                        checked={developmentPhase === 'maintenance'}
                        onChange={(e) => setDevelopmentPhase(e.target.value as DevelopmentPhase)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-black dark:text-zinc-50">
                          🛠️ 保守・運用
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          バグ修正や小さな改善が中心
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="hidden w-full max-w-2xl overflow-y-auto border-l border-zinc-200 bg-white px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900 lg:block">
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
              プレビュー
            </h3>
            <CodeBlock code={previewMarkdown} language="agents.md" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 border-t border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl justify-end">
          <button
            type="button"
            className="rounded-lg bg-black px-6 py-2 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            次へ
          </button>
        </div>
      </footer>
    </div>
  )
}
