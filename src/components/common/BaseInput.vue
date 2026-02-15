<template>
  <input :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
    :class="[$style.input, { [$style.error]: error }]" @input="handleInput" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: 'text' | 'number' | 'email';
    placeholder?: string;
    disabled?: boolean;
    error?: string;
  }>(),
  {
    type: 'text',
    placeholder: '',
    disabled: false,
    error: '',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style module lang="scss">
.input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  transition: border-color var(--transition-fast);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

.error {
  border-color: var(--color-error);

  &:focus {
    border-color: var(--color-error);
  }
}
</style>
