<template>
  <div :class="$style.colorPicker">
    <div :class="$style.swatchWrapper">
      <div :class="$style.swatch" :style="{ backgroundColor: modelValue }"></div>
      <input type="color" :value="modelValue" :class="$style.colorInput" @input="handleColorInput" />
    </div>
    <BaseInput :modelValue="modelValue" type="text" placeholder="#000000" @update:modelValue="handleTextInput" />
  </div>
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue';
import { isValidHexColor, normalizeHexColor } from '@/utils';

withDefaults(
  defineProps<{
    modelValue: string;
  }>(),
  {}
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleColorInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleTextInput = (value: string | number) => {
  const hexValue = String(value);
  if (isValidHexColor(hexValue)) {
    emit('update:modelValue', normalizeHexColor(hexValue));
  } else {
    emit('update:modelValue', hexValue);
  }
};
</script>

<style module lang="scss">
.colorPicker {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.swatchWrapper {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.swatch {
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-sm);
  border: 2px solid var(--border-color);
  pointer-events: none;
  transition: transform var(--transition-fast);
}

.swatchWrapper:hover .swatch {
  transform: scale(1.05);
}

.swatchWrapper:active .swatch {
  transform: scale(0.95);
}

.colorInput {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
