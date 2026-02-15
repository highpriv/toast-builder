<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Animation</h3>
    <BaseSelect :modelValue="currentConfig.animation || 'fade'" :options="animationOptions"
      @update:modelValue="handleAnimationChange" />
  </div>
</template>

<script setup lang="ts">
import type { AnimationType } from '@/types';
import { BaseSelect, type SelectOption } from '@/components/common';
import { useToastBuilder } from '@/composables';

const { currentConfig, updateConfig } = useToastBuilder();

const animationOptions: SelectOption[] = [
  { value: 'fade', label: 'Fade' },
  { value: 'slide', label: 'Slide' },
  { value: 'bounce', label: 'Bounce' },
];

const handleAnimationChange = (value: string | number) => {
  updateConfig({ animation: value as AnimationType });
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
</style>
