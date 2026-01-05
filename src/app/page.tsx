import Link from 'next/link'
import { CodeBlock } from '@/shared/components'
import { EXAMPLE_AGENTS_MD } from '@/shared/constants'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center gap-16 px-8 py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
            Agents.md Master Generator
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            AIエージェントが正確にプロジェクトコンテキストを理解するための設定ファイルを、迷わず作成できるWebウィザード
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/template"
            className="flex h-14 items-center justify-center rounded-lg bg-black px-8 text-base font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            テンプレートから始める
          </Link>
          <Link
            href="/wizard"
            className="flex h-14 items-center justify-center rounded-lg border-2 border-black px-8 text-base font-semibold text-black transition-colors hover:bg-zinc-100 dark:border-white dark:text-white dark:hover:bg-zinc-900"
          >
            ゼロから作る
          </Link>
        </div>

        <section className="flex w-full flex-col items-center gap-8">
          <h2 className="text-3xl font-bold text-black dark:text-zinc-50">
            生成されるファイルの例
          </h2>
          <CodeBlock code={EXAMPLE_AGENTS_MD} language="agents.md" />
        </section>
      </main>
    </div>
  )
}
