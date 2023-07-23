import { IProductFromList } from 'src/types/responses';
import { defineStore, createPinia } from 'pinia';
import router from 'src/router';
import { overwriteRouterPush } from 'src/utils/RouterProxy';
import {
  IPersonalData,
  IOrderInformation,
  IPaymentInformation,
} from 'src/types/orderTypes';
import { RouterNames } from 'src/enums/router/RouterNames';

export const useOrderStore = defineStore('order', {
  state: () => ({
    personalData: null as IPersonalData | null,
    orderInformation: null as IOrderInformation | null,
    paymentInformation: null as IPaymentInformation | null,
    items: [] as IProductFromList[],
    itemIds: [] as string[],
    orderCreated: false,
  }),

  getters: {
    getItems: (state) => state.items,
    getOrderCreated: (state) => state.orderCreated,
  },

  actions: {
    setPersonalData(data: IPersonalData) {
      this.personalData = data;
    },

    setOrderInformation(data: IOrderInformation) {
      this.orderInformation = data;
    },

    setPaymentInformation(data: IPaymentInformation) {
      this.paymentInformation = data;
    },

    async initOrderList() {
      const routerInstance = await router({ store: createPinia() });

      const localItemIds = localStorage.getItem('orderListIds');

      if (!localItemIds) {
        routerInstance.push(overwriteRouterPush(RouterNames.APP_SHOP_VIEW));
        return;
      }

      routerInstance.push(overwriteRouterPush(RouterNames.APP_ORDER_VIEW));

      this.itemIds = JSON.parse(localItemIds) as string[];
      console.log(localItemIds);
    },

    async startOrder(items: IProductFromList[]) {
      const routerInstance = await router({ store: createPinia() });

      this.items = items;
      this.itemIds = items.map((i) => i._id);

      localStorage.setItem('orderListIds', JSON.stringify(this.itemIds));

      this.orderCreated = true;

      routerInstance.push(
        overwriteRouterPush(RouterNames.APP_ORDER_PERSONAL_DATA_VIEW)
      );
    },

    async finishOrder() {
      this.orderCreated = false;
      this.personalData = null;
      this.orderInformation = null;
      this.paymentInformation = null;
      this.items = [];
      this.itemIds = [];
      localStorage.removeItem('orderListIds');
      const routerInstance = await router({ store: createPinia() });
      routerInstance.push(overwriteRouterPush(RouterNames.APP_SHOP_VIEW));
    },
  },
});
