import type { Template } from '../types'

export const TEMPLATES: Template[] = [
  {
    id: 'fullstack-web',
    name: 'フルスタックWeb開発',
    description: 'Next.js + TypeScript + Prismaで構築するモダンなWebアプリケーション',
    icon: '🌐',
    popular: true,
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'mobile-app',
    name: 'モバイルアプリ',
    description: 'React Native + Expoでクロスプラットフォーム開発',
    icon: '📱',
    popular: true,
    techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
  },
  {
    id: 'backend-api',
    name: 'バックエンドAPI',
    description: 'RESTful/GraphQL APIの開発に特化',
    icon: '⚙️',
    techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma'],
  },
  {
    id: 'ui-library',
    name: 'UIコンポーネントライブラリ',
    description: 'デザインシステムとコンポーネント開発',
    icon: '🎨',
    techStack: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
  },
  {
    id: 'cli-tool',
    name: 'CLIツール',
    description: 'コマンドラインツールの開発',
    icon: '💻',
    techStack: ['Node.js', 'TypeScript', 'Commander.js'],
  },
  {
    id: 'data-pipeline',
    name: 'データパイプライン',
    description: 'データ処理とETL',
    icon: '📊',
    techStack: ['Python', 'Pandas', 'PostgreSQL', 'Apache Airflow'],
  },
]
