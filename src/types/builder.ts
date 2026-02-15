import type { NotificationConfig } from "./toast";

export interface Preset {
  id: string;
  name: string;
  config: Omit<NotificationConfig, "id">;
  createdAt: string;
}

export interface BuilderState {
  currentConfig: NotificationConfig;
  presets: Preset[];
}
