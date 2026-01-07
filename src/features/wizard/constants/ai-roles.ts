import type { AIRole } from '../types'

export const AI_ROLES: AIRole[] = [
  {
    id: 'fullstack',
    icon: '🎯',
    title: 'フルスタック重視',
    description: 'フロントエンドからバックエンドまで一貫した設計',
    tooltip: {
      whenToUse: [
        'フロント/バック両方を触るプロジェクト',
        'APIとUIの整合性を保ちたい',
        'チーム人数が少なく、幅広く対応が必要',
      ],
      generatedExample:
        'You are a senior full-stack engineer who considers both frontend UX and backend architecture...',
    },
  },
  {
    id: 'ui-ux',
    icon: '🎨',
    title: 'UI/UX スペシャリスト',
    description: '使いやすさとデザインを最優先',
    tooltip: {
      whenToUse: [
        'ユーザー体験が最重要なプロダクト',
        'デザインシステムを構築したい',
        'アクセシビリティを重視',
      ],
      generatedExample:
        'You are a UI/UX specialist who prioritizes user experience, accessibility, and design consistency...',
    },
  },
  {
    id: 'security',
    icon: '🔒',
    title: 'セキュリティ第一',
    description: '認証・認可・データ保護を徹底',
    tooltip: {
      whenToUse: [
        '個人情報や機密データを扱う',
        '金融・医療系のシステム',
        'セキュリティ監査が必要',
      ],
      generatedExample:
        'You are a security-focused engineer who implements best practices for authentication, authorization, and data protection...',
    },
  },
  {
    id: 'performance',
    icon: '⚡',
    title: 'パフォーマンス最適化',
    description: '速度とスケーラビリティを重視',
    tooltip: {
      whenToUse: [
        '大量のトラフィックが見込まれる',
        'ページ速度が重要なSEO対策',
        'リアルタイム処理が必要',
      ],
      generatedExample:
        'You are a performance engineer who optimizes for speed, scalability, and efficient resource usage...',
    },
  },
  {
    id: 'documentation',
    icon: '📚',
    title: 'ドキュメンテーション',
    description: 'コードの可読性とコメントを徹底',
    tooltip: {
      whenToUse: [
        'チームメンバーが多い',
        '長期運用が前提',
        '引き継ぎが頻繁に発生',
      ],
      generatedExample:
        'You are a documentation-focused engineer who writes clear code comments, maintains comprehensive docs, and prioritizes readability...',
    },
  },
  {
    id: 'tdd',
    icon: '🧪',
    title: 'テスト駆動開発',
    description: '自動テストを常に書く',
    tooltip: {
      whenToUse: [
        'バグを最小限に抑えたい',
        'リファクタリングを安全に行いたい',
        'CI/CDパイプラインを構築',
      ],
      generatedExample:
        'You are a TDD practitioner who writes tests first, follows red-green-refactor cycle, and maintains high code coverage...',
    },
  },
]
