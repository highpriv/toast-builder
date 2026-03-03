import { ref } from "vue";
import type { NotificationConfig, NotificationType } from "@/types";
import { TOAST_DEFAULTS } from "@/constants";
import { generateVueCode, generateJSCode } from "../utils/code-generator";

const currentConfig = ref<Omit<NotificationConfig, "id">>({
  ...TOAST_DEFAULTS.success,
});

export const useToastBuilder = () => {
  const updateConfig = (
    updates: Partial<Omit<NotificationConfig, "id">>,
  ): void => {
    currentConfig.value = {
      ...currentConfig.value,
      ...updates,
    };
  };

  const setType = (type: NotificationType): void => {
    const defaults = TOAST_DEFAULTS[type];
    currentConfig.value = {
      ...currentConfig.value,
      type,
      backgroundColor: defaults.backgroundColor,
      textColor: defaults.textColor,
      ...(defaults.customIcon && { customIcon: defaults.customIcon }),
    };
  };

  const resetConfig = (): void => {
    currentConfig.value = { ...TOAST_DEFAULTS.success };
  };

  const exportVueCode = (): string => {
    const fullConfig: NotificationConfig = {
      id: "generated",
      ...currentConfig.value,
    };
    return generateVueCode(fullConfig);
  };

  const exportJSCode = (): string => {
    const fullConfig: NotificationConfig = {
      id: "generated",
      ...currentConfig.value,
    };
    return generateJSCode(fullConfig);
  };

  return {
    currentConfig,
    updateConfig,
    setType,
    resetConfig,
    exportVueCode,
    exportJSCode,
  };
};
