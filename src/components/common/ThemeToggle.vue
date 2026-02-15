<template>
  <button :class="$style.toggle" @click="handleToggle">
    <Icon :name="currentTheme === 'dark' ? 'sun' : 'moon'" size="20px" />
  </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Icon from './Icon.vue';
import { useTheme } from '@/composables';

const { currentTheme, initTheme, toggleTheme } = useTheme();

onMounted(() => {
  initTheme();
});

const handleToggle = () => {
  toggleTheme();
};
</script>

<style module lang="scss">
.toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--bg-tertiary);
    transform: rotate(180deg) scale(1.1);
  }

  &:active {
    transform: rotate(180deg) scale(0.95);
  }
}
</style>
