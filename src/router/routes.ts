import { RouteRecordRaw } from 'vue-router';

import { RouterNames } from 'src/enums/router/RouterNames';
import { RouterPaths } from 'src/enums/router/RouterPaths';

const routes: RouteRecordRaw[] = [
  {
    path: RouterPaths.APP_ROOT_PATH,
    name: RouterNames.APP_ROOT_PATH,
    redirect: { name: RouterNames.APP_HOME_VIEW },
    components: {
      RootStack: () => import('components/stacks/LanguageStack.vue'),
    },
    children: [
      {
        path: RouterPaths.APP_HOME_VIEW,
        name: RouterNames.APP_HOME_VIEW,
        components: {
          LanguageStack: () => import('src/pages/HomeView.vue'),
        },
      },
      {
        path: RouterPaths.APP_SHOP_VIEW,
        name: RouterNames.APP_SHOP_VIEW,
        components: {
          LanguageStack: () => import('src/pages/ShopView.vue'),
        },
      },
      {
        path: RouterPaths.APP_ITEM_VIEW,
        name: RouterNames.APP_ITEM_VIEW,
        components: {
          LanguageStack: () => import('src/pages/ItemPageView.vue'),
        },
      },
      {
        path: RouterPaths.APP_ORDER_VIEW,
        name: RouterNames.APP_ORDER_VIEW,
        components: {
          LanguageStack: () => import('src/pages/OrderView.vue'),
        },
      },
      {
        path: RouterPaths.APP_ITEM_DEMO_VIEW,
        name: RouterNames.APP_ITEM_DEMO_VIEW,
        components: {
          LanguageStack: () => import('src/pages/ItemDemoPage.vue'),
        },
      },

      //order
      {
        path: RouterPaths.APP_ORDER_SUCCESS_VIEW,
        name: RouterNames.APP_ORDER_SUCCESS_VIEW,
        components: {
          LanguageStack: () => import('src/pages/OrderSuccessPage.vue'),
        },
      },
      {
        path: RouterPaths.APP_ORDER_SIMPLE_SUCCESS_VIEW,
        name: RouterNames.APP_ORDER_SIMPLE_SUCCESS_VIEW,
        components: {
          LanguageStack: () => import('src/pages/OrderSuccessPage.vue'),
        },
      },
      {
        path: RouterPaths.APP_ORDER_ERROR_VIEW,
        name: RouterNames.APP_ORDER_ERROR_VIEW,
        components: {
          LanguageStack: () => import('src/pages/OrderErrorPage.vue'),
        },
      },
    ],
  },
];

export default routes;
