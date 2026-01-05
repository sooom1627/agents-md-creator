type CodeBlockProps = {
  code: string
  language?: string
}

export const CodeBlock = ({ code, language = 'markdown' }: CodeBlockProps) => {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-black">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm text-zinc-800 dark:text-zinc-200">
          {code}
        </code>
      </pre>
    </div>
  )
}
