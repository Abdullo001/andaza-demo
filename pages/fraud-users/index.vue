<template>
  <div>
    <breadcrumbs :maps="map_links"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Devices',
          disabled: false,
          to: '/fraud-devices',
          icon: true
        },
        {
          text: 'Details',
          disabled: true,
          to: '/fraud-device/2',
          icon: false
        },
      ]
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Fraud management')
  }
}
</script>

<style lang="scss" scoped>

</style>
