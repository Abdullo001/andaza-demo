<template>
  <div>
    hello fraud users
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setPageTitle', 'Fraud management')
  }
}
</script>

<style lang="scss" scoped>

</style>
