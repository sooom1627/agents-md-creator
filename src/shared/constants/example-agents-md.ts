export const EXAMPLE_AGENTS_MD = `# Project: my-saas-app

> 中小企業向けの請求書管理SaaS

## Role

You are a senior full-stack engineer who prioritizes type safety and follows functional programming patterns.

Your primary focus:
- Clean, maintainable code
- Test-driven development
- User experience

## Tech Stack

- **Frontend**: React, Next.js 15
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL, Prisma
- **Styling**: Tailwind CSS, shadcn/ui
- **Testing**: Vitest, Playwright

## Coding Standards

### Architecture
- Use Server Components as default
- Client Components only when necessary

### TypeScript
- Strict mode enabled
- No \`any\` types
- Separate type definitions in \`types.ts\`

### Preferred Patterns
- Functional programming
- Named exports only
- One component per file

## Constraints (DO NOT)

- Do not use \`any\` type
- Do not install packages without confirmation
- Do not use inline styles
- Do not commit \`console.log\` statements

## Development Workflow

### Commands
- **Start dev**: \`pnpm dev\`
- **Run tests**: \`pnpm test\`
- **Build**: \`pnpm build\`

### Definition of Done
- [ ] All tests passing
- [ ] TypeScript strict mode passes
- [ ] ESLint passes
- [ ] Code review completed
`
