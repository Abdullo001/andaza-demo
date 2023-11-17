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
          <div class="title mt-0 ma-4">2-sort</div>
        </v-card>
      </template>
      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
              @click="showHistory(item)"
            >
              <v-img src="/history.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
            >
              <v-img src="/dollar.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">Selling</span>
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
            color="#7631FF"
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'SortTwo',
  data() {
    return {
      headers: [
        {text: 'Main colors', align: 'start', sortable: false, value: 'mainColors'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Total', align: 'start', sortable: false, value: 'total'},
        {text: 'Real price', align: 'start', sortable: false, value: 'realPrice'},
        {text: 'Sold Price', align: 'start', sortable: false, value: 'soldPrice'},
        {text: 'Comment', align: 'start', sortable: false, value: 'comment'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      history_dialog:'',
      historyHeaders:[
        {text: 'Date', sortable: false, align: 'start', value: 'createdDate'},
        
        {text: 'Done By', sortable: false, align: 'center', value: 'createdBy'},
      ],
      historyList:[],
      items: []
    }
  },

  computed:{
    ...mapGetters({
      secondClassList:"readyGarmentWarehouse/secondClassList",
      historyServerList:"readyGarmentWarehouse/historyList",
    })
  },

  watch:{
    secondClassList(list){
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
    },
  },

  methods:{
    ...mapActions({
      getWarehouseListEachSort:"readyGarmentWarehouse/getWarehouseListEachSort",
      getWarehouseHistoryList:"readyGarmentWarehouse/getWarehouseHistoryList",
    }),
    showHistory(item){
      const id =this.$route.params.id
      this.getWarehouseHistoryList({warehouseId:id,operationType:"SECOND_CLASS",color:item.colorSpecification})
      this.history_dialog=true
    }
  },

  mounted(){
    const id=this.$route.params.id
    this.getWarehouseListEachSort({warehouseId:id,operationType:"SECOND_CLASS"})
  }

}
</script>

<style lang="scss" scoped>

</style>
