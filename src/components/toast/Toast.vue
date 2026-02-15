<template>
  <div :class="$style.toast" :style="{
    backgroundColor: toast.backgroundColor,
    color: toast.textColor,
    animation: animationStyle
  }">
    <div :class="$style.content">
      <div :class="$style.main">
        <img v-if="toast.showIcon && toast.customIconBase64" :src="toast.customIconBase64" :class="$style.customIcon"
          alt="Custom icon" />
        <img v-else-if="toast.showIcon && showCustomIconUrl" :src="toast.customIconUrl" :class="$style.customIcon"
          alt="Custom icon" @error="handleIconLoadError" />
        <Icon v-else-if="toast.showIcon && iconName" :name="iconName" :class="$style.icon" size="24px" />

        <div :class="$style.text">
          <div v-if="toast.title" :class="$style.title">{{ toast.title }}</div>
          <div :class="$style.message">{{ toast.message }}</div>
        </div>
      </div>

      <button v-if="toast.showCloseButton" :class="$style.closeButton" @click="handleClose">
        <img v-if="toast.customCloseButtonBase64" :src="toast.customCloseButtonBase64" :class="$style.closeButtonImage"
          alt="Close" />
        <img v-else-if="showCustomCloseButtonUrl" :src="toast.customCloseButtonUrl" :class="$style.closeButtonImage"
          alt="Close" @error="handleCloseButtonLoadError" />
        <Icon v-else name="x-circle" size="20px" />
      </button>
    </div>

    <div v-if="toast.showProgress && toast.duration > 0" :class="$style.progressBar"
      :style="{ animation: `progress-bar ${toast.duration}ms linear forwards` }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ActiveNotification } from '@/types';
import { Icon } from '@/components/common';
import { useAnimation } from '@/composables';
import { DEFAULT_ICONS } from '@/constants';
import { validateImageUrl } from '@/utils';

const props = defineProps<{
  toast: ActiveNotification;
}>();

const emit = defineEmits<{
  close: [id: string];
}>();

const { getAnimationClasses, getAnimationDuration } = useAnimation();

const iconLoadError = ref(false);
const closeButtonLoadError = ref(false);

const iconName = computed(() => {
  if (props.toast.customIcon) {
    return props.toast.customIcon;
  }
  return DEFAULT_ICONS[props.toast.type];
});

const showCustomIconUrl = computed(() => {
  if (!props.toast.customIconUrl || iconLoadError.value) return false;
  const error = validateImageUrl(props.toast.customIconUrl);
  return !error; // Only show if URL is valid
});

const showCustomCloseButtonUrl = computed(() => {
  if (!props.toast.customCloseButtonUrl || closeButtonLoadError.value) return false;
  const error = validateImageUrl(props.toast.customCloseButtonUrl);
  return !error; // Only show if URL is valid
});

const handleIconLoadError = () => {
  iconLoadError.value = true;
};

const handleCloseButtonLoadError = () => {
  closeButtonLoadError.value = true;
};

const animationStyle = computed(() => {
  const animation = props.toast.animation || 'fade';
  const classes = getAnimationClasses(animation);
  const duration = getAnimationDuration(animation);
  return `${classes.enterClass} ${duration}ms ease-out forwards`;
});

const handleClose = () => {
  emit('close', props.toast.id);
};
</script>

<style module lang="scss">
.toast {
  position: relative;
  min-width: 300px;
  max-width: 400px;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
  transition: all var(--transition-base);
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
  }
}

.content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.main {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 1;
  min-width: 0;
}

.icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.customIcon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-top: 2px;
}

.text {
  flex: 1;
  min-width: 0;
  padding: var(--spacing-xs) 0;
}

.title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
}

.message {
  font-size: var(--font-size-sm);
  line-height: 1.5;
  word-wrap: break-word;
  opacity: 0.9;
}

.closeButton {
  flex-shrink: 0;
  align-self: flex-start;
  width: 24px;
  height: 24px;
  margin-top: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.closeButtonImage {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.progressBar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: currentColor;
  opacity: 0.5;
  transform-origin: left;
}
</style>
