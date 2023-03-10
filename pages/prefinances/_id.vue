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
              :items="modelData"
              :search-input.sync="modelSearch"
              item-text="modelNumber"
              item-value="modelNumber"
              filled
              class="rounded-lg"
              :return-object="true"
              color="#7631FF"
              dense
              label="Model number"
              placeholder="Enter model number"
              append-icon="mdi-chevron-down"
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
              v-model="addPreFinances.partner"
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
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-4 rounded-lg" elevation="0">
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#7631FF"
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
              :items="detailsList"
              hide-default-footer
            >
              <template #top>
                <v-divider/>
                <v-toolbar elevation="0">
                  <v-toolbar-title class="d-flex justify-space-between w-full align-center">
                    <div class="text-h6">Details</div>
                    <v-btn
                      class="text-capitalize font-weight-bold rounded-lg"
                      color="#7631FF"
                      min-width="170"
                      :dark="!!preFinanceId"
                      @click="new_details = true"
                      :disabled="!preFinanceId"
                    >
                      <v-icon class="mr-2">mdi-plus</v-icon>
                      Details
                    </v-btn>
                  </v-toolbar-title>
                </v-toolbar>
              </template>
              <template #item.delete="{item, index}">
                <v-tooltip top class="pointer" v-if="Object.keys(item).length > 2">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      @click="deleteRow(item, index)"
                    >
                      <v-img src="/delete.svg" max-width="29"/>
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </template>
              <template #footer>
                <v-divider/>
                <div class="d-flex justify-end mt-4 mr-2 text-body-1">
                  Total price: {{ totalPrice }} USD
                </div>
              </template>

            </v-data-table>
          </v-tab-item>
          <!--          TODO:  Documents tabs table-->
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
                  </v-toolbar-title>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>

    <!--    TODO: Photo of Models -->
    <v-row>
      <v-col cols="12" lg="5" class="mb-4">
        <v-card class="mt-4 rounded-lg" elevation="0" height="100%">
          <v-card-title>Photos of models</v-card-title>
          <v-divider/>
          <v-card-text class="mt-4">
            <v-row>
              <v-col
                cols="12" lg="6" md="6"
                v-show="!modelImages.length"
                v-for="(item, idx) in 4" :key="`img_${idx}`"
              >
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

              <v-col
                cols="12" lg="6" md="6"
                v-for="(link, idx) in modelImages"
                :key="`images_${idx}`"
              >
                <div class="rounded-lg model-images overflow-hidden">
                  <v-img :src="link.filePath"/>
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
                  solo flat
                  v-model="item.editable"
                  placeholder="0.0"
                  hide-details
                  :background-color="!item.status?'#F8F4FE':'transparent'"
                  :disabled="item.status"
                  :readonly="!(Object.keys(detailsList[0]).length > 3)"
                  class="pa-0 ma-0"
                />
              </template>
              <template #item.firstCurrency="{item}">
                <v-text-field
                  solo
                  v-model="item.firstCurrency"
                  hide-details
                  placeholder="0.0"
                  flat
                  :background-color="!item.usd_disabled && !item.readonly?'#F8F4FE':'transparent'"
                  :disabled="item.usd_disabled"
                  class="pa-0 ma-0"
                  :readonly="!(Object.keys(detailsList[0]).length > 3) || item.readonly"
                />
              </template>
            </v-data-table>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="#7631FF"
              class="text-capitalize rounded-lg"
              dark min-width="130"
              @click="saveCalculation"
            >
              create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog max-width="1000" v-model="new_details">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center w-full">
          <div class="text-capitalize">New details</div>
          <v-btn icon color="#7631FF" @click="new_details = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form v-model="details_form" ref="details_form">
            <v-row>
              <v-col cols="12" lg="4">
                <v-combobox
                  label="Expense group"
                  filled dense
                  append-icon="mdi-chevron-down"
                  :items="expenseGroup"
                  item-text="name"
                  item-value="id"
                  v-model="details.expenseGroup"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-select
                  label="Expense"
                  append-icon="mdi-chevron-down"
                  filled dense
                  :items="expenseList"
                  v-model="details.expense"
                  validate-on-blur
                  :rules="[formRules.required]"
                  :disabled="expense_status"
                  item-value="id"
                  item-text="name"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-text-field
                  label="Quantity"
                  filled dense
                  v-model="details.quantity"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-select
                  label="Measurement unit"
                  append-icon="mdi-chevron-down"
                  filled dense
                  :items="measurementUnitList"
                  v-model="details.measurementUnit"
                  validate-on-blur
                  :rules="[formRules.required]"
                  item-text="name"
                  item-value="id"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="4">
                <v-text-field
                  label="Price per unit"
                  filled dense
                  v-model="details.pricePerUnit"
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="py-4">
          <v-spacer/>
          <v-btn
            color="amber"
            text
            class="text-capitalize font-weight-bold"
            @click="new_details = false"
          >cancel
          </v-btn>
          <v-btn
            color="#7631FF"
            text
            class="text-capitalize font-weight-bold"
            @click="createDetailsNew"
          >save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DefaultLayout from "@/layouts/default.vue";

export default {
  name: 'CreatePreFinancePage',
  components: {DefaultLayout},
  data() {
    return {
      hide_calc: true,
      new_details: false,
      details_form: true,
      expenseGroupLists: [],
      details: {
        expenseGroup: '',
        expense: '',
        quantity: '',
        measurementUnit: '',
        pricePerUnit: '',
      },
      calculationVal: {
        discountPercent: "",
        extraExpensePercent: "",
        generalExpensePercent: "",
        givenPrice: "",
        givenPriceCurrency: "USD",
        lossPercent: "",
        overProductionPercent: "",
        preFinanceId: 0,
        targetProfitPercent: "",
      },
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
        id: '',
        modelName: '',
        preFinanceNumber: '',
        modelNumber: '',
        partnerId: '',
        partner: '',
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
        {text: 'Name', value: 'name', align: 'start', sortable: false},
        {text: '', value: 'editable', sortable: false, width: 110},
        {text: 'USD', value: 'firstCurrency', sortable: false, width: 110},
        {text: 'UZS', value: 'secondCurrency', sortable: false, width: 110},
        {text: 'RUB', value: 'tertiaryCurrency', sortable: false, width: 110},
      ],
      detailsHeaders: [
        {text: 'Expense group', align: 'start', sortable: false, value: 'expenseGroup'},
        {text: 'Expense', value: 'expense'},
        {text: 'Expense type description', value: 'expenseGroupDescription'},
        {text: 'Quantity', value: 'quantity'},
        {text: 'Measurement unit', value: 'measurementUnit'},
        {text: 'Currency', value: 'currency'},
        {text: 'Price per unit', value: 'pricePerUnit'},
        {text: 'Price', value: 'price'},
        {text: '', value: 'delete', sortable: false},
      ],
      documentsHeaders: [
        {text: 'Type', align: 'start', sortable: false, value: 'extension'},
        {text: 'Document name', value: 'title'},
        {text: 'Owner', value: 'createdBy'},
        {text: 'Date', value: 'createdAt'},
        {text: 'Actions', value: 'actions'},
      ],
      calculation: [
        {
          name: 'Cost subtotal',
          editable: '-',
          firstCurrency: 0,
          secondCurrency: 0,
          tertiaryCurrency: 0,
          status: true,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Overproduction %',
          editable: '',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Lost resource %',
          editable: '',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'General expenses %',
          editable: '',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Extra expenses %',
          editable: '',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Cost price',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Target profit %',
          editable: '',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Client target price',
          editable: '-',
          firstCurrency: '',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: false,
          readonly: false
        },
        {
          name: 'Given price',
          editable: '-',
          firstCurrency: '',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: false,
          readonly: true
        },
        {
          name: 'Discount %',
          editable: '',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: false,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Price with discount',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Actual profit %',
          editable: '',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true,
          readonly: false
        },
        {
          name: 'Actual profit amount',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0',
          status: true,
          usd_disabled: true,
          readonly: false
        },
      ],
      tab: null,
      items: ['Details', 'Documents'],
      count: 1,
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
      currency_enums: ['USD', 'UZS', 'RUB'],
      expense_status: true,
      modelSearch: ''
    }
  },
  computed: {
    ...mapGetters({
      modelNames: 'preFinance/modelNames',
      modelData: 'preFinance/modelData',
      preFinanceId: 'preFinance/preFinanceId',
      expenseGroup: 'preFinance/expenseGroup',
      expenseList: 'preFinance/expenseList',
      measurementUnitList: 'preFinance/measurementUnit',
      detailsList: 'preFinance/detailsList',
      totalPrice: 'preFinance/totalPrice',
      modelImages: 'modelPhoto/modelImages',
      documentsList: 'documents/documentsList'
    }),
  },
  watch: {
    documentsList(val) {
      this.allDocuments = [...val]
    },
    async modelData(val) {
      if (typeof val[0]?.id === 'number') {
        const id = val[0]?.id;
        await this.getImages(id);
        await this.getDocuments({modelId: id});
      }
    },
    "addPreFinances.modelNumber": function (elem) {
      if (elem !== null || elem.length > 1) {
        this.getModelName(elem)
      }
      const {modelNumber, name, partner, id} = this.addPreFinances.modelNumber;
      if (Object.keys(this.addPreFinances.modelNumber).length > 3 && modelNumber || name || partner !== undefined) {
        this.addPreFinances.partner = partner;
        this.addPreFinances.preFinanceNumber = id;
        this.addPreFinances.modelNames = name;
        this.addPreFinances.modelNumber = modelNumber;
      }
    },
    "details.expenseGroup": {
      async handler(val) {
        Object.keys(val).length > 1 ? this.expense_status = false : this.expense_status = true
        await this.getExpenseList(val.id)
      }, deep: true
    },
    totalPrice(val) {
      let data = this.calculation[0];
      data.firstCurrency = +val.toFixed(2);
      data.secondCurrency = (+val * +this.addPreFinances.secondaryRate).toFixed(2);
      data.tertiaryCurrency = (+val * +this.addPreFinances.tertiaryRate).toFixed(2);
    },
    calculation: {
      handler(val) {
        const overproduction = val[1].editable;
        val[1].firstCurrency = (this.totalPrice / 100 * overproduction).toFixed(2)
        val[1].secondCurrency = (this.calculation[0].secondCurrency / 100 * overproduction).toFixed(2)
        val[1].tertiaryCurrency = (this.calculation[0].tertiaryCurrency / 100 * overproduction).toFixed(2)

        const lostResource = val[2].editable;
        val[2].firstCurrency = (this.totalPrice / 100 * lostResource).toFixed(2)
        val[2].secondCurrency = (this.calculation[0].secondCurrency / 100 * lostResource).toFixed(2)
        val[2].tertiaryCurrency = (this.calculation[0].tertiaryCurrency / 100 * lostResource).toFixed(2)

        const generalExpenses = val[3].editable;
        val[3].firstCurrency = (this.totalPrice / 100 * generalExpenses).toFixed(2)
        val[3].secondCurrency = (this.calculation[0].secondCurrency / 100 * generalExpenses).toFixed(2)
        val[3].tertiaryCurrency = (this.calculation[0].tertiaryCurrency / 100 * generalExpenses).toFixed(2)

        const extraExpenses = val[4].editable;
        val[4].firstCurrency = (this.totalPrice / 100 * extraExpenses).toFixed(2)
        val[4].secondCurrency = (this.calculation[0].secondCurrency / 100 * extraExpenses).toFixed(2)
        val[4].tertiaryCurrency = (this.calculation[0].tertiaryCurrency / 100 * extraExpenses).toFixed(2)

        val[5].firstCurrency =
          (+val[0].firstCurrency + +val[1].firstCurrency +
            +val[2].firstCurrency + +val[3].firstCurrency +
            +val[4].firstCurrency).toFixed(2)
        console.log(val[0].firstCurrency + ' = ' + val[1].firstCurrency)
        val[5].secondCurrency =
          (+val[0].secondCurrency + +val[1].secondCurrency +
            +val[2].secondCurrency + +val[3].secondCurrency +
            +val[4].secondCurrency).toFixed(2)

        val[5].tertiaryCurrency =
          (+val[0].tertiaryCurrency + +val[1].tertiaryCurrency +
            +val[2].tertiaryCurrency + +val[3].tertiaryCurrency +
            +val[4].tertiaryCurrency).toFixed(2)

        const targetProfit = val[6].editable;
        val[6].firstCurrency = (val[5].firstCurrency / 100 * targetProfit).toFixed(2);
        val[6].secondCurrency = (val[6].firstCurrency * this.addPreFinances.secondaryRate).toFixed(2);
        val[6].tertiaryCurrency = (val[6].firstCurrency * this.addPreFinances.tertiaryRate).toFixed(2);

        val[7].secondCurrency = (val[7].firstCurrency * +this.addPreFinances.secondaryRate).toFixed(2);
        val[7].tertiaryCurrency = (val[7].firstCurrency * +this.addPreFinances.tertiaryRate).toFixed(2)

        val[8].firstCurrency = (+val[5].firstCurrency + +val[6].firstCurrency).toFixed(2);
        val[8].secondCurrency = (val[8].firstCurrency * +this.addPreFinances.secondaryRate).toFixed(2);
        val[8].tertiaryCurrency = (val[8].firstCurrency * +this.addPreFinances.tertiaryRate).toFixed(2);

        const discount = val[9].editable;
        val[9].firstCurrency = (val[8].firstCurrency / 100 * discount).toFixed(2);
        val[9].secondCurrency = (val[9].firstCurrency * +this.addPreFinances.secondaryRate).toFixed(2);
        val[9].tertiaryCurrency = (val[9].firstCurrency * +this.addPreFinances.tertiaryRate).toFixed(2);

        val[10].firstCurrency = (val[8].firstCurrency - val[9].firstCurrency).toFixed(2);
        val[10].secondCurrency = (val[8].secondCurrency - val[9].secondCurrency).toFixed(2);
        val[10].tertiaryCurrency = (val[8].tertiaryCurrency - val[9].tertiaryCurrency).toFixed(2);

        val[12].firstCurrency = (val[10].firstCurrency - val[5].firstCurrency).toFixed(2);
        val[12].secondCurrency = (val[12].firstCurrency * +this.addPreFinances.secondaryRate).toFixed(2)
        val[12].tertiaryCurrency = (val[12].firstCurrency * +this.addPreFinances.tertiaryRate).toFixed(2)

        val[11].editable = ((val[12].firstCurrency / val[5].firstCurrency) * 100).toFixed(2)
      }, deep: true
    }
  },
  methods: {
    ...mapActions({
      createPreFinance: 'preFinance/createPreFinance',
      getModelName: 'preFinance/getModelName',
      saveCalculations: 'preFinance/saveCalculation',
      getExpenseGroup: 'preFinance/getExpenseGroup',
      getExpenseList: 'preFinance/getExpenseList',
      getMeasurementUnit: 'preFinance/getMeasurementUnit',
      createDetails: 'preFinance/createDetails',
      getAllDetails: 'preFinance/getAllDetails',
      getImages: 'modelPhoto/getImages',
      getDocuments: 'documents/getDocuments'
    }),
    saveCalculation() {
      const calcVal = this.calculation.filter(el => el.status === false || el.usd_disabled === false);
      this.saveCalculations({
        data: calcVal,
        id: this.preFinanceId,
        currency: 2
      })
    },

    async createDetailsNew() {
      const data = {
        quantity: this.details.quantity,
        pricePerUnit: this.details.pricePerUnit,
        measurementId: this.details.measurementUnit,
        expenseId: this.details.expense,
        preFinanceId: this.preFinanceId
      }
      await this.createDetails(data);
      this.new_details = false;

      this.details.quantity = ""
      this.details.pricePerUnit = ""
      this.details.measurementUnit = ""
      this.details.expense = ""
      this.details.expenseGroup = ""
    },
    async createNewPreFinance() {
      await this.createPreFinance(this.addPreFinances);
    },

    deleteRow(item, index) {
    }
  },
  mounted() {
    this.getExpenseGroup();
    this.getMeasurementUnit();
  }
}
</script>

<style lang="scss" src="assets/abstracts/_prefinances.scss" scoped>

</style>
