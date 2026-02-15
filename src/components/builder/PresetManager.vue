<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Presets</h3>

    <div :class="$style.saveArea">
      <div :class="$style.inputWrapper">
        <BaseInput v-model="presetName" placeholder="Preset name" :error="error" />
        <span v-if="error" :class="$style.errorText">{{ error }}</span>
      </div>
      <BaseButton size="sm" :disabled="!presetName.trim()" @click="handleSave">
        Save
      </BaseButton>
    </div>

    <div v-if="presets.length > 0" :class="$style.list">
      <div v-for="preset in presets" :key="preset.id" :class="$style.item">
        <div :class="$style.indicator" :data-type="preset.config.type"></div>
        <div :class="$style.info">
          <span :class="$style.name">{{ preset.name }}</span>
          <span :class="$style.meta">
            {{ formatDuration(preset.config.duration) }} • {{ formatPosition(preset.config.position) }}
          </span>
        </div>
        <div :class="$style.actions">
          <button :class="$style.iconButton" @click="handleLoad(preset.id)">
            <Icon name="check" size="16px" />
          </button>
          <button :class="$style.iconButton" @click="handleDelete(preset.id)">
            <Icon name="x-circle" size="16px" />
          </button>
        </div>
      </div>
    </div>

    <p v-else :class="$style.empty">No presets saved yet</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Position } from '@/types';
import { BaseButton, BaseInput, Icon } from '@/components/common';
import { usePresets, useToastBuilder } from '@/composables';
import { validatePresetName } from '@/utils';

const { presets, savePreset, loadPreset, deletePreset } = usePresets();
const { currentConfig, updateConfig } = useToastBuilder();

const presetName = ref('');
const error = ref('');

const formatDuration = (duration: number): string => {
  if (duration === 0) return 'Persistent';
  return duration >= 1000 ? `${duration / 1000}s` : `${duration}ms`;
};

const formatPosition = (position: Position): string => {
  const map: Record<Position, string> = {
    'top-left': 'TL',
    'top-center': 'TC',
    'top-right': 'TR',
    'bottom-left': 'BL',
    'bottom-center': 'BC',
    'bottom-right': 'BR',
  };
  return map[position];
};

const handleSave = () => {
  const name = presetName.value.trim();

  if (!name) {
    error.value = 'Preset name is required';
    return;
  }

  if (!validatePresetName(name)) {
    error.value = 'Preset name must be between 1 and 50 characters';
    return;
  }

  const success = savePreset(name, currentConfig.value);
  if (success) {
    presetName.value = '';
    error.value = '';
  } else {
    error.value = 'Failed to save preset';
  }
};

const handleLoad = (id: string) => {
  const config = loadPreset(id);
  if (config) {
    updateConfig(config);
  }
};

const handleDelete = (id: string) => {
  deletePreset(id);
};
</script>

<style module lang="scss">
.section {
  margin-bottom: var(--spacing-lg);
}

.title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-md);
}

.saveArea {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.inputWrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.errorText {
  font-size: var(--font-size-xs);
  color: var(--color-error);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--bg-tertiary);
  }
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &[data-type='success'] {
    background-color: #22c55e;
  }

  &[data-type='error'] {
    background-color: #ef4444;
  }

  &[data-type='warning'] {
    background-color: #f59e0b;
  }

  &[data-type='info'] {
    background-color: #3b82f6;
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  font-size: 11px;
  color: var(--text-tertiary);
  opacity: 0.7;
}

.actions {
  display: flex;
  gap: var(--spacing-xs);
}

.iconButton {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }
}

.empty {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  text-align: center;
  padding: var(--spacing-lg);
}
</style>
