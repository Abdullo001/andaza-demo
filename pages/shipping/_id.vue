<template >
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <v-row>
         <v-col cols="11">
          {{$t('sidebar.shipping')}}
           <v-chip color="#10BF41" dark class="font-weight-bold ml-5">{{ shippingStatus }}</v-chip>
         </v-col>
          <v-col cols="1">
            <v-btn
              v-if="shippingStatus === 'Edit'"
              class="rounded-lg text-capitalize mr-2 colorSizeBtn"
              outlined
              @click="editBtn"
              color="var(--text-icon-600, #777C85)"
            >
              Edit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
          <v-form ref="order_detail" v-model="new_validate" lazy-validation>
              <v-row>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label"> {{$t('shipping.id.invoiceNo')}}</div>
                      <v-text-field
                          :disabled="eventEditBtn"
                          v-model="shipping.invoiceNumber"
                          class="rounded-lg base mb-4"
                          color="#544B99"
                          dense
                          height="44"
                          hide-details
                          outlined
                          :placeholder="$t('shipping.id.invoiceNo')"
                          validate-on-blur
                          :rules="[formRules.required]"
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">{{ $t('shipping.id.invoiceDate') }}</div>
                      <div style="height: 40px !important">
                          <el-date-picker
                            :disabled="eventEditBtn"
                              v-model="shipping.invoiceDate"
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
                    <div class="label">{{ $t('shipping.id.buyerName') }}</div>
                      <v-combobox
                        :disabled="eventEditBtn"
                        v-model="shipping.buyerId"
                        :rules="[formRules.required]"
                        :search-input.sync="buyerName"
                        :items="partnerLists"
                        item-text="name"
                        item-value="id"
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        :return-object="true"
                        color="#544B99"
                        dense
                        :placeholder="$t('shipping.id.buyerName')"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                        <template #append>
                          <v-icon color="#544B99">mdi-magnify</v-icon>
                        </template>
                      </v-combobox>
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">{{ $t('shipping.id.buyerAddress') }}</div>
                  <v-text-field
                    :disabled="eventEditBtn"
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    :value="shipping.buyerId?.address"
                    height="44"
                    hide-details
                    disabled
                    outlined
                    :placeholder="$t('shipping.id.buyerAddress')"
                    validate-on-blur
                  />
                </v-col>
              </v-row>
              <v-row :class="showObject">
                  <v-col cols="12" lg="3" md="3" sm="6">
                  <div class="label">{{ $t('shipping.id.contractNo') }}</div>
                  <v-text-field
                    :disabled="eventEditBtn"
                    class="rounded-lg base mb-4"
                    color="#544B99"
                    dense
                    :value="shipping.buyerId.contractNumber"
                    height="44"
                    hide-details
                    outlined
                    disabled
                    :placeholder="$t('shipping.id.contractNo')"
                    validate-on-blur
                  />
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                  <div class="label">{{ $t('shipping.id.contractDate') }}</div>
                  <div style="height: 40px !important">
                    <el-date-picker
                      :disabled="eventEditBtn"
                      :picker-options="pickerShortcuts"
                      class="base_picker"
                      :value="shipping.buyerId.contractDate"
                      disabled
                      placeholder="dd.MM.yyyy HH:mm:ss"
                      style="width: 100%; height: 100%"
                      type="datetime"
                      value-format="dd.MM.yyyy HH:mm:ss"
                    >
                    </el-date-picker>
                  </div>
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">{{ $t('shipping.id.sellerName') }}</div>
                      <v-combobox
                        :disabled="eventEditBtn"
                        v-model="shipping.sellerId"
                        :rules="[formRules.required]"
                        :search-input.sync="sellerName"
                        :items="partnerLists"
                        item-text="name"
                        item-value="id"
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        :return-object="true"
                        color="#544B99"
                        dense
                        :placeholder="$t('shipping.id.sellerName')"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                      <template #append>
                        <v-icon color="#544B99">mdi-magnify</v-icon>
                      </template>
                  </v-combobox>
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">{{ $t('shipping.id.sellerAddress') }}</div>
                      <v-text-field
                          :disabled="eventEditBtn"
                          class="rounded-lg base mb-4"
                          color="#544B99"
                          dense
                          disabled
                          :value="shipping.sellerId?.address"
                          height="44"
                          hide-details
                          outlined
                          :placeholder="$t('shipping.id.sellerAddress')"
                          validate-on-blur
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">{{ $t('shipping.id.senderCompany') }}</div>
                    <v-combobox
                      :disabled="eventEditBtn"
                      v-model="shipping.senderId"
                      :rules="[formRules.required]"
                      :search-input.sync="senderCompanyName"
                      :items="partnerLists"
                      item-text="name"
                      item-value="id"
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base"
                      :return-object="true"
                      color="#544B99"
                      dense
                      :placeholder=" $t('shipping.id.senderCompany')"
                      append-icon="mdi-chevron-down"
                      validate-on-blur
                    >
                      <template #append>
                        <v-icon color="#544B99">mdi-magnify</v-icon>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">{{ $t('shipping.id.senderCompanyAddress') }}</div>
                      <v-text-field
                          :disabled="eventEditBtn"
                          class="rounded-lg base mb-4"
                          color="#544B99"
                          dense
                          disabled
                          :value="shipping.senderId?.address"
                          height="44"
                          hide-details
                          outlined
                          :placeholder="$t('shipping.id.senderCompanyAddress')"
                          validate-on-blur
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">{{$t('shipping.id.receiverName')}}</div>
                      <v-combobox
                        :disabled="eventEditBtn"
                        v-model="shipping.receiverId"
                        :rules="[formRules.required]"
                        :search-input.sync="receiverName"
                        :items="partnerLists"
                        item-text="name"
                        item-value="id"
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        :return-object="true"
                        color="#544B99"
                        dense
                        :placeholder="$t('shipping.id.receiverName')"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                        <template #append>
                          <v-icon color="#544B99">mdi-magnify</v-icon>
                        </template>
                      </v-combobox>
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">{{ $t('shipping.id.receiverAddress') }}</div>
                      <v-text-field
                        :disabled="eventEditBtn"
                          class="rounded-lg base mb-4"
                          color="#544B99"
                          dense
                          disabled
                          :value="shipping.receiverId?.address"
                          height="44"
                          hide-details
                          outlined
                          :placeholder=" $t('shipping.id.receiverAddress')"
                          validate-on-blur
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">{{ $t('shipping.id.countryOfOrigin') }}</div>
                      <v-combobox
                        :disabled="eventEditBtn"
                        v-model="shipping.countryId"
                        :rules="[formRules.required]"
                        :search-input.sync="countryIdSearch"
                        :items="countryList"
                        item-text="name"
                        item-value="id"
                        outlined
                        hide-details
                        height="44"
                        class="rounded-lg base"
                        :return-object="true"
                        color="#544B99"
                        dense
                        :placeholder="$t('shipping.id.countryOfOrigin')"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                        <template #append>
                          <v-icon color="#544B99">mdi-magnify</v-icon>
                        </template>
                      </v-combobox>
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">{{$t('shipping.id.manufacturer')}}</div>
                    <v-combobox
                      :disabled="eventEditBtn"
                      v-model="shipping.manufacturerId"
                      :rules="[formRules.required]"
                      :search-input.sync="manufacturerName"
                      :items="partnerLists"
                      item-text="name"
                      item-value="id"
                      outlined
                      hide-details
                      height="44"
                      class="rounded-lg base"
                      :return-object="true"
                      color="#544B99"
                      dense
                      :placeholder="$t('shipping.id.manufacturer')"
                      append-icon="mdi-chevron-down"
                      validate-on-blur
                    >
                      <template #append>
                        <v-icon color="#544B99">mdi-magnify</v-icon>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">{{ $t('shipping.id.creatorName') }}</div>
                    <v-text-field
                      :disabled="eventEditBtn"
                      class="rounded-lg base mb-4"
                      color="#544B99"
                      dense
                      disabled
                      :value="shipping?.shippingCreator"
                      height="44"
                      hide-details
                      outlined
                      :placeholder=" $t('shipping.id.creatorName') "
                      validate-on-blur
                    />
                  </v-col>
                  <v-col class="d-flex justify-end align-end" cols="12">
                      <v-btn
                          v-if="shippingStatus === 'Add'"
                          class="text-capitalize rounded-lg"
                          color="#544B99"
                          dark
                          height="44"
                          width="130"
                          @click="createdNewShipping"
                      >
                         {{ $t('shipping.id.save') }}
                      </v-btn>
                      <v-btn
                        v-else
                        class="text-capitalize rounded-lg"
                        color="#544B99"
                        dark
                        height="44"
                        width="130"
                        @click="updateShippingFunc"
                      >
                          Update
                      </v-btn>
                  </v-col>
              </v-row>
          </v-form>
      </v-card-text>
        <v-card-actions class="pb-6 pr-4">
            <v-spacer/>
            <ShowBtnComponent
                    :click-btn="clickBtn"
                    :show_btn_value="show_btn"
            />
            <v-spacer/>
        </v-card-actions>
    </v-card>

    <v-card class="mt-6 mb-8" flat>
      <v-tabs v-model="tab">
        <v-tabs-slider color="#544B99"/>
        <v-tab
          class="text-capitalize primary-color"
          v-for="item in items"
          :key="item"
          active-class="active-tab"
        >
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ShippingModels/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <PackingList/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <InvoiceList/>
              </v-card-text>
            </v-card>
          </v-tab-item>

        </v-tabs-items>
      </v-tabs>

    </v-card>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Breadcrumbs from '../../components/Breadcrumbs.vue';
import ShippingModels from '../../components/Shipping/ShippingModels.vue';
import PackingList from '../../components/Shipping/PackingList.vue';
import InvoiceList from '../../components/Shipping/InvoiceList.vue';
import ShowBtnComponent from "@/components/ShowComponentBtn/ShowBtn.vue";

export default {

  components:{ShowBtnComponent, Breadcrumbs, ShippingModels, PackingList, InvoiceList },

  data() {
    return {
      orderIdSearch:"",
      modelIdSearch:"",
      modelImages:[],
      tab:null,
      show_btn: true,
      new_validate: false,
      shippingStatus: "Add",
      buyerName: "",
      sellerName: "",
      senderCompanyName: "",
      receiverName: "",
      manufacturerName: "",
      countryIdSearch: "",
      eventEditBtn: false,
      items:[
         this.$t('shipping.id.shippingModels') ,
         this.$t('shipping.id.packingList') ,
        this.$t('shipping.id.invoice') ,
      ],
      shipping: {
        id: "",
        buyerId: "",
        countryId: "",
        invoiceDate: "",
        invoiceNumber: "",
        manufacturerId: "",
        receiverId: "",
        sellerId: "",
        senderId: "",
      },
      currency_enums: ["USD", "UZS", "RUB"],
      map_links: [
                {
                    text: "Home",
                    disabled: false,
                    to: "/",
                    icon: true,
                },
                {
                    text: "Shipping",
                    disabled: false,
                    to: "/shipping",
                    icon: true,
                },
                {
                    text: "add shipping",
                    disabled: true,
                    to: "/shipping/7",
                    icon: false,
                },
        ],
      };
    },
  computed: {
    ...mapGetters({
      oneShipping: "shipping/oneShipping",
      shippingList: "shipping/shippingList",
      partnerLists: "partners/partnerList",
      countryList: "partners/countryList",
      shippingOperationList: "shipping/shippingOperationList"
    }),
    showObject() {
      return {
        show_active: this.show_btn
      }
    }
  },

  created() {
    this.getPartnerList({page:0, size:10});
    this.getCountryList({ name: this.countryIdSearch });
  },

  watch:{
    buyerName(val){
      this.getPartnerList({page:0, size:10, partnerName:val});
    },
    partnerName(val){
      this.getPartnerList({page:0, size:10, partnerName:val});
    },
    sellerName(val){
      this.getPartnerList({page:0, size:10, partnerName:val});
    },
    manufacturerName(val){
      this.getPartnerList({page:0, size:10,partnerName:val});
    },
    senderCompanyName(val){
      this.getPartnerList({page:0, size:10,partnerName:val});
    },
    receiverName(val){
      this.getPartnerList({page:0, size:10,partnerName:val});
    },
    countryIdSearch(val) {
      this.getCountryList({ name: val });
    },
    oneShipping(item) {
      this.eventEditBtn = true;
      const shipping = this.shipping;
      shipping.id = item.id;
      shipping.buyerId = {id: item.buyerId, address: item.buyerAddress, name: item.buyerName, contractDate: item.contractDate, contractNumber: item.contractNumber};
      shipping.invoiceDate = item.invoiceDate;
      shipping.invoiceNumber = item.invoiceNumber;
      shipping.manufacturerId = {id: item.manufacturerId, name: item.manufacturerName};
      shipping.senderId = {id: item.senderId, address: item.senderAddress, name: item.senderName};
      shipping.sellerId = {id: item.sellerId, address: item.sellerAddress, name: item.sellerName};
      shipping.receiverId = {id: item.receiverId, address: item.receiverAddress, name: item.receiverName};
      shipping.countryId = {id: item.countryId, name: item.countryName};
      this.$store.commit('shipping/setShippingId', item.buyerId);
    },
  },

  methods: {
    ...mapActions({
      getOneShipping: "shipping/getOneShipping",
      createShipping: "shipping/createShipping",
      updateShipping: "shipping/updateShipping",
      getPartnerList: "partners/getPartnerList",
      getCountryList: "partners/getCountryList",
      getShippingOperationList: "shippingModels/getShippingOperationList",
    }),
      async createdNewShipping() {
        const validate = this.$refs.order_detail.validate()
       if(validate){
        await this.createShipping(this.shipping);
       }
      },
      async updateShippingFunc() {
          await this.updateShipping(this.shipping);
      },
    clickBtn() {
      this.show_btn = !this.show_btn
    },
    editBtn() {
      this.eventEditBtn = !this.eventEditBtn
    }
  },

  async mounted(){
    const id = this.$route.params.id;
    if (id !== 'add-shipping') {
      await this.getOneShipping(id);
      this.shippingStatus = 'Edit'
      await this.getShippingOperationList(id);
    } else this.shippingStatus = 'Add'
  }
}
</script>
<style lang="scss" scoped>
.image-box {
  background: #f8f4fe;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 158px;
  min-height: 132px;
}
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544b99;
}
.show_active {
  height: 0;
  overflow: hidden;
}
.v-tabs {
  .v-card__text {
    padding: 14px 0;
  }
}

</style>
