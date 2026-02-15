<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Appearance</h3>

    <div :class="$style.field">
      <label :class="$style.label">Background Color</label>
      <ColorPicker :modelValue="currentConfig.backgroundColor"
        @update:modelValue="(v) => updateConfig({ backgroundColor: v })" />
    </div>

    <div :class="$style.field">
      <label :class="$style.label">Text Color</label>
      <ColorPicker :modelValue="currentConfig.textColor" @update:modelValue="(v) => updateConfig({ textColor: v })" />
    </div>

    <div :class="$style.field">
      <label :class="$style.checkbox">
        <input type="checkbox" :checked="currentConfig.showIcon" @change="handleShowIconChange" />
        <span>Show Icon</span>
      </label>
    </div>

    <div :class="$style.field">
      <label :class="$style.checkbox">
        <input type="checkbox" :checked="currentConfig.showCloseButton" @change="handleShowCloseChange" />
        <span>Show Close Button</span>
      </label>
    </div>

    <div :class="$style.field">
      <label :class="$style.checkbox">
        <input type="checkbox" :checked="currentConfig.showProgress" @change="handleShowProgressChange" />
        <span>Show Progress Bar</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColorPicker } from '@/components/common';
import { useToastBuilder } from '@/composables';

const { currentConfig, updateConfig } = useToastBuilder();

const handleShowIconChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  updateConfig({ showIcon: target.checked });
};

const handleShowCloseChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  updateConfig({ showCloseButton: target.checked });
};

const handleShowProgressChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  updateConfig({ showProgress: target.checked });
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

.field {
  margin-bottom: var(--spacing-md);

  &:last-child {
    margin-bottom: 0;
  }
}

.label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  span {
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }
}
</style>
