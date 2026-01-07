type ProjectPurposeInputProps = {
  value: string
  onChange: (value: string) => void
}

export const ProjectPurposeInput = ({
  value,
  onChange,
}: ProjectPurposeInputProps) => {
  return (
    <div>
      <label
        htmlFor="projectPurpose"
        className="mb-2 block text-sm font-medium text-black dark:text-zinc-50"
      >
        プロジェクトの目的
      </label>
      <textarea
        id="projectPurpose"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="中小企業向けの請求書管理SaaS"
        rows={3}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-white dark:focus:ring-white"
      />
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        💡 AIがコードを書く時の「方向性」を理解するために重要です
      </p>
    </div>
  )
}
