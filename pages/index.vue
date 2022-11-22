<template>
  <div class="login">
    <v-row>
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
          <div class="login__description">Registration</div>
          <v-text-field
            label="Company name"
            filled
            dense
            color="#7631FF"
            placeholder="Enter Company name"
            class="mb-3"
          />
          <v-text-field
            label="Username"
            filled
            dense
            color="#7631FF"
            placeholder="Enter Username or E-mail"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'main'
}
</script>
<style lang="scss" src="assets/abstracts/_login.scss"></style>
