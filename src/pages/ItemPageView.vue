<script setup lang="ts">
import { api } from 'src/api';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { IProductFromList } from 'src/types/responses';
import { useOverlayStore } from 'src/stores/stores/overlay';
import { useCartStore } from 'src/stores/stores/cart';
import { useOrderStore } from 'src/stores/stores/order';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const orderStore = useOrderStore();
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
    <template v-if="!$q.screen.xs">
      <div class="main">
        <div class="main-container">
          <q-img
            :src="state.item.img"
            fit="cover"
            class="main-container-image"
          />
          <div class="main-container-data">
            <div class="main-container-data-title">
              {{ state.item.title }} {{ $t('by') }} {{ state.item.brand }}
            </div>
            <div class="text-h6 littleMargin">
              {{ state.item.desc }}
            </div>
            <div class="text-h5 littleMargin">{{ state.item.price }} €</div>
            <div class="main-container-data-buttons littleMargin">
              <div
                class="main-container-data-buttons-big text-h6"
                @click="buyInOneClick"
              >
                {{ $t('buyInOneClick') }}
              </div>
              <div class="main-container-data-buttons-small">
                <q-icon
                  v-if="!state.itemIncluded"
                  name="shopping_cart"
                  size="md"
                  @click="addToCart"
                />
                <q-icon v-else @click="removeItem" name="done" size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- mobile -->

    <template v-else>
      <div class="mainMobile">
        <div class="mainMobile-container">
          <q-img
            :src="state.item.img"
            fit="cover"
            class="mainMobile-container-image"
          />
          <div class="mainMobile-container-data">
            <div class="mainMobile-container-data-title">
              {{ state.item.title }} {{ $t('by') }} {{ state.item.brand }}
            </div>
            <div class="text-h5 mainMobile-container-data-price">
              {{ state.item.price }} €
            </div>
            <div class="mainMobile-container-data-buttons">
              <q-btn outline @click="buyInOneClick">
                <div class="mainMobile-container-data-buttons-big text-h6">
                  {{ $t('buyInOneClick') }}
                </div>
              </q-btn>
              <div class="mainMobile-container-data-buttons-small">
                <q-icon
                  v-if="!state.itemIncluded"
                  name="shopping_cart"
                  size="md"
                  @click="addToCart"
                />
                <q-icon v-else @click="removeItem" name="done" size="md" />
              </div>
            </div>
            <div class="mainMobile-container-data-description">
              {{ state.item.desc }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>

<style scoped lang="scss">
@import 'src/css/components/itemPageView';
</style>
