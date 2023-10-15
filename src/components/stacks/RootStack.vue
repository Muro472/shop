<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
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
import { cards } from 'src/utils/cards';
import { CategoryType } from 'src/utils/categories';
import { useOrderStore } from 'src/stores/stores/order';

const overlayStore = useOverlayStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const router = useRouter();

const state = reactive({
  dialog: false,
  termsOfUseDialog: false,
  showTabs: false,
  selectedRouteTabValue: '',
  showCart: false,
});

const orderClick = () => {
  orderStore.startOrder(cartStore.getItems);
  state.dialog = false;
};

const fixLink = () => {
  router.beforeEach((to, from, next) => {
    // making shure that link has a lang param
    if (!to.name) {
      next({ name: RouterNames.APP_HOME_VIEW, params: { lang: 'en' } });
    } else {
      next();
    }
  });
};

const checkTabs = (val?: string) => {
  const currentRoute = val ? val : router.currentRoute.value.name;

  state.showCart = !router.currentRoute.value.matched.some(
    (record) => record.name === RouterNames.APP_ORDER_VIEW
  );

  state.showTabs = ((): boolean => {
    switch (currentRoute) {
      case RouterNames.APP_ITEM_VIEW:
      case RouterNames.APP_SHOP_VIEW:
        state.selectedRouteTabValue = String(
          router.currentRoute.value.params.type
        );
        return true;

      default:
        state.selectedRouteTabValue = '';
        return false;
    }
  })();
};

watch(
  () => router.currentRoute.value.name,
  (val) => {
    checkTabs(String(val));
  }
);

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

const goToShop = (item: CategoryType) => {
  overlayStore.startOverlay();
  router.push(overwriteRouterPush(RouterNames.APP_SHOP_VIEW, { type: item }));
};

onMounted(() => {
  fixLink();
  getData();
  checkTabs();
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

          <div class="cart" @click="state.termsOfUseDialog = true">
            <q-avatar>
              <q-icon name="gavel" size="sm" />
            </q-avatar>
          </div>

          <div v-if="state.showCart" class="cart" @click="state.dialog = true">
            <q-avatar>
              <q-icon name="shopping_cart" size="sm" />
            </q-avatar>
          </div>
        </q-toolbar>
        <q-tabs
          v-if="state.showTabs"
          v-model="state.selectedRouteTabValue"
          align="left"
        >
          <q-tab
            v-for="card in cards"
            :name="card.label"
            :key="card.label"
            @click="goToShop(card.label)"
            :label="card.label"
          />
        </q-tabs>
      </q-header>

      <q-page-container v-show="!overlayStore.getOverlay">
        <div>
          <router-view name="RootStack" />
          <div class="footer">
            <div>
              <span class="font-white">
                Ⓒ Fun Music {{ new Date().getUTCFullYear() }}
              </span>
            </div>
            <div class="footer__img-container">
              <div class="footer__contact-us-section font-white">
                Contant Us:
                <img
                  @click="goToEmail"
                  class="footer-socials-icon-main"
                  :src="mail"
                />
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
        </div>
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
        <q-btn
          flat
          v-if="cartStore.getItems.length !== 0"
          @click="orderClick"
          >{{ $t('orderNow') }}</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="state.termsOfUseDialog">
    <q-card>
      <q-card-section>
        <div class="text-h5">{{ $t('termsOfUseDialog') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>{{ $t('termsOfUseOne') }}</div>
        <div>{{ $t('termsOfUseTwo') }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
@import 'src/css/components/header.scss';
@import 'src/css/components/footer.scss';
@import 'src/css/components/dialog.scss';
</style>
