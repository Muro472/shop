<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useOrderStore } from 'src/stores/stores/order';
import { useOverlayStore } from 'src/stores/stores/overlay';
import { textShortener } from 'src/composition/TextShortener';
import { shippingCountries } from 'src/utils/shippingCountries';
import { useQuasar } from 'quasar';
import { api } from 'src/api';
import { IProductsToOrder } from 'src/types/requests';

const $q = useQuasar();
const overlayStore = useOverlayStore();
const orderStore = useOrderStore();

const getData = async () => {
  if (orderStore.getOrderCreated) {
    totalPrice.value = orderStore.getItems.reduce((acc, item) => {
      return acc + item.price * orderStore.getItemCount(item._id);
    }, 0);
    return;
  }

  overlayStore.startOverlay();
  await orderStore.initOrderList();

  totalPrice.value = orderStore.getItems.reduce((acc, item) => {
    return acc + item.price * orderStore.getItemCount(item._id);
  }, 0);
  overlayStore.stopOverlay();
};

let totalPrice = ref(0);
let buttonClicked = ref(false);

let activePaymentType = ref('');

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

const getProductsToOrder = () => {
  const productsToOrder: IProductsToOrder[] = [];

  orderStore.getItems.forEach((item) => {
    productsToOrder.push({
      productId: item._id,
      quantity: orderStore.getItemCount(item._id),
    });
  });

  return productsToOrder;
};

const orderWithCash = async () => {
  await api.createOrder({
    name: orderInfo.firstName,
    surname: orderInfo.lastName,
    email: orderInfo.email,

    phone: orderInfo.phoneNumber,
    products: getProductsToOrder(),
    amount: totalPrice.value,
    address: orderInfo.address,
    apartment: orderInfo.apartment,
    country: orderInfo.countryRegion,
    city: orderInfo.city,
    postalCode: orderInfo.zipCode,
    status: 'Ordered with cash',
  });
};

const validate = () => {
  if (
    orderInfo.email === '' ||
    orderInfo.countryRegion === '' ||
    orderInfo.firstName === '' ||
    orderInfo.lastName === '' ||
    orderInfo.address === '' ||
    orderInfo.apartment === '' ||
    orderInfo.city === '' ||
    orderInfo.zipCode === '' ||
    orderInfo.phoneNumber === '' ||
    activePaymentType.value === ''
  )
    return false;

  return true;
};

const orderWithCard = () => {
  console.log('orderWithCard');
};

const handleBuy = () => {
  buttonClicked.value = true;
  if (!validate()) return;

  if (activePaymentType.value === 'cash') {
    orderWithCash();
  } else if (activePaymentType.value === 'card') {
    orderWithCard();
  }
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
        <q-input
          v-model="orderInfo.email"
          outlined
          :label="$t('email')"
          :error="orderInfo.email === '' && buttonClicked"
          :error-message="$t('requiredField')"
        />
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
          :error="orderInfo.countryRegion === '' && buttonClicked"
          :error-message="$t('requiredField')"
        />
      </div>

      <div class="shippingInfo-nInputHousing">
        <div class="shippingInfo-inputHousing">
          <q-input
            v-model="orderInfo.firstName"
            outlined
            :label="$t('firstName')"
            :error="orderInfo.firstName === '' && buttonClicked"
            :error-message="$t('requiredField')"
          />
        </div>

        <div class="shippingInfo-inputHousing">
          <q-input
            v-model="orderInfo.lastName"
            outlined
            :label="$t('lastName')"
            :error="orderInfo.lastName === '' && buttonClicked"
            :error-message="$t('requiredField')"
          />
        </div>
      </div>

      <div class="shippingInfo-inputHousing">
        <q-input
          v-model="orderInfo.address"
          outlined
          :label="$t('address')"
          :error="orderInfo.address === '' && buttonClicked"
          :error-message="$t('requiredField')"
        />
      </div>

      <div class="shippingInfo-inputHousing">
        <q-input
          v-model="orderInfo.apartment"
          outlined
          :label="$t('apartment')"
          :error="orderInfo.apartment === '' && buttonClicked"
          :error-message="$t('requiredField')"
        />
      </div>

      <div class="shippingInfo-nInputHousing">
        <div class="shippingInfo-inputHousing">
          <q-input
            v-model="orderInfo.city"
            outlined
            :label="$t('city')"
            :error="orderInfo.city === '' && buttonClicked"
            :error-message="$t('requiredField')"
          />
        </div>

        <div class="shippingInfo-inputHousing">
          <q-input
            v-model="orderInfo.zipCode"
            outlined
            :label="$t('ZIPCode')"
            :error="orderInfo.zipCode === '' && buttonClicked"
            :error-message="$t('requiredField')"
          />
        </div>
      </div>

      <div class="shippingInfo-inputHousing">
        <q-input
          v-model="orderInfo.phoneNumber"
          outlined
          :label="$t('phoneNumber')"
          :error="orderInfo.phoneNumber === '' && buttonClicked"
        />
      </div>

      <!-- Payment -->

      <div class="shippingInfo-bigText">
        {{ $t('payment') }}
      </div>

      <div class="shippingInfo-actions">
        <q-list class="shippingInfo-actions-list">
          <q-item
            class="shippingInfo-actions-list-item"
            @click="activePaymentType = 'cash'"
            :active="activePaymentType === 'cash'"
            clickable
            v-ripple
            active-class="shippingInfo-actions-list-item-active"
          >
            {{ $t('buyWithCash') }}
          </q-item>
          <q-separator class="separator" />

          <q-item
            class="shippingInfo-actions-list-item"
            @click="activePaymentType = 'card'"
            :active="activePaymentType === 'card'"
            clickable
            v-ripple
            active-class="shippingInfo-actions-list-item-active"
          >
            {{ $t('buyWithCard') }}
          </q-item>
        </q-list>

        <div class="shippingInfo-actions-error">
          {{
            buttonClicked && activePaymentType === ''
              ? $t('choosePaymentMethod')
              : ''
          }}
        </div>

        <q-btn
          color="purple"
          :label="$t('buy')"
          class="shippingInfo-actions-button"
          @click="handleBuy"
        />
      </div>
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
