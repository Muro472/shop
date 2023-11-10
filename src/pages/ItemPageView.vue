<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ItemPageLayout from 'src/components/layouts/ItemPageLayout.vue';
import { useOverlayStore } from 'src/stores/stores/overlay';
import { IProductFromList } from 'src/types/responses';
import { useCartStore } from 'src/stores/stores/cart';
import { useOrderStore } from 'src/stores/stores/order';
import { api } from 'src/api';

const overlayStore = useOverlayStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const router = useRouter();

const state = reactive({
  item: null as null | IProductFromList,
  itemIncluded: false,
});

const getData = async () => {
  overlayStore.startOverlay();

  state.itemIncluded = cartStore.getItemIds.some(
    (item) => item === router.currentRoute.value.params.id
  );

  const response = (
    await api.getProductById(String(router.currentRoute.value.params.id))
  )[1];

  if (response) {
    state.item = response;
    // cartStore.getItemIds.some((item) => item === response._id) as boolean;
  }
  overlayStore.stopOverlay();
};

const addToCart = () => {
  cartStore.addItem(state.item as IProductFromList);
  state.itemIncluded = true;
};

const removeItem = () => {
  cartStore.removeItem(state.item as IProductFromList);
  state.itemIncluded = false;
};

const buyInOneClick = () => {
  if (state.item) orderStore.startOrder([state.item]);
};

onMounted(getData);
</script>

<template>
  <template v-if="state.item">
    <ItemPageLayout
      :brand="state.item.brand"
      :title="state.item.title"
      :desc="state.item.desc"
      :price="state.item.price"
      :img="state.item.img"
      :itemIncluded="state.itemIncluded"
      :demo="false"
      @addToCart="addToCart"
      @removeItem="removeItem"
      @buyInOneClick="buyInOneClick"
    />
  </template>
</template>
