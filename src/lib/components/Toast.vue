<template>
  <div :class="$style['toast']" :style="{
    backgroundColor: toast.backgroundColor,
    color: toast.textColor,
    animation: animationStyle
  }">
    <div :class="$style['content']">
      <div :class="$style['main']">
        <img v-if="toast.showIcon && toast.customIconBase64" :src="toast.customIconBase64" :class="$style['customIcon']"
          alt="Custom icon" />
        <img v-else-if="toast.showIcon && showCustomIconUrl" :src="toast.customIconUrl" :class="$style['customIcon']"
          alt="Custom icon" @error="handleIconLoadError" />
        <Icon v-else-if="toast.showIcon && iconName" :name="iconName as IconName" :class="$style['icon']" size="24px" />

        <div :class="$style['text']">
          <div v-if="toast.title" :class="$style['title']">{{ toast.title }}</div>
          <div :class="$style['message']">{{ toast.message }}</div>
        </div>
      </div>

      <button v-if="toast.showCloseButton" :class="$style['closeButton']" @click="handleClose">
        <img v-if="toast.customCloseButtonBase64" :src="toast.customCloseButtonBase64"
          :class="$style['closeButtonImage']" alt="Close" />
        <img v-else-if="showCustomCloseButtonUrl" :src="toast.customCloseButtonUrl" :class="$style['closeButtonImage']"
          alt="Close" @error="handleCloseButtonLoadError" />
        <Icon v-else name="x-circle" size="20px" />
      </button>
    </div>

    <div v-if="toast.showProgress && (toast.duration || 0) > 0" :class="$style['progressBar']"
      :style="{ animation: `progress-bar ${toast.duration || 0}ms linear forwards` }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ActiveNotification, IconName } from '../types/toast';
import Icon from './Icon.vue';
import { useAnimation } from '../composables/useAnimation';
import { DEFAULT_ICONS } from '../constants/toast-defaults';
import { validateImageUrl } from '../utils/validateImageUrl';

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
  return !error;
});

const showCustomCloseButtonUrl = computed(() => {
  if (!props.toast.customCloseButtonUrl || closeButtonLoadError.value) return false;
  const error = validateImageUrl(props.toast.customCloseButtonUrl);
  return !error;
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
@import '../styles/toast.module.scss';
</style>
