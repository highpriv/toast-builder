<template>
  <div :class="[$style['container'], $style[position]]">
    <TransitionGroup name="toast">
      <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="handleClose" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import type { Position, AnimationType, ToastInput } from '../types/toast';
import Toast from './Toast.vue';
import { useToast } from '../composables/useToast';

// Props with default values
interface ToastContainerProps {
  position: Position;
  defaultDuration?: number;
  defaultAnimation?: AnimationType;
  defaultShowIcon?: boolean;
  defaultShowCloseButton?: boolean;
  defaultShowProgress?: boolean;
}

const props = withDefaults(defineProps<ToastContainerProps>(), {
  position: 'top-right',
});

// Build global config from props
const globalConfig: Partial<ToastInput> = {
  ...(props.defaultDuration !== undefined && { duration: props.defaultDuration }),
  ...(props.defaultAnimation !== undefined && { animation: props.defaultAnimation }),
  ...(props.defaultShowIcon !== undefined && { showIcon: props.defaultShowIcon }),
  ...(props.defaultShowCloseButton !== undefined && { showCloseButton: props.defaultShowCloseButton }),
  ...(props.defaultShowProgress !== undefined && { showProgress: props.defaultShowProgress }),
};

// Provide global config to useToast
provide('toastDefaultConfig', globalConfig);

const { getToastsByPosition, dismissToast } = useToast();
const toasts = computed(() => getToastsByPosition(props.position).value);

function handleClose(id: string) {
  dismissToast(id);
}

defineExpose({
  toasts,
  handleClose,
  position: props.position,
});
</script>

<style module lang="scss">
@import '../styles/toast.module.scss';
// ...existing code...</style>