<template>
  <label :class="$style.radio">
    <input type="radio" :name="name" :value="value" :checked="modelValue === value" @change="handleChange"
      :class="$style.input" />
    <span :class="$style.label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value: string;
  label: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style module lang="scss">
.radio {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  user-select: none;

  &:hover .input {
    border-color: var(--color-primary);
  }
}

.input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--color-primary);
  margin: 0;
}

.label {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}
</style>
