import Link from 'next/link'
import { FileText, Sparkles, Zap } from 'lucide-react'
import { CodeBlock } from '@/shared/components'
import { EXAMPLE_AGENTS_MD } from '@/shared/constants'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#E5F0F9] to-white font-sans dark:from-zinc-900 dark:to-black">
      <main className="flex w-full max-w-6xl flex-col items-center gap-20 px-6 py-16 sm:px-8">
        {/* Hero Section */}
        <header className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center justify-center rounded-full bg-[#0057A7] p-4 shadow-lg" aria-hidden="true">
            <FileText className="h-12 w-12 text-white" />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold tracking-tight text-[#212529] sm:text-6xl lg:text-7xl">
              Agents.md Master Generator
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#6C757D] sm:text-2xl">
              AIエージェントが正確にプロジェクトコンテキストを理解するための設定ファイルを、<br className="hidden sm:inline" />
              <span className="font-semibold text-[#0057A7]">迷わず作成できるWebウィザード</span>
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm" role="status">
              <Sparkles className="h-4 w-4 text-[#0057A7]" aria-hidden="true" />
              <span className="font-medium text-[#212529]">30分以内に完成</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm" role="status">
              <Zap className="h-4 w-4 text-[#0057A7]" aria-hidden="true" />
              <span className="font-medium text-[#212529]">品質スコア80点以上</span>
            </div>
          </div>
        </header>

        {/* CTA Buttons */}
        <nav className="flex flex-col gap-4 sm:flex-row" aria-label="主要なナビゲーション">
          <Link
            href="/template"
            className="group flex h-14 items-center justify-center gap-2 rounded-lg bg-[#0057A7] px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-[#003D75] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057A7] focus-visible:ring-offset-2 active:scale-95"
            aria-label="テンプレートから始める（推奨）"
          >
            <FileText className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            <span>テンプレートから始める</span>
          </Link>
          <Link
            href="/wizard"
            className="group flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-[#0057A7] bg-white px-8 text-base font-semibold text-[#0057A7] shadow-sm transition-all hover:bg-[#E5F0F9] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057A7] focus-visible:ring-offset-2 active:scale-95"
            aria-label="ゼロから作る"
          >
            <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            <span>ゼロから作る</span>
          </Link>
        </nav>

        {/* Example Section */}
        <section className="flex w-full flex-col items-center gap-8" aria-labelledby="example-heading">
          <div className="text-center">
            <h2 id="example-heading" className="text-3xl font-bold text-[#212529] sm:text-4xl">
              生成されるファイルの例
            </h2>
            <p className="mt-3 text-base text-[#6C757D]">
              このツールで作成できるagents.mdファイルのサンプルをご覧ください
            </p>
          </div>
          <div className="w-full" role="region" aria-label="agents.mdファイルのコード例">
            <CodeBlock code={EXAMPLE_AGENTS_MD} language="agents.md" />
          </div>
        </section>
      </main>
    </div>
  )
}
