<template>
  <div>
    <v-data-table
      item-key="id"
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
      <template #top>
        <v-card flat>
          <div class="title mt-0 ma-4">1-sort</div>
        </v-card>
      </template>
      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="showHistory(item)"
            >
              <v-img src="/history.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#544B99"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#544B99"
              @click="shippingBtn(item)"
            >
              <v-img src="/car.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">Shipping</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="history_dialog" max-width="700">
      <v-card flat>
        <v-card-title>
          <div class="title">History</div>
          <v-spacer/>
          <v-btn
            icon
            @click="history_dialog=false"
            color="#544B99"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="shipping_dialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Shipping list</div>
          <v-btn icon color="#544B99" @click="shipping_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="shipping_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item, idx) in selectedItem.sizeDistributions" :key="`_cutting_${idx}`">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base "
                  validate-on-blur
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="3" md="3" sm="6">
                <div class="label">Shipping name</div>
                <v-combobox
                  v-model="shippingItem.shippingId"
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
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="130"
            @click="shipping_dialog = false"
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import shipping from "@/pages/shipping/index.vue";

export default {
  name: 'SortOne',
  data() {
    return {
      history_dialog:'',
      shipping_validate: true,
      shippingInvoice: "",
      selectedItem: {
        shippingId: null,
        warehouseId: null,
      },
      headers: [
        {text: 'Main colors', align: 'start', sortable: false, value: 'mainColors'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Price', align: 'start', sortable: false, value: 'price'},
        {text: 'Total Price', align: 'start', sortable: false, value: 'totalPrice'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      historyHeaders:[
        {text: 'Date', sortable: false, align: 'start', value: 'createdDate'},

        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},
      ],
      historyList:[],

      items: [],
      shippingItem: {
        shippingId: null,
      },
      shipping_dialog: false,
    }
  },
  computed:{
    ...mapGetters({
      firstClassList:"readyGarmentWarehouse/firstClassList",
      historyServerList:"readyGarmentWarehouse/historyList",
      shippingInvoiceList: "shipping/shippingInvoiceList",
      giveShipping: "readyGarmentWarehouse/giveShipping",
    })
  },

  created() {
    this.getShippingInvoiceList({
      page: 0,
      size: 100,
      invoiceNumber: this.shippingInvoice,
    });
  },

  watch:{
    "shippingItem.shippingId"(val){
      this.selectedItem.shippingId = val?.id;
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
    firstClassList(list){
      list.forEach((item)=>{
        this.headers= [
          {text: 'Color', sortable: false, align: 'start', value: 'colorSpecification'},
        ],

      list[0]?.sizeDistributionList?.forEach((item) => {
          this.headers.push({
            text: item.size, sortable: false, align: 'start', value: item.size
          })
        })

        this.headers.push(
          {text: 'Produced total', sortable: false, align: 'start', value: 'total'},
          {text: 'Price', sortable: false, align: 'start', value: 'price'},
          {text: 'Total price', sortable: false, align: 'start', value: 'totalPrice'},
          {text: 'Actions', sortable: false, align: 'start', value: 'actions'},
        )
        const specialList = list.map(function (el) {
          const value = {};
          const sizesList = [];
          el?.sizeDistributionList.forEach((item) => {
            value[item.size] = item.quantity
            sizesList.push({size: item.size, quantity: 0})
          });

          return {
            ...value,
            ...el,
            sizeDistributions: [...sizesList],

          }
        })
        this.items = JSON.parse(JSON.stringify(specialList))
      })
    },
    historyServerList(list){
      this.historyHeaders = [
        {text: 'Date', sortable: false, align: 'start', value: 'createdDate'},
      ],
        list[0]?.sizeDistributionList?.forEach((item) => {
          this.historyHeaders.push({
            text: item.size, sortable: false, align: 'start', value: item.size
          })
        })
      this.historyHeaders.push(
        {text: 'Total', sortable: false, align: 'center', value: 'total'},
        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},

      )
      const specialList = list.map(function (el) {
        const value = {};
        const sizesList = [];
        el?.sizeDistributionList.forEach((item) => {
          value[item.size] = item.quantity
          sizesList.push({size: item.size, quantity: item.quantity})
        });
        return {
          ...el,
          ...value,
          sizeDistributions: [...sizesList],
        }
      })
      this.historyList = JSON.parse(JSON.stringify(specialList))
    }
  },

  methods:{
    ...mapActions({
      getWarehouseListEachSort:"readyGarmentWarehouse/getWarehouseListEachSort",
      getWarehouseHistoryList:"readyGarmentWarehouse/getWarehouseHistoryList",
      getShippingInvoiceList: "shipping/getShippingInvoiceList",
      putGiveShipping: "readyGarmentWarehouse/putGiveShipping"
    }),
    showHistory(item){
      const id =this.$route.params.id
      this.getWarehouseHistoryList({warehouseId:id,operationType:"FIRST_CLASS",color:item.colorSpecification})
      this.history_dialog=true
    },
    shippingBtn(item) {
      this.shipping_dialog = true;
      this.selectedItem = {...item};
      this.selectedItem.status="editProcess";
    },
    save(){
      const id=this.$route.params.id
      if(this.selectedItem.status==="editProcess"){
        let data = {
          colorSpecification: this.selectedItem.colorSpecification,
          warehouseId: id,
          sizeDistributions: [...this.selectedItem.sizeDistributions],
          shippingId: this.selectedItem.shippingId,
        }
        this.putGiveShipping({data, warehouseId: id, operationType: "FIRST_CLASS"});
        this.shipping_dialog = false;
        this.shippingInvoice = ''
      }
    }
  },

  mounted(){
    const id=this.$route.params.id
    this.getWarehouseListEachSort({warehouseId:id,operationType:"FIRST_CLASS"})
  }

}
</script>

<style lang="scss" scoped>

</style>
