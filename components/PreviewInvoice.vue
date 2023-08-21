<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        Preview invoice
      </v-card-title>
      <v-divider/>
      <v-card-title class="py-4">
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
      <v-card-text>
        <div class="buyer-info">Buyer info</div>
        <v-row>
          <v-col>
            <div class="buyer-text">
              <div><span>Company name:</span>STARTTEX LLC</div>
              <div><span> Owner fullname:</span>John Doe</div>
              <div><span>Address:</span>Khorezm reg,Khiva city</div>
              <div><span>Email:</span>info@startex.uz</div>
              <div><span>TIN:</span>303125061</div>
              <div><span>Phone number:</span>+99890 123 45 67</div>
            </div>
          </v-col>
          <v-col>
            <div class="buyer-text">
              <div><span>Invoice №:</span>38/10-22</div>
              <div><span> Data:</span>30.11.2022 12:15:12</div>
              <div><span>Duo data:</span>30.05.2023 12:15:12</div>
              <div><span>Contract №::</span>115-S</div>
              <div><span>Dated:</span>30.05.2023 12:15:12</div>
            </div>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="buyers"
          :items-per-page="50"
          hide-default-footer
          class="mt-6"
        >
        </v-data-table>
        <v-divider/>
        <div class="buyer-info">PAYMENT METHOD</div>
        <v-row>
          <v-col>
            <div class="buyer-text">
              <div><span>Bank name:</span>Kapitalbank</div>
              <div><span> Bank MFO:</span>00100</div>
              <div><span>A/N:</span>202016666984693454656</div>
            </div>
          </v-col>
          <v-spacer/>
          <v-col>
            <div class="buyer-text">
              <div><span>Subtotal:</span>1850 USD </div>
              <div class="base-color"><span> Discount (10%):</span>-185 USD</div>
              <v-divider/>
              <div><span>Total price:</span>1665 USD</div>
            </div>
          </v-col>
        </v-row>
        <div class="d-flex justify-end w-full brand">
          <div class="d-flex flex-column align-end">
            <span class="subtitle-1">With regards</span>
            <span class="title base-color font-weight-bold"> ARTATEX LLC</span>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="w-full">
        <div class="footer-color w-full">
          Thanks for cooperation!
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {text: '№', align: 'start', sortable: false, value: 'number'},
        { text: 'Service name', sortable: false, value: 'serviceName' },
        { text: 'Duration', sortable: false, value: 'duration' },
        { text: 'Number of users', sortable: false, value: 'numberUsers' },
        { text: 'Price per quote', sortable: false, value: 'pricePerQuote' },
        { text: 'Amount', sortable: false, value: 'amount' },
      ],
      buyers: [
        {
          number: 1,
          serviceName: 'Using program',
          duration: '6 Month',
          numberUsers: 5,
          pricePerQuote: '300 USD',
          amount: '1500 USD'
        },
        {
          number: 2,
          serviceName: 'Using program',
          duration: '1 Month',
          numberUsers: 5,
          pricePerQuote: '200 USD',
          amount: '1500 USD'
        },
        {
          number: 3,
          serviceName: 'Using program',
          duration: '4 Month',
          numberUsers: 5,
          pricePerQuote: '100 USD',
          amount: '1300 USD'
        },
      ]
    }
  },
}
</script>

<style lang="scss" src="assets/abstracts/_previewInvoice.scss"/>
