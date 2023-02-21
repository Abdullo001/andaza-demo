<template>
  <v-app id="inspire" dark>
    <Sidebar/>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {}
  },
  created() {
    const token = this.$auth.strategy.token.get()
    this.$store.commit('setToken', token)
  },
  mounted() {}
}
</script>
