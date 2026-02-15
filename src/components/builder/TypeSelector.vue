<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Notification Type</h3>
    <div :class="$style.types">
      <button v-for="type in types" :key="type.value" :class="[
        $style.typeButton,
        { [$style.active]: currentConfig.type === type.value }
      ]" @click="handleTypeChange(type.value)">
        <Icon :name="type.icon" size="20px" />
        <span>{{ type.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NotificationType, IconName } from '@/types';
import { Icon } from '@/components/common';
import { useToastBuilder } from '@/composables';

const { currentConfig, setType } = useToastBuilder();

const types: Array<{ value: NotificationType; label: string; icon: IconName }> = [
  { value: 'success', label: 'Success', icon: 'check-circle' },
  { value: 'error', label: 'Error', icon: 'x-circle' },
  { value: 'warning', label: 'Warning', icon: 'alert-triangle' },
  { value: 'info', label: 'Info', icon: 'information-circle' },
];

const handleTypeChange = (type: NotificationType) => {
  setType(type);
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

.types {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.typeButton {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-primary);
  color: var(--text-primary);
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

  span {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }
}
</style>
