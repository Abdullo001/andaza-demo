<template>
  <div>
    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>{{ $t('readyWarehouse.quantityBySizes.title') }}</div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <div style="min-width: 100px">
          <!-- <v-btn icon class="mr-2" @click="edit(item)">
          <v-img src="/edit-green.svg" max-width="20" />
        </v-btn>
        <v-btn icon @click="deleteOpenDialog(item)">
          <v-img src="/trash-red.svg" max-width="20" />
        </v-btn> -->
          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#544B99">
                <v-img src="/history.svg" max-width="20" />
              </v-btn>
            </template>
            <span class="text-capitalize">History</span>
          </v-tooltip>
          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#544B99">
                <v-img src="/shop.svg" max-width="20" />
              </v-btn>
            </template>
            <span class="text-capitalize">Store</span>
          </v-tooltip>
          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#544B99">
                <v-img src="/online-shop.svg" max-width="20" />
              </v-btn>
            </template>
            <span class="text-capitalize">Online shop</span>
          </v-tooltip>
          <v-tooltip
            top
            color="#544B99"
            class="pointer"
            v-if="Object.keys(item).length > 2"
          >
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="#544B99" @click="openShippingDialog(item)">
                <v-img src="/car.svg" max-width="20" />
              </v-btn>
            </template>
            <span class="text-capitalize">To Shipping</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="shipping_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>
            Sent to Shipping
          </div>
          <v-btn @click="shipping_dialog = !shipping_dialog" icon>
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row>
              <v-col cols="12" lg="8"  >
                <div class="label">Invoice number</div>
                <v-combobox
                  v-model="shippingData.shippingId"
                  :rules="[formRules.required]"
                  :search-input.sync="shippingInvoice"
                  :items="shippingInvoiceList"
                  item-text="invoiceNumber"
                  item-value="id"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :return-object="true"
                  color="#544B99"
                  dense
                  placeholder="Enter partner name"
                  append-icon="mdi-chevron-down"
                  validate-on-blur
                >
                  <template #append>
                    <v-icon color="#544B99">mdi-magnify</v-icon>
                  </template>
                </v-combobox>
              </v-col>
              <!-- <v-col cols="4" class="d-flex align-center">
                <v-switch inset v-model="autoFilling" color="#4F46E5" />
                <div class="label mr-5 ">Aut.Filling</div>
              </v-col> -->
            </v-row>
            <v-row>
              <v-col
                cols="4"
                v-for="(item, idx) in shippingData.editableSizeDistributions"
                :key="idx"
              >
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="item.quantity"
                  placeholder="0"
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
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#544B99"
            width="163"
            @click="shipping_dialog = !shipping_dialog"
            >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveShipping"
          >
            Save
          </v-btn>
         
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DeleteDialog v-bind="deleteData" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DeleteDialog from "@/components/DeleteDialog.vue";
export default {
  components: {
    DeleteDialog,
  },

  data() {
    return {
      autoFilling:false,
      shipping_dialog: false,
      new_validate: true,
      headers: [
        {text:this.$t('readyWarehouse.quantityBySizes.mainColor'), value:"mainColor",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.colorCode'), value:"colorCode",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.total'), value:"total",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.price'), value:"price",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.totalPrice'), value:"totalPrice",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.actions'), value:"actions",sortable:false},
      ],

      items: [],

      shippingData: {
        mainColor: "",
        colorCode: "",
        editableSizeDistributions: [],
      },
      uid: null,
      deleteDialog: false,
      shippingInvoice:"",
    };
  },

  created(){
    this.getShippingInvoiceList({
      page: 0,
      size: 100,
      invoiceNumber: this.shippingInvoice,
    });
  },

  computed: {
    deleteData: {
      get() {
        return {
          deleteDialog: this.deleteDialog,
          deleteFunction: this.deleteFunc,
          closeDialog: () => {
            this.deleteDialog = false;
          },
        };
      },
    },
    ...mapGetters({
      sizeList: "garmentStock/sizeList",
      stockId: "garmentStock/stockId",
      sizeQuantityList: "garmentStock/sellingList",
      shippingInvoiceList: "shipping/shippingInvoiceList",

    }),
  },

  created() {},

  watch: {
    autoFilling(val){
      if(val){
        this.shippingData.sizeDistributions.forEach((item,idx)=>{
          item.quantity=this.shippingData.editableSizeDistributions[idx].quantity
        })
      }else{
        this.shippingData.sizeDistributions.forEach((item,idx)=>{
          item.quantity=0
        })
      }
    },
    sizeQuantityList(list) {
      const specialList = list.map((item) => {
        const sizes = {};
        item.sizeDistributions.forEach((item) => {
          sizes[item.size] = item.quantity;
        });
        return {
          ...item,
          ...sizes,
        };
      });
      this.items = JSON.parse(JSON.stringify(specialList));
    },
    sizeList(val) {
      if (val.length !== 0) {
        this.shippingData.editableSizeDistributions = [];
        this.headers = [
          { text: "Main color", value: "mainColor", sortable: false },
          { text: "Color code", value: "colorCode", sortable: false },
        ];

        val.forEach((item) => {
          this.headers.push({ text: item, value: item, sortable: false });
          this.shippingData.editableSizeDistributions.push({
            quantity: 0,
            size: item,
          });
        });

        this.headers.push(
          { text: "Total", value: "total", sortable: false },
          { text: "Price", value: "price", sortable: false },
          { text: "Total price", value: "totalPrice", sortable: false },
          { text: "Actions", value: "actions", sortable: false }
        );
      }
    },

    shipping_dialog(val) {
      if (!val) {
        this.$refs.new_form.reset();
      }
    },

    stockId(val) {
      this.uid = val.id;
    },

    uid(val) {
      if (!!val) {
        // this.getStockDistribution(val);
        this.getStockSizes(val);
      }
    },
    shippingInvoice(val) {
      if (!!val) {
        this.getShippingInvoiceList({
          page: 0,
          size: 100,
          invoiceNumber: val,
        });
      }
    },
  },

  methods: {
    ...mapActions({
      getStockSizes: "garmentStock/getStockSizes",
      getSellingList: "garmentStock/getSellingList",
      getShippingInvoiceList: "shipping/getShippingInvoiceList",
      sellToShipping: "garmentStock/sellToShipping",

    }),

    openShippingDialog(item) {
      this.shipping_dialog = true;
      this.shippingData = {...this.shippingData,...item};

    },

    async saveShipping() {
      const data = JSON.parse(JSON.stringify(this.shippingData));

      await this.sellToShipping({
        data: {
          shippingId:data.shippingId.id,
          sizeDistributions: data.editableSizeDistributions,
          stockId: this.uid,
        },
        id:data.id
      });
      this.shipping_dialog = false;
    },

    edit(item) {
      this.shippingData = JSON.parse(JSON.stringify(item));
      this.shipping_dialog = true;
      this.shippingData.status = "edit";
    },

    async saveUpdate() {
      const data = JSON.parse(JSON.stringify(this.shippingData));

      // await this.updateStockSize({
      //   data: {
      //     colorCode: data.colorCode,
      //     mainColor: data.mainColor,
      //     sizeDistributions: data.sizeDistributions,
      //     stockId: this.uid,
      //   },
      //   id: this.shippingData.id,
      // });
      this.shipping_dialog = false;
    },

    deleteOpenDialog(item) {
      this.deleteDialog = true;
      this.shippingData = { ...item };
    },

    deleteFunc() {
      // this.deleteStockSize({ id: this.shippingData.id, stockId: this.uid });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    if (id !== "add-garment") {
      this.uid = id;
    } else {
      this.uid = this.stockId.id;
    }

    // this.getStockDistribution(this.uid);
    // this.getStockSizes(this.uid);
    this.getSellingList(this.uid)
  },
};
</script>
<style lang=""></style>
