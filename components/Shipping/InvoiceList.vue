<template >
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title
        class="d-flex w-full align-center justify-space-between"
      >
        <div>{{$t('shipping.id.invoice')}}</div>
        <v-btn
          class="rounded-lg text-capitalize mr-2 colorSizeBtn"
          outlined
          @click="editBtn"
          color="var(--text-icon-600, #777C85)"
        >
          {{ $t("edit") }}
        </v-btn>
      </v-toolbar-title>
    </v-toolbar>
    <v-data-table
      class="mt-4 rounded-lg table pt-4"
      :headers="headers"
      :items="invoiceListItem"
      hide-default-footer
      style="border: 1px solid #E9EAEB"
    >

      <template #item.actions="{item}">
        <v-tooltip
          top
          color="green"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="green"
              @click="editInvoiceItem(item)"
              :disabled="editable"
            >
              <v-img src="/edit-active.svg" max-width="22" />
            </v-btn>
          </template>
          <span class="text-capitalize">Edit invoice item</span>
        </v-tooltip>
      </template>
      <template v-slot:body.append>
        <tr class="font-weight-bold text-body-1 text-center">
          <td
            colspan="6"
          >
              {{ $t('workingProcess.working.total')}}
          </td>
            <td>
              {{ sumTotal }}
            </td>
            <td></td>
            <td ></td>
            <td>{{shippingInvoiceItemList.totalAmount}}</td>
            <td></td>
            <td></td>
        </tr>
      </template>
    </v-data-table>
    <div class=" py-4 text-capitalize text-end px-6 text-h5" style="color:black">
      <span class="font-weight-bold">Total: </span>{{ shippingInvoiceItemList.totalAmountInWords }}
    </div>
    <v-dialog v-model="invoiceItem_dialog" width="400">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit invoice item</div>
          <v-btn icon color="#544B99" @click="invoiceItem_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="invoiceItem_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t('sidebar.measurementUnit') }}</div>
                <v-select
                  :items="measurementUnitList"
                  item-text="name"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base" dense
                  validate-on-blur
                  placeholder="Select M/U"
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                  v-model="invoiceItem.measurementUnitId"
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" lg="6" >
                <div class="label">HS code</div>
                <v-text-field
                  v-model="invoiceItem.hsCode"
                  placeholder="Enter HS code"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="invoiceItem_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="130"
            @click="save"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="8">
        <v-form
          lazy-validation
        >
          <v-col cols="12" lg="12" md="3" sm="6">
            <div class="label">{{ $t('shipping.invoice.deliveryTerms') }} </div>
            <div class="d-flex align-center">
              <v-select
                style="max-width: 100px"
                dense
                :disabled="editable"
                :items="delivery_terms"
                v-model="invoiceList.deliveryTerms"
                outlined
                hide-details
                height="44"
                class="rounded-lg base rounded-l-lg rounded-r-0 mb-4"
                validate-on-blur
                append-icon="mdi-chevron-down"
                color="#544B99"
              />
              <v-text-field
                :disabled="editable"
                height="44"
                class="rounded-lg base rounded-r-lg rounded-l-0 mb-4"
                color="#544B99"
                outlined
                v-model="invoiceList.deliveryTermsDescription"
                hide-details
                dense
              />
            </div>
          </v-col>
          <v-col cols="12" lg="12" md="3" sm="6">
            <div class="label">{{ $t('shipping.invoice.paymentTerms') }}</div>
            <v-text-field
              :disabled="editable"
              class="rounded-lg base mb-4"
              color="#544B99"
              dense
              v-model="invoiceList.paymentTerms"
              height="44"
              hide-details
              outlined
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" lg="12" md="3" sm="6">
            <div class="label">{{ $t('shipping.invoice.typeOfPackaging') }}</div>
            <v-text-field
              :disabled="editable"
              class="rounded-lg base mb-4"
              color="#544B99"
              v-model="invoiceList.packagingType"
              dense
              height="44"
              hide-details
              outlined
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" lg="12" md="3" sm="6">
            <div class="label">{{ $t('shipping.invoice.letterOfCreditNo') }}</div>
            <v-text-field
              :disabled="editable"
              class="rounded-lg base mb-4"
              color="#544B99"
              v-model="invoiceList.creditNumber"
              dense
              height="44"
              hide-details
              outlined
              validate-on-blur
            />
          </v-col>
        </v-form>
      </v-col>
      <v-col cols="4">
        <v-form
          lazy-validation
        >
          <v-col cols="12" lg="12" sm="6" md="3" >
            <div class="label">{{ $t('shipping.invoice.totalNetWeight') }}</div>
            <v-text-field
              class="rounded-lg mb-4"
              background-color="#EDEDED"
              dense
              :value="shippingInvoiceList.totalNetWeight"
              height="44"
              hide-details
              disabled
              outlined
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" lg="12" sm="6" md="3" >
            <div class="label">{{ $t('shipping.invoice.totalGrossWeight') }}</div>
            <v-text-field
              class="rounded-lg mb-4"
              dense
              height="44"
              :value="shippingInvoiceList.totalGrossWeight"
              background-color="#EDEDED"
              hide-details
              disabled
              outlined
              validate-on-blur
            />
          </v-col>
          <v-col cols="12" lg="12" sm="6" md="3" >
            <div class="label">{{ $t('shipping.invoice.totalBoxPlacesQuantity') }}</div>
            <v-text-field
              class="rounded-lg mb-4"
              background-color="#EDEDED"
              dense
              height="44"
              :value="shippingInvoiceList.totalBoxQuantity"
              hide-details
              disabled
              outlined
              validate-on-blur
            />
          </v-col>
        </v-form>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col cols="7" lg="3">
          <div class="label ml-5 font-weight-bold">{{ $t('shipping.invoice.bankInformation') }}</div>
        </v-col>
        <v-col cols="7" lg="4">
          <v-combobox
            v-model="bankInfo"
            :items="bankDetailsList"
            :search-input.sync="bankInfoSearch"
            item-text="name"
            item-value="name"
            validate-on-blur
            outlined
            hide-details
            height="44"
            class="rounded-lg base  d-flex align-center justify-center mr-2"
            :return-object="true"
            dense
            placeholder="Bank name"
          >
            <template #append>
              <v-icon class="d-inline-block" color="#544B99">
                mdi-magnify
              </v-icon>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-form lazy-validation>
            <v-row>
              <v-col cols="8" sm="12" md="6" lg="4">
                <v-col cols="12" >
                  <div class="label">{{ $t('shipping.invoice.bankName') }}</div>
                  <v-text-field
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    height="70"
                    :disabled="editable"
                    v-model="invoiceList.bankName"
                    hide-details
                    outlined
                    :placeholder="$t('shipping.invoice.bankName')"
                    validate-on-blur
                  />
                </v-col>
                <v-row class="ml-1" >
                  <v-col cols="6">
                    <div class="label">{{$t('shipping.invoice.bankCode')}}</div>
                    <v-text-field
                      class="rounded-lg base mb-4"
                      color="#544B99"
                      dense
                      :disabled="editable"
                      v-model="invoiceList.bankCode"
                      height="44"
                      hide-details
                      outlined
                      :placeholder="$t('shipping.invoice.bankCode')"
                      validate-on-blur
                    />
                  </v-col>
                  <v-col cols="6">
                    <div class="label">{{$t('shipping.invoice.swift')}}</div>
                    <v-text-field
                      class="rounded-lg base mb-4"
                      color="#544B99"
                      dense
                      :disabled="editable"
                      v-model="invoiceList.swift"
                      height="44"
                      hide-details
                      outlined
                      :placeholder="$t('shipping.invoice.swift') "
                      validate-on-blur
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4" sm="12" md="6" lg="8">
                <v-col cols="12">
                  <div class="label">{{$t('shipping.invoice.bankAddress')}}</div>
                  <v-textarea
                    rows="1"
                    auto-grow
                    :disabled="editable"
                    v-model="invoiceList.bankAddress"
                    filled
                    height="170"
                    class="rounded-lg base mb-4"
                    :placeholder="$t('shipping.invoice.bankAddress')"
                    color="#544B99"
                    dense
                    outlined
                    hide-details
                    validate-on-blur
                  />
                </v-col>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="4">
          <div class="label pt-4" style="margin-left: 45px">{{ $t('shipping.invoice.bankAccountNumbers') }}</div>
          <v-form lazy-validation>
            <v-col class="d-flex align-center py-0" cols="12">
              <div class="label mr-1" style="color: #BEBEBE">USD</div>
              <v-text-field
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                :disabled="editable"
                v-model="invoiceList.accountNumberUSD"
                height="44"
                hide-details
                outlined
                :placeholder="$t('shipping.invoice.bankAccountNumberUSD')"
                validate-on-blur
              />
            </v-col>
            <v-col class="d-flex align-center py-0" cols="12">
              <div class="label mr-1" style="color: #BEBEBE">RUB</div>
              <v-text-field
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :disabled="editable"
                v-model="invoiceList.accountNumberRUB"
                :placeholder="$t('shipping.invoice.bankAccountNumberRUB')"
                validate-on-blur
              />
            </v-col>
            <v-col class="d-flex align-center pt-0" cols="12">
              <div class="label mr-1" style="color: #BEBEBE">UZS</div>
              <v-text-field
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :disabled="editable"
                v-model="invoiceList.accountNumberUZS"
                :placeholder="$t('shipping.invoice.bankAccountNumberUZS')"
                validate-on-blur
              />
            </v-col>
            <v-col class="d-flex align-center pt-0" cols="12">
              <div class="label mr-1" style="color: #BEBEBE">EUR</div>
              <v-text-field
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :disabled="editable"
                v-model="invoiceList.accountNumberEUR"
                :placeholder="$t('shipping.invoice.bankAccountNumberUZS')"
                validate-on-blur
              />
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex my-6 ">
      <v-spacer/>
      <v-btn
        class="text-capitalize rounded-lg font-weight-bold mr-4 py-1 px-6"
        color="#544B99"
        outlined
        height="44"
        width="190"
        @click="generatePdfInvoice"
      >
       {{$t('workingProcess.working.pdfDownload')}}
      </v-btn>
      <v-btn
        width="140"
        color="#544B99"
        dark
        height="44"
        elevation="0"
        class="text-capitalize rounded-lg font-weight-bold"
        @click="updateInvoice"
      >
        {{$t('userManagement.child.save')}}
      </v-btn>
    </div>
    <v-overlay v-model="isLoad" class="align-center justify-center">
      <v-progress-circular
        color="#544B99"
        indeterminate
        size="80"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      shippingId: null,
      invoiceItem_dialog: false,
      delivery_terms: ["FOB", "CIP", "EXW", "CPT", "FCA", "CIF"],
      invoiceItem_validate: true,
      invoiceItem: {
        measurementUnitId: "",
        hsCode: "",
      },
      headers:[
        {text: "No.", value: "totalItem", sortable: false, align: "start"},
        {text: this.$t("shipping.invoice.orderNo"),   value: "orderNumber"},
        {text: this.$t('shipping.model'),  value: "modelNumber"},
        {text: this.$t('shipping.brandName'),  value: "brandName"},
        {text: this.$t('prefinances.child.modelName'),  value: "modelName"},
        {text: this.$t('sidebar.composition'),  value: "composition"},
        {text: this.$t("shipping.quantityPcs"),  value: "total", align: "center"},
        {text: this.$t("readyWarehouse.readyGarments.mu"),sortable:false,  value: "measurementUnit"},
        {text: this.$t('prefinances.child.pricePerUnit'),sortable:false,  value: "pricePerUnit"},
        {text: this.$t("shipping.totalAmount"),sortable:false,  value: "totalAmount", align: "center"},
        {text: this.$t("shipping.hsCode"), value: "hsCode", sortable:false,   },
        {text: this.$t('actions'), value: "actions"}
      ],
      invoiceList: [],
      invoiceListItem: [],
      sumTotal: null,
      sumAmountTotal: null,
      editable:false,
      bankInfoSearch: "",
      bankInfo: null,
    }
  },
  created() {
    this.getMeasurementUnit();
    this.getBankDetailsList({ page: 0, size: 10 });
  },
  computed: {
    ...mapGetters({
      shippingInvoiceList: "shippingInvoice/shippingInvoiceList",
      shippingInvoiceItemList: "shippingInvoice/shippingInvoiceItemList",
      measurementUnitList: "measurement/measurementUnit",
      isLoad: "shippingInvoice/isLoad",
      bankDetailsList: "bankDetails/bankDetailsList",
    })
  },
  watch: {
    shippingInvoiceList(list) {
      this.invoiceList=JSON.parse(JSON.stringify(list))
      this.editable=true
    },
    shippingInvoiceItemList(data) {
      const list = JSON.parse(JSON.stringify(data.data))
      if(!!list){
        const specialList = list.map((el, idx) => {
          let totalItem = idx + 1
          return {
            ...el,
            totalItem,
          }
        })
        this.sumTotal = list.reduce((acc, el) => acc + el.total, 0)
        this.sumAmountTotal = list.reduce((acc, el) => acc + el.totalAmount, 0)
        this.invoiceListItem=JSON.parse(JSON.stringify(specialList))
      }

    },
    bankInfoSearch(val){
      if (!!val) {
        this.getBankDetailsList({ page: 0, size: 10, bankName: val });
      }
    },
    bankInfo(val){
      if(!!val){
        console.log(val)
        this.invoiceList.bankName = val.name
        this.invoiceList.bankCode = val.mfo
        this.invoiceList.swift = val.swift
        this.invoiceList.bankAddress = val.address
        this.invoiceList.accountNumberUSD = val.accountNumberUSD
        this.invoiceList.accountNumberRUB = val.accountNumberRUB
        this.invoiceList.accountNumberUZS = val.accountNumberUZS
        this.invoiceList.accountNumberEUR = val.accountNumberEUR
      }
    }
  },
  methods: {
    ...mapActions({
      getInvoiceList: "shippingInvoice/getInvoiceList",
      getInvoiceItemList: "shippingInvoice/getInvoiceItemList",
      updateInvoiceList: "shippingInvoice/updateInvoiceList",
      getMeasurementUnit: "measurement/getMeasurementUnit",
      updateInvoiceItem: "shippingInvoice/updateInvoiceItem",
      generateInvoicePdf: 'shippingInvoice/generateInvoicePdf',
      getBankDetailsList: "bankDetails/getBankDetailsList",
    }),
    editBtn(){
      this.editable=!this.editable
    },
    generatePdfInvoice(){
      const data = {
        invoiceId: this.shippingInvoiceList.id,
        shippingId: Number(this.shippingId),
        total: this.sumTotal,
        totalAmount: parseFloat(this.shippingInvoiceItemList.totalAmount.replace(/[$,]/g, '')),
      }
      this.generateInvoicePdf(data)
    },
    updateInvoice() {
      const data = {
        accountNumberRUB: this.invoiceList.accountNumberRUB,
        accountNumberUSD: this.invoiceList.accountNumberUSD,
        accountNumberUZS: this.invoiceList.accountNumberUZS,
        accountNumberEUR: this.invoiceList.accountNumberEUR,
        bankAddress: this.invoiceList.bankAddress,
        bankCode: this.invoiceList.bankCode,
        bankName: this.invoiceList.bankName,
        deliveryTerms: this.invoiceList.deliveryTerms,
        creditNumber: this.invoiceList.creditNumber,
        deliveryTermsDescription: this.invoiceList.deliveryTermsDescription,
        id: this.shippingInvoiceList.id,
        packagingType: this.invoiceList.packagingType,
        paymentTerms: this.invoiceList.paymentTerms,
        swift: this.invoiceList.swift
      }
      this.updateInvoiceList({data, id: this.shippingId, invoiceId: this.shippingInvoiceList.id})
    },
    editInvoiceItem(item) {
      this.invoiceItem = {...item}
      this.invoiceItem_dialog = true
    },
    async save() {
      const data = {
        hsCode: this.invoiceItem.hsCode,
        id: this.invoiceItem.id,
        measurementUnitId: this.invoiceItem.measurementUnitId
      }
      await this.updateInvoiceItem({data, id: this.shippingId})
      this.invoiceItem_dialog = false
    }
  },
  mounted() {
    this.shippingId = this.$route.params.id
    this.getInvoiceList(this.shippingId)
    this.getInvoiceItemList(this.shippingId)
  }
}
</script>
<style lang="scss" scoped>
table{
  border-color: #E9EAEB50;
  line-height: 30px;
  font-size: 16px;

  th,td{
    padding:0 16px;
    color: #1D2433;

  }

  thead{
    background-color: #F4F5FA;

    th{
      font-weight: 500;
      color:#6B7280

    }

  }

  tfoot{
    font-weight: 700;
  }

  .p0{
    padding:0 !important;
  }


}

</style>
