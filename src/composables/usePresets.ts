import { ref, computed } from "vue";
import type { Preset, NotificationConfig } from "@/types";
import { PresetStorage, generatePresetId, validatePresetName } from "@/utils";

const presets = ref<Preset[]>(PresetStorage.loadPresets());

export const usePresets = () => {
  const savePreset = (
    name: string,
    config: Omit<NotificationConfig, "id">,
  ): boolean => {
    if (!validatePresetName(name)) {
      return false;
    }

    const preset: Preset = {
      id: generatePresetId(),
      name: name.trim(),
      config,
      createdAt: new Date().toISOString(),
    };

    presets.value.push(preset);
    return PresetStorage.savePresets(presets.value);
  };

  const loadPreset = (id: string): Omit<NotificationConfig, "id"> | null => {
    const preset = presets.value.find((p) => p.id === id);
    return preset ? preset.config : null;
  };

  const deletePreset = (id: string): boolean => {
    const index = presets.value.findIndex((p) => p.id === id);
    if (index === -1) return false;

    presets.value.splice(index, 1);
    return PresetStorage.savePresets(presets.value);
  };

  const clearPresets = (): boolean => {
    presets.value = [];
    return PresetStorage.clearPresets();
  };

  const reloadPresets = (): void => {
    presets.value = PresetStorage.loadPresets();
  };

  return {
    presets: computed(() => presets.value),
    savePreset,
    loadPreset,
    deletePreset,
    clearPresets,
    reloadPresets,
  };
};
