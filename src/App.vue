<template>
  <div id="app">
    <ToastBuilder>
      <template #config>
        <ConfigPanel />
      </template>
      <template #preview>
        <PreviewPane />
      </template>
    </ToastBuilder>

    <ToastContainer position="top-left" />
    <ToastContainer position="top-center" />
    <ToastContainer position="top-right" />
    <ToastContainer position="bottom-left" />
    <ToastContainer position="bottom-center" />
    <ToastContainer position="bottom-right" />
  </div>
</template>

<script setup lang="ts">
import { ToastBuilder, ConfigPanel, PreviewPane } from '@/components/builder';
import { ToastContainer } from '@/components/toast';
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
