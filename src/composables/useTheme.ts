import { ref, watch, onMounted } from "vue";
import type { Theme } from "@/types";
import { ThemeStorage } from "../utils/storage";

const currentTheme = ref<Theme>("light");

export const useTheme = () => {
  const initTheme = (): void => {
    const savedTheme = ThemeStorage.loadTheme();

    if (savedTheme) {
      currentTheme.value = savedTheme;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      currentTheme.value = prefersDark ? "dark" : "light";
    }

    applyTheme(currentTheme.value);
  };

  const applyTheme = (theme: Theme): void => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const toggleTheme = (): void => {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
    applyTheme(currentTheme.value);
    ThemeStorage.saveTheme(currentTheme.value);
  };

  const setTheme = (theme: Theme): void => {
    currentTheme.value = theme;
    applyTheme(theme);
    ThemeStorage.saveTheme(theme);
  };

  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme);
  });

  onMounted(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      if (!ThemeStorage.loadTheme()) {
        currentTheme.value = e.matches ? "dark" : "light";
      }
    });
  });

  return {
    currentTheme,
    initTheme,
    toggleTheme,
    setTheme,
  };
};
