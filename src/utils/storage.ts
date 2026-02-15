import type { Preset } from "@/types";

const STORAGE_KEYS = {
  PRESETS: "toast-builder-presets",
  THEME: "toast-builder-theme",
} as const;

const getFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to read from localStorage (${key}):`, error);
    return null;
  }
};

const setToStorage = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to write to localStorage (${key}):`, error);
    return false;
  }
};

const removeFromStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove from localStorage (${key}):`, error);
    return false;
  }
};

export const PresetStorage = {
  loadPresets: (): Preset[] => {
    return getFromStorage<Preset[]>(STORAGE_KEYS.PRESETS) ?? [];
  },

  savePresets: (presets: Preset[]): boolean => {
    return setToStorage(STORAGE_KEYS.PRESETS, presets);
  },

  clearPresets: (): boolean => {
    return removeFromStorage(STORAGE_KEYS.PRESETS);
  },
};

export const ThemeStorage = {
  loadTheme: (): "light" | "dark" | null => {
    return getFromStorage<"light" | "dark">(STORAGE_KEYS.THEME);
  },

  saveTheme: (theme: "light" | "dark"): boolean => {
    return setToStorage(STORAGE_KEYS.THEME, theme);
  },
};
