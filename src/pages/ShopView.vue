<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { api } from 'src/api';
import { useRouter } from 'vue-router';
import { IProductFromList } from 'src/types/responses';
import { useOverlayStore } from 'src/stores/stores/overlay';

const overlayStore = useOverlayStore();
const router = useRouter();

const state = reactive({
  page: 1,
  size: 10,
  items: [] as IProductFromList[],
});

const getData = async () => {
  const response = (
    await api.getProducts({
      category: String(router.currentRoute.value.params.type),
    })
  )[1];

  if (response) {
    state.items = response;
  }
};

const firstStart = async () => {
  overlayStore.startOverlay();
  await getData();
  overlayStore.stopOverlay();
};

onMounted(() => firstStart());
</script>

<template>
  <div class="main">
    <!-- <q-infinite-scroll @load="onLoad" :offset="250">
      <q-intersection
        v-for="(item, index) in state"
        :key="index"
        once
        transition="slide-up"
        class="example-item"
      >
        <div class="main_item">
          <q-card flat class="main_item-container">
            <q-img
              fit="cover"
              class="main_item-container-img"
              :src="item.photo"
            />
          </q-card>
          <div class="main_item-text">{{ $t(item.label) }}</div>
        </div>
      </q-intersection>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll> -->
    <div class="main-grid">
      <div class="main-item" v-for="(item, index) in state.items" :key="index">
        <div class="main-item-splitter" />
        <div class="main-item-main">
          <q-img :src="item.img" class="main-item-main-image" />
          <div class="main-item-main-desc">
            <div class="main-item-main-desc-item">
              {{ item.title }}
            </div>
            <div class="main-item-main-desc-item">
              {{ item.brand }}
            </div>
            <div class="main-item-main-desc-item">{{ item.price }} €</div>
          </div>
          <div class="main-item-main-buttons">
            <div class="main-item-main-buttons-big">
              {{ $t('buyInOneClick') }}
            </div>
            <div class="main-item-main-buttons-small">
              <q-icon name="shopping_cart" size="sm" />
            </div>
          </div>
        </div>
        <div class="main-item-splitter" />
      </div>
    </div>

    <!-- <q-intersection
      v-for="(item, index) in state.items"
      :key="index"
      once
      transition="slide-up"
      class="example-item"
    >
      <div class="main_item">
        <q-card flat class="main_item-container">
          <q-img
            fit="cover"
            class="main_item-container-img"
            :src="item.photo"
          />
        </q-card>
        <div class="main_item-text">{{ $t(item.label) }}</div>
      </div>
    </q-intersection> -->
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/shopView';
</style>
