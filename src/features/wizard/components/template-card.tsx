'use client'

import { useState } from 'react'
import type { Template } from '../types'

type TemplateCardProps = {
  template: Template
  isSelected?: boolean
  onClick?: (templateId: string) => void
}

export const TemplateCard = ({
  template,
  isSelected = false,
  onClick,
}: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.(template.id)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative flex w-full flex-col gap-4 rounded-lg border-2 p-6 text-left
        transition-all duration-200 hover:shadow-lg
        ${
          isSelected
            ? 'border-black ring-2 ring-black ring-offset-2 dark:border-white dark:ring-white'
            : 'border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600'
        }
      `}
    >
      {template.popular && (
        <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black">
          Popular
        </div>
      )}

      <div className="text-4xl">{template.icon}</div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-black dark:text-zinc-50">
          {template.name}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {template.description}
        </p>
      </div>

      {isHovered && (
        <div className="flex flex-wrap gap-2">
          {template.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}
