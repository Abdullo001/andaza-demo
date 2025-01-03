<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <v-card-title>
        <div>{{ $t('waybillId.waybills') }}</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-form ref="waybill_detail" v-model="new_validate" lazy-validation>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('waybillId.waybillNo') }}</div>
              <v-text-field
                v-model="waybill.waybillNumber"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                outlined
                :placeholder="$t('waybillId.waybillNo')"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{ $t('waybillId.branchName') }}</div>
              <v-combobox
                v-model="waybill.branchId"
                :items="partnerLists"
                :return-object="true"
                :search-input.sync="branchSearch"
                class="rounded-lg base d-flex align-center justify-center mb-4"
                color="#544B99"
                dense
                height="44"
                hide-details
                item-text="name"
                item-value="name"
                outlined
                :placeholder=" $t('waybillId.branchName') "
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('waybillId.branchAddress')  }}</div>
              <v-text-field
                v-model="waybill.branchAddress"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder=" $t('waybillId.branchAddress') "
                validate-on-blur
              />
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('waybillId.date')  }}</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="waybill.waybillDate"
                  :picker-options="pickerShortcuts"
                  class="base_picker"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  style="width: 100%; height: 100%"
                  type="datetime"
                  value-format="dd.MM.yyyy HH:mm:ss"
                >
                </el-date-picker>
              </div>
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('waybillId.creator')  }}</div>
              <v-text-field
                v-model="waybill.createdBy"
                background-color="#F8F4FE"
                class="rounded-lg base mb-4"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder=" $t('waybillId.creator')"
                readonly
                validate-on-blur
              />
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{  $t('waybillId.createdAt')  }}</div>
              <v-text-field
                v-model="waybill.createdAt"
                class="rounded-lg base mb-4"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder="$t('waybillId.createdAt')"
                validate-on-blur
              >
                <template #append>
                  <v-img src="/date-icon.svg" />
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" lg="3" md="3" sm="6">
              <div class="label">{{$t('waybillId.updatedAt')}}</div>
              <v-text-field
                v-model="waybill.updatedAt"
                background-color="#F8F4FE"
                class="rounded-lg base"
                color="#544B99"
                dense
                disabled
                height="44"
                hide-details
                outlined
                :placeholder="$t('waybillId.updatedAt')"
                readonly
                validate-on-blur
              >
                <template #append>
                  <v-img src="/date-icon.svg" />
                </template>
              </v-text-field>
            </v-col>

            <v-col class="d-flex justify-end align-end" cols="12">
              <v-btn
                v-if="this.$route.params.id==='add-waybill'"
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="saveWaybill"
              >
                {{ $t('waybillId.save') }}
              </v-btn>
              <v-btn
              v-else
                class="text-capitalize rounded-lg"
                color="#544B99"
                dark
                height="44"
                width="130"
                @click="update"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card elevation="0">
      <v-card-title>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{ $t('waybillId.waybills') }}</div>
          </v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
          <v-data-table
            class="rounded-lg"
            :headers="headers"
            :items="waybillItems"
            hide-default-footer
          >
          <template #item.sizes="{ item }">
            <table style="width: 100% !important">
              <thead>
                <tr>
                  <th
                    class="mr-2"
                    v-for="(el, idx) in item.sizeDistributions"
                    :key="`${item.modelNumber}-${el.size}-${idx}`"
                  >
                    {{ el.size }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    v-for="(el, idx) in item.sizeDistributions"
                    :key="`${item.modelNumber}` + `${el.size}` + `${idx}`"
                  >
                    {{ el.quantity }}
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
          </v-data-table>


        <v-data-table
          class="rounded-lg mt-6"
          :headers="additionHeaders"
          :items="additionList"
          hide-default-footer
        >
          <template #top>
            <v-toolbar elevation="0">
              <v-toolbar-title
                class="d-flex w-full align-center justify-space-between"
              >
                <div>  {{ $t('waybillId.add') }}</div>
                <div>
                  <v-btn
                    color="#544B99"
                    dark
                    class="text-capitalize rounded-lg"
                    @click="addAddition"
                  >
                    <v-icon>mdi-plus</v-icon>
                    {{ $t('waybillId.add') }}
                  </v-btn>
                </div>
              </v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card-text>

      <v-dialog v-model="add_dialog" width="800">
        <v-card>
          <v-card-title class="d-flex justify-space-between w-full">
            <div class="text-capitalize font-weight-bold">  {{ $t('waybillId.add') }}</div>
            <v-btn icon color="#544B99" @click="add_dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-form ref="add_form" v-model="add_validate" lazy-validation>
              <v-row>
                <v-col cols="12" lg="6">
                  <div class="label">{{ $t('waybillId.modelNo') }}</div>
                  <v-combobox
                    v-model="addition.modelNumber"
                    :items="modelsList"
                    :search-input.sync="modelNumSearch"
                    item-text="modelNumber"
                    item-value="modelNumber"
                    validate-on-blur
                    outlined
                    color="#544B99"
                    hide-details
                    height="44"
                    class="rounded-lg base d-flex align-center justify-center mr-2"
                    :return-object="true"
                    dense
                    :placeholder=" $t('waybillId.modelNo')"
                    prepend-icon=""
                  >
                    <template #append>
                      <v-icon class="d-inline-block" color="#544B99">
                        mdi-magnify
                      </v-icon>
                    </template>
                  </v-combobox>
                </v-col>
                <v-col cols="12" lg="6">
                  <div class="label">{{ $t('centralWarehouse.productName') }}</div>
                  <v-text-field
                    v-model="addition.name"
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    height="44"
                    hide-details
                    outlined
                    :placeholder=" $t('centralWarehouse.productName')"
                    validate-on-blur
                  />
                </v-col>
                <v-col cols="12" lg="6">
                  <div class="label">{{  $t('waybillId.color') }}</div>
                  <v-select
                    :items="colorList"
                    v-model="addition.colorSpecification"
                    :placeholder="$t('waybillId.color')"
                    dense
                    outlined
                    height="44"
                    hide-details
                    color="#544B99"
                    validate-on-blur
                    class="rounded-lg base mr-2"
                    append-icon="mdi-chevron-down"
                  />
                </v-col>
                <v-col cols="12" lg="6">
                  <div class="label">{{ $t('prefinances.child.quantity') }}</div>
                  <div class="d-flex align-center">
                    <v-text-field
                      v-model="addition.quantity"
                      class="rounded-lg base rounded-l-lg rounded-r-0"
                      color="#544B99"
                      dense
                      height="44"
                      hide-details
                      outlined
                      :placeholder=" $t('prefinances.child.quantity')"
                      validate-on-blur
                    />
                    <v-select
                      v-model="addition.measurementUnitId"
                      append-icon="mdi-chevron-down"
                      class="rounded-lg base rounded-r-lg rounded-l-0"
                      color="#544B99"
                      :items="measurementUnitList"
                      item-text="name"
                      item-value="id"
                      dense
                      height="44"
                      hide-details
                      outlined
                      style="max-width: 100px"
                      validate-on-blur
                    />
                  </div>
                </v-col>
                <v-col cols="12" lg="6">
                  <div class="label">{{ $t('waybillId.price') }}</div>
                  <div class="d-flex align-center">
                    <v-text-field
                      v-model="addition.price"
                      class="rounded-lg base rounded-l-lg rounded-r-0"
                      color="#544B99"
                      dense
                      height="44"
                      hide-details
                      outlined
                      placeholder="0.00"
                      validate-on-blur
                    />
                    <v-select
                      v-model="addition.currency"
                      :items="currency_enums"
                      append-icon="mdi-chevron-down"
                      class="rounded-lg base rounded-r-lg rounded-l-0"
                      color="#544B99"
                      dense
                      height="44"
                      hide-details
                      outlined
                      style="max-width: 100px"
                      validate-on-blur
                    />
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center pb-8">
            <v-btn
              class="rounded-lg text-capitalize font-weight-bold"
              outlined
              color="#544B99"
              width="130"
              @click="add_dialog = false"
            >
             {{ $t('userManagement.dialog.cancel') }}
            </v-btn>
            <v-btn
              class="rounded-lg text-capitalize ml-4 font-weight-bold"
              color="#544B99"
              dark
              width="130"
              @click="save"
            >
             {{ $t('waybillId.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="mx-4">
        <v-toolbar elevation="0" class="mb-6">
          <v-toolbar-title class="d-flex w-full align-center justify-center">
            <div>{{ $t('waybillForm.senderSide') }}</div>
          </v-toolbar-title>
        </v-toolbar>

        <v-row>
          <v-col cols="4">
            <div class="label">{{ $t('waybillForm.description') }}</div>
            <v-textarea
              :placeholder="$t('waybillForm.description')"
              v-model="sender.senderDescription"
              outlined
              hide-details
              background-color="#F8F4FE"
              color="#544B99"
              rows="8"
              class="rounded-lg base"
            />
          </v-col>
          <v-col cols="8">

            <v-row>
              <v-col cols="3">
                <div class="label">{{ $t('waybillForm.givenBy') }}</div>
                <v-text-field
                  v-model="sender.givenByPosition"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder=" $t('waybillForm.enterPosition') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">zc</div>
                <v-text-field
                  v-model="sender.givenByName"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder=" $t('waybillForm.enterName') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label">{{ $t('waybillForm.receiverInFactory')  }}</div>
                <v-text-field
                  v-model="sender.receiverByPosition"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder=" $t('waybillForm.enterPosition') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">
                 {{ $t('waybillForm.receiverInFactory')  }}
                </div>
                <v-text-field
                  v-model="sender.receiverByName"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder=" $t('waybillForm.enterName') "
                  validate-on-blur
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">Confirmed</div>
                <v-text-field
                  v-model="sender.confirmedByPosition1"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder=" $t('waybillForm.enterPosition') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">zc</div>
                <v-text-field
                  v-model="sender.confirmedByName1"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                   :placeholder=" $t('waybillForm.enterName') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label">{{ $t('waybillForm.confirmedBy') }}</div>
                <v-text-field
                  v-model="sender.confirmedByPosition2"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                   :placeholder=" $t('waybillForm.enterPosition') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">
                  Confirmed by
                </div>
                <v-text-field
                  v-model="sender.confirmedByName2"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                 :placeholder=" $t('waybillForm.enterName') "
                  validate-on-blur
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">Allowed By</div>
                <v-text-field
                  v-model="sender.approvedByPosition1"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                    :placeholder=" $t('waybillForm.enterPosition') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">zc</div>
                <v-text-field
                  v-model="sender.approvedByName1"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                  :placeholder=" $t('waybillForm.enterName') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label">{{ $t('waybillForm.allowedBy')  }} </div>
                <v-text-field
                  v-model="sender.approvedByPosition2"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                   :placeholder=" $t('waybillForm.enterPosition') "
                  validate-on-blur
                />
              </v-col>
              <v-col cols="3">
                <div class="label" style="visibility: hidden">
                  Allowed
                </div>
                <v-text-field
                  v-model="sender.approvedByName2"
                  class="rounded-lg base"
                  color="#544B99"
                  dense
                  height="44"
                  hide-details
                  outlined
                :placeholder=" $t('waybillForm.enterName') "
                  validate-on-blur
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-toolbar elevation="0" class="mb-6">
          <v-toolbar-title class="d-flex w-full align-center justify-center">
            <div>{{ $t('waybillForm.receiverSide') }}</div>
          </v-toolbar-title>
        </v-toolbar>

        <v-row>
          <v-col cols="6">
            <div class="label">{{ $t('waybillForm.receivedBy') }}</div>
            <v-text-field
              v-model="sender.receivedByPosition1"
              class="rounded-lg base"
              color="#544B99"
              dense
              height="44"
              hide-details
              outlined
                :placeholder=" $t('waybillForm.enterPosition') "
              validate-on-blur
            />
          </v-col>
          <v-col cols="6">
            <div class="label" style="visibility: hidden">
              Receiver in Factory
            </div>
            <v-text-field
              v-model="sender.receivedByName1"
              class="rounded-lg base"
              color="#544B99"
              dense
              height="44"
              hide-details
              outlined
             :placeholder=" $t('waybillForm.enterName') "
              validate-on-blur
            />
          </v-col>
          <v-col cols="6">
            <div class="label" style="visibility: hidden">Received by</div>
            <v-text-field
              v-model="sender.receivedByPosition2"
              class="rounded-lg base"
              color="#544B99"
              dense
              height="44"
              hide-details
              outlined
               :placeholder=" $t('waybillForm.enterPosition') "
              validate-on-blur
            />
          </v-col>
          <v-col cols="6">
            <div class="label" style="visibility: hidden">
              Receiver in Factory
            </div>
            <v-text-field
              v-model="sender.receivedByName2"
              class="rounded-lg base"
              color="#544B99"
              dense
              height="44"
              hide-details
              outlined
             :placeholder=" $t('waybillForm.enterName') "
              validate-on-blur
            />
          </v-col>
        </v-row>
        <div class="d-flex justify-end my-6 pb-4">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="130"
            @click="downloadDoc"
            :loading="loading"
          >
           {{ $t('waybillForm.downloadPdf') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="saveInfos"
          >
                    {{ $t('waybillForm.save') }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading:false,
      modelNumSearch: "",
      add_validate: true,
      add_dialog: false,
      sender: {},
      currency_enums: ["USD", "UZS", "RUB"],
      branchSearch: "",
      waybill: {
        waybillNumber: "",
        branchId: "",
        branchAddress: "",
        waybillDate: "",
      },
      new_validate: true,
      addition: {},
      headers: [
        { text: this.$t('waybillId.no'), value: "id", sortable: false },
        { text: this.$t('waybillId.modelNo'), value: "modelNumber", sortable: false },
        { text: this.$t('waybillId.name'), value: "name", sortable: false },
        { text: this.$t('waybillId.color'), value: "colorSpecification", sortable: false },
        { text: this.$t('waybillId.mu'), value: "measurementUnit", sortable: false },
        { text: this.$t('waybillId.sample'), value: "sample", sortable: false },
        { text:this.$t('sizeTemplate.table.sizes'), value: "sizes", sortable: false, width:400,align:"center"},
        { text:this.$t('waybillId.totalQuantities'), value: "totalQuantity", sortable: false },
        { text: this.$t('waybillId.price'), value: "price", sortable: false },
        { text: this.$t('waybillId.totalPrice'), value: "totalPrice", sortable: false },
      ],
      additionHeaders: [
         { text: this.$t('waybillId.no'), value: "id", sortable: false },
        { text: this.$t('waybillId.modelNo'), value: "modelNumber", sortable: false },
        { text: this.$t('waybillId.name'), value: "name", sortable: false },
        { text: this.$t('waybillId.color'), value: "colorSpecification", sortable: false },
        { text: this.$t('waybillId.mu'), value: "measurementUnit", sortable: false },
        { text: this.$t('waybillId.sample'), value: "sample", sortable: false },
        { text: this.$t('prefinances.child.quantity'), value: "quantity", sortable: false },
         { text:this.$t('waybillId.totalQuantities'), value: "totalQuantity", sortable: false },
        { text: this.$t('waybillId.price'), value: "price", sortable: false },
        { text: this.$t('waybillId.totalPrice'), value: "totalPrice", sortable: false },
      ],
      items: [
        {
          id: 1,
          modelNumber: "MOD001",
          name: "Product A",
          color: "Red",
          measurmentUnit: "kg",
          sample: 1,
          92: 10,
          94: 20,
          totalQuantities: 30,
          price: 5.99,
          totalPrice: 179.7,
        },
        {
          id: 2,
          modelNumber: "MOD002",
          name: "Product B",
          color: "Blue",
          measurmentUnit: "pieces",
          sample: 0,
          92: 15,
          94: 25,
          totalQuantities: 40,
          price: 2.5,
          totalPrice: 100.0,
        },
        // Add more sample items as needed
      ],
      id: null,
      additionList:[],
      waybillItems:[],
    };
  },
  created() {
    this.getPartnerList({page:0, size:10});
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
    this.getMeasurementUnit();

  },

  computed: {
    ...mapGetters({
      partnerLists: "partners/partnerList",
      modelsList: "models/modelsList",
      colorList: "accessorySamples/colorList",
      measurementUnitList: "measurement/measurementUnit",
      waybillInfo:"waybill/waybillInfo",
      additionListStore:"waybill/additionList",
      oneWaybill:"waybill/oneWaybill",
      newWaybillId:"waybill/newWaybillId",
      waybillItemsStore:"waybill/waybillItems",
      pdfList: "waybill/waybillForm",
    }),
  },

  watch: {
    add_dialog(val){
      if(!val){
        this.$refs.add_form.reset()
      }
    },
    pdfList(val) {
      this.loading=false
      const blob = new Blob(
        [new Uint8Array([...val].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
    },
    additionListStore(list){
      this.additionList=JSON.parse(JSON.stringify(list))
    },
    waybillItemsStore(list){
      this.waybillItems=JSON.parse(JSON.stringify(list))
    },
    newWaybillId(id){
      this.id=id
    },
    oneWaybill(val){
      const data=JSON.parse(JSON.stringify(val))
      this.waybill.branchId={name:data.partner,address:data.partnerAddress,id:data.partnerId}
      this.waybill.waybillNumber=data.number
      this.waybill.waybillDate=data.sendDate
      this.waybill.createdBy=data.createdBy
      this.waybill.createdAt=data.createdAt
      this.waybill.updatedAt=data.updatedAt
    },
    waybillInfo(val){
      this.sender=JSON.parse(JSON.stringify(val))
    },
    branchSearch(val) {
      this.getPartnerList({page:0, size:10,partnerName:val});
    },
    "waybill.branchId"(val) {
      this.waybill.branchAddress = val?.address;
    },
    modelNumSearch(val) {
      if (!!val) {
        this.getModelsList({
          page: 0,
          size: 10,
          modelNumber: val,
          partner: "",
          status: "ACTIVE",
        });
      }
    },
    "addition.modelNumber"(val) {
      if (!!val) {
        this.modelColor(val.id);
      }
    },
    id(val){
      this.getAdditionalList(val)
      this.getWaybillInfos(val)
      this.getWaybillItems({id:val,type:"FIRST_CLASS"})
    }
  },

  methods: {
    ...mapActions({
      createWaybillList: "waybill/createWaybillList",
      getAdditionalList: "waybill/getAdditionalList",
      getOneWaybill: "waybill/getOneWaybill",
      createAddition: "waybill/createAddition",
      updateWaybill: "waybill/updateWaybill",
      getWaybillInfos: "waybill/getWaybillInfos",
      setWaybillInfos: "waybill/setWaybillInfos",
      getWaybillItems: "waybill/getWaybillItems",
      getPartnerList: "partners/getPartnerList",
      getModelsList: "models/getModelsList",
      modelColor: "accessorySamples/modelColor",
      getMeasurementUnit: "measurement/getMeasurementUnit",
      getWaybilForm:"waybill/getWaybilForm",

    }),

    saveWaybill() {
      const data = {
        number: this.waybill.waybillNumber,
        partnerId: this.waybill.branchId.id,
        sendDate: this.waybill.waybillDate,
        type: "EXTERNAL",
      };
      this.createWaybillList(data);
    },
    addAddition() {
      this.add_dialog = true;
    },
    downloadDoc() {
      this.loading=true
      this.getWaybilForm(this.id)
    },
    save() {
      const data = {
        ...this.addition,
        modelId: this.addition?.modelNumber?.id,
      };
      delete data.modelNumber;
      this.createAddition({ id: this.id, data });
      this.add_dialog=false
    },
    saveInfos(){
      const data={
        ...this.sender
      }
      this.setWaybillInfos({id:this.id,data})
    },
    update(){
      const data = {
        number: this.waybill.waybillNumber,
        partnerId: this.waybill.branchId.id,
        sendDate: this.waybill.waybillDate,
        type: "EXTERNAL",
      };
      this.updateWaybill({data,id:this.id})
    }
  },
  mounted() {
    const param = this.$route.params.id;
    if (param !== "add-waybill") {
      this.getOneWaybill(param);
      this.id = param;
    }
  },
};
</script>
<style lang=""></style>
