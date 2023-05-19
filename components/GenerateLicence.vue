<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="d-flex align-center justify-space-between w-full">
        <div>Generate licence</div>
        <v-btn outlined class="text-capitalize rounded-lg border-grey">
          <v-img src="/clear.svg" max-width="16" class="mr-2"/>
          clear
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="pb-4">
          <v-col>
            <div class="label">Licence key</div>
            <div class="d-flex">
              <v-text-field
                v-model="licenceKey"
                placeholder="Generate key"
                outlined
                validate-on-blur
                dense
                hide-details
                height="44"
                class="rounded-lg mr-2 base"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-btn
               color="#C6ADF8"
               class="rounded-lg text-capitalize font-weight-bold"
               min-width="180"
               elevation="0"
               style="color: #7631FF;"
              >
                Regenerate
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row class="mt-4 pb-4">
          <v-col cols="12" lg="3" md="3">
            <div class="label">Company name</div>
            <v-text-field
              v-model="billingInfo.companyName"
              label="ex. John’s company"
              outlined validate-on-blur
              hide-details
              height="44"
              class="rounded-lg base"
              dense
              color="#7631FF"
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
              style="min-width: 100%; height: 44px"
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
              outlined validate-on-blur
              hide-details
              height="44"
              class="rounded-lg base"
              dense
              color="#7631FF"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Price per quote</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                outlined validate-on-blur
                hide-details
                height="44"
                dense
                class="rounded-lg base rounded-l-lg rounded-r-0"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                dense
                outlined validate-on-blur
                class="rounded-r-lg rounded-l-0 rounded-lg base"
                hide-details
                height="44"
                append-icon="mdi-chevron-down"
                color="#7631FF"
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
              dense
              outlined validate-on-blur
              hide-details
              height="44"
              class="rounded-lg base"
              append-icon="mdi-chevron-down"
              color="#7631FF"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Contract number</div>
            <v-text-field
              v-model="billingInfo.contractNumber"
              label="0"
              outlined validate-on-blur
              hide-details
              height="44"
              class="rounded-lg base"
              dense
              color="#7631FF"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="label">Discount percent</div>
            <v-text-field
              v-model="billingInfo.discountPercent"
              label="0"
              outlined validate-on-blur
              hide-details
              height="44"
              class="rounded-lg base"
              dense
              color="#7631FF"
              background-color="#F8F4FE"
            >
              <template #append>
                <v-img src="/precent.svg"/>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row class="mt-4 pb-4">
          <v-col>
            <div class="label">Mentorship price</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                outlined validate-on-blur
                hide-details
                height="44"
                dense
                class="rounded-l-lg rounded-r-0 rounded-lg base"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                dense
                outlined validate-on-blur
                hide-details
                height="44"
                class="rounded-r-lg rounded-l-0 rounded-lg base"
                append-icon="mdi-chevron-down"
                color="#7631FF"
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
                outlined validate-on-blur
                hide-details
                height="44"
                dense
                class="rounded-l-lg rounded-r-0 rounded-lg base"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                dense
                outlined validate-on-blur
                hide-details
                height="44"
                class="rounded-r-lg rounded-l-0 rounded-lg base"
                append-icon="mdi-chevron-down"
                color="#7631FF"
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
              placeholder="Enter description"
              outlined validate-on-blur
              hide-details
              class="rounded-lg base"
              dense
              color="#7631FF"
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
              hide-details
              height="44"
              class="rounded-lg base"
              prepend-icon=""
              color="#7631FF"
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
      licenceKey: 'ABCSD-FDSFV-ASDAAD8-FGDDFG-DSFF1',
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
  },
}
</script>

<style lang="scss" scoped>

</style>
