import { IProductFromList } from 'src/types/responses';
import { useCartStore } from 'src/stores/stores/cart';
import { defineStore, createPinia } from 'pinia';
import { api } from 'src/api';

import router from 'src/router';

import { overwriteRouterPush } from 'src/utils/RouterProxy';

import { CounterForItemsType } from 'src/types/counterForItemsType';

import {
  ICustomerInformation,
  IOrderInformation,
  IPaymentInformation,
} from 'src/types/orderTypes';

import { RouterNames } from 'src/enums/router/RouterNames';

export const useOrderStore = defineStore('order', {
  state: () => ({
    counter: {} as CounterForItemsType,
    customerInformation: null as ICustomerInformation | null,
    orderInformation: null as IOrderInformation | null,
    paymentInformation: null as IPaymentInformation | null,
    items: [] as IProductFromList[],
    itemIds: [] as string[],
    orderCreated: false,
  }),

  getters: {
    getItems: (state) => state.items,
    getOrderCreated: (state) => state.orderCreated,
    getCustomerInformation: (state) => state.customerInformation,
    getOrderInformation: (state) => state.orderInformation,
    getPaymentInformation: (state) => state.paymentInformation,
    getCounters: (state) => state.counter,
    getItemCount: (state) => (id: string) => state.counter[id] || 0,
  },

  actions: {
    setCustomerInformation(data: ICustomerInformation) {
      this.customerInformation = data;
    },

    setOrderInformation(data: IOrderInformation) {
      this.orderInformation = data;
    },

    setPaymentInformation(data: IPaymentInformation) {
      this.paymentInformation = data;
    },

    async initOrderList() {
      // when order page is reloaded or entered
      const routerInstance = await router({ store: createPinia() });

      const localItemIds = localStorage.getItem('orderListIds');

      if (!localItemIds) {
        routerInstance.push(overwriteRouterPush(RouterNames.APP_SHOP_VIEW));
        return;
      }
      this.itemIds = JSON.parse(localItemIds) as string[];

      const localOrderCounter = localStorage.getItem('orderCounter');
      console.log(localOrderCounter);

      if (localOrderCounter)
        this.counter = JSON.parse(localOrderCounter) as CounterForItemsType;

      const response = (await api.getCartItems(this.itemIds))[1];

      if (response) {
        this.items = response;
      }
    },

    async startOrder(items: IProductFromList[]) {
      // order button from cart is clicked
      const routerInstance = await router({ store: createPinia() });

      this.items = items;
      this.itemIds = items.map((i) => i._id);

      localStorage.setItem('orderListIds', JSON.stringify(this.itemIds));
      this.counter = useCartStore().getCounterForItems;
      localStorage.setItem('orderCounter', JSON.stringify(this.counter));

      this.orderCreated = true;

      routerInstance.push(overwriteRouterPush(RouterNames.APP_ORDER_VIEW));
    },

    async buyItNow(item: IProductFromList) {
      // buy it now button is clicked
      const routerInstance = await router({ store: createPinia() });

      this.items = [item];
      this.itemIds = [item._id];

      localStorage.setItem('orderListIds', JSON.stringify(this.itemIds));
      localStorage.setItem('orderCounter', JSON.stringify({ [item._id]: 1 }));
      this.counter = { [item._id]: 1 };

      this.orderCreated = true;

      routerInstance.push(overwriteRouterPush(RouterNames.APP_ORDER_VIEW));
    },

    async finishOrder() {
      // order is finished
      this.orderCreated = false;
      this.customerInformation = null;
      this.orderInformation = null;
      this.paymentInformation = null;
      this.items = [];
      this.itemIds = [];
      useCartStore().clearCart();
      localStorage.removeItem('orderListIds');
      const routerInstance = await router({ store: createPinia() });
      routerInstance.push(overwriteRouterPush(RouterNames.APP_SHOP_VIEW));
    },
  },
});
