<template>
  <div :class="[$style.container, $style[position]]">
    <TransitionGroup name="toast">
      <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="handleClose" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Position } from '@/types';
import Toast from './Toast.vue';
import { useToast } from '@/composables';

const props = defineProps<{
  position: Position;
}>();

const { getToastsByPosition, dismissToast } = useToast();

const toasts = computed(() => getToastsByPosition(props.position).value);

const handleClose = (id: string) => {
  dismissToast(id);
};
</script>

<style module lang="scss">
.container {
  position: fixed;
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  pointer-events: none;

  >* {
    pointer-events: auto;
  }
}

.top-left {
  top: var(--spacing-lg);
  left: var(--spacing-lg);
}

.top-center {
  top: var(--spacing-lg);
  left: 0;
  right: 0;
  align-items: center;
}

.top-right {
  top: var(--spacing-lg);
  right: var(--spacing-lg);
}

.bottom-left {
  bottom: var(--spacing-lg);
  left: var(--spacing-lg);
}

.bottom-center {
  bottom: var(--spacing-lg);
  left: 0;
  right: 0;
  align-items: center;
}

.bottom-right {
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
}
</style>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
