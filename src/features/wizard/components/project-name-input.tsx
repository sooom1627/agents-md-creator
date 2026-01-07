type ProjectNameInputProps = {
  value: string
  onChange: (value: string) => void
}

export const ProjectNameInput = ({ value, onChange }: ProjectNameInputProps) => {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="my-saas-app"
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-white dark:focus:ring-white"
      />
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        💡 GitHubのリポジトリ名と同じにしておくと管理しやすいです
      </p>
    </div>
  )
}
