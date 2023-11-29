<template >
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <v-row>
         <v-col cols="11">
           Shipping
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
<!--        <div>-->
<!--          -->
<!--        </div>-->
<!--        <div>-->
<!--          -->
<!--        </div>-->
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
          <v-form ref="order_detail" v-model="new_validate" lazy-validation>
              <v-row>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">Invoice No.</div>
                      <v-text-field
                          :disabled="eventEditBtn"
                          v-model="shipping.invoiceNumber"
                          class="rounded-lg base mb-4"
                          color="#7631FF"
                          dense
                          height="44"
                          hide-details
                          outlined
                          placeholder="Enter the invoice No."
                          validate-on-blur
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">Invoice date</div>
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
                    <div class="label">Buyer name</div>
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
                        color="#7631FF"
                        dense
                        placeholder="Enter partner name"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                        <template #append>
                          <v-icon color="#7631FF">mdi-magnify</v-icon>
                        </template>
                      </v-combobox>
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">Buyer address</div>
                  <v-text-field
                    :disabled="eventEditBtn"
                    class="rounded-lg base mb-4"
                    color="#7631FF"
                    dense
                    :value="shipping.buyerId?.address"
                    height="44"
                    hide-details
                    disabled
                    outlined
                    placeholder="Enter the invoice No."
                    validate-on-blur
                  />
                </v-col>
              </v-row>
              <v-row :class="showObject">
                  <v-col cols="12" lg="3" md="3" sm="6">
                  <div class="label">Contract No.</div>
                  <v-text-field
                    :disabled="eventEditBtn"
                    class="rounded-lg base mb-4"
                    color="#7631FF"
                    dense
                    :value="shipping.buyerId.contractNumber"
                    height="44"
                    hide-details
                    outlined
                    disabled
                    placeholder="Enter the invoice No."
                    validate-on-blur
                  />
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                  <div class="label">Contract date</div>
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
                    <div class="label">Seller name</div>
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
                        color="#7631FF"
                        dense
                        placeholder="Select the seller name"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                      <template #append>
                        <v-icon color="#7631FF">mdi-magnify</v-icon>
                      </template>
                  </v-combobox>
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">Seller address</div>
                      <v-text-field
                          :disabled="eventEditBtn"
                          class="rounded-lg base mb-4"
                          color="#7631FF"
                          dense
                          disabled
                          :value="shipping.sellerId?.address"
                          height="44"
                          hide-details
                          outlined
                          placeholder="Select the seller name"
                          validate-on-blur
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">Sender company</div>
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
                      color="#7631FF"
                      dense
                      placeholder="Select the sender company"
                      append-icon="mdi-chevron-down"
                      validate-on-blur
                    >
                      <template #append>
                        <v-icon color="#7631FF">mdi-magnify</v-icon>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">Sender company address</div>
                      <v-text-field
                          :disabled="eventEditBtn"
                          class="rounded-lg base mb-4"
                          color="#7631FF"
                          dense
                          disabled
                          :value="shipping.senderId?.address"
                          height="44"
                          hide-details
                          outlined
                          placeholder="Select the sender company"
                          validate-on-blur
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">Receiver name</div>
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
                        color="#7631FF"
                        dense
                        placeholder="Select the receiver name"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                        <template #append>
                          <v-icon color="#7631FF">mdi-magnify</v-icon>
                        </template>
                      </v-combobox>
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                      <div class="label">Receiver address</div>
                      <v-text-field
                          :disabled="eventEditBtn"
                          class="rounded-lg base mb-4"
                          color="#7631FF"
                          dense
                          disabled
                          :value="shipping.receiverId?.address"
                          height="44"
                          hide-details
                          outlined
                          placeholder="Select the receiver name"
                          validate-on-blur
                      />
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">Country of origin</div>
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
                        color="#7631FF"
                        dense
                        placeholder="Select the country of origin"
                        append-icon="mdi-chevron-down"
                        validate-on-blur
                      >
                        <template #append>
                          <v-icon color="#7631FF">mdi-magnify</v-icon>
                        </template>
                      </v-combobox>
                </v-col>
                  <v-col cols="12" lg="3" md="3" sm="6">
                    <div class="label">Manufacturer</div>
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
                      color="#7631FF"
                      dense
                      placeholder="Select the manufacturer name"
                      append-icon="mdi-chevron-down"
                      validate-on-blur
                    >
                      <template #append>
                        <v-icon color="#7631FF">mdi-magnify</v-icon>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col class="d-flex justify-end align-end" cols="12">
                      <v-btn
                          v-if="shippingStatus === 'Add'"
                          class="text-capitalize rounded-lg"
                          color="#7631FF"
                          dark
                          height="44"
                          width="130"
                          @click="createdNewShipping"
                      >
                          Save
                      </v-btn>
                      <v-btn
                        v-else
                        class="text-capitalize rounded-lg"
                        color="#7631FF"
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
        <v-tabs-slider color="#7631FF"/>
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
                <Invoice/>
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
                <RemainingQuantity/>
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
import Invoice from '../../components/Shipping/Invoice.vue';
import PackingList from '../../components/Shipping/PackingList.vue';
import RemainingQuantity from '../../components/Shipping/RemainingQuantity.vue';
import ShowBtnComponent from "@/components/ShowComponentBtn/ShowBtn.vue";

export default {

  components:{ShowBtnComponent, Breadcrumbs, Invoice, PackingList, RemainingQuantity },

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
      eventEditBtn: true,
      items:[
        "Invoice",
        "Packing list",
        "Remaining quantity for dom.market"
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
      partnerLists: "shipping/partnerLists",
      countryList: "partners/countryList"
    }),
    showObject() {
      return {
        show_active: this.show_btn
      }
    }
  },

  created() {
    this.getPartnerName();
    this.getCountryList({ name: this.countryIdSearch });
  },

  methods: {
    ...mapActions({
      getOneShipping: "shipping/getOneShipping",
      createShipping: "shipping/createShipping",
      updateShipping: "shipping/updateShipping",
      getPartnerName: "shipping/getPartnerName",
      getCountryList: "partners/getCountryList"
    }),
      async createdNewShipping() {
        this.shipping.buyerId = this.shipping.buyerId?.id;
        this.shipping.sellerId = this.shipping.sellerId?.id;
        this.shipping.senderId = this.shipping.senderId?.id;
        this.shipping.receiverId = this.shipping.receiverId?.id;
        this.shipping.manufacturerId = this.shipping.manufacturerId?.id;
        this.shipping.countryId = this.shipping.countryId?.id;
        await this.createShipping(this.shipping);
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

  watch:{
    countryIdSearch(val) {
      this.getCountryList({ name: val });
    },
    oneShipping(item) {
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
    shippingList(list) {
      list.map((item) => {
        this.users.push({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        });
      });
    }
  },
  async mounted(){
    const id = this.$route.params.id;
    if (id !== 'add-shipping') {
      await this.getOneShipping(id);
      this.shippingStatus = 'Edit'
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
  color: #7631ff;
}
.show_active {
  height: 0;
  overflow: hidden;
}
</style>
