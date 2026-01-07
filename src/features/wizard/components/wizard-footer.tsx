type WizardFooterProps = {
  onNext?: () => void
  nextDisabled?: boolean
}

export const WizardFooter = ({
  onNext,
  nextDisabled = false,
}: WizardFooterProps) => {
  return (
    <footer className="sticky bottom-0 border-t border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-7xl justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-lg bg-black px-6 py-2 font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          次へ
        </button>
      </div>
    </footer>
  )
}
