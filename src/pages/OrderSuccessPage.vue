<script setup lang="ts">
import { RouterNames } from 'src/enums/router/RouterNames';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/api';
import { useOverlayStore } from 'src/stores/stores/overlay';
const overlayStore = useOverlayStore();

const router = useRouter();

const goBack = () => {
  router.push('/');
};

onMounted(async () => {
  if (!router.currentRoute.value.params.id) return;
  overlayStore.startOverlay();
  const [error] = await api.orderSuccess(
    String(router.currentRoute.value.params.id)
  );

  if (error) {
    router.push({
      name: RouterNames.APP_ORDER_ERROR_VIEW,
    });
  }
  overlayStore.stopOverlay();
});
</script>

<template>
  <div class="orderSuccess">
    <did class="orderSuccess-icon">
      <q-icon name="done" size="lg" color="white" />
    </did>

    <did class="orderSuccess-top">
      <div class="orderSuccess-top-textHeader">{{ $t('success') }}</div>
      <div class="orderSuccess-top-text">{{ $t('thankYouForYourOrder') }}</div>
    </did>
    <q-separator inset style="width: 30%" />
    <did class="orderSuccess-bottom">
      <q-btn @click="goBack">{{ $t('goBack') }}</q-btn>
    </did>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/OrderStack/orderSuccess.scss';
</style>
