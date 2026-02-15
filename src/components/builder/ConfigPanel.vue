<template>
  <div :class="$style.config">
    <TypeSelector />
    <PositionSelector />
    <ContentControls />
    <StyleControls />
    <AnimationSelector />
    <PresetManager />
    <CodeExport />
  </div>
</template>

<script setup lang="ts">
import TypeSelector from './TypeSelector.vue';
import PositionSelector from './PositionSelector.vue';
import ContentControls from './ContentControls.vue';
import StyleControls from './StyleControls.vue';
import AnimationSelector from './AnimationSelector.vue';
import PresetManager from './PresetManager.vue';
import CodeExport from './CodeExport.vue';
</script>

<style module lang="scss">
.config {
  display: flex;
  flex-direction: column;
}
</style>
