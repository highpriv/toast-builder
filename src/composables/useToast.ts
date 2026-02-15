import { ref, computed } from "vue";
import type { NotificationConfig, ActiveNotification, Position } from "@/types";
import { generateId } from "@/utils";

const activeToasts = ref<ActiveNotification[]>([]);
const dismissedToasts = ref<ActiveNotification[]>([]);

export const useToast = () => {
  const showToast = (config: Omit<NotificationConfig, "id">): string => {
    const id = generateId();
    const toast: ActiveNotification = {
      ...config,
      id,
      createdAt: Date.now(),
    };

    activeToasts.value.push(toast);

    if (config.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, config.duration);
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

    if (last.duration > 0) {
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
