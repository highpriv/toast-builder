<template>
  <div :class="$style['toast']" :style="{
    backgroundColor: toast.backgroundColor,
    color: toast.textColor,
    animation: animationStyle
  }">
    <div :class="$style['content']">
      <div :class="$style['content']">
        <img v-if="toast.showIcon && toast.customIconBase64" :src="toast.customIconBase64" :class="$style['customIcon']"
          alt="Custom icon" />
        <img v-else-if="toast.showIcon && showCustomIconUrl" :src="toast.customIconUrl" :class="$style['customIcon']"
          alt="Custom icon" @error="handleIconLoadError" />
        <span v-else-if="toast.showIcon && defaultIconSvg" v-html="defaultIconSvg" :class="$style['customIcon']" />
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
        <span v-else class="$style['closeButtonImage']" v-html="closeSvg" />
      </button>
    </div>

    <div v-if="toast.showProgress && toast.duration > 0" :class="$style['progressBar']"
      :style="{ animation: `progress-bar ${toast.duration}ms linear forwards` }"></div>
  </div>
</template>

<script setup lang="ts">
const closeSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 20 20' fill='none' stroke='currentColor' stroke-width='2'><line x1='6' y1='6' x2='14' y2='14'/><line x1='6' y1='14' x2='14' y2='6'/></svg>`;
import { computed, ref } from 'vue';
import type { ActiveNotification } from '../types/toast';
import { ICON_LIBRARY } from '../constants/icon-library';
import { useAnimation } from '../../composables/useAnimation';
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


const defaultIconSvg = computed(() => {
  if (!props.toast.showIcon || props.toast.customIconBase64 || showCustomIconUrl.value) return '';
  const iconKey = props.toast.customIcon || DEFAULT_ICONS[props.toast.type];
  return ICON_LIBRARY[iconKey] || '';
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
// No additional styles needed for toast notification logic</style>
