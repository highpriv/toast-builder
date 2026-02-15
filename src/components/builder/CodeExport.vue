<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Export Code</h3>

    <div :class="$style.tabs">
      <button :class="[$style.tab, { [$style.active]: activeTab === 'vue' }]" @click="activeTab = 'vue'">
        Vue 3
      </button>
      <button :class="[$style.tab, { [$style.active]: activeTab === 'js' }]" @click="activeTab = 'js'">
        JavaScript
      </button>
    </div>

    <div :class="$style.codeWrapper">
      <pre :class="$style.code"><code>{{ currentCode }}</code></pre>
      <button :class="$style.copyButton" @click="handleCopy">
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToastBuilder, useClipboard } from '@/composables';

const { exportVueCode, exportJSCode } = useToastBuilder();
const { copied, copyToClipboard } = useClipboard();

const activeTab = ref<'vue' | 'js'>('vue');

const currentCode = computed(() => {
  return activeTab.value === 'vue' ? exportVueCode() : exportJSCode();
});

const handleCopy = async () => {
  await copyToClipboard(currentCode.value);
};
</script>

<style module lang="scss">
.section {
  margin-bottom: var(--spacing-lg);
}

.title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-md);
}

.tabs {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.tab {
  flex: 1;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
  }

  &.active {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
    color: white;
  }
}

.codeWrapper {
  position: relative;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.code {
  padding: var(--spacing-md);
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: var(--font-size-xs);
  line-height: 1.6;
  color: var(--text-primary);
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.copyButton {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
}
</style>
