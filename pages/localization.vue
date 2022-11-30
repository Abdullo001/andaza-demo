<template>
  <div>
    <div class="text-center">Localization page</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Localization')
  }
}
</script>

<style scoped>

</style>
