<script setup lang="ts">
import { api } from 'src/api';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { IProductFromList } from 'src/types/responses';
import { useOverlayStore } from 'src/stores/stores/overlay';
import { useCartStore } from 'src/stores/stores/cart';

const cartStore = useCartStore();
const overlayStore = useOverlayStore();
const state = reactive({
  item: null as null | IProductFromList,
  itemIncluded: false,
});

const router = useRouter();

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
    cartStore.getItemIds.some((item) => item === response._id) as boolean;
  }
  overlayStore.stopOverlay();
};

const addToCart = () => {
  cartStore.addItem(state.item as IProductFromList);
  state.itemIncluded = true;
};

onMounted(getData);
</script>

<template>
  <div class="main">
    <div class="main-container" v-if="state.item">
      <q-img :src="state.item.img" fit="cover" class="main-container-image" />
      <div class="main-container-data">
        <div class="text-h3">
          {{ state.item.title }}
        </div>
        <div class="text-h4">
          {{ state.item.brand }}
        </div>
        <div class="text-h6 littleMargin">
          {{ state.item.desc }}
        </div>
        <div class="text-h5 littleMargin">{{ state.item.price }} €</div>
        <div class="main-container-data-buttons littleMargin">
          <div class="main-container-data-buttons-big text-h6">
            {{ $t('buyInOneClick') }}
          </div>
          <div class="main-container-data-buttons-small">
            <q-icon
              v-if="!state.itemIncluded"
              name="shopping_cart"
              size="md"
              @click="addToCart"
            />
            <q-icon v-else name="done" size="md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/itemPageView';
</style>
