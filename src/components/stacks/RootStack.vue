<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { RouterNames } from 'src/enums/router/RouterNames';
import { useRouter } from 'vue-router';
import Player from 'src/assets/logo.png';
import { useCartStore } from 'src/stores/stores/cart';
import { useOverlayStore } from 'src/stores/stores/overlay';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DialogItemComponent from 'src/components/general/DialogItemComponent.vue';
import { overwriteRouterPush } from 'src/utils/RouterProxy';
import facebook from 'src/assets/facebok.png';
import instagram from 'src/assets/instagram.png';
import mail from 'src/assets/mail.png';

const overlayStore = useOverlayStore();
const cartStore = useCartStore();
const router = useRouter();

const state = reactive({
  dialog: false,
});

const fixLink = () => {
  router.beforeEach((to, from, next) => {
    if (!to.name) {
      next({ name: RouterNames.APP_HOME_VIEW, params: { lang: 'en' } });
    } else {
      next();
    }
  });
};

// TODO: rewrite to select specific lang :)
const navigateToHome = () => {
  router.push(overwriteRouterPush(RouterNames.APP_HOME_VIEW, { lang: 'en' }));
};

const goToEmail = () => {
  window.open('mailto:example@zxc.zxc', '_blank');
};

const goToFacebook = () => {
  window.open('https://www.facebook.com/', '_blank');
};

const goToInstagram = () => {
  window.open('https://www.instagram.com/', '_blank');
};

const getData = async () => {
  overlayStore.startOverlay();
  await cartStore.initBasket();
  overlayStore.stopOverlay();
};

onMounted(() => {
  fixLink();
  getData();
});
</script>

<template>
  <q-card flat style="background-color: #111011" transition="fade">
    <q-layout view="hHh lpR fff">
      <q-header class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title class="header">
            <img
              @click="navigateToHome"
              class="header-image pointer"
              :src="Player"
            />
          </q-toolbar-title>

          <div class="cart" @click="state.dialog = true">
            <q-avatar>
              <q-icon name="shopping_cart" size="sm" />
            </q-avatar>
          </div>
        </q-toolbar>
      </q-header>

      <q-page-container v-show="!overlayStore.getOverlay">
        <router-view name="RootStack" />

        <!-- <div class="footer">
          da
          <div class="footer-sociables">
            <q-icon name="mdi-instagram" size="sm"></q-icon>
          </div>
        </div> -->
      </q-page-container>
    </q-layout>
  </q-card>

  <q-dialog v-model="state.dialog">
    <q-card class="dialog">
      <q-card-section class="row items-center q-pb-none dialog-head">
        <div class="text-h6">{{ $t('basket') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <div class="dialog-main">
        <div class="dialog-main-section">
          <DialogItemComponent
            v-for="(item, index) in cartStore.getItems"
            :key="index"
            :item="item"
          />
        </div>
      </div>

      <q-separator />

      <q-card-actions class="dialog-actions">
        <q-btn flat>{{ $t('orderNow') }}</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div class="footer">
    <div>
      <span class="font-white"
        >Ⓒ Fun Music {{ new Date().getUTCFullYear() }}</span
      >
    </div>
    <div class="footer__img-container">
      <div class="footer__contact-us-section font-white">
        Contant Us:
        <img @click="goToEmail" class="footer-socials-icon-main" :src="mail" />
      </div>
      <img
        @click="goToFacebook"
        class="footer-socials-icon-main"
        :src="facebook"
      />
      <img
        @click="goToInstagram"
        class="footer-socials-icon-main"
        :src="instagram"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/header.scss';
@import 'src/css/components/footer.scss';
@import 'src/css/components/dialog.scss';
</style>
