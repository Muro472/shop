<script setup lang="ts">
import { useOverlayStore } from 'src/stores/stores/overlay';
import { reactive, watchEffect } from 'vue';
import MainLoaderComponent from 'src/components/general/MainLoaderComponent.vue';
const overlayStore = useOverlayStore();

const state = reactive({
  dialog: false,
});

watchEffect(() => {
  state.dialog = overlayStore.getOverlay;
});
</script>

<template>
  <q-dialog
    v-model="state.dialog"
    persistent
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <MainLoaderComponent />
  </q-dialog>

  <router-view style="height: 100%" name="LanguageStack" />
</template>
