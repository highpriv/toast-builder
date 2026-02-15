<template>
  <div :class="$style.section">
    <h3 :class="$style.title">Appearance</h3>

    <div :class="$style.field">
      <label :class="$style.label">Background Color</label>
      <ColorPicker :modelValue="currentConfig.backgroundColor"
        @update:modelValue="(v) => updateConfig({ backgroundColor: v })" />
    </div>

    <div :class="$style.field">
      <label :class="$style.label">Text Color</label>
      <ColorPicker :modelValue="currentConfig.textColor" @update:modelValue="(v) => updateConfig({ textColor: v })" />
    </div>

    <div :class="$style.field">
      <label :class="$style.checkbox">
        <input type="checkbox" :checked="currentConfig.showIcon" @change="handleShowIconChange" />
        <span>Show Icon</span>
      </label>
    </div>

    <div v-if="currentConfig.showIcon" :class="$style.field">
      <label :class="$style.label">Icon Type</label>
      <div :class="$style.radioGroup">
        <BaseRadio name="iconType" value="builtin" label="Built-in" v-model="iconType" />
        <BaseRadio name="iconType" value="upload" label="Upload" v-model="iconType" />
        <BaseRadio name="iconType" value="url" label="URL" v-model="iconType" />
      </div>

      <div v-if="iconType === 'builtin'" :class="$style.inputWrapper">
        <BaseSelect :modelValue="currentConfig.customIcon || 'check-circle'" :options="iconOptions"
          placeholder="Select an icon" @update:modelValue="handleBuiltinIconChange" />
      </div>

      <div v-if="iconType === 'url'" :class="$style.inputWrapper">
        <BaseInput :modelValue="currentConfig.customIconUrl || ''" placeholder="https://example.com/icon.png"
          @update:modelValue="handleCustomIconUrlChange" />
        <span v-if="iconUrlError" :class="$style.errorText">{{ iconUrlError }}</span>
      </div>

      <div v-if="iconType === 'upload'" :class="$style.inputWrapper">
        <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
          :class="$style.fileInput" @change="handleFileUpload" ref="fileInputRef" />
        <span v-if="uploadError" :class="$style.errorText">{{ uploadError }}</span>
        <div v-if="currentConfig.customIconBase64" :class="$style.preview">
          <img :src="currentConfig.customIconBase64" :class="$style.previewImage" alt="Custom icon preview" />
          <button :class="$style.removeButton" @click="handleRemoveCustomIcon">Remove</button>
        </div>
      </div>
    </div>

    <div :class="$style.field">
      <label :class="$style.checkbox">
        <input type="checkbox" :checked="currentConfig.showCloseButton" @change="handleShowCloseChange" />
        <span>Show Close Button</span>
      </label>
    </div>

    <div v-if="currentConfig.showCloseButton" :class="$style.field">
      <label :class="$style.label">Close Button Type</label>
      <div :class="$style.radioGroup">
        <BaseRadio name="closeButtonType" value="builtin" label="Built-in" v-model="closeButtonType" />
        <BaseRadio name="closeButtonType" value="upload" label="Upload" v-model="closeButtonType" />
        <BaseRadio name="closeButtonType" value="url" label="URL" v-model="closeButtonType" />
      </div>

      <div v-if="closeButtonType === 'url'" :class="$style.inputWrapper">
        <BaseInput :modelValue="currentConfig.customCloseButtonUrl || ''"
          placeholder="https://example.com/close-icon.png" @update:modelValue="handleCustomCloseButtonUrlChange" />
        <span v-if="closeButtonUrlError" :class="$style.errorText">{{ closeButtonUrlError }}</span>
      </div>

      <div v-if="closeButtonType === 'upload'" :class="$style.inputWrapper">
        <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
          :class="$style.fileInput" @change="handleCloseButtonFileUpload" ref="closeButtonFileInputRef" />
        <span v-if="closeButtonUploadError" :class="$style.errorText">{{ closeButtonUploadError }}</span>
        <div v-if="currentConfig.customCloseButtonBase64" :class="$style.preview">
          <img :src="currentConfig.customCloseButtonBase64" :class="$style.previewImage" alt="Close button preview" />
          <button :class="$style.removeButton" @click="handleRemoveCustomCloseButton">Remove</button>
        </div>
      </div>
    </div>

    <div :class="$style.field">
      <label :class="$style.checkbox">
        <input type="checkbox" :checked="currentConfig.showProgress" @change="handleShowProgressChange" />
        <span>Show Progress Bar</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { ColorPicker, BaseInput, BaseRadio, BaseSelect, type SelectOption } from '@/components/common';
import { useToastBuilder } from '@/composables';
import { compressImage, validateImageFile, validateImageUrl } from '@/utils';
import { ICON_LIBRARY } from '@/constants';

const { currentConfig, updateConfig } = useToastBuilder();

const iconOptions = computed<SelectOption[]>(() => {
  return ICON_LIBRARY.map(icon => ({
    value: icon.name,
    label: icon.label
  }));
});

const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadError = ref('');
const iconType = ref<'builtin' | 'upload' | 'url'>('builtin');
const iconUrlError = ref('');

const closeButtonFileInputRef = ref<HTMLInputElement | null>(null);
const closeButtonUploadError = ref('');
const closeButtonType = ref<'builtin' | 'upload' | 'url'>('builtin');
const closeButtonUrlError = ref('');

watch(() => currentConfig.value.customIconBase64, (val) => {
  if (val && iconType.value !== 'upload') iconType.value = 'upload';
});

watch(() => currentConfig.value.customIconUrl, (val) => {
  if (val && iconType.value !== 'url') iconType.value = 'url';
});

watch(() => currentConfig.value.customCloseButtonBase64, (val) => {
  if (val && closeButtonType.value !== 'upload') closeButtonType.value = 'upload';
});

watch(() => currentConfig.value.customCloseButtonUrl, (val) => {
  if (val && closeButtonType.value !== 'url') closeButtonType.value = 'url';
});

watch(() => currentConfig.value.customIconUrl, (url) => {
  if (url && iconType.value === 'url') {
    const error = validateImageUrl(url);
    iconUrlError.value = error || '';
  } else {
    iconUrlError.value = '';
  }
});

watch(() => currentConfig.value.customCloseButtonUrl, (url) => {
  if (url && closeButtonType.value === 'url') {
    const error = validateImageUrl(url);
    closeButtonUrlError.value = error || '';
  } else {
    closeButtonUrlError.value = '';
  }
});

watch(iconType, (newType) => {
  if (newType === 'builtin') {
    updateConfig({ customIconUrl: '', customIconBase64: '' });
    uploadError.value = '';
    iconUrlError.value = '';
    if (fileInputRef.value) fileInputRef.value.value = '';
  } else if (newType === 'upload') {
    updateConfig({ customIconUrl: '' });
    iconUrlError.value = '';
  } else if (newType === 'url') {
    updateConfig({ customIconBase64: '' });
    uploadError.value = '';
    if (fileInputRef.value) fileInputRef.value.value = '';
  }
});

watch(closeButtonType, (newType) => {
  if (newType === 'builtin') {
    updateConfig({ customCloseButtonUrl: '', customCloseButtonBase64: '' });
    closeButtonUploadError.value = '';
    closeButtonUrlError.value = '';
    if (closeButtonFileInputRef.value) closeButtonFileInputRef.value.value = '';
  } else if (newType === 'upload') {
    updateConfig({ customCloseButtonUrl: '' });
    closeButtonUrlError.value = '';
  } else if (newType === 'url') {
    updateConfig({ customCloseButtonBase64: '' });
    closeButtonUploadError.value = '';
    if (closeButtonFileInputRef.value) closeButtonFileInputRef.value.value = '';
  }
});

const handleShowIconChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  updateConfig({ showIcon: target.checked });
};

const handleBuiltinIconChange = (value: string | number) => {
  updateConfig({ customIcon: value as any });
};

const handleShowCloseChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  updateConfig({ showCloseButton: target.checked });
};

const handleShowProgressChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  updateConfig({ showProgress: target.checked });
};

const handleCustomIconUrlChange = (value: string | number) => {
  const url = String(value).trim();
  if (url) {
    updateConfig({ customIconUrl: url });
  } else {
    updateConfig({ customIconUrl: '' });
  }
};

const handleFileUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  uploadError.value = '';

  const validationError = validateImageFile(file);
  if (validationError) {
    uploadError.value = validationError;
    return;
  }

  try {
    const base64 = await compressImage(file, {
      maxWidth: 128,
      maxHeight: 128,
      quality: 0.8,
      maxSizeKB: 100,
    });

    updateConfig({ customIconBase64: base64 });
  } catch (error) {
    uploadError.value = 'Failed to process image. Please try another file.';
  }
};

const handleRemoveCustomIcon = () => {
  updateConfig({ customIconBase64: '' });
  uploadError.value = '';
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const handleCustomCloseButtonUrlChange = (value: string | number) => {
  const url = String(value).trim();
  if (url) {
    updateConfig({ customCloseButtonUrl: url });
  } else {
    updateConfig({ customCloseButtonUrl: '' });
  }
};

const handleCloseButtonFileUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  closeButtonUploadError.value = '';

  const validationError = validateImageFile(file);
  if (validationError) {
    closeButtonUploadError.value = validationError;
    return;
  }

  try {
    const base64 = await compressImage(file, {
      maxWidth: 128,
      maxHeight: 128,
      quality: 0.8,
      maxSizeKB: 100,
    });

    updateConfig({ customCloseButtonBase64: base64 });
  } catch (error) {
    closeButtonUploadError.value = 'Failed to process image. Please try another file.';
  }
};

const handleRemoveCustomCloseButton = () => {
  updateConfig({ customCloseButtonBase64: '' });
  closeButtonUploadError.value = '';
  if (closeButtonFileInputRef.value) {
    closeButtonFileInputRef.value.value = '';
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

  &:last-child {
    margin-bottom: 0;
  }
}

.label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
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
  }

  span {
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }
}

.radioGroup {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.inputWrapper {
  margin-top: var(--spacing-sm);
}

.fileInput {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-primary);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &::-webkit-file-upload-button {
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-size: var(--font-size-xs);
  }
}

.errorText {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-error);
  margin-top: var(--spacing-xs);
}

.preview {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
  padding: var(--spacing-sm);
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius);
}

.previewImage {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: var(--border-radius-sm);
}

.removeButton {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-error);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.9;
  }
}
</style>
