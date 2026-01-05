import Link from 'next/link'

export default function TemplatePage() {
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

        <div className="mb-8 text-center">
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
