<script setup lang="ts">
import { IProductFromList } from 'src/types/responses';
import { useCartStore } from 'src/stores/stores/cart';
import { reactive, onMounted } from 'vue';
import { textShortener } from 'src/composition/TextShortener';
const cartStore = useCartStore();
const props = defineProps<{
  item: IProductFromList;
}>();

const state = reactive({
  count: 1,
});

const updateCounter = (type: 'add' | 'remove') => {
  // --- add --- //
  if (type === 'add') {
    state.count++;
    cartStore.updateCounter(props.item, state.count);

    return;
  }

  // --- remove --- //
  if (type === 'remove' && state.count > 1) {
    state.count--;
    cartStore.updateCounter(props.item, state.count);

    return;
  }
};

onMounted(() => {
  state.count = cartStore.getItemCount(props.item._id);
});
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
          {{ textShortener(item.title, 26) }}
        </div>
        <div class="info-title">
          {{ textShortener(item.brand, 26) }}
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
            @click="updateCounter('remove')"
          />
          {{ state.count }}
          <q-icon
            name="add"
            class="icon_button_style"
            @click="updateCounter('add')"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<style scoped lang="scss">
@import 'src/css/components/dialog.scss';
</style>
