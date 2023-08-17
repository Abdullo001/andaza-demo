<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="text-capitalize">print invoice</v-card-title>
      <v-divider/>
      <v-card-text class="d-flex flex-column align-center">
        <div class="base-color print-title text-center">
          Congratulations
        </div>
        <div class="print-text">
          You have filled in all your billing information. You can now download the invoice information via the download
          button.
        </div>
        <div class="print-image">
          <v-img src="/printImage.png"/>
        </div>
        <v-btn
          class="print-btn"
          color="#C6ADF8"
          min-width="280"
          min-height="44"
          elevation="0"
        >
          <v-img
            src="/download.svg"
            max-width="24"
            class="mr-4"
          />
          Download invoice
        </v-btn>
      </v-card-text>
      <v-divider/>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" src="assets/abstracts/_printInvoice.scss" scoped>

</style>
