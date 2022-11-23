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
          <nuxt-link to="/login" class="login__back--wrap" v-if="!otp">
            <img src="/back.svg" alt="arrow back icon">
          </nuxt-link>
          <div class="login__back--wrap" v-else @click="otp = !otp">
            <img src="/back.svg" alt="arrow back icon">
          </div>
        </div>
        <div class="login__main">
          <div class="login__logo">
            <img src="/logo.svg" alt="logo">
          </div>
          <div class="login__description">Reset password</div>
          <div class="login__subtitle text-center mb-7">
            A message will be sent to your e-mail to reset your password, through which you can update your password.
          </div>
          <v-form lazy-validation v-model="valid" ref="email_valid">
            <div v-if="!otp">
              <v-text-field
                label="E-mail"
                filled
                dense
                color="#7631FF"
                placeholder="Enter your e-mail"
                class="mb-3"
                v-model="reset.email"
                :rules="[formRules.required, formRules.email]"
                validate-on-blur
                @keydown.enter.stop="sendEmail"
              />
              <v-btn
                color="#7631FF"
                class="rounded-lg text-capitalize"
                block
                dark
                @click="sendEmail"
              >
                Send
              </v-btn>
            </div>
            <div v-else>
              <v-otp-input
                length="6"
                v-model="reset.otp"
                :rules="[formRules.required, formRules.onlyNumber]"
                validate-on-blur
              ></v-otp-input>
              <div class="text-base text-right mt-5 mb-7 pointer">Send message again</div>
              <v-btn
                color="#7631FF"
                class="rounded-lg text-capitalize"
                block
                dark
                @click="sendOtp"
              >
                Confirm
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
      reset: {
        email: '',
        otp: ''
      },
      show_password: true,
      valid: true,
      otp: false
    }
  },
  methods: {
    sendEmail() {
      const valid = this.$refs.email_valid.validate()
      if (valid) {
        this.otp = true
      }
    },
    sendOtp() {
      const valid = this.$refs.email_valid.validate()
      if(valid) {
        this.$router.push('/new-password')
      }
    }
  }
}
</script>
<style lang="scss" src="assets/abstracts/_login.scss"></style>
