# Issue Tracker Frontend Service

## Tech Stack

- **React** - JavaScript library
- **TypeScript** - Type safety
- **Tailwind Css** - CSS library
- **ShadCN** - React component library
- **Tanstack Table** - Rich table headless component
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js v20+
- pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/project-name.git
cd project-name

# Install dependencies
pnpm install
```

### Enviornment Variables

- copy the .env.example to .env file and update with the relevant server api url

### Run React App http://localhost:5173/

```bash
# run:
pnpm dev

# debug (vs code): run the debug configuration "Vite + React"
```

### Files & Directories

- IssueTracker/ -> the code files for the issue tracker page
  - page.tsx - the issue tracker page component
  - components.tsx - all the components created for the issue tracker
  - consts.ts - static data uses the components
  - types.ts - the issue data type
  - services.ts - api functions
  - utils.ts - help functions
  - schemas.ts - zod schemas for issue addition validation
- components/ -> includes the navbar static components (logo, user dropdown) not relevant for the task
- components/ui -> includes ShadCN component library generated components

- .env.example -> imcludes the enviornment variables you need to copy to .env and update accordingly
