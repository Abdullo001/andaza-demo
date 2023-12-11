<template>
  <div class="login">
    <v-row class="h-full">
      <v-col>
        <div class="login__image">
          <img src="@/assets/images/login.png" alt="login image">
        </div>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <div class="login__main">
          <div class="login__logo">
            <img src="/logo.svg" alt="logo">
          </div>
          <div class="login__description mb-8">Registration</div>
          <v-text-field
            label="Company name"
            filled
            dense
            color="#544B99"
            placeholder="Enter Company name"
            class="mb-3"
            v-model="registration.companyName"
            :rules="[formRules.required]"
            validate-on-blur
          />
          <v-text-field
            label="Username"
            filled
            dense
            color="#544B99"
            placeholder="Enter Username or E-mail"
            class="mb-3"
            v-model="registration.userName"
            :rules="[formRules.required]"
            validate-on-blur
          />
          <v-text-field
            label="Phone number"
            filled
            dense
            color="#544B99"
            v-mask="'(##) ### ## ##'"
            prefix="+998"
            placeholder="(--) --- -- --"
            v-model.trim="registration.phoneNumber"
            :rules="[formRules.required]"
            validate-on-blur
          />
          <v-checkbox
            label="Remember me"
            color="#544B99"
            class="mt-0"
          />
          <v-btn
            color="#544B99"
            class="rounded-lg text-capitalize"
            block
            dark
          >Sign Up</v-btn>
          <div class="login__hint text-center">
            Are you already registered?
          </div>
          <v-btn
            outlined
            color="#544B99"
            class="rounded-lg text-capitalize"
            block
            to="/login"
          >Sign In</v-btn>
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
      registration: {
        companyName: '',
        userName: '',
        phoneNumber: '',
        remember: false
      }
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" src="assets/abstracts/_login.scss"></style>
