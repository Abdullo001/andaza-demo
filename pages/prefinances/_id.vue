<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>Add prefinance</div>
        <v-spacer/>
        <div>
          <v-btn outlined class="text-capitalize rounded-lg border-grey">
            <v-img src="/clear.svg" max-width="16" class="mr-2"/>
            clear
          </v-btn>
          <v-btn outlined class="text-capitalize rounded-lg ml-4">
            <v-img src="/edit.svg" max-width="16" class="mr-2"/>
            edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Prefinance number"
              placeholder="Enter prefinance number"
              v-model="addPreFinances.preFinanceNumber"
              disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-combobox
              v-model="addPreFinances.modelNumber"
              :items="modelNames"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Model number"
              placeholder="Enter model number"
              append-icon="mdi-chevron-down"
              @keyup="getModalData"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Model name"
              placeholder="Model name"
              v-model="addPreFinances.modelNames" disabled
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addPreFinances.partner.name"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense disabled
              label="Partner"
              placeholder="Partner name or phone"
              append-icon=""
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-select
              v-model="addPreFinances.primaryCurrency"
              :items="currency_enums"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Primary Currency"
              append-icon="mdi-chevron-down"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-select
              v-model="addPreFinances.secondaryCurrency"
              :items="currency_enums"
              filled dense
              class="rounded-lg"
              color="#7631FF"
              label="Secondary Currency"
              append-icon="mdi-chevron-down"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-select
              v-model="addPreFinances.tertiaryCurrency"
              :items="currency_enums"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Tertiary Currency"
              append-icon="mdi-chevron-down"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="text-body-1 font-weight-medium">Permission</div>
            <v-chip
              color="#10BF41"
              class="text-capitalize px-4 mt-3 font-weight-bold"
              dark>
              edit
            </v-chip>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addPreFinances.primaryRate"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Primary Rare"
              placeholder="0"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addPreFinances.secondaryRate"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Secondary Rate"
              placeholder="0"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="addPreFinances.tertiaryRate"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Tertiary Rate"
              placeholder="0"
            />
          </v-col>

          <v-row class="ma-0">
            <v-col cols="12" lg="6" md="6">
              <v-textarea
                v-model="addPreFinances.description"
                filled
                class="rounded-lg"
                color="#7631FF"
                dense
                label="Description"
                rows="4"
                placeholder="Enter description"
              />
            </v-col>
            <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap">
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <v-text-field
                  v-model="addPreFinances.owner"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Owner"
                  placeholder="Enter Owner"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="addPreFinances.createdTime"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Created time"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  disabled
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <v-text-field
                  v-model="addPreFinances.modifiedPerson"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Modified person"
                  placeholder="Enter Modified person"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="addPreFinances.updatedTime"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Updated time"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  disabled
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </v-col>
            </v-col>
          </v-row>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6">
        <v-spacer/>
        <v-btn
          color="#7631FF"
          dark class="text-capitalize rounded-lg font-weight-bold"
          style="min-width: 130px;"
          @click="createNewPreFinance"
        >save
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--    TODO: Photo of Models -->
    <v-row>
      <v-col cols="12" lg="5" class="mb-4">
        <v-card class="mt-4 rounded-lg" elevation="0" height="100%">
          <v-card-title>Photos of models</v-card-title>
          <v-divider/>
          <v-card-text class="mt-4">
            <v-row>
              <v-col cols="12" lg="6" md="6" v-for="(item, idx) in 4" :key="`img_${idx}`">
                <div class="default-data" v-ripple>
                  <div class="d-flex justify-center flex-column align-center h-full">
                    <v-img
                      src="/default-image.svg"
                      max-width="56"
                      max-height="56"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="7">
        <v-card class="mt-4 rounded-lg" elevation="0">
          <v-card-title>
            Calculations
            <v-spacer/>
            <v-btn outlined class="text-capitalize rounded-lg">
              <v-img src="/clear.svg" max-width="16" class="mr-2"/>
              clear
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="calculation"
              :items-per-page="50"
              hide-default-footer
            >
              <template #item.editable="{item}">
                <v-text-field
                  solo
                  v-model="item.editable"
                  hide-details
                  flat
                  :background-color="!item.status?'#F8F4FE':'transparent'"
                  :disabled="item.status"
                />
              </template>
              <template #item.firstCurrency="{item}">
                <v-text-field
                  solo
                  v-model="item.firstCurrency"
                  hide-details
                  flat
                  :background-color="!item.usd_disabled?'#F8F4FE':'transparent'"
                  :disabled="item.usd_disabled"
                />
              </template>
            </v-data-table>
          </v-card-text>
          <v-divider/>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-4 rounded-lg" elevation="0">
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            class="text-capitalize"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-data-table
              :headers="detailsHeaders"
              :items="allDetails"
            >
            </v-data-table>
          </v-tab-item>
          <v-tab-item>
            <v-data-table
              :headers="documentsHeaders"
              :items="allDocuments"
              hide-default-footer
            >
              <template #top>
                <v-toolbar elevation="0">
                  <v-toolbar-title class="d-flex justify-space-between w-full">
                    <div class="text-h6">Documents</div>
                    <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark>Upload document</v-btn>
                  </v-toolbar-title>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider/>
      <v-card-actions class="mt-4 mb-6">
        <v-spacer/>
        <v-btn outlined class="text-capitalize rounded-lg" width="130">
          <v-img src="/clear.svg" max-width="16" class="mr-2"/>
          clear
        </v-btn>
        <v-btn
          color="#7631FF"
          class="rounded-lg text-capitalize"
          dark
          width="130"
        >create
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      // modelNames: ['One', 'Two', 'Abbos', 'Textyle'],
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Prefinances',
          disabled: false,
          to: '/prefinances',
          icon: true
        },
        {
          text: 'Details',
          disabled: true,
          to: '/user-management/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
      name: '',
      addPreFinances: {
        modelNames: '',
        preFinanceNumber: '',
        modelNumber: '',
        partnerId: '',
        partner: {name: '', id: ''},
        primaryCurrency: '',
        tertiaryCurrency: '',
        secondaryCurrency: '',
        description: '',
        owner: '',
        createdTime: '',
        modifiedPerson: '',
        updatedTime: '',
      },
      headers: [
        {text: 'Name', align: 'start', sortable: false, value: 'name'},
        {text: '', value: 'editable', width: 100},
        {text: 'USD', value: 'firstCurrency', width: 100},
        {text: 'UZS', value: 'secondCurrency'},
        {text: 'RUB', value: 'tertiaryCurrency'},
      ],
      detailsHeaders: [
        {
          text: 'Expense group',
          align: 'start',
          sortable: false,
          value: 'expenseGroup',
        },
        {text: 'Expense', value: 'expense', width: 100},
        {text: 'Expense type description', value: 'expenseType'},
        {text: 'Quantity', value: 'quantity'},
        {text: 'Measurement unit', value: 'measurementUnit'},
        {text: 'Currency', value: 'currency'},
        {text: 'Price per unit', value: 'priceUnit'},
        {text: 'Price', value: 'price'},
      ],
      documentsHeaders: [
        {text: 'Type', align: 'start', sortable: false, value: 'type'},
        {text: 'Document name', value: 'documentName'},
        {text: 'Owner', value: 'owner'},
        {text: 'Date', value: 'Date'},
        {text: 'Actions', value: 'actions'},
      ],
      calculation: [
        {
          name: 'Cost subtotal',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true
        },
        {
          name: 'Over-production %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true
        },
        {
          name: 'Lost resource %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true
        },
        {
          name: 'General expenses %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true
        },
        {
          name: 'Extra expenses %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true
        },
        {
          name: 'Target profit %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true
        },
        {
          name: 'Estimated price',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true
        },
        {
          name: 'Given price',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: false
        },
        {
          name: 'Discount %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true
        },
        {
          name: 'Price with discount',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true
        },
        {
          name: 'Actual profit %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true
        },
        {
          name: 'Actual profit amount',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true
        },
      ],
      tab: null,
      items: ['Details', 'Documents'],
      allDetails: [
        {
          expenseGroup: 'Material',
          expense: 'Trikotaj',
          expenseType: 'Black thin material',
          quantity: '0.7',
          measurementUnit: 'kg',
          currency: 'USD',
          priceUnit: '3.00',
          price: '2.10'
        }
      ],
      allDocuments: [{type: 'word'}],
      model_first: null,
      model_second: null,
      model_third: null,
      model_fourth: null,
      model_photo: {
        first: null,
        second: null,
        third: null,
        fourth: null,
      },
      currency_enums: ['USD', 'UZS', 'RUB']
    }
  },
  computed: {
    ...mapGetters({
      modelNames: 'preFinance/modelNames',
      modelData: 'preFinance/modelData'
    }),
  },
  methods: {
    ...mapActions({
      createPreFinance: 'preFinance/createPreFinance',
      getModelName: 'preFinance/getModelName'
    }),
    async getModalData() {
      const val = this.addPreFinances.modelNumber;
      if (val !== null || val?.length > 1) {
       await this.getModelName(val)
      }
      const {modelNumber, name, partner, id } = this.modelData[0];

      this.addPreFinances.partner = partner;
      this.addPreFinances.preFinanceNumber = id;
      this.addPreFinances.modelNames = name;
      this.addPreFinances.modelNumber = modelNumber;

    },
    createNewPreFinance() {
      this.createPreFinance(this.addPreFinances)
    },
  }
}
</script>

<style lang="scss" src="assets/abstracts/_preficances.scss" scoped/>
