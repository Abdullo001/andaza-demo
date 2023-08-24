<template>
  <div class="login">
    <v-row class="h-full">
      <v-col cols="12" lg="6" md="6" sm="12">
        <div class="login__image">
          <img src="@/assets/images/login.png" alt="login image">
        </div>
      </v-col>
      <v-col class="d-flex justify-center align-center" cols="12" lg="6" md="6" sm="12">
        <div class="login__main">
          <div class="login__logo">
            <img src="/logo.svg" alt="logo">
          </div>
          <div class="login__description mb-8">Authentication</div>
          <div class="label">Username</div>
          <v-text-field
            outlined
            hide-details
            height="44"
            dense
            color="#7631FF"
            placeholder="Enter Username or E-mail"
            class="mb-3 rounded-lg base"
            v-model.trim="login.userName"
            :rules="[formRules.required]"
            validate-on-blur
          />
          <div class="label">Password</div>
          <v-text-field
            outlined
            hide-details
            height="44"
            dense
            color="#7631FF"
            placeholder="Enter password"
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
              label="Remember me"
              color="#7631FF"
              class="mt-0"
              hide-details
            />
          </div>
          <v-btn
            color="#7631FF"
            class="rounded-lg text-capitalize font-weight-bold"
            block
            dark
            @click.stop="userLogin"
            height="42"
          >Sign In
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  layout: 'main',
  data() {
    return {
      login: {
        userName: '',
        password: ''
      },
      show_password: true
    }
  },
  methods: {
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
          this.$router.push('/user-management');
        })
    }
  }
}
</script>
<style lang="scss" src="assets/abstracts/_login.scss" scoped></style>
