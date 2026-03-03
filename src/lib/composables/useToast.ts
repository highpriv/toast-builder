import { ref, computed, inject } from "vue";
import type {
  NotificationConfig,
  ActiveNotification,
  Position,
  ToastInput,
} from "../types/toast";
import { generateId } from "../utils/nanoid";
import {
  DEFAULT_CONFIG,
  DEFAULT_COLORS,
  DEFAULT_ICONS,
} from "../constants/toast-defaults";

const activeToasts = ref<ActiveNotification[]>([]);
const dismissedToasts = ref<ActiveNotification[]>([]);

export const useToast = () => {
  // Get global config from ToastContainer (if provided)
  const globalConfig = inject<Partial<ToastInput> | undefined>(
    "toastDefaultConfig",
    undefined,
  );

  const showToast = (config: ToastInput): string => {
    const id = generateId();

    // Get type-based defaults
    const typeColors = DEFAULT_COLORS[config.type];
    const typeIcon = DEFAULT_ICONS[config.type];

    // Merge configs: DEFAULT_CONFIG -> globalConfig -> typeDefaults -> user config
    const mergedConfig: NotificationConfig = {
      // Start with global defaults
      ...DEFAULT_CONFIG,
      // Apply global config from ToastContainer
      ...globalConfig,
      // Apply type-based colors
      backgroundColor: typeColors.backgroundColor,
      textColor: typeColors.textColor,
      // Apply type-based icon if showIcon is true
      ...(config.showIcon !== false &&
      !config.customIcon &&
      !config.customIconUrl &&
      !config.customIconBase64
        ? { customIcon: typeIcon }
        : {}),
      // Apply user config (overrides everything)
      ...config,
      // Add required fields
      id,
      title: config.title || "",
    };

    const toast: ActiveNotification = {
      ...mergedConfig,
      createdAt: Date.now(),
    };

    activeToasts.value.push(toast);

    if (mergedConfig.duration && mergedConfig.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, mergedConfig.duration);
    }

    return id;
  };

  const dismissToast = (id: string): void => {
    const index = activeToasts.value.findIndex((t) => t.id === id);
    if (index === -1) return;

    const [dismissed] = activeToasts.value.splice(index, 1);
    if (dismissed) {
      dismissedToasts.value.push(dismissed);
      setTimeout(() => {
        const dismissedIndex = dismissedToasts.value.findIndex(
          (t) => t.id === id,
        );
        if (dismissedIndex !== -1) {
          dismissedToasts.value.splice(dismissedIndex, 1);
        }
      }, 30000);
    }
  };

  const undoLastDismissed = (): void => {
    const last = dismissedToasts.value.pop();
    if (!last) return;

    activeToasts.value.push(last);

    if (last.duration && last.duration > 0) {
      setTimeout(() => {
        dismissToast(last.id);
      }, last.duration);
    }
  };

  const clearAllToasts = (): void => {
    activeToasts.value = [];
  };

  const getToastsByPosition = (position: Position) => {
    return computed(() =>
      activeToasts.value.filter((t) => t.position === position),
    );
  };

  return {
    activeToasts: computed(() => activeToasts.value),
    dismissedToasts: computed(() => dismissedToasts.value),
    showToast,
    dismissToast,
    undoLastDismissed,
    clearAllToasts,
    getToastsByPosition,
  };
};
