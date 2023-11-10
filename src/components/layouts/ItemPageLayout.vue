<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useQuasar } from 'quasar';

const props = defineProps<{
  img: string;
  title: string;
  desc: string;
  price: number;
  brand: string;
  itemIncluded: boolean;
  demo?: boolean;
}>();

const emit = defineEmits<{
  (event: 'addToCart'): void;
  (event: 'removeItem'): void;
  (event: 'buyInOneClick'): void;
}>();

const $q = useQuasar();

const addToCart = () => {
  if (!props.demo) emit('addToCart');
};

const removeItem = () => {
  if (!props.demo) emit('removeItem');
};

const buyInOneClick = () => {
  if (!props.demo) emit('buyInOneClick');
};
</script>

<template>
  <template v-if="!$q.screen.xs">
    <div class="main">
      <div class="main-container">
        <q-img :src="img" fit="cover" class="main-container-image" />
        <div class="main-container-data">
          <div class="main-container-data-title">
            {{ title }} {{ $t('by') }} {{ brand }}
          </div>
          <div class="text-h6 littleMargin">
            {{ desc }}
          </div>
          <div class="text-h5 littleMargin">{{ price }} €</div>
          <div class="main-container-data-buttons littleMargin">
            <div
              class="main-container-data-buttons-big text-h6"
              @click="buyInOneClick"
            >
              {{ $t('buyInOneClick') }}
            </div>
            <div class="main-container-data-buttons-small">
              <q-icon
                v-if="!itemIncluded"
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
        <q-img :src="img" fit="cover" class="mainMobile-container-image" />
        <div class="mainMobile-container-data">
          <div class="mainMobile-container-data-title">
            {{ title }} {{ $t('by') }} {{ brand }}
          </div>
          <div class="text-h5 mainMobile-container-data-price">
            {{ price }} €
          </div>
          <div class="mainMobile-container-data-buttons">
            <q-btn outline @click="buyInOneClick">
              <div class="mainMobile-container-data-buttons-big text-h6">
                {{ $t('buyInOneClick') }}
              </div>
            </q-btn>
            <div class="mainMobile-container-data-buttons-small">
              <q-icon
                v-if="!itemIncluded"
                name="shopping_cart"
                size="md"
                @click="addToCart"
              />
              <q-icon v-else @click="removeItem" name="done" size="md" />
            </div>
          </div>
          <div class="mainMobile-container-data-description">
            {{ desc }}
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
@import 'src/css/components/itemPageView';
</style>
