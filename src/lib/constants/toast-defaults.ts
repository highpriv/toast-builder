export const DEFAULT_ICONS = {
  success: "check-circle",
  error: "x-circle",
  warning: "alert-triangle",
  info: "information-circle",
} as const;

export const DEFAULT_COLORS = {
  success: {
    backgroundColor: "#10b981",
    textColor: "#ffffff",
  },
  error: {
    backgroundColor: "#ef4444",
    textColor: "#ffffff",
  },
  warning: {
    backgroundColor: "#f59e0b",
    textColor: "#ffffff",
  },
  info: {
    backgroundColor: "#3b82f6",
    textColor: "#ffffff",
  },
} as const;

export const DEFAULT_CONFIG = {
  duration: 3000,
  position: "top-right" as const,
  showIcon: true,
  showCloseButton: true,
  animation: "fade" as const,
  showProgress: false,
};

export const TOAST_DEFAULTS = {
  success: {
    type: "success",
    title: "Success",
    message: "Operation completed successfully",
    duration: 3000,
    position: "top-right",
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    showIcon: true,
    showCloseButton: true,
    customIcon: "check-circle",
    animation: "fade",
    showProgress: true,
  },
  error: {
    type: "error",
    title: "Error",
    message: "Something went wrong",
    duration: 5000,
    position: "top-right",
    backgroundColor: "#ef4444",
    textColor: "#ffffff",
    showIcon: true,
    showCloseButton: true,
    customIcon: "x-circle",
    animation: "fade",
    showProgress: true,
  },
  warning: {
    type: "warning",
    title: "Warning",
    message: "Please be careful",
    duration: 4000,
    position: "top-right",
    backgroundColor: "#f59e0b",
    textColor: "#ffffff",
    showIcon: true,
    customIcon: "alert-triangle",
    showCloseButton: true,
    animation: "fade",
    showProgress: true,
  },
  info: {
    type: "info",
    title: "Info",
    message: "Here is some information",
    duration: 3000,
    position: "top-right",
    backgroundColor: "#3b82f6",
    textColor: "#ffffff",
    showIcon: true,
    showCloseButton: true,
    customIcon: "information-circle",
    animation: "fade",
    showProgress: true,
  },
};
