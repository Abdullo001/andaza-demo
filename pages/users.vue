<template>
  <div class="text-center">
    users
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setPageTitle', 'Users')
  }
}
</script>

<style scoped>

</style>
