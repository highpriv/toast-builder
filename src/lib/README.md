
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
npm install @your-scope/vue-toast
# veya
pnpm add @your-scope/vue-toast
# veya
yarn add @your-scope/vue-toast
```

---

## Quick Start

```js
// main.js veya main.ts
import { ToastContainer } from '@your-scope/vue-toast';

// App.vue
<template>
	<ToastContainer position="top-right" />
	<!-- ... -->
</template>

// Herhangi bir componentte
import { useToast } from '@your-scope/vue-toast';

const { showToast } = useToast();
showToast({
	type: 'success',
	title: 'Başarılı!',
	message: 'İşlem tamamlandı.',
	duration: 3000,
	position: 'top-right',
	backgroundColor: '#22c55e',
	textColor: '#fff',
	showIcon: true,
	showCloseButton: true,
	animation: 'slide',
	showProgress: true
});
```

---

## API Reference

### `<ToastContainer />` Props
- `position`: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

### `useToast()` Composable
- `showToast(config)`: Bildirim gösterir
- `dismissToast(id)`: Bildirimi kapatır
- `clearAllToasts()`: Tüm bildirimleri kapatır

### TypeScript Types
- `NotificationConfig`, `ActiveNotification`, `Position`, `AnimationType`, `IconName`

---

## Customization & Theming

SCSS değişkenlerini override ederek kendi temanı oluşturabilirsin:

```scss
// main.scss
$toast-bg: #222;
$toast-radius: 8px;
@import '@your-scope/vue-toast/styles/toast.module.scss';
```

---

## Why Choose This Package?
- SEO optimized: Fast, lightweight, and crawlable
- No external dependencies
- Works with all Vue 3 setups
- TypeScript out of the box
- 15+ built-in icons
- Custom icon upload & URL support
- Progress bar, animations, stacking
- Used in production by real teams

---

## License & Author

- License: GPL-3.0
- Author: Canberk Beren
- GitHub: https://github.com/highpriv/toast-builder

---

## Keywords
vue3, toast, notification, typescript, component, animation, scss, lightweight, fast, customizable, dark-mode, progress-bar, icon, builder

---

## Star & Share
Beğendiyseniz GitHub’da yıldız verin ve paylaşın! Daha fazla Vue 3 bileşeni için takipte kalın.
