<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ItemPageLayout from 'src/components/layouts/ItemPageLayout.vue';
import { useOverlayStore } from 'src/stores/stores/overlay';

const overlayStore = useOverlayStore();

const router = useRouter();

const state = reactive({
  brand: '',
  title: '',
  desc: '',
  price: 0,
  img: '',
});

const getData = () => {
  state.brand = String(router.currentRoute.value.query.brand);
  state.title = String(router.currentRoute.value.query.title);
  state.desc = String(router.currentRoute.value.query.desc);
  state.price = Number(router.currentRoute.value.query.price);
  state.img = String(router.currentRoute.value.query.img);

  overlayStore.stopOverlay();
};

onMounted(getData);
</script>

<template>
  <ItemPageLayout
    :brand="state.brand"
    :title="state.title"
    :desc="state.desc"
    :price="state.price"
    :img="state.img"
    :itemIncluded="false"
    :demo="false"
  />
</template>
