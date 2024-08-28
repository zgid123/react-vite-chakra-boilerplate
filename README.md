React Vite with Chakra UI boilerplate.

# Install

```sh
pnpm install
```

- Build vite and vitest projects

```sh
pnpm -w build
```

# Structure

```sh
├── @types
├── packages
│   ├── @config
│   │   ├── tsconfig
│   │   ├── vite
│   │   └── vitest
│   ├── @core
│   │   ├── api
│   │   └── utils
│   ├── @data
│   │   └── view-models
│   └── @react
│       ├── auth
│       ├── chakra
│       └── utils
└── workspaces
    └── main-project
```

- @types: global types for whole project
- packages: contains library packages for workspace
  - @config: all configs for all mono projects
    - tsconfig: tsconfig
    - vite: vite config
    - vitest: vitest config and testing libs
  - @core: all packages for all mono projects
    - api: contains axios config for all mono projects
    - utils: contains all utilities for all mono projects
  - @data: data/data types
    - view-models: all view model types for all mono projects
  - @react: all packages for React
    - auth: contains all utils for authentication
    - chakra: design system using Chakra UI
    - utils: contains all utils for React (react-query, react-hook-form and zustand)
- workspaces
  - main-project: React App project
