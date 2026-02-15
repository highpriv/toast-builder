<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Position</h3>
    <div :class="$style.grid">
      <button v-for="pos in positions" :key="pos.value" :class="[
        $style.posButton,
        $style[pos.value],
        { [$style.active]: currentConfig.position === pos.value }
      ]" @click="handlePositionChange(pos.value)">
        {{ pos.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Position } from '@/types';
import { useToastBuilder } from '@/composables';

const { currentConfig, updateConfig } = useToastBuilder();

const positions: Array<{ value: Position; label: string }> = [
  { value: 'top-left', label: 'TL' },
  { value: 'top-center', label: 'TC' },
  { value: 'top-right', label: 'TR' },
  { value: 'bottom-left', label: 'BL' },
  { value: 'bottom-center', label: 'BC' },
  { value: 'bottom-right', label: 'BR' },
];

const handlePositionChange = (position: Position) => {
  updateConfig({ position });
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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--spacing-sm);
  height: 100px;
}

.posButton {
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    background-color: var(--bg-secondary);
  }

  &.active {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
    color: white;
  }
}

.top-left {
  grid-area: 1 / 1;
}

.top-center {
  grid-area: 1 / 2;
}

.top-right {
  grid-area: 1 / 3;
}

.bottom-left {
  grid-area: 2 / 1;
}

.bottom-center {
  grid-area: 2 / 2;
}

.bottom-right {
  grid-area: 2 / 3;
}
</style>
