<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterNames } from 'src/enums/router/RouterNames';
import { useRouter } from 'vue-router';
const router = useRouter();

const fixLink = () => {
  router.beforeEach((to, from, next) => {
    if (!to.name) {
      next({ name: RouterNames.APP_HOME_VIEW, params: { lang: 'en' } });
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