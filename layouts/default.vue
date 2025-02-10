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
import {mapGetters} from "vuex";

export default {
  name: 'DefaultLayout',
  components: {SidebarComponent},
  data () {
    return {}
  },
  created() {
    const token = this.$auth.strategy.token.get()
    this.$store.commit('setToken', token);
    this.$store.dispatch('getUserInfo');
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser'
    })
  },
  mounted() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    const langCode=localStorage.getItem("lang")??"en"
    this.$router.push(this.switchLocalePath(langCode))
  }
}
</script>
<style>
::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
  background-color: #cccccc;
}

::-webkit-scrollbar-thumb {
  background-color: #777777;
  border-radius: 16px;
}
</style>
