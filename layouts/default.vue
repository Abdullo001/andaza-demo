<template>
  <v-app id="inspire" dark>
    <SidebarComponent/>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SidebarComponent from "../components/Sidebar.vue";

export default {
  name: 'DefaultLayout',
  components: {SidebarComponent},
  data () {
    return {}
  },
  created() {
    const token = this.$auth.strategy.token.get()
    this.$store.commit('setToken', token)
  },
  mounted() {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
}
</script>
