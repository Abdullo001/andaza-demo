<template>
  <div>
    <div class="text-center">Prefinances page</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Prefinances')
  }
}
</script>

<style scoped>

</style>
