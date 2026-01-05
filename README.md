# Agents.md Master Generator

AIエージェント（GitHub Copilot, Windsurf, Cursor等）が正確にプロジェクトコンテキストを理解するための設定ファイル（agents.md）を、ジュニア〜ミドルエンジニアが迷わず作成できるWebウィザード型ジェネレーター。

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Form Management:** React Hook Form + Zod
- **Data Fetching:** React Query
- **UI Components:** shadcn/ui
- **Notifications:** React-toastify
- **Testing:** Vitest + React Testing Library
- **Git Hooks:** Husky

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Commands

```bash
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm lint          # Run ESLint
pnpm test          # Run tests
pnpm test:watch    # Run tests in watch mode (TDD mode)
pnpm test:coverage # Run tests with coverage
pnpm type-check    # Run TypeScript type checking
pnpm verify        # Run all checks (type-check + lint + test)
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── features/              # Feature-based modules
│   ├── wizard/           # Wizard flow feature
│   ├── preview/          # Preview feature
│   └── export/           # Export feature
└── shared/               # Shared utilities and components
    ├── components/
    ├── hooks/
    ├── utils/
    └── types/
```

## Development Workflow

This project follows Classical TDD principles:

1. Write a failing test first
2. Implement the minimum code to pass
3. Refactor while keeping tests green

```bash
# Start TDD mode
pnpm test:watch
```

## Pre-commit Hook

Husky is configured to run `pnpm verify` before each commit to ensure code quality.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
# agents-md-creator
