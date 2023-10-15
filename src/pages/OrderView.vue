<script setup lang="ts">
import { onMounted, reactive, computed, ref } from 'vue';
import { useOrderStore } from 'src/stores/stores/order';
import { useOverlayStore } from 'src/stores/stores/overlay';
import { textShortener } from 'src/composition/TextShortener';
import { shippingCountries } from 'src/utils/shippingCountries';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const overlayStore = useOverlayStore();
const orderStore = useOrderStore();

const getData = async () => {
  if (orderStore.getOrderCreated) return;

  overlayStore.startOverlay();
  await orderStore.initOrderList();
  totalPrice.value = orderStore.getItems.reduce((acc, item) => {
    return acc + item.price * orderStore.getItemCount(item._id);
  }, 0);
  overlayStore.stopOverlay();
};

let totalPrice = ref(0);

const orderInfo = reactive({
  email: '',
  countryRegion: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  zipCode: '',
  phoneNumber: '',
});

const readyForPayment = computed((): boolean => {
  if (orderInfo.email === '') return false;
  if (orderInfo.countryRegion === '') return false;
  if (orderInfo.firstName === '') return false;
  if (orderInfo.lastName === '') return false;
  if (orderInfo.address === '') return false;
  if (orderInfo.city === '') return false;
  if (orderInfo.city === '') return false;
  if (orderInfo.zipCode === '') return false;
  if (orderInfo.phoneNumber === '') return false;

  return true;
});

const paymentInfo = reactive({
  cash: false,
  card: false,
});

const paymentInfoUpdate = (val: boolean, type: 'cash' | 'card') => {
  if (type === 'cash') {
    paymentInfo.card = false;
    paymentInfo.cash = true;
  } else if (type === 'card') {
    paymentInfo.card = true;
    paymentInfo.cash = false;
  }
};

const orderWithCash = () => {
  console.log('orderWithCash');
};

const orderWithCard = () => {
  console.log('orderWithCard');
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div
    :class="$q.screen.sm || $q.screen.xs ? 'orderStackMobile' : 'orderStack'"
  >
    <div
      :class="
        'orderStack' + $q.screen.sm || $q.screen.xs
          ? 'Mobile-left'
          : '-left' + 'shippingInfo'
      "
    >
      <!-- Contact -->
      <div class="shippingInfo-bigText">
        {{ $t('contact') }}
      </div>

      <div class="shippingInfo-inputHousing">
        <q-input v-model="orderInfo.email" outlined :label="$t('email')" />
      </div>

      <!-- Shipping Address -->

      <div class="shippingInfo-bigText">
        {{ $t('shippingAddress') }}
      </div>

      <div class="shippingInfo-inputHousing">
        <q-select
          v-model="orderInfo.countryRegion"
          :options="shippingCountries"
          outlined
          :label="$t('countryOrRegion')"
        />
      </div>

      <div class="shippingInfo-nInputHousing">
        <div class="shippingInfo-inputHousing">
          <q-input
            v-model="orderInfo.firstName"
            outlined
            :label="$t('firstName')"
          />
        </div>

        <div class="shippingInfo-inputHousing">
          <q-input
            v-model="orderInfo.lastName"
            outlined
            :label="$t('lastName')"
          />
        </div>
      </div>

      <div class="shippingInfo-inputHousing">
        <q-input v-model="orderInfo.address" outlined :label="$t('address')" />
      </div>

      <div class="shippingInfo-inputHousing">
        <q-input
          v-model="orderInfo.apartment"
          outlined
          :label="$t('apartment')"
        />
      </div>

      <div class="shippingInfo-nInputHousing">
        <div class="shippingInfo-inputHousing">
          <q-input v-model="orderInfo.city" outlined :label="$t('city')" />
        </div>

        <div class="shippingInfo-inputHousing">
          <q-input
            v-model="orderInfo.zipCode"
            outlined
            :label="$t('ZIPCode')"
          />
        </div>
      </div>

      <div class="shippingInfo-inputHousing">
        <q-input
          v-model="orderInfo.phoneNumber"
          outlined
          :label="$t('phoneNumber')"
        />
      </div>

      <!-- Payment -->

      <template v-if="readyForPayment">
        <div class="shippingInfo-bigText">
          {{ $t('payment') }}
        </div>

        <div class="q-gutter-sm">
          <q-checkbox
            v-model="paymentInfo.card"
            :label="$t('cash')"
            color="green"
            @update:model-value="(val) => paymentInfoUpdate(val, 'card')"
          />

          <q-checkbox
            v-model="paymentInfo.cash"
            :label="$t('card')"
            color="green"
            @update:model-value="(val) => paymentInfoUpdate(val, 'cash')"
          />
        </div>

        <q-btn
          v-if="paymentInfo.card"
          @click="orderWithCash"
          :label="'button with card'"
        />

        <q-btn
          v-if="paymentInfo.cash"
          @click="orderWithCard"
          :label="'button with cash'"
        />
      </template>
    </div>

    <!-- right side -->

    <div
      :class="
        'orderStack' + $q.screen.sm || $q.screen.xs
          ? 'Mobile-right'
          : '-right' + 'orderInfo'
      "
    >
      <template v-for="(item, index) in orderStore.getItems" :key="index">
        <div class="orderInfo-list">
          <img class="orderInfo-list-image" :src="item.img" />

          <div class="orderInfo-list-separator" />

          <div class="orderInfo-list-title">
            <div>
              {{ textShortener(item.title, 110) }}
            </div>
          </div>
          <div class="orderInfo-list-price">
            {{ orderStore.getItemCount(item._id) }} X €{{ item.price }}
          </div>
        </div>
      </template>
      <q-separator />
      <div class="orderStack-right-price">
        <div>{{ $t('total') }}</div>
        <div>€{{ totalPrice }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/components/dialog.scss';
@import 'src/css/components/OrderStack';
</style>
