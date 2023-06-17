<script setup lang="ts">
import { useRouter } from 'vue-router';
import usePageRoute from 'src/composition/usePageRoute';
import { onMounted } from 'vue';

const router = useRouter();

const fixLink = () => {
  const route = usePageRoute();
  router.beforeEach((to, from, next) => {
    if (!to.name) {
      next(route.langLink({ lang: 'en' }));
    } else {
      next();
    }
  });
};

onMounted(() => {
  fixLink();
});
</script>

<template>
  <q-card flat style="background-color: #111011" transition="fade">
    <q-layout view="hHh lpR fff">
      <q-header class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            Title
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view name="RootStack" />
      </q-page-container>
    </q-layout>
  </q-card>
</template>

<style scoped lang="scss">
@import 'src/css/RootStack.scss';
</style>
