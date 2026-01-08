import type { Tech, TechCategory } from '../types'

export const TECH_STACK: Tech[] = [
  // ===== Frontend =====
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: '▲',
    description: 'React × SSR/SSG の統合フレームワーク',
    category: 'frontend',
    isPopular: true,
    hasVersions: true,
    versions: ['16', '15', '14', '13'],
    tooltip: {
      whenToUse: [
        'SEOが重要なサイト（ブログ、EC）',
        'サーバーとクライアントを統合管理したい',
        'App Routerで最新のReact機能を使いたい',
      ],
      agentsMdExample: 'Next.js 15 App Router with React Server Components as default',
    },
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: '⚡',
    description: '高速ビルドツール（Next.js以外の場合）',
    category: 'frontend',
    isPopular: false,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        '開発時の高速なHMRが欲しい',
        'モダンなビルド環境',
        'ES Modulesネイティブサポート',
      ],
      agentsMdExample: 'Vite for fast development and optimized production builds',
    },
  },

  // ===== Backend (BaaS) =====
  {
    id: 'supabase-backend',
    name: 'Supabase',
    icon: '⚡',
    description: 'PostgreSQL + 認証 + ストレージ',
    category: 'backend',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'バックエンドを素早く構築したい',
        'PostgreSQLベースのBaaS',
        '認証・リアルタイム・ストレージが必要',
      ],
      agentsMdExample: 'Supabase for backend-as-a-service with PostgreSQL, Auth, and Storage',
    },
  },
  {
    id: 'firebase',
    name: 'Firebase',
    icon: '🔥',
    description: 'Google製BaaSプラットフォーム',
    category: 'backend',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'Google製のBaaSを使いたい',
        'リアルタイムデータベース',
        'Firestore、Auth、Hosting統合',
      ],
      agentsMdExample: 'Firebase for Google-backed BaaS with Firestore, Auth, and Hosting',
    },
  },
  {
    id: 'appwrite',
    name: 'Appwrite',
    icon: '🚀',
    description: 'セルフホスト可能なBaaS',
    category: 'backend',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'セルフホストでBaaSを運用',
        'データの完全なコントロール',
        '認証・データベース・ストレージ統合',
      ],
      agentsMdExample: 'Appwrite for self-hosted BaaS with full data control',
    },
  },
  {
    id: 'nextjs-api',
    name: 'Next.js API Routes',
    icon: '▲',
    description: 'Next.js統合API（軽量なAPI用）',
    category: 'backend',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'フロントエンドと同じリポジトリで管理',
        'サーバーレスデプロイ',
        '簡易的なAPIエンドポイント',
      ],
      agentsMdExample: 'Next.js API Routes for serverless backend functions',
    },
  },

  // ===== Database (Managed Services) =====
  {
    id: 'supabase-postgres',
    name: 'Supabase Postgres',
    icon: '⚡',
    description: 'PostgreSQLマネージドDB + リアルタイム',
    category: 'database',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'PostgreSQLをマネージドで使いたい',
        'リアルタイムサブスクリプション',
        'Row Level Security（RLS）が必要',
      ],
      agentsMdExample: 'Supabase Postgres with real-time subscriptions and RLS',
    },
  },
  {
    id: 'planetscale',
    name: 'PlanetScale',
    icon: '🌍',
    description: 'MySQLベースのサーバーレスDB',
    category: 'database',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'サーバーレスでスケーラブルなMySQL',
        'ブランチング機能でDB管理',
        '高速なクエリパフォーマンス',
      ],
      agentsMdExample: 'PlanetScale for serverless MySQL with branching workflow',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    icon: '💜',
    description: 'サーバーレスPostgreSQL',
    category: 'database',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'サーバーレスPostgreSQLが必要',
        '自動スケーリング',
        'ブランチング・コピー機能',
      ],
      agentsMdExample: 'Neon for serverless PostgreSQL with auto-scaling',
    },
  },
  {
    id: 'firebase-firestore',
    name: 'Firebase Firestore',
    icon: '🔥',
    description: 'NoSQLドキュメントDB（Firebase）',
    category: 'database',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'リアルタイム同期が必要',
        'NoSQLドキュメントモデル',
        'Firebaseエコシステム',
      ],
      agentsMdExample: 'Firebase Firestore for real-time NoSQL document database',
    },
  },
  {
    id: 'mongodb-atlas',
    name: 'MongoDB Atlas',
    icon: '🍃',
    description: 'MongoDBマネージドサービス',
    category: 'database',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'スキーマレスな柔軟性',
        'JSONドキュメント',
        'MongoDB Atlasマネージド',
      ],
      agentsMdExample: 'MongoDB Atlas for managed NoSQL document database',
    },
  },
  {
    id: 'prisma',
    name: 'Prisma (ORM)',
    icon: '🔷',
    description: 'モダンなORM',
    category: 'database',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        '型安全なデータベースアクセス',
        'マイグレーション管理',
        'TypeScriptとの統合',
      ],
      agentsMdExample: 'Prisma ORM for type-safe database operations',
    },
  },
  {
    id: 'drizzle',
    name: 'Drizzle (ORM)',
    icon: '🌧️',
    description: '軽量高速ORM',
    category: 'database',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        '軽量なORMが必要',
        'SQLに近い記法',
        'エッジランタイム対応',
      ],
      agentsMdExample: 'Drizzle ORM for lightweight and edge-compatible queries',
    },
  },

  // ===== Styling =====
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: '🎨',
    description: 'ユーティリティファーストCSS',
    category: 'styling',
    isPopular: true,
    hasVersions: true,
    versions: ['4', '3'],
    tooltip: {
      whenToUse: [
        '高速なプロトタイピング',
        'カスタムデザインシステム',
        'JITコンパイルで最適化',
      ],
      agentsMdExample: 'Tailwind CSS v3 with custom design tokens',
    },
  },
  {
    id: 'css-modules',
    name: 'CSS Modules',
    icon: '📦',
    description: 'スコープ付きCSS',
    category: 'styling',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'スコープ分離されたCSS',
        'コンポーネント単位のスタイル',
        'プレーンなCSSを好む',
      ],
      agentsMdExample: 'CSS Modules for scoped component styles',
    },
  },
  {
    id: 'styled-components',
    name: 'Styled Components',
    icon: '💅',
    description: 'CSS-in-JS',
    category: 'styling',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'JavaScriptでスタイル管理',
        '動的なスタイリング',
        'テーマ機能が必要',
      ],
      agentsMdExample: 'Styled Components for CSS-in-JS with theming',
    },
  },
  {
    id: 'shadcn-ui',
    name: 'shadcn/ui',
    icon: '🎯',
    description: 'コピペ可能なコンポーネント',
    category: 'styling',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'アクセシブルなUIコンポーネント',
        'Tailwind CSSベース',
        'カスタマイズ性が高い',
      ],
      agentsMdExample: 'shadcn/ui components with Tailwind CSS and Radix UI',
    },
  },

  // ===== Testing =====
  {
    id: 'jest',
    name: 'Jest',
    icon: '🃏',
    description: 'オールインワンテストフレームワーク',
    category: 'testing',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'React Testing Libraryと組み合わせ',
        'スナップショットテスト',
        '豊富なエコシステム',
      ],
      agentsMdExample: 'Jest + React Testing Library for unit and integration tests',
    },
  },
  {
    id: 'vitest',
    name: 'Vitest',
    icon: '⚡',
    description: 'Vite対応のテストランナー',
    category: 'testing',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'Viteプロジェクト',
        '高速なユニットテスト',
        'Jest互換のAPI',
      ],
      agentsMdExample: 'Vitest + React Testing Library (Classical TDD)',
    },
  },
  {
    id: 'playwright',
    name: 'Playwright',
    icon: '🎭',
    description: 'クロスブラウザE2Eテスト',
    category: 'testing',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'E2Eテスト',
        'クロスブラウザテスト',
        'ヘッドレスブラウザ自動化',
      ],
      agentsMdExample: 'Playwright for end-to-end testing across browsers',
    },
  },
  {
    id: 'cypress',
    name: 'Cypress',
    icon: '🌲',
    description: '開発者フレンドリーE2E',
    category: 'testing',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        '直感的なE2Eテスト',
        'タイムトラベルデバッグ',
        'リアルタイムリロード',
      ],
      agentsMdExample: 'Cypress for developer-friendly E2E testing',
    },
  },
  {
    id: 'testing-library',
    name: 'Testing Library',
    icon: '🐙',
    description: 'ユーザー視点のテスト',
    category: 'testing',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'ユーザー視点のテスト',
        '実装詳細ではなく振る舞いテスト',
        'React/Vue/Angular対応',
      ],
      agentsMdExample: 'React Testing Library for behavior-driven component tests',
    },
  },

  // ===== Tools =====
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    description: '型安全なJavaScript',
    category: 'tools',
    isPopular: true,
    hasVersions: true,
    versions: ['5', '4'],
    tooltip: {
      whenToUse: [
        '型安全性が必要',
        '大規模プロジェクト',
        'IDEサポート強化',
      ],
      agentsMdExample: 'TypeScript (strict mode enabled)',
    },
  },
  {
    id: 'eslint',
    name: 'ESLint',
    icon: '📏',
    description: 'コード品質チェック',
    category: 'tools',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'コード品質の統一',
        'バグの早期発見',
        'チーム開発',
      ],
      agentsMdExample: 'ESLint with strict rules for code quality',
    },
  },
  {
    id: 'prettier',
    name: 'Prettier',
    icon: '✨',
    description: 'コードフォーマッター',
    category: 'tools',
    isPopular: true,
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'コードスタイルの統一',
        '自動フォーマット',
        'チーム開発',
      ],
      agentsMdExample: 'Prettier for consistent code formatting',
    },
  },
  {
    id: 'husky',
    name: 'Husky (Git Hooks)',
    icon: '🐶',
    description: 'Git フック管理',
    category: 'tools',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'コミット前の自動チェック',
        'テスト・Lint強制',
        'コード品質保証',
      ],
      agentsMdExample: 'Husky for pre-commit hooks (lint, test, type-check)',
    },
  },
  {
    id: 'turborepo',
    name: 'Turborepo (Monorepo)',
    icon: '🚀',
    description: '高速モノレポツール',
    category: 'tools',
    hasVersions: false,
    tooltip: {
      whenToUse: [
        'モノレポ構成',
        '複数パッケージ管理',
        'キャッシュによる高速ビルド',
      ],
      agentsMdExample: 'Turborepo for monorepo with optimized builds',
    },
  },
]

// Helper: Get techs by category
export const getTechsByCategory = (category: TechCategory): Tech[] => {
  return TECH_STACK.filter((tech) => tech.category === category)
}

// Category metadata
export const TECH_CATEGORIES: Record<
  TechCategory,
  { label: string; icon: string }
> = {
  frontend: { label: 'Frontend', icon: '🖥️' },
  backend: { label: 'Backend', icon: '⚙️' },
  database: { label: 'Database', icon: '💾' },
  styling: { label: 'Styling', icon: '🎨' },
  testing: { label: 'Testing', icon: '🧪' },
  tools: { label: 'Tools', icon: '🔧' },
}
