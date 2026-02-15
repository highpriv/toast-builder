<template>
  <div :class="$style.preview">
    <div :class="$style.controls">
      <BaseButton size="sm" @click="handleShowNotification" :disabled="hasError">
        Show Notification
      </BaseButton>
      <BaseButton size="sm" variant="secondary" @click="handleClearAll">
        Clear All
      </BaseButton>
    </div>

    <div v-if="!hasError" :class="$style.toastWrapper">
      <Toast :key="previewKey" :toast="previewToast" :class="$style.previewToast" @close="() => { }" />
    </div>

    <div :class="$style.info">
      <p>Live preview updates as you change settings</p>
      <p>Click "Show Notification" to trigger actual toast at selected position</p>
      <p :class="$style.detail">
        Position: <strong>{{ currentConfig.position }}</strong>
      </p>
      <p :class="$style.detail">
        Animation: <strong>{{ currentConfig.animation || 'fade' }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ActiveNotification } from '@/types';
import { Toast } from '@/components/toast';
import { BaseButton } from '@/components/common';
import { useToastBuilder, useToast } from '@/composables';
import { validateTitle, validateMessage } from '@/utils';

const { currentConfig } = useToastBuilder();
const { showToast, clearAllToasts } = useToast();

const previewKey = ref(0);

const titleError = computed(() =>
  currentConfig.value.title.length > 0 && !validateTitle(currentConfig.value.title)
    ? 'Title must be 50 characters or less'
    : ''
);
const messageError = computed(() =>
  currentConfig.value.message.trim().length === 0
    ? 'Message is required'
    : currentConfig.value.message.length > 200
      ? 'Message must be 200 characters or less'
      : !validateMessage(currentConfig.value.message)
        ? 'Message must be 200 characters or less'
        : ''
);
const hasError = computed(() => !!titleError.value || !!messageError.value);

const previewToast = computed<ActiveNotification>(() => ({
  ...currentConfig.value,
  id: 'preview',
  createdAt: Date.now(),
}));

watch(currentConfig, () => {
  previewKey.value++;
}, { deep: true });

const handleShowNotification = () => {
  if (!hasError.value) {
    showToast(currentConfig.value);
  }
};

const handleClearAll = () => {
  clearAllToasts();
};
</script>

<style module lang="scss">
.preview {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  height: 100%;
  padding: var(--spacing-lg);
}

.controls {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.toastWrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
}

.previewToast {
  pointer-events: auto;
}

.info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.detail {
  strong {
    color: var(--text-primary);
    font-weight: var(--font-weight-semibold);
  }
}
</style>
