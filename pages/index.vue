<template>
  <div>
    <h2>Hello home  page</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Dashboard')
    this.$router.push('/user-management')
  }
}
</script>

<style scoped>

</style>
