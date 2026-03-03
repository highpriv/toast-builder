# Vue 3 Toast Notification Component

The most customizable, lightweight and type-safe toast notification system for Vue 3. Instantly add beautiful, animated notifications to your app with zero dependencies.

---

## Features

- ⚡ Ultra-fast, zero-dependency
- 🎨 Customizable colors, icons, animations
- 🌓 Dark/light theme support
- 📦 TypeScript types included
- 🔥 Animation styles: fade, slide, bounce
- 🛠️ Easy API: composable + component
- 🧩 Works with Vite, Nuxt, Vue CLI
- 📱 Responsive and accessible

---

## Installation

```bash
npm install toast-builder-vue3
# or
pnpm add toast-builder-vue3
# or
yarn add toast-builder-vue3
```

---

## Quick Start

```js
// main.js or main.ts
import { ToastContainer } from 'toast-builder-vue3';
import 'toast-builder-vue3/dist/toast-builder-vue3.css';

// App.vue
<template>
	<ToastContainer />
	<!-- ... -->
</template>

// In any component - Minimal usage
import { useToast } from 'toast-builder-vue3';

const { showToast } = useToast();

// Only type and message required - smart defaults applied
showToast({
	type: 'success',
	message: 'Operation completed successfully!'
});

// Or full customization - override any default
showToast({
	type: 'success',
	title: 'Success!',
	message: 'Operation completed.',
	duration: 5000,
	position: 'bottom-right',
	backgroundColor: '#22c55e',
	textColor: '#fff',
	showIcon: true,
	showCloseButton: true,
	animation: 'slide',
	showProgress: true
});
```

---

## Smart Defaults System

The package uses intelligent defaults requiring minimal configuration:

### Type-Based Defaults

- **success**: Green (#10b981) + check icon
- **error**: Red (#ef4444) + x-circle icon
- **warning**: Orange (#f59e0b) + alert icon
- **info**: Blue (#3b82f6) + info icon

### Base Defaults

```typescript
{
  duration: 3000,          // 3 seconds
  position: 'top-right',
  showIcon: true,
  showCloseButton: true,
  animation: 'fade',
  showProgress: false
}
```

### Global Defaults (Optional)

```vue
<ToastContainer
  position="top-right"
  :defaultDuration="5000"
  defaultAnimation="slide"
  :defaultShowProgress="true"
/>
```

**Priority**: Per-toast config > Global defaults > Type defaults > Base defaults

---

## API Reference

### `<ToastContainer />` Props

| Prop                     | Type            | Default       | Description                   |
| ------------------------ | --------------- | ------------- | ----------------------------- |
| `position`               | `Position`      | `'top-right'` | Container position            |
| `defaultDuration`        | `number`        | `3000`        | Default duration (ms)         |
| `defaultAnimation`       | `AnimationType` | `'fade'`      | Default animation             |
| `defaultShowIcon`        | `boolean`       | `true`        | Show icons by default         |
| `defaultShowCloseButton` | `boolean`       | `true`        | Show close buttons by default |
| `defaultShowProgress`    | `boolean`       | `false`       | Show progress bars by default |

### `useToast()` Composable

- `showToast(config: ToastInput)`: Display a notification (returns toast ID)
- `dismissToast(id: string)`: Close a notification
- `clearAllToasts()`: Close all notifications
- `undoLastDismissed()`: Restore last dismissed notification
- `getToastsByPosition(position)`: Get toasts at specific position

**ToastInput Config (Required)**:

- `type`: `'success' | 'error' | 'warning' | 'info'`
- `message`: `string`

**Optional Parameters**: `title`, `duration`, `position`, `backgroundColor`, `textColor`, `showIcon`, `showCloseButton`, `showProgress`, `animation`, `customIcon`, `customIconUrl`, `customIconBase64`

### TypeScript Types

All types exported: `ToastInput`, `NotificationConfig`, `ActiveNotification`, `Position`, `AnimationType`, `IconName`

---

## Customization & Theming

Override SCSS variables to create your own theme:

```scss
// main.scss
$toast-bg: #222;
$toast-radius: 8px;
@import "toast-builder-vue3/styles/toast.module.scss";
```

---

## Why Choose This Package?

- SEO optimized: Fast, lightweight, and crawlable
- No external dependencies (except Vue & nanoid)
- Works with all Vue 3 setups
- TypeScript out of the box
- 15+ built-in icons
- Custom icon upload & URL support
- Progress bar, animations, stacking
- Production-ready and battle-tested

---

## License & Author

- License: GPL-3.0
- Author: Canberk Beren
- GitHub: https://github.com/highpriv/toast-builder
- NPM: https://www.npmjs.com/package/toast-builder-vue3

---

## ☕ Support This Project

If you find this package useful, consider buying me a coffee!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?style=flat-square&logo=buy-me-a-coffee)](https://buymeacoffee.com/highpriv)

---

## Keywords

vue3, toast, notification, typescript, component, animation, scss, lightweight, fast, customizable, dark-mode, progress-bar, icon, builder

---

## Star & Support

If you found this helpful, give it a ⭐ on GitHub and share it with others! Follow for more Vue 3 components.
