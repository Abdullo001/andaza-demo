<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="d-flex align-center justify-space-between w-full">
        <div>Billing info</div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row class="pb-4">
          <v-col cols="12" lg="3" md="3">
            <div class="label">Company name</div>
            <v-text-field
              v-model="billingInfo.companyName"
              label="ex. John’s company"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              validate-on-blur
              dense
              color="#544B99"
              background-color="#F8F4FE"
            />

          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Contract expire date</div>
            <el-date-picker
              v-model="billingInfo.contractExpireDate"
              type="datetime"
              placeholder="dd.MM.yyyy HH:mm:ss"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%;height: 44px"
              class="base_picker"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Quotes / Number of users</div>
            <v-text-field
              v-model="billingInfo.quotes"
              label="0"
              :rules="[formRules.onlyNumber]"
              single-line
              outlined
              height="44"
              hide-details
              class="rounded-lg base"
              validate-on-blur
              dense
              color="#544B99"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Price per quote</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                single-line
                outlined
                hide-details
                height="44"
                class="rounded-l-lg rounded-r-0 base"
                validate-on-blur
                dense
                color="#544B99"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                single-line dense
                outlined
                hide-details
                height="44"
                validate-on-blur
                class="rounded-r-lg rounded-l-0 base"
                append-icon="mdi-chevron-down"
                color="#544B99"
                background-color="#F8F4FE"
              />
            </div>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Contract date</div>
            <el-date-picker
              v-model="billingInfo.contractDate"
              type="datetime"
              placeholder="dd.MM.yyyy HH:mm:ss"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%; height: 44px"
              class="base_picker"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Measurement unit</div>
            <v-select
              :items="unit_enums"
              v-model="billingInfo.measurementUnit"
              single-line dense
              outlined
              hide-details
              height="44"
              validate-on-blur
              class="rounded-lg base"
              append-icon="mdi-chevron-down"
              color="#544B99"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Contract number</div>
            <v-text-field
              v-model="billingInfo.contractNumber"
              label="0"
              single-line
              outlined
              hide-details
              height="44"
              validate-on-blur
              dense
              class="rounded-lg base"
              color="#544B99"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Discount percent</div>
            <v-text-field
              v-model="billingInfo.discountPercent"
              label="0"
              hide-details
              height="44"
              outlined validate-on-blur
              dense
              class="rounded-lg base"
              color="#544B99"
              background-color="#F8F4FE"
            >
              <template #append>
                <v-img src="/precent.svg"/>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row class="mt-4 mb-4">
          <v-col>
            <div class="label">Mentorship price</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                hide-details
                height="44"
                outlined validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0 base"
                color="#544B99"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                hide-details
                height="44"
                dense
                outlined validate-on-blur
                class="rounded-r-lg rounded-l-0 base"
                append-icon="mdi-chevron-down"
                color="#544B99"
                background-color="#F8F4FE"
              />
            </div>
          </v-col>
          <v-col>
            <div class="label">Support price</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                hide-details
                height="44"
                outlined validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0 base"
                color="#544B99"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                hide-details
                height="44"
                dense
                outlined validate-on-blur
                class="rounded-r-lg rounded-l-0 base"
                append-icon="mdi-chevron-down"
                color="#544B99"
                background-color="#F8F4FE"
              />
            </div>
          </v-col>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
        <v-divider/>
        <v-row class="mt-4">
          <v-col>
            <div class="label">Description</div>
            <v-textarea
              v-model="billingInfo.companyName"
              label="Enter description"
              hide-details
              outlined validate-on-blur
              dense
              class="rounded-lg base"
              color="#544B99"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col>
            <div class="label">Upload contract document </div>
            <v-file-input
              v-model="files"
              placeholder="Upload your documents"
              label="Upload files..."
              multiple
              outlined
              prepend-inner-icon="mdi-paperclip"
              prepend-icon=""
              hide-details
              height="44"
              class="rounded-lg base"
              color="#544B99"
              background-color="#F8F4FE"
            >
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unit_enums: ['kg', 't', 'sm', 'm'],
      currency_enums: ['USD', 'UZS', 'RUB'],
      files: [],
      billingInfo: {
        companyName: '',
        quotes: '',
        contractDate: '',
        contractNumber: '',
        contractExpireDate: '',
        priceQuote: {
          amount: '',
          currency: 'USD'
        },
        measurementUnit: 'sm',
        discountPercent: ''
      },
    }
  }
}
</script>

<style lang="scss" >

</style>
