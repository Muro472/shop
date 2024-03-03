<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="orderSuccess">
    <did class="orderSuccess-icon">
      <q-icon name="close" size="lg" color="white" />
    </did>

    <did class="orderSuccess-top">
      <div class="orderSuccess-top-textHeader">{{ $t('paymentFailed') }}</div>
      <div class="orderSuccess-top-text">{{ $t('contactUs') }}</div>
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
