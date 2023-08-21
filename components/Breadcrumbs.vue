<template>
  <div class="breadcrumbs d-flex align-center ml-2">
    <div class="breadcrumbs d-flex align-center font-weight-medium mb-4 text-body-2" v-for="(item, idx) in maps" :key="idx">
      <nuxt-link :to="item.to" class="base-color" v-if="!item.disabled">{{ item.text }}</nuxt-link>
      <div class="grey--text" v-if="item.disabled">{{ item.text }}</div>
      <v-icon class="mx-3" size="18" v-if="item.icon">mdi-slash-forward</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maps: {
      required: true,
      default: []
    }
  }

}
</script>

<style lang="scss" scoped>
.base-color {
  color: #7631FF;
}
</style>
