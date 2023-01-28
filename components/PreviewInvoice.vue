<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        Preview invoice
      </v-card-title>
      <v-divider/>
      <v-card-title>
        <v-row class="header-color">
          <v-col cols="12" lg="2">
            <div class="logo"><v-img src="/ATP.svg"/></div>
          </v-col>
          <v-col cols="12" lg="7">
            <div class="header-text">
              <div><span>Supplier name:</span> ARTATEX LLC</div>
              <div><span>Address:</span> Tashkent city, Uzbekistan</div>
              <div><span>Email:</span> info@ATP.uz</div>
              <div><span>Phone number:</span> +99890 123 45 67 / +99899 765 43 21</div>
            </div>
          </v-col>
          <v-col cols="12" lg="3">
            <div class="header-invoice"><v-img src="/INVOICE.svg"/></div>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" src="assets/abstracts/_previewInvoice.scss"/>
