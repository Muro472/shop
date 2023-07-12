<script setup lang="ts">
import HomeViewLayout from 'src/components/layouts/HomeViewLayout.vue';
import { homeAssets } from 'src/utils/categories';
import { reactive } from 'vue';
import { overwriteRouterPush } from 'src/utils/RouterProxy';
import { RouterNames } from 'src/enums/router/RouterNames';
import { categories, CategoryType } from 'src/utils/categories';
import { useRouter } from 'vue-router';
import { useOverlayStore } from 'src/stores/stores/overlay';

const overlayStore = useOverlayStore();
const router = useRouter();
const state = reactive([
  {
    label: categories[7],
    photo: homeAssets.vinyl,
  },
  {
    label: categories[0],
    photo: homeAssets.player,
  },
  {
    label: categories[1],
    photo: homeAssets.books,
  },
  {
    label: categories[2],
    photo: homeAssets.cassette,
  },
  {
    label: categories[3],
    photo: homeAssets.cd,
  },
  {
    label: categories[4],
    photo: homeAssets.game,
  },
  {
    label: categories[5],
    photo: homeAssets.poster,
  },
  {
    label: categories[6],
    photo: homeAssets.souvenir,
  },
]);

const goToShop = (item: CategoryType) => {
  overlayStore.startOverlay();
  router.push(overwriteRouterPush(RouterNames.APP_SHOP_VIEW, { type: item }));
};
</script>

<template>
  <HomeViewLayout>
    <template #head>
      <q-parallax>
        <template v-slot:media>
          <img :src="homeAssets.mainImage" />
        </template>

        <template v-slot:content="scope">
          <div
            class="absolute column items-center"
            :style="{
              opacity: 0.8 + (1 - scope.percentScrolled) * 0.55,
              top: scope.percentScrolled * 60 + '%',
              left: 0,
              right: 0,
            }"
          >
            <div class="text-h3 text-white text-center">
              {{ $t('homePageText1') }}
            </div>
          </div>
        </template>
      </q-parallax>
    </template>
    <template #main>
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="(item, index) in state"
          :key="index"
          once
          transition="slide-up"
          class="example-item"
          @click="goToShop(item.label)"
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
      </div>
    </template>
  </HomeViewLayout>
</template>

<style scoped lang="scss">
@import 'src/css/components/homeView';
</style>
