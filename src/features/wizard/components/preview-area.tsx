import { CodeBlock } from '@/shared/components'

type PreviewAreaProps = {
  markdown: string
}

export const PreviewArea = ({ markdown }: PreviewAreaProps) => {
  return (
    <div className="hidden w-full max-w-2xl overflow-y-auto border-l border-zinc-200 bg-white px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900 lg:block">
      <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
        プレビュー
      </h3>
      <CodeBlock code={markdown} language="agents.md" />
    </div>
  )
}
