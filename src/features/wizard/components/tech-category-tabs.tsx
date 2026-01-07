import { cn } from '@/lib/utils'
import type { TechCategory } from '../types'
import { TECH_CATEGORIES } from '../constants'

type TechCategoryTabsProps = {
  activeCategory: TechCategory
  onCategoryChange: (category: TechCategory) => void
  categorySelectionCount: Record<TechCategory, number>
}

export const TechCategoryTabs = ({
  activeCategory,
  onCategoryChange,
  categorySelectionCount,
}: TechCategoryTabsProps) => {
  const categories: TechCategory[] = [
    'frontend',
    'backend',
    'database',
    'styling',
    'testing',
    'tools',
  ]

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-wrap gap-2 md:gap-4">
        {categories.map((category) => {
          const { label, icon } = TECH_CATEGORIES[category]
          const count = categorySelectionCount[category]
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium',
                'border-b-2 transition-colors',
                isActive
                  ? 'border-black text-black dark:border-white dark:text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              )}
            >
              <span aria-hidden="true">{icon}</span>
              <span>{label}</span>
              {count > 0 && (
                <span
                  className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white dark:bg-blue-500"
                  aria-label={`${count}個選択中`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
