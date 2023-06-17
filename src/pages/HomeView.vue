<script setup lang="ts">
import HomeViewLayout from 'src/components/layouts/HomeViewLayout.vue';
</script>

<template>
  <HomeViewLayout>
    <template #head>
      <q-parallax>
        <template v-slot:media>
          <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
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
          v-for="index in 6"
          :key="index"
          once
          transition="slide-up"
          class="example-item"
        >
          <q-card flat bordered class="container">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />

            <q-card-section>
              <div class="text-h6">Card #{{ index }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </template>
  </HomeViewLayout>
</template>

<style scoped lang="scss">
@import 'src/css/components/homeView';
</style>
