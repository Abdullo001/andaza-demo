<template>
  <div>
    <h2>Hello user management page</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: []
    }
  },

  mounted() {
    this.$store.commit('setPageTitle', 'User management')
  }
}
</script>

<style scoped>

</style>
