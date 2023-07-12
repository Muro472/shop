import { IProductFromList } from 'src/types/responses';
import { defineStore } from 'pinia';
import { api } from 'src/api';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as IProductFromList[],
    itemIds: [] as string[],
  }),
  getters: {
    getItems: (state) => state.items,
    getItemIds: (state) => state.itemIds,
  },
  actions: {
    async initBasket() {
      const localItems = localStorage.getItem('cart');
      if (!localItems) return;
      this.itemIds = JSON.parse(localItems) as string[];
      console.log(localItems);

      const response = (await api.getCartItems(this.itemIds))[1];

      if (response) {
        this.items = response;
      }
    },

    addItem(item: IProductFromList) {
      this.items.push(item);
      this.itemIds.push(item._id);
      localStorage.setItem('cart', JSON.stringify(this.itemIds));
    },

    removeItem(item: IProductFromList) {
      const index = this.items.findIndex((i) => i._id === item._id);
      this.items.splice(index, 1);
      this.itemIds.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.itemIds));
    },
  },
});
