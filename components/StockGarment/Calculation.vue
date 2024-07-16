<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="[{...calculationItem}]"
      class="no-hover"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Garments of Stock</div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.costPrice="{ item }">
        <div class="d-flex align-center my-4">
          <v-text-field
            v-model="calculationItem.costPrice"
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
            v-model="calculationItem.costPriceCurrency"
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
      </template>
      <template #item.profit="{ item }">
        <div class="d-flex align-center my-4">
          <v-text-field
            v-model="calculationItem.profit"
            class="rounded-lg base"
            color="#544B99"
            dense
            height="44"
            hide-details
            outlined
            placeholder="0.00"
            validate-on-blur
            suffix="%"
          />
        </div>
      </template>
      <template #item.sellingPrice="{item}">
        {{ calculationItem.sellingPrice }}
      </template>
      <template #item.factSellingPrice="{ item }">
        <div class="d-flex align-center my-4">
          <v-text-field
            v-model="calculationItem.factSellingPrice"
            class="rounded-lg base"
            color="#544B99"
            dense
            height="44"
            hide-details
            outlined
            placeholder="0.00"
            validate-on-blur
          />
        </div>
      </template>

      <template #item.actions="{ item }">
        <v-btn
          class="text-capitalize rounded-lg"
          color="#544B99"
          dark
          height="44"
          @click="saveCalculation"
        >
          Save
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Cost price", value: "costPrice", sortable: false },
        { text: "Profit", value: "profit", sortable: false },
        { text: "Selling price", value: "sellingPrice", sortable: false },
        {
          text: "Fact selling price",
          value: "factSellingPrice",
          sortable: false,
        },
        { text: "Actions", value: "actions", sortable: false },
      ],

      currency_enums: ["USD", "UZS", "RUB"],

      calculationItem: {
        costPrice: "",
        profit: null,
        sellingPrice: "",
        factSellingPrice: "",
        costPriceCurrency: "USD",
      },

      uid:null,
    };
  },

  computed: {
    
    ...mapGetters({
      stockId: "garmentStock/stockId",
      calculation: "garmentStock/calculation",

    }),
  },

  watch: {
    calculation(val){
      this.calculationItem=JSON.parse(JSON.stringify(val))
    },

    stockId(val){
      this.uid=val.id
    },

    uid(val){
      this.getStockCalculation(val)
    },

    "calculationItem.profit"(val){
      if(!!this.calculationItem.costPrice&&!!val){
        this.calculationItem.sellingPrice=(this.calculationItem.costPrice*(1+val/100)).toFixed(2)
      }else{
        this.calculationItem.sellingPrice=null
      }
    }

    
  },

  methods: {
    ...mapActions({
      setStockCalculation: "garmentStock/setStockCalculation",
      getStockCalculation: "garmentStock/getStockCalculation",
    }),
    saveCalculation() {
      const data={...this.calculationItem}
      this.setStockCalculation({id:this.uid,data})
    },
  },

  mounted(){
    const id = this.$route.params.id
    if(id!=="add-garment"){
      this.uid=id
    }
  }
};
</script>
<style lang="scss" scoped></style>
