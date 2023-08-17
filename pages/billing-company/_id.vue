<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ details.companyName }}</div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row class="pb-4">
          <v-col cols="12" lg="4" md="4">
            <div class="label">Company ID</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.id"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">Company name</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.companyName"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">Owner</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.owner"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">E-mail</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.email"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">Phone number</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.phoneNumber"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">INN</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.inn"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">Status</div>
            <v-chip color="green" dark small>{{details.status}}</v-chip>
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">Created</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.created"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <div class="label">Updated</div>
            <v-text-field
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              v-model="details.updated"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-6" elevation="0">
      <v-data-table
        :items="billing"
        :headers="headers"
      >
        <template #top>
          <v-toolbar elevation="0">
            <v-toolbar-title class="w-full d-flex align-center justify-space-between">
              <div class="text-capitalize">billing</div>
              <v-btn
                color="#7631FF"
                class="text-capitalize rounded-lg"
                dark
                min-width="170"
                @click="$router.push('/billing-billing')"
              >
                <v-icon>mdi-plus</v-icon>
                add billing
              </v-btn>
            </v-toolbar-title>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  name: "BillingCompanyDetailsPage",
  components: {Breadcrumbs},
  data() {
    return {
      map_links: [
        {
          text: this.$t('billingCompany.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('billingCompany.child.billingCompany'),
          disabled: false,
          to: this.localePath('/billing-company'),
          icon: true
        },
        {
          text: this.$t('billingCompany.child.details'),
          disabled: true,
          to: this.localePath('/billing-company/7a42ec47-7351-4128-9db9-5236adbbfe6d'),
          icon: false
        },
      ],
      fields_status: true,
      details: {
        id: 12,
        companyName: 'SMARTTEX LLC',
        owner: 'john Doe',
        email: 'awesome@asgardia.team',
        phoneNumber: '+99890 123 45 67',
        inn: '1234567890123',
        status: 'ACTIVE',
        created: '12.10.2023 17:09:08',
        updated: '15.10.2023 17:09:08'
      },
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: this.$t('billingCompany.child.contractNumber'), value: 'contractNumber'},
        {text: this.$t('billingCompany.child.contractDate'), value: 'contractDate'},
        {text: this.$t('billingCompany.child.expireDate'), value: 'expireDate'},
        {text: this.$t('billingCompany.child.users'), value: 'users'},
        {text: this.$t('billingCompany.child.pricePerQuote'), value: 'pricePerQuote'},
        {text: this.$t('billingCompany.child.measurementUnit'), value: 'measurementUnit'},
        {text: this.$t('billingCompany.child.discount'), value: 'discount'},
        // {text: 'Actions', value: 'actions'},
      ],
      billing: [
        {
          id: 5468,
          contractNumber: '115-S',
          contractDate: '12.10.2022 17:09:08',
          expireDate: '22.10.2022 17:09:08',
          users: '4',
          pricePerQuote: '300 USD',
          measurementUnit: '2 Month',
          discount: '20',
        },
        {
          id: 5874,
          contractNumber: '115-S',
          contractDate: '12.10.2022 17:09:08',
          expireDate: '22.10.2022 17:09:08',
          users: '4',
          pricePerQuote: '1 200  RUB',
          measurementUnit: '12 Week',
          discount: '15',
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
