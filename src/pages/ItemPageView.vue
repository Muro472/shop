<script setup lang="ts">
import { api } from 'src/api';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { IProductFromList } from 'src/types/responses';
import { useOverlayStore } from 'src/stores/stores/overlay';

const overlayStore = useOverlayStore();
const state = reactive({
  item: null as null | IProductFromList,
});

const router = useRouter();

const getData = async () => {
  overlayStore.startOverlay();
  const response = (
    await api.getProductById(String(router.currentRoute.value.params.id))
  )[1];

  if (response) {
    state.item = response;
  }
  overlayStore.stopOverlay();
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
            <q-icon name="shopping_cart" size="md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/itemPageView';
</style>
