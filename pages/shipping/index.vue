<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form v-model="filter_form">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
              :placeholder="$t('shipping.index.invoiceNo')"
              v-model.trim="filters.invoiceNumber"
              outlined
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter"
              @keydown.enter="filterData"
            />
            </v-col>

            <v-col cols="12" lg="2" md="2">
              <v-text-field
                :placeholder="$t('shipping.index.clientName')"
                v-model.trim="filters.clientName"
                outlined
                validate-on-blur
                dense
                hide-details
                class="rounded-lg filter"
                @keydown.enter="filterData"
              />
            </v-col>

            <v-col cols="12" lg="2" md="2" style="max-width: 240px">
              <el-date-picker
                v-model="filters.shippingDate"
                type="datetime"
                class="rounded-lg d-block filter_picker"
                :placeholder="$t('shipping.index.shippingDate')"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
              >
              </el-date-picker>
            </v-col>
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140"
                  outlined
                  color="#544B99"
                  elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetFilters"
                >
                 {{ $t('shipping.index.reset')}}
                </v-btn>
                <v-btn
                  width="140"
                  color="#544B99"
                  dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterData"
                >
                  {{ $t('shipping.index.search')}}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="current_list"
      @click:row="(item)=>viewDetails(item)"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
    >
    <template #top>
      <v-toolbar elevation="0">
        <v-toolbar-title
          class="d-flex w-full align-center justify-space-between"
        >
          <div>{{ $t('shipping.index.shipping')}}</div>

          <v-btn
            color="#544B99"
            dark
            class="text-capitalize rounded-lg mr-2"
            @click="addShipping"
          >
            <v-icon>mdi-plus</v-icon>
           {{ $t('shipping.index.addShipping')}}
          </v-btn>

        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.action="{ item }">
      <v-tooltip top color="#544B99">
        <template v-slot:activator="{on, attrs}">
          <v-btn
            icon color="#544B99"
            v-on="on" v-bind="attrs"
            @click="viewDetails(item)"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>Details</span>
      </v-tooltip>
    </template>
      <template #item.status="{ item }">
        <v-chip :color="statusColor.shippingStatusColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>

  </div>


</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {

  data(){
    return{
      title: "",
      filter_form: true,
      headers:[
        {text: this.$t('shipping.index.invoiceNo'), value: "invoiceNumber", sortable: false, align: "start"},
        {text:this.$t('shipping.index.clientName'),  value: "clientName"},
        {text:this.$t('shipping.index.invoiceAmount'),  value: "invoiceAmount"},
        {text:this.$t('shipping.index.netWeight'),  value: "nettoWeight"},
        {text: this.$t('shipping.index.grossWeight'),  value: "grossWeight"},
        {text: this.$t('shipping.index.shippedDate'), value: "invoiceDate"},
        {text: this.$t('userManagement.child.status'),  value: "status"},
        {text:this.$t('prefinances.table.actions'),sortable:false,  value: "action"},
      ],
      expanded: [],
      filters: {
        clientName: null,
        invoiceNumber: null,
        shippingDate: null
      },
      itemPrePage: 10,
      current_page: 0,
      current_list: [],
    }
  },

  computed: {
    ...mapGetters({
      shippingList: "shipping/shippingList",
      totalElements: "shipping/totalElements",
    })
  },

  watch: {
    shippingList(val){
      this.current_list = JSON.parse(JSON.stringify(val))
    },
  },

  methods:{
    ...mapActions({
      getShippingList: "shipping/getShippingList",
      createShipping: "shipping/createShipping",
    }),
    async viewDetails(item){
      await this.$router.push(`/shipping/${item.id}`);
    },

    loadDetails({ item }) {
      // current opened || choose object ^
    },

    async page(value) {
      this.current_page = value - 1;
      await this.getShippingList({
        clientName: this.filters.clientName,
        invoiceNumber: this.filters.invoiceNumber,
        shippingDate: this.filters.shippingDate,
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getShippingList({
        clientName: this.filters.clientName,
        invoiceNumber: this.filters.invoiceNumber,
        shippingDate: this.filters.shippingDate,
        page: this.current_page,
        size: this.itemPrePage,
      });
    },

    addShipping() {
      this.$router.push(this.localePath(`/shipping/add-shipping`))
    },

    filterData() {
      this.getShippingList({
        clientName: this.filters.clientName,
        invoiceNumber: this.filters.invoiceNumber,
        shippingDate: this.filters.shippingDate,
        page:this.current_page,
        size:this.itemPrePage,
      });
    },
    async resetFilters() {
      await this.getShippingList({
        page:this.current_page,
        size:this.itemPrePage,
      });
      this.filters = {
        clientName: "",
        invoiceNumber: "",
        shippingDate: "",
      }
    },
  },

  mounted(){
    this.$store.commit("setPageTitle", "Shipping");
    this.getShippingList({
      clientName: "",
      invoiceNumber: "",
      shippingDate: "",
    })
  }
}
</script>
<style lang="">

</style>
