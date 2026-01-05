'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TemplateCard } from '@/features/wizard/components/template-card'
import { TEMPLATES } from '@/features/wizard/constants'

export default function TemplatePage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  )

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <main className="w-full max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-black dark:text-zinc-50">
            あなたのプロジェクトに近いものは？
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            ※後で細かく調整できます
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplateId === template.id}
              onClick={handleTemplateSelect}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          {selectedTemplateId && (
            <Link
              href={`/wizard?template=${selectedTemplateId}`}
              className="flex h-14 items-center justify-center rounded-lg bg-black px-12 text-base font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              次へ進む
            </Link>
          )}

          <Link
            href="/wizard"
            className="text-zinc-600 underline transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            テンプレートを使わず、空白から作成する
          </Link>
        </div>
      </main>
    </div>
  )
}
