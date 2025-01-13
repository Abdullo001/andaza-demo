<template>
  <div class="hero">
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Dashboard')
    this.$router.push(this.localePath('/user-management'))
  }
}
</script>

<style scoped lang="scss">
.hero{
  width: 100vw;
  height: 90vh;
  background-image: url('~/assets/images/welcome.webp');
  background-repeat: no-repeat;
  background-size: 100vw 90vh;
  background-position: center;
}
</style>
