<script setup lang="ts">
import { IProductFromList } from 'src/types/responses';
import { useCartStore } from 'src/stores/stores/cart';
import { reactive } from 'vue';

const cartStore = useCartStore();
defineProps<{
  item: IProductFromList;
}>();

const state = reactive({
  count: 1,
});

const addCounter = () => {
  state.count++;
};

const removeCounter = () => {
  if (state.count > 1) {
    state.count--;
  }
};
</script>

<template>
  <q-card class="dialog-main-item">
    <div class="dialog-main-item-left">
      <q-img :src="item.img" fit="cover" class="dialog-main-item-left-image" />
    </div>
    <div class="dialog-main-item-separator" />
    <div class="dialog-main-item-right">
      <div class="info">
        <div class="info-title">
          {{ item.title }}
        </div>
        <div class="info-title">
          {{ item.brand }}
        </div>
        <div class="info-price">{{ item.price }} €</div>
      </div>

      <div class="counter">
        <q-icon
          name="close"
          class="icon_button_style"
          @click="cartStore.removeItem(item)"
        />
        <div>
          <q-icon
            name="remove"
            class="icon_button_style"
            @click="removeCounter"
          />
          {{ state.count }}
          <q-icon name="add" class="icon_button_style" @click="addCounter" />
        </div>
      </div>
    </div>
  </q-card>
</template>

<style scoped lang="scss">
@import 'src/css/components/dialog.scss';
</style>
