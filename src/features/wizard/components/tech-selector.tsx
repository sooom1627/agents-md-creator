'use client'

import { useState } from 'react'
import type { TechCategory, TechStackData } from '../types'
import { getTechsByCategory } from '../constants'
import { TechCard } from './tech-card'
import { TechCategoryTabs } from './tech-category-tabs'
import { OtherTechInput } from './other-tech-input'
import { TechStackTips } from './tech-stack-tips'

type TechSelectorProps = {
  techStack: TechStackData
  onToggleTech: (category: TechCategory, techId: string) => void
  onVersionChange: (category: TechCategory, techId: string, version: string) => void
  onOtherChange: (value: string) => void
}

export const TechSelector = ({
  techStack,
  onToggleTech,
  onVersionChange,
  onOtherChange,
}: TechSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('frontend')

  // Get techs for active category
  const techs = getTechsByCategory(activeCategory)

  // Get selected tech IDs for active category
  const selectedTechs = techStack[activeCategory]

  // Calculate selection count per category for badge
  const categorySelectionCount: Record<TechCategory, number> = {
    frontend: techStack.frontend.length,
    backend: techStack.backend.length,
    database: techStack.database.length,
    styling: techStack.styling.length,
    testing: techStack.testing.length,
    tools: techStack.tools.length,
  }

  // Total selection count
  const totalSelected = Object.values(categorySelectionCount).reduce(
    (sum, count) => sum + count,
    0
  )

  return (
    <div className="space-y-6">
      {/* Info box */}
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 プロジェクトで使用する主要技術を選択してください（5〜8個を推奨）
        </p>
      </div>

      {/* Selection count indicator */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-black dark:text-zinc-50">
          選択中の技術
        </p>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {totalSelected} 個
        </span>
      </div>

      {/* Category tabs */}
      <TechCategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categorySelectionCount={categorySelectionCount}
      />

      {/* Tech cards grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {techs.map((tech, index) => {
          const selection = selectedTechs.find((t) => t.id === tech.id)
          const isSelected = !!selection

          return (
            <TechCard
              key={tech.id}
              tech={tech}
              isSelected={isSelected}
              selectedVersion={selection?.version}
              onToggle={(techId) => onToggleTech(activeCategory, techId)}
              onVersionChange={(techId, version) =>
                onVersionChange(activeCategory, techId, version)
              }
              index={index}
            />
          )
        })}
      </div>

      {/* Other techs input */}
      <OtherTechInput value={techStack.other} onChange={onOtherChange} />

      {/* Tips accordion */}
      <TechStackTips />
    </div>
  )
}
