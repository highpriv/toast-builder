import { ref } from "vue";

export const useClipboard = () => {
  const copied = ref(false);
  const error = ref<string | null>(null);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      error.value = null;

      setTimeout(() => {
        copied.value = false;
      }, 2000);

      return true;
    } catch (err) {
      copied.value = false;
      error.value = err instanceof Error ? err.message : "Failed to copy";
      return false;
    }
  };

  const resetState = (): void => {
    copied.value = false;
    error.value = null;
  };

  return {
    copied,
    error,
    copyToClipboard,
    resetState,
  };
};
