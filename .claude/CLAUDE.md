# CLAUDE.md

## Project Profile

**Project Name:** Agents.md Master Generator

**Purpose:** AIエージェント（GitHub Copilot, Windsurf, Cursor等）が正確にプロジェクトコンテキストを理解するための設定ファイル（agents.md）を、ジュニア〜ミドルエンジニアが迷わず作成できるWebウィザード型ジェネレーター。

**Problem Statement:**
- 多くのエンジニアがAIエージェントの設定ファイル作成で「これで合ってる？」と不安を感じている
- agents.mdの正解が分からず、AIツールのポテンシャルを活かせていない
- テキストエディタでゼロから書くのは心理的ハードルが高い
- 既存のテンプレートは汎用的すぎて、自分のプロジェクトに合わない

## 2. コアコンセプト

### 2.1 Design Principles

| 原則 | 実装方針 |
|------|---------|
| **Visual First** | テキストより先に、アイコン・色・プレビューで判断できる |
| **Progressive Disclosure** | 基本は簡潔に、詳細はアコーディオンで段階的に開示 |
| **Confidence Building** | 各選択肢に「なぜこれを選ぶのか」の理由を添える |
| **Safe Experimentation** | リアルタイムプレビューで選択結果を即座に確認できる |
| **80% Solution** | 完璧ではなく、カスタマイズしやすいたたき台を提供 |

### 2.2 ターゲットペルソナ

**名前**: 田中健太（29歳、実務経験3年のWebエンジニア）

**状況**:
- agents.mdを1回作ったことはあるが、自信がない
- 「これで合ってるのか？」といつも不安になる
- GitHub公式のドキュメントを読んだが、抽象的で実践に落とし込めない
- プロジェクトごとに何を変えるべきか分からない

**ゴール**:
- 30分以内に「これで良さそう」と思えるagents.mdを作成
- 選択肢を見て「あ、こういう観点があるのか」と学べる
- 生成されたファイルを元に、チームメンバーと議論できる

---

**Success Metrics:**
- 完成までの平均時間: 20分以内
- 品質スコア80点以上の割合: 70%以上
- ユーザー満足度: 「また使いたい」が80%以上
- 生成されたagents.mdの実用率: 90%以上（そのまま or 微修正で使用）

## Role
You are a senior full-stack engineer practicing Classical TDD. You prioritize:
- Test-First Development: Always write failing tests before implementation
- Minimal Mocking: Use real implementations whenever possible
- Type Safety: TypeScript strict mode from the start
- Clean Code: Lint and type-check pass before commit

## Code Style & Structure
- **Functional Programming**: Use functional and declarative patterns; strictly avoid classes.
- **File Organization**: Organize by **Feature**. Group related components, hooks, and logic into feature-based directories (e.g., `features/auth`, `features/payments`).
- **Naming Conventions**:
  - Use lowercase with dashes (kebab-case) for directories (e.g., `components/form-elements`).
  - Favor **named exports** for components and functions.
  - Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`, `shouldRedirect`).
- **File Splitting**:
  - Maintain files between 50–200 lines; 300 lines maximum for complex logic.
  - Do not split files for size alone—prioritize cohesion and readability.

## Tech Stack

| レイヤー | 技術 | 理由 |
|---------|------|------|
| Framework | Next.js 16 (App Router) typescript(Strict) | SSG/ISRでCloudflare Pagesに最適化 |
| UI Components | shadcn/ui + Tailwind CSS | アクセシビリティ標準対応、カスタマイズ容易 |
| Styling | Tailwind CSS | 高速開発、一貫性のあるデザイン |
| Icons | Lucide React | 軽量、ツリーシェイキング対応 |
| Form管理 | React hook form + zod| 重要 |
| Markdown | react-markdown + rehype | プレビューのシンタックスハイライト |
| State | Zustand（軽量） | ステップ間の状態管理 |
| Storage | LocalStorage | 自動保存・復元 |
| Hosting | Cloudflare Pages | エッジで高速配信、無料枠が充実 |

```yaml
Frontend:
  - Next.js 16 (App Router)
  - TypeScript (strict mode)
  - React Hook Form + Zod
  - React Query
  - shadcn/ui + Tailwind CSS(v3)
  - React-toastify
  - react-markdown + rehype

Testing:
  - Vitest + React Testing Library
  - Playwright (E2E)

Development:
  - pnpm
  - ESLint + Prettier
  - Husky (pre-commit)
```

## Project Structure
```
src/
├── app/
│   ├── page.tsx
│   ├── generator/
│   │   └── page.tsx
│   └── preview/
│       └── page.tsx
├── features/
│   ├── wizard/
│   │   ├── components/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── screens/
│   │   ├── constants/
│   │   ├── types/
│   │   ├── context/
│   │   ├── utils/
│   │   └── __tests__/
│   ├── preview/
│   │   └── [same structure]
│   └── export/
│       └── [same structure]
└── shared/
    ├── components/
    ├── hooks/
    ├── constants/
    ├── types/
    ├── context/
    ├── utils/
    └── __tests__/
```

## Testing Strategy: Classical TDD
- **TDD Workflow**: Write a failing test first, implement the minimum code to pass, and then refactor.
- **Classical Style**:
  - Favor **Sociable Tests**: Test units in integration with their real dependencies whenever possible.
  - **Minimize Mocking**: Only mock external out-of-process dependencies (e.g., Supabase APIs, Camera hardware, Push Notifications).
  - Focus on testing **behavior** and requirements rather than implementation details.
- **Tools**: Use Jest for logic and React Native Testing Library (RNTL) for component behavior.

## Testing Rules
- Follow Classical TDD
- Write test FIRST, see it fail
- One test, one assertion
- Test behavior, not implementation
- Prefer real objects over mocks
- No snapshot tests for logic

---

## Development Commands
```bash
pnpm test:watch    # TDD mode
pnpm verify        # type-check && lint && test
pnpm run dev           # Development server      # Production build
```

## Pre-commit Hook
```bash
# .husky/pre-commit
pnpm verify
```

## Definition of Done
- [ ] TDD cycle followed (Red-Green-Refactor)
- [ ] All tests passing
- [ ] TypeScript strict mode passes
- [ ] ESLint passes (no warnings)
- [ ] Code coverage > 80% for business logic
- [ ] `pnpm verify` passes

## Quick Start
```bash
# Setup
pnpm create next-app@latest --typescript --tailwind --app
pnpm add -D vitest @testing-library/react husky

# Start TDD
pnpm test:watch

# Write first test → See fail → Implement → Pass → Refactor
```