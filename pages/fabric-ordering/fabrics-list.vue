<template >
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation ref="filters">
          <div class="d-flex align-center flex-fill justify-space-between mb-4" style="gap: 5px">
            <v-combobox
                v-model="filters.supplierName"
                :items="clientList"
                :search-input.sync="supplierNumSearch"
                item-text="name"
                item-value="id"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter"
                :return-object="true"
                dense
                @keydown.enter="filterBtn"
                :placeholder="$t('fabricOrderingBox.index.supplier')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            <v-combobox
                v-model="filters.sipNumber"
                :items="sipNumbers"
                :search-input.sync="sipNumberSearch"
                item-text="sipNumber"
                item-value="sipNumber"
                validate-on-blur
                outlined
                hide-details
                color="#544B99"
                height="44"
                class="rounded-lg filter"
                :return-object="true"
                dense
                @keydown.enter="filterBtn"
                :placeholder="$t('fabricOrderingBox.index.sipNumber')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
            <v-combobox
              v-model="filters.orderNumber"
              :items="ordersList"
              :search-input.sync="orderNumSearch"
              item-text="orderNumber"
              item-value="orderNumber"
              validate-on-blur
              outlined
              hide-details
              color="#544B99"
              height="44"
              class="rounded-lg filter"
              :return-object="true"
              dense
              @keydown.enter="filterBtn"
              :placeholder="$t('orderBox.index.orderNum')"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#544B99">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
            <v-combobox
              v-model="filters.modelNumber"
              :items="modelsList"
              :search-input.sync="modelNumSearch"
              :rules="[formRules.required]"
              item-text="modelNumber"
              item-value="modelNumber"
              validate-on-blur
              outlined
              hide-details
              height="44"
              class="rounded-lg filter"
              :return-object="true"
              dense
              @keydown.enter="filterBtn"
              :placeholder="$t('planning.listFabric.modelNumber')"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#544B99">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
            <v-select
              :items="status_enums"
              v-model="filters.status"
              :placeholder="$t('fabricOrderingBox.index.status')"
              dense
              outlined
              height="44"
              hide-details
              validate-on-blur
              class="rounded-lg filter"
              append-icon="mdi-chevron-down"
              @keydown.enter="filterBtn"
            />
          </div>

          <div class="d-flex justify-center">
            <v-btn
              width="140"
              outlined
              color="#544B99"
              elevation="0"
              class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              {{ $t('localization.dialog.reset') }}
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filterBtn"
            >
             {{ $t('localization.dialog.search') }}
            </v-btn>
          </div>

        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="fabricsList"
      :items-per-page="itemPrePage"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #item.status="{ item }">
        <v-chip :color="statusColor.fabricsList(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
export default {

  data(){
    return{
      current_page: 0,
      itemPrePage: 10,
      filters: {
        modelNumber: '',
        orderNumber: '',
        sipNumber: '',
        supplierName: '',
        status: ''
      },
      headers:[
        {text:"Id",value:"orderNo",sortable:false},
        {text:this.$t('fabricOrderingBox.index.sipNumber'),value:"sipNumber",sortable:false},
        {text:this.$t('orderBox.index.orderNum'),value:"orderNumber",sortable:false},
        {text:this.$t('planning.listFabric.modelNumber'),value:"modelNumbers",sortable:false},
        {text: this.$t('planning.listFabric.fabricSpecification'),value:"fabricSpecification",sortable:false},
        {text:this.$t('planning.listFabric.color'),value:"color",sortable:false},
        {text:this.$t('forms.orderedFabrics.supplier'),value:"supplier",sortable:false},
        {text:this.$t('fabricOrderingBox.index.orderFabric'),value:"actualTotalFabric",sortable:false},
        {text:this.$t('fabricOrderingBox.index.recievedFabric'),value:"actualReceivedFabric",sortable:false},
        {text:this.$t('fabricOrderingBox.index.pricePer'),value:"pricePerKg",sortable:false},
        {text:this.$t('fabricOrderingBox.index.totalPrice'),value:"totalPrice",sortable:false},
        {text: this.$t('fabricOrderingBox.index.status'),value:"status",sortable:false},
      ],
      orderNumSearch:"",
      modelNumSearch: "",
      supplierNumSearch: "",
      sipNumberSearch: "",
      status_enums: ["RECEIVED", "CANCELLED", "ORDERED", "PENDING"],
    }
  },

  async created(){
    await this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    })
    await this.filterOrderList({
      page: 0,
      size: 10,
      data: {
        modelNumber: "",
        orderNumber: this.orderNumSearch,
        creatorId: "",
        clientName: "",
      },
    })
    await this.getSipNumbers("");
  },

  computed:{
    ...mapGetters({
      clientList: "orders/clientList",
      modelsList: "models/modelsList",
      ordersList: "orders/ordersList",
      sipNumbers: "fabricWarehouse/sipNumbers",
      fabricsList: "fabricsList/fabricsList",
      totalElements: "fabricsList/totalElements"
    })
  },

  watch:{

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
    sipNumberSearch(val) {
        if(!!val) {
          this.getSipNumbers("")
        }
    },
  },


  methods:{
    ...mapActions({
      getModelsList: "models/getModelsList",
      filterOrderList: "orders/filterOrderList",
      getSipNumbers: "fabricWarehouse/getSipNumbers",
      getFabricsList: "fabricsList/getFabricsList"
    }),
    async filterBtn() {
      const data = {
        modelNumber: this.filters.modelNumber?.modelNumber,
        orderNumber: this.filters.orderNumber?.orderNumber,
        sipNumber: this.filters.sipNumber?.sipNumber,
        supplierName: this.filters.supplierName?.name,
        status: this.filters.status,
        page: this.current_page,
        size: this.itemPrePage
      }
      await this.getFabricsList(data);
    },
     page(val){
      this.current_page = val - 1;
       const data = {
         modelNumber: this.filters.modelNumber?.modelNumber,
         orderNumber: this.filters.orderNumber?.orderNumber,
         sipNumber: this.filters.sipNumber?.sipNumber,
         supplierName: this.filters.supplierName?.name,
         status: this.filters.status,
         page: this.current_page,
         size: this.itemPrePage
       }
      this.getFabricsList(data);
    },
    size(value){
      this.itemPrePage = value;
      const data = {
        modelNumber: this.filters.modelNumber?.modelNumber,
        orderNumber: this.filters.orderNumber?.orderNumber,
        sipNumber: this.filters.sipNumber?.sipNumber,
        supplierName: this.filters.supplierName?.name,
        status: this.filters.status,
        page: 0,
        size: this.itemPrePage
      }
      this.getFabricsList(data);
    },
    resetFilter(){
      this.getFabricsList({page: this.current_page, size: 10})
      this.$refs.filters.reset()
    },
  },

  mounted(){
    this.getFabricsList({page: 0, size: 10})
    this.$store.commit('setPageTitle', 'Fabrics List');
  }
}

</script>
<style lang="scss" scoped>

</style>
