import { defineStore } from 'pinia';

export const useOverlayStore = defineStore('overlay', {
  state: () => ({
    overlay: false,
  }),
  getters: {
    getOverlay: (state) => state.overlay,
  },
  actions: {
    startOverlay() {
      this.overlay === true;
    },
    stopOverlay() {
      this.overlay === false;
    },
  },
});
