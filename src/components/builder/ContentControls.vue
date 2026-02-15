<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Content</h3>

    <div :class="$style.field">
      <label :class="$style.label">Title (optional)</label>
      <BaseInput :modelValue="currentConfig.title" placeholder="Enter toast title" :error="titleError"
        @update:modelValue="handleTitleInput" :maxlength="50" />
      <span v-if="titleError" :class="$style.errorText">{{ titleError }}</span>
    </div>


    <div :class="$style.field">
      <label :class="$style.label">Message</label>
      <textarea :value="currentConfig.message" :class="[$style.textarea, { [$style.error]: messageError }]"
        placeholder="Enter toast message" rows="5" @input="handleMessageInput" :maxlength="200" style="resize: none;" />
      <span v-if="messageError" :class="$style.errorText">{{ messageError }}</span>
    </div>

    <div :class="$style.field">
      <label :class="$style.label">Duration</label>
      <label :class="$style.checkbox">
        <input type="checkbox" :checked="isPersistent" @change="handlePersistentChange" />
        <span>Persistent (no auto-dismiss)</span>
      </label>
      <div :class="$style.sliderWrapper">
        <input type="range" :value="currentConfig.duration" min="1000" max="10000" step="500" :class="$style.slider"
          :disabled="isPersistent" @input="handleDurationInput" />
        <span :class="$style.value">{{ isPersistent ? 'Persistent' : `${currentConfig.duration}ms` }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { BaseInput } from '@/components/common';
import { useToastBuilder } from '@/composables';
import { validateTitle, validateMessage } from '@/utils';

const { currentConfig, updateConfig } = useToastBuilder();

const titleError = ref('');
const messageError = ref('');

const isPersistent = computed(() => currentConfig.value.duration === 0);

const handleTitleInput = (v: string | number) => {
  const title = String(v);
  if (title.length > 0 && !validateTitle(title)) {
    titleError.value = 'Title must be 50 characters or less';
  } else {
    titleError.value = '';
  }
  updateConfig({ title });
};

const handleMessageInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  let message = target.value;
  // Allow up to 201 chars, block at 202+
  if (message.length > 201) {
    message = message.slice(0, 201);
  }

  if (message.trim().length === 0) {
    messageError.value = 'Message is required';
  } else if (message.length > 200) {
    messageError.value = 'Message must be 200 characters or less';
  } else if (!validateMessage(message)) {
    messageError.value = 'Message must be 200 characters or less';
  } else {
    messageError.value = '';
  }

  updateConfig({ message });
};

const handleDurationInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  updateConfig({ duration: Number(target.value) });
};

const handlePersistentChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    updateConfig({ duration: 0 });
  } else {
    updateConfig({ duration: 3000 });
  }
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

.field {
  margin-bottom: var(--spacing-md);
}

.label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.checkboxWrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--color-primary);
  }

  span {
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }
}

.checkboxLabel {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  cursor: pointer;
  user-select: none;
}

.textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  font-family: inherit;
  resize: vertical;
  transition: border-color var(--transition-fast);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  &.error {
    border-color: var(--color-error);

    &:focus {
      border-color: var(--color-error);
    }
  }
}

.errorText {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-error);
  margin-top: var(--spacing-xs);
}

.sliderWrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, var(--bg-tertiary), var(--color-primary));
  appearance: none;
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--bg-tertiary);
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    transition: transform var(--transition-fast);

    &:hover {
      transform: scale(1.2);
    }
  }

  &:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
    background: var(--text-tertiary);

    &:hover {
      transform: none;
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: none;
    transition: transform var(--transition-fast);

    &:hover {
      transform: scale(1.2);
    }
  }

  &:disabled::-moz-range-thumb {
    cursor: not-allowed;
    background: var(--text-tertiary);

    &:hover {
      transform: none;
    }
  }
}

.value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  min-width: 60px;
  text-align: right;
}
</style>
