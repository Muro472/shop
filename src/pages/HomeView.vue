<script setup lang="ts">
import HomeViewLayout from 'src/components/layouts/HomeViewLayout.vue';
import { homeAssets } from 'src/utils/categories';
import { reactive } from 'vue';
// import { overritedRouterPush } from 'src/utils/RouterProxy';
// import { RouterParams } from 'src/enums/router/RouterNames';

//   vynil: Vynil,

const state = reactive([
  {
    label: 'Audiotechnics',
    photo: homeAssets.audiotechnics,
  },
  {
    label: 'Books',
    photo: homeAssets.books,
  },
  {
    label: 'Cassets',
    photo: homeAssets.cassets,
  },
  {
    label: 'Cd',
    photo: homeAssets.cd,
  },
  {
    label: 'Games',
    photo: homeAssets.games,
  },
  {
    label: 'Plackats',
    photo: homeAssets.plackats,
  },
  {
    label: 'Suveneirs',
    photo: homeAssets.suveneirs,
  },
  {
    label: 'Vynil',
    photo: homeAssets.vynil,
  },
]);
// const goToShop = () => {
//   console.log('da');
// };
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
        >
          <div class="main_item">
            <q-card flat class="main_item-container">
              <q-img
                fit="cover"
                class="main_item-container-img"
                :src="item.photo"
              />
            </q-card>
            <div class="main_item-text">{{ item.label }}</div>
          </div>
        </q-intersection>
      </div>
    </template>
  </HomeViewLayout>
</template>

<style scoped lang="scss">
@import 'src/css/components/homeView';
</style>
