<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-stepper v-model="e1" elevation="0" class="mt-4">
      <v-stepper-header class="elevation-0">
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
          :color="e1 > 1 ? 'green' : '#544B99' "
        >
          {{ $t('billingCompany.addBilling.billingInfo') }}
        </v-stepper-step>
        <v-divider/>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
          :color="e1 > 2 ? 'green' : '#544B99' "
        >
          {{ $t('billingCompany.addBilling.generateLicence') }}
        </v-stepper-step>
        <v-divider/>

        <v-stepper-step
          step="3"
          :complete="e1 > 3"
          :color="e1 > 3 ? 'green' : '#544B99' "
        >
          {{ $t('billingCompany.addBilling.previewInvoicen') }}
        </v-stepper-step>
        <v-divider/>

        <v-stepper-step
          step="4"
          :complete="e1 > 4"
          :color="e1 > 4 ? 'green' : '#544B99' "
        >
          {{ $t('billingCompany.addBilling.printInvoice') }}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="rounded-lg">
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
              color="#544B99"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
            >
              {{ $t('billingCompany.addBilling.cancel') }}
            </v-btn>

            <v-btn
              color="#544B99"
              dark
              @click="e1 = 2"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              {{ $t('billingCompany.addBilling.next') }}
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            elevation="0"
          >
            <GenerateLicence/>
          </v-card>

          <div class="d-flex align-center justify-center pb-4">
            <v-btn
              outlined
              color="#544B99"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
              @click="e1 = 1"
            >
              {{ $t('billingCompany.addBilling.cancel') }}
            </v-btn>

            <v-btn
              color="#544B99"
              dark
              @click="e1 = 3"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              {{ $t('billingCompany.addBilling.next') }}
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            elevation="0"
          >
            <PreviewInvoice/>
          </v-card>

          <div class="d-flex align-center justify-center pb-4">
            <v-btn
              outlined
              color="#544B99"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
              @click="e1 = 2"
            >
              {{ $t('billingCompany.addBilling.cancel') }}
            </v-btn>

            <v-btn
              color="#544B99"
              dark
              @click="e1 = 4"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              {{ $t('billingCompany.addBilling.next') }}
            </v-btn>
          </div>

        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            elevation="0"
          >
          <PrintInvoice/>
          </v-card>
          <div class="d-flex align-center justify-center pb-4">
            <v-btn
              outlined
              color="#544B99"
              class="border-indigo mr-4 rounded-lg font-weight-bold"
              min-width="160"
              @click="e1 = 3"
            >
              {{ $t('billingCompany.addBilling.cancel') }}
            </v-btn>

            <v-btn
              color="#544B99"
              dark
              @click="e1 = 4"
              class="text-capitalize rounded-lg"
              min-width="160"
            >
              {{ $t('billingCompany.addBilling.next') }}
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import PreviewInvoice from "../../components/PreviewInvoice.vue";
import PrintInvoice from "../../components/PrintInvoice.vue";
import GenerateLicence from "../../components/GenerateLicence.vue";
import BillingInfo from "../../components/BillingInfo.vue";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  name: 'CreateBillingPage',
  components: {Breadcrumbs, BillingInfo, GenerateLicence, PrintInvoice, PreviewInvoice},
  data() {
    return {
      map_links: [
        {
          text: this.$t('billingCompany.addBilling.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('billingCompany.addBilling.billingCompany'),
          disabled: false,
          to: this.localePath('/billing-company'),
          icon: true
        },
        {
          text: this.$t('billingCompany.addBilling.addBilling'),
          disabled: true,
          to: this.localePath('/billing-company/7a42ec47-7351-4128-9db9-5236adbbfe6d'),
          icon: false
        },
      ],
      e1: 1
    }
  },
}
</script>

<style lang="scss" scoped>
.v-stepper__header {
  background: #F4F5FA;
}
</style>
