import { IProductFromList } from 'src/types/responses';
import { defineStore } from 'pinia';
import { api } from 'src/api';
import { CounterForItemsType } from 'src/types/counterForItemsType';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as IProductFromList[],
    itemIds: [] as string[],
    counterForItems: {} as CounterForItemsType,
  }),

  getters: {
    getItems: (state) => state.items,
    getItemIds: (state) => state.itemIds,
    getCounterForItems: (state) => state.counterForItems,
    getItemCount: (state) => (id: string) => state.counterForItems[id] || 0,
  },

  actions: {
    async initBasket() {
      const localItems = localStorage.getItem('cart');
      const localCounter = localStorage.getItem('counter');

      console.log(localItems, localCounter);

      if (!localItems || !localCounter) return;

      console.log('da');

      this.counterForItems = JSON.parse(localCounter) as CounterForItemsType;
      this.itemIds = JSON.parse(localItems) as string[];

      const response = (await api.getCartItems(this.itemIds))[1];

      if (response) {
        this.items = response;
      }
    },

    addItem(item: IProductFromList) {
      this.items.push(item);
      this.itemIds.push(item._id);
      localStorage.setItem('cart', JSON.stringify(this.itemIds));

      if (this.counterForItems[item._id]) {
        this.counterForItems[item._id] += 1;
      } else {
        this.counterForItems[item._id] = 1;
      }
      localStorage.setItem('counter', JSON.stringify(this.counterForItems));
    },

    removeItem(item: IProductFromList) {
      const index = this.items.findIndex((i) => i._id === item._id);
      this.items.splice(index, 1);
      this.itemIds.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.itemIds));

      delete this.counterForItems[item._id];
    },

    updateCounter(item: IProductFromList, counter: number) {
      this.counterForItems[item._id] = counter;
      localStorage.setItem('counter', JSON.stringify(this.counterForItems));
    },

    clearCart() {
      this.items = [];
      this.itemIds = [];
      this.counterForItems = {};
      localStorage.removeItem('cart');
      localStorage.removeItem('counter');
    },
  },
});
