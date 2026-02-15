# Toast Notification Builder

A type-safe toast notification configuration tool built with Vue 3 and TypeScript. Configure, preview, and export production-ready notification code with live updates and comprehensive customization options.

Live Demo: https://toast-builder.vercel.app/

![Vue 3](https://img.shields.io/badge/Vue-3.5.25-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29.7-C21325?logo=jest&logoColor=white)

---

## Features

### Core Features

- **Configuration Panel**: Fully customizable notification properties
  - 4 notification types (success, error, warning, info)
  - Title and message inputs with validation
  - Duration slider (1-10 seconds) or persistent mode
  - 6 position options (top/bottom × left/center/right)

- **Style Customization**
  - Background and text color pickers with hex input
  - Icon visibility toggle
  - Close button toggle
  - Progress bar toggle

- **Live Preview**: Real-time preview that updates instantly as you configure

- **Preset Management**
  - Save current configuration as named presets
  - Load previously saved presets
  - Delete unwanted presets
  - Persistent storage using localStorage

- **Multiple Notification Stacking**: Display multiple notifications simultaneously with proper vertical arrangement

### Bonus Features (All Implemented)

- **Animation System**: 3 animation styles (fade, slide, bounce)
- **Code Export**: Generate production-ready Vue 3 or JavaScript code with copy-to-clipboard
- **Progress Bar**: Visual countdown for auto-dismiss notifications
- **Custom Icon Upload**: Upload custom icons with automatic compression (max 128×128, 100KB)
- **Custom Icon URLs**: Use external icon URLs with validation
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Built-in Icon Library**: 15 pre-configured icons for immediate use

---

## Tech Stack

| Technology         | Version | Purpose                              |
| ------------------ | ------- | ------------------------------------ |
| **Vue 3**          | 3.5.25  | Frontend framework (Composition API) |
| **TypeScript**     | 5.9     | Type safety and better DX            |
| **Vite**           | 7.3     | Build tool and dev server            |
| **Jest**           | 29.7    | Testing framework                    |
| **Vue Test Utils** | 2.4.6   | Vue component testing                |
| **Nanoid**         | 5.0.7   | Unique ID generation                 |
| **SCSS Modules**   | -       | Scoped styling                       |

---

## Prerequisites

- **Node.js**: ≥ 18.0.0
- **npm**: ≥ 9.0.0

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/highpriv/toast-builder.git
cd toast-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

### 4. Run tests

```bash
npm run test
```

---

## Available Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Build for production (`dist/` folder)    |
| `npm run preview`       | Preview production build locally         |
| `npm run test`          | Run all tests                            |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Generate test coverage report            |
| `npm run type-check`    | Run TypeScript type checking             |

---

## Project Structure

```
toast-builder/
├── src/
│   ├── components/
│   │   ├── builder/          # Configuration panel components
│   │   │   ├── ToastBuilder.vue
│   │   │   ├── ConfigPanel.vue
│   │   │   ├── PreviewPane.vue
│   │   │   ├── TypeSelector.vue
│   │   │   ├── PositionSelector.vue
│   │   │   ├── ContentControls.vue
│   │   │   ├── StyleControls.vue
│   │   │   ├── AnimationSelector.vue
│   │   │   ├── PresetManager.vue
│   │   │   └── CodeExport.vue
│   │   ├── common/            # Reusable UI components
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseInput.vue
│   │   │   ├── BaseSelect.vue
│   │   │   ├── BaseRadio.vue
│   │   │   ├── ColorPicker.vue
│   │   │   ├── Icon.vue
│   │   │   └── ThemeToggle.vue
│   │   └── toast/             # Toast display components
│   │       ├── Toast.vue
│   │       └── ToastContainer.vue
│   ├── composables/           # Vue composition functions
│   │   ├── useToast.ts        # Toast state management
│   │   ├── useToastBuilder.ts # Builder config management
│   │   ├── usePresets.ts      # Preset CRUD operations
│   │   ├── useTheme.ts        # Theme management
│   │   ├── useAnimation.ts    # Animation utilities
│   │   └── useClipboard.ts    # Copy-to-clipboard functionality
│   ├── utils/                 # Helper functions
│   │   ├── validators.ts      # Input validation
│   │   ├── storage.ts         # localStorage abstraction
│   │   ├── code-generator.ts  # Code export logic
│   │   ├── color-utils.ts     # Color manipulation
│   │   ├── image-utils.ts     # Image compression & validation
│   │   └── nanoid.ts          # ID generation
│   ├── types/                 # TypeScript type definitions
│   │   ├── toast.ts
│   │   ├── builder.ts
│   │   ├── animation.ts
│   │   └── theme.ts
│   ├── constants/             # App constants
│   │   ├── toast-defaults.ts
│   │   ├── animation-presets.ts
│   │   ├── color-palettes.ts
│   │   └── icon-library.ts
│   ├── styles/                # Global styles
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   ├── _reset.scss
│   │   └── _animations.scss
│   ├── App.vue
│   └── main.ts
├── tests/
│   ├── unit/
│   │   └── utils/
│   │       └── validators.spec.ts
│   ├── setup.ts
│   └── __mocks__/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── jest.config.cjs
```

---

## Development Approach

### Architecture

The project follows a **component-based architecture** with clear separation of concerns:

1. **Presentation Layer** (`components/`): Reusable UI components using Vue 3 Composition API
2. **Business Logic** (`composables/`): Shared state management and functionality using Vue composables
3. **Utilities** (`utils/`): Pure functions for validation, storage, code generation
4. **Type Safety**: Strict TypeScript configuration with comprehensive type definitions

### Key Design Decisions

**1. Composition API over Options API**

- Better TypeScript inference
- Improved code reusability through composables
- More maintainable for complex logic

**2. SCSS Modules for Styling**

- Scoped styles prevent conflicts
- CSS variable system for theming
- Consistent design tokens

**3. Single Source of Truth**

- `useToastBuilder()` manages configuration state
- `useToast()` manages active notifications
- All components react to state changes

**4. Validation & Error Handling**

- Input validation on every change
- User-friendly error messages
- Prevents invalid configurations

**5. Image Optimization**

- Canvas API for client-side compression
- Maximum dimensions (128×128px)
- File size limit (100KB)
- Supported formats: PNG, JPEG, GIF, WebP, SVG

**6. Code Export**

- Templates for Vue 3 SFC and plain JavaScript
- Proper escaping for special characters
- Copy-to-clipboard with user feedback

### State Management Pattern

```typescript
// Global reactive state using composables
const config = useToastBuilder(); // Configuration state
const toasts = useToast(); // Active toasts
const presets = usePresets(); // Saved presets
const theme = useTheme(); // Theme preference
```

### Testing Strategy

- **Unit Tests**: Core utilities (validators, color manipulation)
- **Component Tests**: (Ready for expansion)
- **Integration Tests**: (Future improvement)

---

## Assumptions

### User Experience

1. **Responsive design**: Optimized for all devices
2. **Modern browser support**: Assumes ES2020+ features (async/await, optional chaining, etc.)
3. **JavaScript enabled**: Application requires JavaScript to function
4. **localStorage available**: Presets require localStorage (graceful degradation if unavailable)

### Technical

1. **No backend required**: All state managed client-side
2. **ID generation**: Using `nanoid` for unique IDs instead of UUID (smaller, URL-safe)
3. **Animation timing**: Standard durations (fade: 300ms, slide: 400ms, bounce: 500ms)
4. **Color format**: Only hex colors supported (no RGB/HSL input)
5. **Image upload**: Client-side compression using Canvas API (no server-side processing)
6. **Theme detection**: Uses `prefers-color-scheme` media query for initial theme

### Validation Rules

- **Title**: Optional, max 50 characters
- **Message**: Required, 1-200 characters
- **Duration**: 1000ms - 10000ms or 0 (persistent)
- **Preset name**: 1-50 characters
- **Image files**: ≤5MB, PNG/JPEG/GIF/WebP/SVG only
- **Image URLs**: Must end with valid image extension

### Browser Compatibility

- **Chrome**: ≥90
- **Firefox**: ≥88
- **Safari**: ≥14
- **Edge**: ≥90

---

## Testing

The project includes comprehensive unit tests for core functionality:

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

**Current Test Coverage:**

- Input validation (title, message, duration, preset names)
- Color utilities
- Image validation (file type, size, URL format)
- Component tests (planned)
- Integration tests (planned)

---

## Usage Example

1. **Select notification type** (success, error, warning, info)
2. **Configure content** (title, message, duration)
3. **Choose position** (where toast appears on screen)
4. **Customize appearance** (colors, icons, progress bar)
5. **Select animation** (fade, slide, bounce)
6. **Preview in real-time** - See changes instantly
7. **Test behavior** - Click "Show Notification" to trigger actual toast
8. **Save as preset** (optional) - Save for reuse
9. **Export code** - Get Vue 3 or JavaScript code

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Generates optimized production build in `dist/` folder.

**Build configuration:**

- Output directory: `dist`
- Build command: `npm run build`
- Install command: `npm install`
