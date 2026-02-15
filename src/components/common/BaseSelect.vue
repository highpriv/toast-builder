<template>
  <div :class="$style.wrapper">
    <select :value="modelValue" :disabled="disabled" :class="$style.select" @change="handleChange">
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  value: string | number;
  label: string;
}

withDefaults(
  defineProps<{
    modelValue: string | number;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: '',
    disabled: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}

.select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: border-color var(--transition-fast);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
