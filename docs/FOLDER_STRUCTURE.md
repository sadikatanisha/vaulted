# 📁 Folder Structure Guide

This document outlines the folder structure and organization principles used in the Vaulted project, following modern Next.js and React best practices.

## 🏗️ Project Structure Overview

```
vaulted/
├── 📁 .github/                 # GitHub configuration
│   ├── 📁 workflows/           # GitHub Actions workflows
│   └── 📁 ISSUE_TEMPLATE/      # Issue templates
├── 📁 .next/                   # Next.js build output (auto-generated)
├── 📁 app/                     # Next.js App Router (13+)
│   ├── 📁 api/                 # API routes
│   ├── 📄 favicon.ico          # App favicon
│   ├── 📄 layout.tsx           # Root layout component
│   └── 📄 page.tsx             # Home page component
├── 📁 docs/                    # Project documentation
├── 📁 node_modules/            # Dependencies (auto-generated)
├── 📁 prisma/                  # Database schema and migrations
│   ├── 📄 dev.db               # SQLite database (development)
│   └── 📄 schema.prisma        # Prisma schema definition
├── 📁 public/                  # Static assets served at root
│   ├── 📄 next.svg             # Next.js logo
│   └── 📄 vercel.svg           # Vercel logo
├── 📁 src/                     # Source code (recommended structure)
│   ├── 📁 assets/              # Static assets organized by type
│   │   ├── 📁 fonts/           # Custom fonts
│   │   ├── 📁 icons/           # SVG icons and icon files
│   │   └── 📁 images/          # Images and graphics
│   ├── 📁 components/          # Reusable React components
│   │   ├── 📁 features/        # Feature-specific components
│   │   ├── 📁 forms/           # Form components and inputs
│   │   ├── 📁 layout/          # Layout components (Header, Footer, etc.)
│   │   └── 📁 ui/              # Generic UI components (Button, Modal, etc.)
│   ├── 📁 constants/           # Application constants and configuration
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 styles/              # Global styles and CSS modules
│   ├── 📁 types/               # TypeScript type definitions
│   └── 📁 utils/               # Utility functions and helpers
├── 📁 tests/                   # Test files organized by type
│   ├── 📁 e2e/                 # End-to-end tests
│   ├── 📁 integration/         # Integration tests
│   └── 📁 unit/                # Unit tests
├── 📄 .gitignore               # Git ignore rules
├── 📄 eslint.config.mjs        # ESLint configuration
├── 📄 next.config.ts           # Next.js configuration
├── 📄 package.json             # Project dependencies and scripts
├── 📄 postcss.config.mjs       # PostCSS configuration
├── 📄 README.md                # Project overview and setup
└── 📄 tsconfig.json            # TypeScript configuration
```

## 📂 Detailed Folder Descriptions

### `/src` - Source Code Directory

The `src` directory contains all the application source code, following the principle of separation of concerns:

#### `/src/components` - Component Organization

- **`/ui`** - Generic, reusable UI components
  - Button, Input, Modal, Card, etc.
  - Should be framework-agnostic and highly reusable
  
- **`/layout`** - Layout-specific components
  - Header, Footer, Sidebar, Navigation
  - Banner, Hero sections
  
- **`/forms`** - Form-related components
  - Form inputs, validation components
  - Form layouts and wrappers
  
- **`/features`** - Feature-specific components
  - Components tied to specific business logic
  - Domain-specific UI elements

#### `/src/hooks` - Custom React Hooks

- Reusable stateful logic
- API interaction hooks
- Utility hooks for common patterns
- Example: `useLocalStorage`, `useAuth`, `useApi`

#### `/src/utils` - Utility Functions

- Pure functions and helpers
- Data transformation utilities
- API clients and configurations
- Validation functions

#### `/src/types` - TypeScript Definitions

- Interface and type definitions
- API response types
- Component prop types
- Global type declarations

#### `/src/constants` - Application Constants

- Configuration values
- API endpoints
- Route definitions
- UI constants (colors, breakpoints, etc.)

#### `/src/styles` - Styling

- Global CSS files
- CSS modules
- Tailwind configurations
- Theme definitions

#### `/src/assets` - Static Assets

- **`/icons`** - SVG icons and icon components
- **`/images`** - Images, graphics, and media files
- **`/fonts`** - Custom font files

### `/app` - Next.js App Router

Following Next.js 13+ App Router conventions:
- **`layout.tsx`** - Root layout component
- **`page.tsx`** - Page components
- **`/api`** - API route handlers
- **`loading.tsx`** - Loading UI components
- **`error.tsx`** - Error boundary components

### `/tests` - Testing Structure

- **`/unit`** - Unit tests for individual components/functions
- **`/integration`** - Integration tests for feature workflows
- **`/e2e`** - End-to-end tests for complete user journeys

### `/docs` - Documentation

- Project documentation
- API documentation
- Architecture decisions
- Setup and deployment guides

## 🎯 Naming Conventions

### Files and Folders

- **Components**: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase starting with "use" (`useAuth.ts`, `useLocalStorage.ts`)
- **Utilities**: camelCase (`formatDate.ts`, `apiClient.ts`)
- **Constants**: UPPER_SNAKE_CASE for values, camelCase for files
- **Types**: PascalCase for interfaces, camelCase for files

### Import/Export Patterns

```typescript
// Preferred: Named exports for components
export default function Button() { ... }

// Preferred: Named exports for utilities
export const formatDate = () => { ... }
export const validateEmail = () => { ... }

// Preferred: Barrel exports in index files
export { Button } from './Button';
export { Input } from './Input';
```

## 🔧 Path Mapping Configuration

The project uses TypeScript path mapping for clean imports:

```json
{
  "paths": {
    "@/*": ["./*"],
    "@/src/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/hooks/*": ["./src/hooks/*"],
    "@/utils/*": ["./src/utils/*"],
    "@/types/*": ["./src/types/*"],
    "@/constants/*": ["./src/constants/*"],
    "@/styles/*": ["./src/styles/*"],
    "@/assets/*": ["./src/assets/*"]
  }
}
```

## 📋 Best Practices

### Component Organization

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Inheritance**: Prefer composition patterns
3. **Prop Drilling**: Use context or state management for deeply nested props
4. **File Size**: Keep components under 200 lines when possible

### Folder Structure

1. **Feature-Based Grouping**: Group related files together
2. **Consistent Naming**: Follow established naming conventions
3. **Barrel Exports**: Use index files for clean imports
4. **Separation of Concerns**: Keep business logic separate from UI

### Import Organization

```typescript
// 1. External libraries
import React from 'react';
import { NextPage } from 'next';

// 2. Internal utilities and hooks
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatDate';

// 3. Components (UI first, then feature-specific)
import { Button } from '@/components/ui/Button';
import { UserCard } from '@/components/features/UserCard';

// 4. Types and constants
import type { User } from '@/types';
import { ROUTES } from '@/constants';
```

## 🚀 Getting Started

1. **Component Creation**: Place new components in the appropriate subfolder
2. **Import Paths**: Use the configured path aliases for clean imports
3. **Type Safety**: Define proper TypeScript interfaces in `/src/types`
4. **Testing**: Add corresponding test files in the `/tests` directory

This structure promotes maintainability, scalability, and developer experience while following modern React and Next.js best practices.