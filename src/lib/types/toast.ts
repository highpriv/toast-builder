export type NotificationType = "success" | "error" | "warning" | "info";
export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export type AnimationType = "fade" | "slide" | "bounce";
export type IconName =
  | "check-circle"
  | "check"
  | "badge-check"
  | "x-circle"
  | "alert-circle"
  | "exclamation-circle"
  | "alert-triangle"
  | "exclamation-triangle"
  | "information-circle"
  | "question-mark-circle"
  | "bell"
  | "megaphone"
  | "sparkles"
  | "heart"
  | "moon"
  | "sun"
  | "none";
export interface NotificationConfig {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
  position?: Position;
  backgroundColor?: string;
  textColor?: string;
  showIcon?: boolean;
  showCloseButton?: boolean;
  customIcon?: IconName;
  customIconUrl?: string;
  customIconBase64?: string;
  customCloseButtonUrl?: string;
  customCloseButtonBase64?: string;
  animation?: AnimationType;
  showProgress?: boolean;
}

export interface ToastInput {
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
  position?: Position;
  backgroundColor?: string;
  textColor?: string;
  showIcon?: boolean;
  showCloseButton?: boolean;
  customIcon?: IconName;
  customIconUrl?: string;
  customIconBase64?: string;
  customCloseButtonUrl?: string;
  customCloseButtonBase64?: string;
  animation?: AnimationType;
  showProgress?: boolean;
}

export interface ActiveNotification extends NotificationConfig {
  createdAt: number;
}
