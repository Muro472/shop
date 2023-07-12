<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { api } from 'src/api';
import { IProductFromList } from 'src/types/responses';
import { overwriteRouterPush } from 'src/utils/RouterProxy';
import { RouterNames } from 'src/enums/router/RouterNames';
import { useRouter } from 'vue-router';
import { useOverlayStore } from 'src/stores/stores/overlay';

const overlayStore = useOverlayStore();
const router = useRouter();
const state = reactive({
  page: 1,
  size: 12,
  totalPages: 0,
  items: [] as IProductFromList[],
});

const getData = async () => {
  const response = (
    await api.getProducts({
      category: String(router.currentRoute.value.params.type),
      page: state.page,
      limit: state.size,
    })
  )[1];

  if (response) {
    state.items = state.items.concat(response.products);
    state.totalPages = response.totalPages;
  }
};

const firstStart = async () => {
  overlayStore.startOverlay();
  await getData();
  overlayStore.stopOverlay();
};

const itemClick = (id: string) => {
  overlayStore.startOverlay();
  router.push(overwriteRouterPush(RouterNames.APP_ITEM_VIEW, { id: id }));
};

const putToCardClick = (item: IProductFromList) => {
  console.log('da');
};

const orderClick = (item: IProductFromList) => {
  console.log('da');
};

const onLoad = async (index, done) => {
  if (state.page < state.totalPages) {
    state.page++;
    await getData();
  }
  done();
};

onMounted(() => firstStart());
</script>

<template>
  <div class="main">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <!-- item start -->
      <div class="main-grid">
        <div
          class="main-item"
          v-for="(item, index) in state.items"
          :key="index"
        >
          <div class="main-item-splitter" />
          <div class="main-item-main">
            <q-img
              :src="item.img"
              class="main-item-main-image"
              @click="itemClick(item._id)"
            />
            <div class="main-item-main-desc" @click="itemClick(item._id)">
              <div class="main-item-main-desc-item">
                {{ item.title }}
              </div>
              <div class="main-item-main-desc-item">
                {{ item.brand }}
              </div>
              <div class="main-item-main-desc-item">{{ item.price }} €</div>
            </div>
            <div class="main-item-main-buttons">
              <div class="main-item-main-buttons-big" @click="orderClick(item)">
                {{ $t('buyInOneClick') }}
              </div>
              <div
                class="main-item-main-buttons-small"
                @click="putToCardClick(item)"
              >
                <q-icon name="shopping_cart" size="sm" />
              </div>
            </div>
          </div>
          <div class="main-item-splitter" />
        </div>
      </div>
      <!-- item end -->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/shopView';
</style>
