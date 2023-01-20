<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-stepper v-model="e1" elevation="0" class="mt-4">
      <v-stepper-header class="elevation-0">
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
          :color="e1 > 1 ? 'green' : '#7631FF' "
        >
          Billing info
        </v-stepper-step>
        <v-divider/>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
          :color="e1 > 2 ? 'green' : '#7631FF' "
        >
          Generate licence
        </v-stepper-step>
        <v-divider/>

        <v-stepper-step
          step="3"
          :complete="e1 > 3"
          :color="e1 > 3 ? 'green' : '#7631FF' "
        >
          Preview invoicen
        </v-stepper-step>
        <v-divider/>

        <v-stepper-step
          step="4"
          :complete="e1 > 4"
          :color="e1 > 4 ? 'green' : '#7631FF' "
        >
          Print invoice
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            elevation="0"
          >
            <BillingInfo/>
          </v-card>
          <div class="d-flex align-center justify-center pb-4">
            <v-btn
              outlined
              color="#7631FF"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
            >
              Cancel
            </v-btn>

            <v-btn
              color="#7631FF"
              dark
              @click="e1 = 2"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              Next
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <div class="d-flex align-center justify-center pb-4">
            <v-btn
              outlined
              color="#7631FF"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
            >
              Cancel
            </v-btn>

            <v-btn
              color="#7631FF"
              dark
              @click="e1 = 3"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              Next
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <div class="d-flex align-center justify-center pb-4">
            <v-btn
              outlined
              color="#7631FF"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
            >
              Cancel
            </v-btn>

            <v-btn
              color="#7631FF"
              dark
              @click="e1 = 4"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              Next
            </v-btn>
          </div>

        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          >
          <!--   TODO: content here  -->
          </v-card>
          <div class="d-flex align-center justify-center pb-4">
            <v-btn
              outlined
              color="#7631FF"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
            >
              Cancel
            </v-btn>

            <v-btn
              color="#7631FF"
              dark
              @click="e1 = 1"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              Next
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'CreateBillingPage',
  data() {
    return {
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Billing company',
          disabled: false,
          to: '/billing-company',
          icon: true
        },
        {
          text: 'Add billing',
          disabled: true,
          to: '/billing-company/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
      e1: 1
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
