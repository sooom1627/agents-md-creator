// Tech category types
export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'styling'
  | 'testing'
  | 'tools'

// Individual tech selection with optional version
export type TechSelection = {
  id: string
  version?: string // e.g., "15", "18", "5"
}

// Full tech stack data structure
export type TechStackData = {
  frontend: TechSelection[]
  backend: TechSelection[]
  database: TechSelection[]
  styling: TechSelection[]
  testing: TechSelection[]
  tools: TechSelection[]
  other: string // Free text for unlisted techs
}

// Tech item definition (similar to AIRole)
export type Tech = {
  id: string
  name: string
  icon: string
  description: string
  category: TechCategory
  isPopular?: boolean // For ⭐ badge
  hasVersions?: boolean // Whether to show version dropdown
  versions?: string[] // Available versions
  tooltip: {
    whenToUse: string[]
    agentsMdExample: string
  }
}
