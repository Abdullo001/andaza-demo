<template>
  <div class="login">
    <v-row class="h-full">
      <v-col>
        <div class="login__image">
          <img src="@/assets/images/login.png" alt="login image">
        </div>
      </v-col>
      <v-col class="d-flex justify-center align-center flex-column">
        <div class="login__back mb-8">
          <nuxt-link to="/reset" class="login__back--wrap">
            <img src="/back.svg" alt="arrow back icon">
          </nuxt-link>
        </div>
        <div class="login__main">
          <div class="login__logo">
            <img src="/logo.svg" alt="logo">
          </div>
          <div class="login__description mb-10">New password</div>
          <v-form lazy-validation v-model="valid" ref="password_valid">
            <div>
              <v-text-field
                label="New password"
                filled
                dense
                color="#7631FF"
                placeholder="Enter new password"
                class="mb-3"
                v-model="password.new_password"
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
              <v-text-field
                label="Confirm new password"
                filled
                dense
                color="#7631FF"
                placeholder="Confirm new password"
                class="mb-3"
                v-model="password.confirm_password"
                :type="show_password ? 'password' : 'text'"
                :rules="[formRules.required, formRules.confirmPassword(password.new_password, password.confirm_password)]"
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
              <v-btn
                color="#7631FF"
                class="rounded-lg text-capitalize"
                block
                dark
                @click="sendNewPassword"
              >
                Send
              </v-btn>
            </div>
          </v-form>
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
      password: {
        new_password: '',
        confirm_password: ''
      },
      show_password: true,
      valid: true,
    }
  },
  methods: {
    sendNewPassword() {
      const valid = this.$refs.password_valid.validate()
      if (valid) {
      }
    },
  }
}
</script>
<style lang="scss" src="assets/abstracts/_login.scss"></style>
