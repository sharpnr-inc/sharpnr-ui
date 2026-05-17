# @sharpnr/ui

The official shared UI component library for the [sharpnr](https://sharpnr.com) suite of applications. Built with React, shadcn/ui, Tailwind CSS, and Radix UI primitives.

---

## Installation

```bash
npm install @sharpnr/ui
```

---

## Requirements

Your app must have the following peer dependencies installed:

```bash
npm install react react-dom radix-ui lucide-react
```

---

## Setup

### 1. Configure Vite

Add `dedupe` and `optimizeDeps` to your app's `vite.config.ts` to prevent duplicate React instances:

```ts
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
```

### 2. Configure Tailwind

In your app's `index.css`, tell Tailwind to scan `@sharpnr/ui`'s components:

```css
@import "tailwindcss";
@source "../node_modules/@sharpnr/ui/dist/index.es.js";
```

That's it — no separate CSS import needed.

---

## Usage

```tsx
import { Button, Input, cn } from "@sharpnr/ui";

export default function LoginPage() {
  return (
    <div className={cn("flex flex-col gap-4 p-8")}>
      <Input placeholder="Email" />
      <Button>Login</Button>
    </div>
  );
}
```

---

## Available Components

| Component | Import                                 |
| --------- | -------------------------------------- |
| `Button`  | `import { Button } from '@sharpnr/ui'` |
| `Input`   | `import { Input } from '@sharpnr/ui'`  |

> More components are added with each release. See [CHANGELOG](#changelog) for details.

---

## Utilities

### `cn(...classes)`

A utility for merging Tailwind classes cleanly using `clsx` and `tailwind-merge`.

```tsx
import { cn } from "@sharpnr/ui";

<div className={cn("px-4 py-2", isActive && "bg-primary")} />;
```

---

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

| Release         | When                 | Command             |
| --------------- | -------------------- | ------------------- |
| `patch` `1.0.x` | Bug fix, style tweak | `npm version patch` |
| `minor` `1.x.0` | New component added  | `npm version minor` |
| `major` `x.0.0` | Breaking change      | `npm version major` |

Pin your app to a safe version range:

```json
{
  "dependencies": {
    "@sharpnr/ui": "^1.0.0"
  }
}
```

---

## Contributing

This library is maintained by the sharpnr UI team. To contribute:

```bash
# Clone the repo
git clone https://github.com/sharpnr/sharp-ui.git
cd sharp-ui

# Install dependencies
npm install

# Start development build watcher
npm run dev

# Add a new shadcn component
npx shadcn@latest add [component-name]

# Export it in src/index.ts
export { ComponentName } from './components/ui/component-name';

# Build and verify
npm run build
cat dist/index.d.ts   # verify types are exported
```

---

## Tech Stack

- [React 19](https://react.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Lucide React](https://lucide.dev)
- [Vite](https://vite.dev)

---

## License

Private — © [Sharpnr](https://sharpnr.com). All rights reserved.
