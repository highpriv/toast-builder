# 🎉 Toast Builder Vue3

<div align="center">

[![npm version](https://img.shields.io/npm/v/toast-builder-vue3.svg?style=flat-square&color=4FC08D)](https://www.npmjs.com/package/toast-builder-vue3)
[![npm downloads](https://img.shields.io/npm/dm/toast-builder-vue3.svg?style=flat-square&color=4FC08D)](https://www.npmjs.com/package/toast-builder-vue3)
[![bundle size](https://img.shields.io/bundlephobia/minzip/toast-builder-vue3?style=flat-square&color=4FC08D)](https://bundlephobia.com/package/toast-builder-vue3)
[![license](https://img.shields.io/npm/l/toast-builder-vue3.svg?style=flat-square&color=4FC08D)](https://github.com/highpriv/toast-builder/blob/master/LICENSE)

**Modern, lightweight toast notification system for Vue 3 with TypeScript**

[Live Demo](https://toast-builder.vercel.app/) • [NPM Package](https://www.npmjs.com/package/toast-builder-vue3) • [GitHub](https://github.com/highpriv/toast-builder)

</div>

---

## ✨ Features

- 🎨 **Fully Customizable** - Configure colors, icons, animations, and positions
- 🎭 **3 Animation Styles** - Fade, slide, and bounce animations
- 📍 **6 Position Options** - Place toasts anywhere on the screen
- 🖼️ **Custom Icons** - Use URLs, Base64, or built-in icons
- ⏱️ **Auto-dismiss** - Optional countdown with progress bar
- 📱 **Responsive** - Works on all screen sizes
- 🔒 **Type-Safe** - Full TypeScript support
- 🪶 **Lightweight** - Minimal bundle size
- ⚡ **Vite-powered** - Built with modern tooling

---

## 📦 Installation

```bash
npm install toast-builder-vue3
```

Or with yarn:

```bash
yarn add toast-builder-vue3
```

Or with pnpm:

```bash
pnpm add toast-builder-vue3
```

---

## 🚀 Quick Start

### 1. Import CSS

In your `main.ts`:

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import "toast-builder-vue3/dist/toast-builder-vue3.css";

createApp(App).mount("#app");
```

### 2. Add ToastContainer

In your `App.vue`:

```vue
<template>
  <div id="app">
    <router-view />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ToastContainer } from "toast-builder-vue3";
</script>
```

### 3. Show Toasts

In any component:

```vue
<script setup lang="ts">
import { useToast } from "toast-builder-vue3";

const { showToast } = useToast();

const notify = () => {
  // Minimal usage - smart defaults applied automatically
  showToast({
    type: "success",
    message: "Operation completed successfully!",
  });
};

const notifyWithCustomization = () => {
  // Full customization - override any default
  showToast({
    type: "success",
    message: "Operation completed successfully!",
    title: "Success",
    duration: 5000,
    position: "bottom-right",
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    showIcon: true,
    showCloseButton: true,
    showProgress: true,
    animation: "slide",
  });
};
</script>
```

> **Smart Defaults:** Only `type` and `message` are required. All other options have sensible defaults based on the toast type.

---

## 🎨 Smart Defaults System

The package uses an intelligent defaults system that requires minimal configuration while allowing full customization.

### Type-Based Defaults

Each toast type automatically gets appropriate colors and icons:

| Type      | Colors                     | Icon         |
| --------- | -------------------------- | ------------ |
| `success` | Green (#10b981 / #ffffff)  | Check circle |
| `error`   | Red (#ef4444 / #ffffff)    | X circle     |
| `warning` | Orange (#f59e0b / #111827) | Alert        |
| `info`    | Blue (#3b82f6 / #ffffff)   | Info circle  |

### Base Defaults

All toasts use these defaults unless overridden:

```typescript
{
  duration: 3000,          // 3 seconds
  position: 'top-right',
  showIcon: true,
  showCloseButton: true,
  animation: 'fade',
  showProgress: false,
}
```

### Customization Priority

Defaults are applied in this order (highest priority first):

1. **Per-toast config** (showToast options)
2. **Global defaults** (ToastContainer props)
3. **Type defaults** (type-based colors/icons)
4. **Base defaults** (package defaults)

### Global Defaults (Optional)

Set default options for all toasts in your app:

```vue
<template>
  <ToastContainer
    position="top-right"
    :defaultDuration="5000"
    defaultAnimation="slide"
    :defaultShowProgress="true"
  />
</template>

<script setup lang="ts">
import { ToastContainer } from "toast-builder-vue3";
</script>
```

**ToastContainer Props:**

| Prop                     | Type            | Default       | Description                   |
| ------------------------ | --------------- | ------------- | ----------------------------- |
| `position`               | `Position`      | `'top-right'` | Container position            |
| `defaultDuration`        | `number`        | `3000`        | Default toast duration (ms)   |
| `defaultAnimation`       | `AnimationType` | `'fade'`      | Default animation type        |
| `defaultShowIcon`        | `boolean`       | `true`        | Show icons by default         |
| `defaultShowCloseButton` | `boolean`       | `true`        | Show close buttons by default |
| `defaultShowProgress`    | `boolean`       | `false`       | Show progress bars by default |

---

## 📖 API Reference

### `useToast()`

Returns an object with the following methods and properties:

#### Methods

##### `showToast(config: ToastInput): string`

Display a new toast notification. Returns the toast ID.

**Required Parameters:**

| Parameter | Type                                          | Description   |
| --------- | --------------------------------------------- | ------------- |
| `type`    | `'success' \| 'error' \| 'warning' \| 'info'` | Toast type    |
| `message` | `string`                                      | Toast message |

**Optional Parameters:**

| Parameter                 | Type                            | Default       | Description                     |
| ------------------------- | ------------------------------- | ------------- | ------------------------------- |
| `title`                   | `string`                        | `''`          | Toast title                     |
| `duration`                | `number`                        | `3000`        | Duration in ms (0 = persistent) |
| `position`                | `Position`                      | `'top-right'` | Position on screen              |
| `backgroundColor`         | `string`                        | Type-based    | Background color (hex)          |
| `textColor`               | `string`                        | Type-based    | Text color (hex)                |
| `showIcon`                | `boolean`                       | `true`        | Show/hide icon                  |
| `showCloseButton`         | `boolean`                       | `true`        | Show/hide close button          |
| `showProgress`            | `boolean`                       | `false`       | Show progress bar               |
| `animation`               | `'fade' \| 'slide' \| 'bounce'` | `'fade'`      | Animation type                  |
| `customIcon`              | `IconName`                      | Type-based    | Built-in icon name              |
| `customIconUrl`           | `string`                        | -             | Custom icon URL                 |
| `customIconBase64`        | `string`                        | -             | Custom icon Base64              |
| `customCloseButtonUrl`    | `string`                        | -             | Custom close button URL         |
| `customCloseButtonBase64` | `string`                        | -             | Custom close button Base64      |

##### `dismissToast(id: string): void`

Dismiss a specific toast by ID.

##### `clearAllToasts(): void`

Dismiss all active toasts.

##### `undoLastDismissed(): void`

Restore the last dismissed toast.

##### `getToastsByPosition(position: Position): ComputedRef<ActiveNotification[]>`

Get all toasts at a specific position.

#### Properties

- `activeToasts`: `ComputedRef<ActiveNotification[]>` - All active toasts
- `dismissedToasts`: `ComputedRef<ActiveNotification[]>` - Recently dismissed toasts

---

## 💡 Examples

### Success Toast

```typescript
showToast({
  type: "success",
  message: "Changes saved successfully!",
  duration: 3000,
  position: "top-right",
  backgroundColor: "#10b981",
  textColor: "#ffffff",
  showIcon: true,
  showCloseButton: true,
});
```

### Error Toast with Progress Bar

```typescript
showToast({
  type: "error",
  title: "Error",
  message: "Failed to save changes",
  duration: 5000,
  position: "top-right",
  backgroundColor: "#ef4444",
  textColor: "#ffffff",
  showIcon: true,
  showCloseButton: true,
  showProgress: true,
  animation: "bounce",
});
```

### Persistent Toast

```typescript
showToast({
  type: "warning",
  message: "This toast stays until closed",
  duration: 0, // Persistent
  position: "top-center",
  backgroundColor: "#f59e0b",
  textColor: "#000000",
  showIcon: true,
  showCloseButton: true,
});
```

### Custom Icon

```typescript
showToast({
  type: "info",
  message: "You have a new message",
  duration: 4000,
  position: "bottom-right",
  backgroundColor: "#3b82f6",
  textColor: "#ffffff",
  showIcon: true,
  showCloseButton: true,
  customIcon: "bell", // Built-in icon
});
```

### Using Built-in Icons

Available icons: `check-circle`, `check`, `badge-check`, `x-circle`, `alert-circle`, `exclamation-circle`, `alert-triangle`, `exclamation-triangle`, `information-circle`, `question-mark-circle`, `bell`, `megaphone`, `sparkles`, `heart`, `moon`, `sun`

---

## 🎨 Position Options

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

---

## 🎬 Animation Types

- `fade` - Simple fade in/out (300ms)
- `slide` - Slide from right (400ms)
- `bounce` - Bouncy entrance (500ms)

---

## 🎨 Recommended Colors

| Type    | Background | Text      |
| ------- | ---------- | --------- |
| Success | `#10b981`  | `#ffffff` |
| Error   | `#ef4444`  | `#ffffff` |
| Warning | `#f59e0b`  | `#000000` |
| Info    | `#3b82f6`  | `#ffffff` |

---

## 📘 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  NotificationConfig,
  ActiveNotification,
  NotificationType,
  Position,
  AnimationType,
  IconName,
} from "toast-builder-vue3";
```

---

## 🛠️ Browser Support

- Chrome ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Edge ≥ 90

---

## 📄 License

[GPL-3.0](LICENSE)

---

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/toast-builder-vue3)
- [Live Demo](https://toast-builder.vercel.app/)
- [GitHub Repository](https://github.com/highpriv/toast-builder)
- [Report Issues](https://github.com/highpriv/toast-builder/issues)

---

## 👨‍💻 Author

**Canberk Beren**

- GitHub: [@highpriv](https://github.com/highpriv)

---

## ☕ Support This Project

If you find this package useful, consider buying me a coffee! Your support helps me maintain and improve this project.

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/highpriv)

### Or scan the QR code:

<img src="buymeacoffee-qr.png" alt="Buy Me a Coffee QR Code" width="200" />

</div>

---

Made with ❤️ using Vue 3 and TypeScript
