<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ details.companyName }}</div>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            Delete
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            @click="fields_status = !fields_status"
            :color="!fields_status ? 'green' : '#777C85'"
          >
            <v-img :src="fields_status ? '/edit.svg' : '/edit-active.svg'" class="mr-1"/>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>


      </v-card-text>
      <v-divider/>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "BillingCompanyDetailsPage",
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
          text: 'Details',
          disabled: true,
          to: '/billing-company/7a42ec47-7351-4128-9db9-5236adbbfe6d',
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
        {text: 'Contract number', value: 'contractNumber'},
        {text: 'Contract date', value: 'contractDate'},
        {text: 'Expire date', value: 'expireDate'},
        {text: 'Users', value: 'users'},
        {text: 'Price per quote', value: 'pricePerQuote'},
        {text: 'Measurement unit', value: 'measurementUnit'},
        {text: 'Discount(%)', value: 'discount'},
        {text: 'Actions', value: 'actions'},
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
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
