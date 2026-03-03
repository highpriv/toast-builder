<template>
  <div :class="[$style['container'], $style[position]]">
    <TransitionGroup name="toast">
      <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="handleClose" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Position } from '../types/toast';
import Toast from './Toast.vue';
import { useToast } from '../../composables/useToast';

const props = defineProps<{ position: Position }>();
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