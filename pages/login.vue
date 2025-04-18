<template>
  <div class="login">
    <v-row class="h-full">
      <v-col cols="12" lg="6" md="6" sm="12">
        <div class="login__image">
          <img src="@/assets/images/login.png" alt="login image">
        </div>
      </v-col>
      <v-col  cols="12" lg="6" md="6" sm="12">
        <div class="d-flex justify-end mt-4">
          <span v-for="(lang, idx) in langs" :key="idx">
            <span :class="`${selectedLang===lang.code?'selectedLang':''} lang-item`" @click="setLocalStorage(lang)">{{ lang.title }}</span>
          </span>
        </div>
        <div class="login__card-inner">
          <div class="login__main">
            <div class="login__logo">
              <img src="/andaza.svg" alt="logo" width="300">
            </div>
            <div class="login__description mb-8">Authentication</div>
            <div class="label">{{ $t('login.username') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              dense
              color="#544B99"
              :placeholder="$t('login.enterUsername')"
              class="mb-3 rounded-lg base"
              v-model.trim="login.userName"
              :rules="[formRules.required]"
              validate-on-blur
            />
            <div class="label">{{ $t('login.password') }}</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              dense
              color="#544B99"
              :placeholder="$t('login.enterPassword')"
              class="mb-3 rounded-lg base"
              v-model.trim="login.password"
              :type="show_password ? 'password' : 'text'"
              :rules="[formRules.required]"
              validate-on-blur
            >
              <template #append>
                <img
                  :src="show_password ? '/eye-close.svg' : '/eye-open.svg'"
                  alt="eye icons"
                  class="mt-1 pointer"
                  @click="show_password = !show_password"
                >
              </template>
            </v-text-field>
            <div class="d-flex justify-space-between align-center mb-5 pointer mb-8">
              <v-checkbox
                :label="$t('login.rememberMe')"
                color="#544B99"
                class="mt-0"
                hide-details
              />
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize font-weight-bold"
              block
              dark
              @click.stop="userLogin"
              height="42"
            >{{ $t('login.signIn') }}
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'IndexPage',
  layout: 'main',
  data() {
    return {
      login: {
        userName: '',
        password: ''
      },
      selectedLang: '',
      show_password: true,
      langs:[],
    }
  },

  methods: {
    ...mapActions({
      changeLang: "users/changeLang",
    }),
    async userLogin() {
      const data = {
        usernameOrEmail: this.login.userName,
        password: this.login.password
      }
      await this.$axios.$post(`/api/v1/auth/login`, data)
        .then(res => {
          const token = String(res.data.token)
          this.$auth.setUserToken(token)
          this.$toast.success(res.message, {theme: 'toasted-primary'});
          this.$store.commit("setPermissionsList",res.data.permissions)
          window.localStorage.setItem("permissionList",JSON.stringify(res.data.permissions))
          this.$router.push(this.localePath('/user-management'));
        })
    },
    async setLocalStorage(item){
      localStorage.setItem("lang",item.code)
      const route = this.switchLocalePath(item.code)
      this.$router.push(route);
      this.selectedLang = item.code
    },
  },
  created(){
    this.selectedLang=localStorage.getItem("lang")??"en"
    this.langs = [...this.$i18n.locales]
  },
}
</script>
<style lang="scss" src="assets/abstracts/_login.scss" scoped></style>
