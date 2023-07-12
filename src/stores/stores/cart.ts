import { IProductFromList } from 'src/types/responses';
import { defineStore } from 'pinia';

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
    addItem(item: IProductFromList) {
      this.items.push(item);
      this.itemIds.push(item._id);
      localStorage.setItem('cart', JSON.stringify(this.itemIds));
    },
  },
});
