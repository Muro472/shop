<script setup lang="ts"></script>

<template>
  <q-intersection once transition="fade">
    <div class="mainLayout">
      <div class="mainLayout-head">
        <slot name="head"></slot>
      </div>
      <div class="mainLayout-main">
        <slot name="main"></slot>
      </div>
    </div>
  </q-intersection>
</template>

<style scoped lang="scss">
@import 'src/css/components/homeView/LayoutView.scss';
</style>
