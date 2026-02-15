import type { IconName, NotificationType } from "@/types/toast";

export interface IconMetadata {
  name: IconName;
  label: string;
  category: "success" | "error" | "warning" | "info" | "generic";
}

export const ICON_LIBRARY: IconMetadata[] = [
  { name: "check-circle", label: "Check Circle", category: "success" },
  { name: "check", label: "Check", category: "success" },
  { name: "badge-check", label: "Badge Check", category: "success" },
  { name: "x-circle", label: "X Circle", category: "error" },
  { name: "alert-circle", label: "Alert Circle", category: "error" },
  {
    name: "exclamation-circle",
    label: "Exclamation Circle",
    category: "error",
  },
  { name: "alert-triangle", label: "Alert Triangle", category: "warning" },
  {
    name: "exclamation-triangle",
    label: "Exclamation Triangle",
    category: "warning",
  },
  { name: "information-circle", label: "Information Circle", category: "info" },
  {
    name: "question-mark-circle",
    label: "Question Mark Circle",
    category: "info",
  },
  { name: "bell", label: "Bell", category: "generic" },
  { name: "megaphone", label: "Megaphone", category: "generic" },
  { name: "sparkles", label: "Sparkles", category: "generic" },
  { name: "heart", label: "Heart", category: "generic" },
  { name: "none", label: "No Icon", category: "generic" },
];

export const DEFAULT_ICONS: Record<NotificationType, IconName> = {
  success: "check-circle",
  error: "x-circle",
  warning: "alert-triangle",
  info: "information-circle",
};

export function getIconsByCategory(
  category: IconMetadata["category"],
): IconMetadata[] {
  return ICON_LIBRARY.filter((icon) => icon.category === category);
}

export function getIconLabel(iconName: IconName): string {
  return ICON_LIBRARY.find((icon) => icon.name === iconName)?.label || iconName;
}
