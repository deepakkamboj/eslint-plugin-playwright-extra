# TSLint Rules for Playwright Test Files

![Build and Test](https://github.com/deepakkamboj/eslint-plugin-playwright-extra/actions/workflows/main.yml/badge.svg)

A collection of TSLint rules specifically designed for maintaining clean and consistent Playwright test code. These rules help prevent common testing pitfalls and enforce best practices in Playwright test files.

Includes:

- Custom rules for Playwright testing patterns
- Test coverage for rules
- Development sandbox environment
- Build configuration
- Jest expect methods for rule testing

Main language: `TypeScript`

# Get started

`npm install` - to install dependencies

# Scripts

- `dev` - runs the lint for sandbox file
- `test` - runs rule tests
- `build` - compiles project to dist folder

# How to use it in your Playwright project

Install as a dev dependency in your Playwright project and configure `tslint.json`:

```json
{
    "rulesDirectory": [
        ...
        "node_modules/tslint-playwright-rules/dist/rules"
    ],
    "rules": {
        ...
        "no-date-now": true
    }
}
```

# Project structure

```
.
├── dist - Output folder, compiled rules will be here
├── helpers
│   └── utils.ts - Testing utilities for rule specs
├── rules - Custom TSLint rules for Playwright
├── sandbox.ts - Development playground for rules
├── tsconfig.dev.json - Config for sandbox linting
├── tsconfig.json - TS configuration
├── tsconfig.spec.json - TS configuration for jest
├── tslint.json - TSLint configuration
├── package.json
└── README.md
```

# Dev Dependencies

- `@types/*` - Type definitions for TypeScript libraries
- `jest` - Testing framework for rule validation
- `ts-jest` - TypeScript support for Jest tests
- `tslint` - Linting tool for TypeScript code
- `typescript` - JavaScript with static types and modern features

# Available Rules

## no-date-now

Prevents usage of `Date.now()` and `new Date()` in test files to ensure deterministic testing. Always mock dates in tests instead of using real time values.

Example:

```typescript
// ❌ Bad
test("check timestamp", async () => {
  const timestamp = Date.now();
});

// ✅ Good
test("check timestamp", async () => {
  const mockDate = new Date("2025-03-05");
  vi.setSystemTime(mockDate);
});
```
