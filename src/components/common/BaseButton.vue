<template>
  <button :type="type" :disabled="disabled || loading" :class="[
    $style.button,
    $style[variant],
    $style[size],
    { [$style.fullWidth]: fullWidth, [$style.loading]: loading }
  ]">
    <span v-if="loading" :class="$style.spinner"></span>
    <span :class="{ [$style.content]: loading }">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    type?: 'button' | 'submit';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
  }>(),
  {
    variant: 'primary',
    disabled: false,
    type: 'button',
    size: 'md',
    loading: false,
    fullWidth: false,
  }
);
</script>

<style module lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  border-radius: var(--border-radius);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  outline: none;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.primary {
  background-color: var(--color-primary);
  color: white;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
}

.secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);

  &:hover:not(:disabled) {
    background-color: var(--border-color);
  }
}

.danger {
  background-color: var(--color-error);
  color: white;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }
}

.sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
}

.md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-base);
}

.fullWidth {
  width: 100%;
}

.loading {
  position: relative;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.content {
  opacity: 0.6;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
