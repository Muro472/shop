<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrderStore } from 'src/stores/stores/order';
import { useOverlayStore } from 'src/stores/stores/overlay';

const overlayStore = useOverlayStore();
const orderStore = useOrderStore();

const getData = () => {
  if (orderStore.getOrderCreated) return;

  overlayStore.startOverlay();
  orderStore.initOrderList();
  overlayStore.stopOverlay();
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="orderStack">
    <div class="orderStack-left">
      <!-- <router-view style="height: 100%" name="OrderStack" /> -->
    </div>
    <div class="orderStack-right orderInfo">
      <div
        class="orderInfo-list"
        v-for="(item, index) in orderStore.getItems"
        :key="index"
      >
        da
        <div class="orderInfo-list-image">
          <img :src="item.img" />
        </div>
        <div class="orderInfo-list-title">
          <div>
            {{ item.title }}
          </div>
          <div>
            {{ item.desc }}
          </div>
        </div>
        <div class="orderInfo-list-price">
          {{ orderStore.getItemCount(item._id) }} X {{ item.price }}
        </div>
      </div>
      <div class="orderInfo-info"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/OrderStack';
</style>
