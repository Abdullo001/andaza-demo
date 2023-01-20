<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="d-flex align-center justify-space-between w-full">
        <div>Billing info</div>
        <v-btn outlined class="text-capitalize rounded-lg border-grey">
          <v-img src="/clear.svg" max-width="16" class="mr-2"/>
          clear
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="mb-2 text-body-1">Company name</div>
            <v-text-field
              v-model="billingInfo.companyName"
              label="ex. John’s company"
              single-line
              outlined validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
            <div class="mb-2 text-body-1">Contract expire date</div>
            <el-date-picker
              v-model="billingInfo.contractExpireDate"
              type="datetime"
              placeholder="dd.MM.yyyy HH:mm:ss"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%;"
              class="picker-color"
            >
            </el-date-picker>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Quotes / Number of users</div>
            <v-text-field
              v-model="billingInfo.quotes"
              label="0"
              :rules="[formRules.onlyNumber]"
              single-line
              outlined validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
              <div class="mb-2 text-body-1">Price per quote</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                single-line
                outlined validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                single-line dense
                outlined validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
                background-color="#F8F4FE"
              />
            </div>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Contract date</div>
            <el-date-picker
              v-model="billingInfo.contractDate"
              type="datetime"
              placeholder="dd.MM.yyyy HH:mm:ss"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
              style="min-width: 100%;"
              class="picker-color"
            >
            </el-date-picker>
            <div class="mb-2 text-body-1 mt-6">Measurement unit</div>
            <v-select
              :items="unit_enums"
              v-model="billingInfo.measurementUnit"
              single-line dense
              outlined validate-on-blur
              class="rounded-lg"
              append-icon="mdi-chevron-down"
              color="#7631FF"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Contract number</div>
            <v-text-field
              v-model="billingInfo.contractNumber"
              label="0"
              single-line
              outlined validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
            <div class="mb-2 text-body-1">Discount percent</div>
            <v-text-field
              v-model="billingInfo.discountPercent"
              label="0"
              single-line
              outlined validate-on-blur
              dense
              class="rounded-lg"
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
        <v-row class="mt-4">
          <v-col>
            <div class="mb-2 text-body-1">Mentorship price</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                single-line
                outlined validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                single-line dense
                outlined validate-on-blur
                class="rounded-r-lg rounded-l-0"
                append-icon="mdi-chevron-down"
                color="#7631FF"
                background-color="#F8F4FE"
              />
            </div>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Support price</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="billingInfo.priceQuote.amount"
                label="0.00"
                single-line
                outlined validate-on-blur
                dense
                class="rounded-l-lg rounded-r-0"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-select
                :items="currency_enums"
                v-model="billingInfo.priceQuote.currency"
                style="max-width: 100px;"
                single-line dense
                outlined validate-on-blur
                class="rounded-r-lg rounded-l-0"
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
            <div class="mb-2 text-body-1">Description</div>
            <v-textarea
              v-model="billingInfo.companyName"
              label="Enter description"
              single-line
              outlined validate-on-blur
              dense
              class="rounded-lg"
              color="#7631FF"
              background-color="#F8F4FE"
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">Upload contract document </div>
            <v-file-input
              v-model="files"
              placeholder="Upload your documents"
              label="Upload files..."
              multiple
              outlined
              prepend-inner-icon="mdi-paperclip"
              prepend-icon=""
              class="rounded-lg"
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
      pickerOptions: {
        shortcuts: [
          {
            text: "Cегодня",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Вчера",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "Неделя",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    }
  }
}
</script>

<style lang="scss" >

</style>
