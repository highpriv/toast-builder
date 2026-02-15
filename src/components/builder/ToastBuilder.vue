<template>
  <div :class="$style.builder">
    <div :class="$style.panel">
      <div :class="$style.header">
        <h1 :class="$style.title">Toast Notification Builder</h1>
        <ThemeToggle />
      </div>

      <div :class="$style.content">
        <slot name="config" />
      </div>
    </div>

    <div :class="$style.previewArea">
      <slot name="preview" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ThemeToggle } from '@/components/common';
</script>

<style module lang="scss">
.builder {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: var(--spacing-lg);
  height: 100vh;
  padding: var(--spacing-lg);
  background-color: var(--bg-primary);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
  }
}

.panel {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.content {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.previewArea {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
</style>
