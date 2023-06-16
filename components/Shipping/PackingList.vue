<template >
  <div>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      @click:row="(item)=>viewDetails(item)"
      items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"     
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Packing List</div>
            
            <v-btn
              elevation="0"
              color="#7631FF"
              class="text-capitalize rounded-lg "
              width="130"
              height="44"
              dark
            >
              <v-icon>mdi-plus</v-icon>
               Add Info
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.action="{item}">
        <v-btn
              outlined
              elevation="0"
              color="#7631FF"
              class="text-capitalize rounded-lg font-weight-bold"
              width="130"
              height="44"
              
            >
          Save
        </v-btn>
      </template>

    </v-data-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      headers:[
        {text: "Shipped product quantity",   value: "shippedProductQuantity"},
        {text: "Net weight(kg.)",  sortable:false,  value: "netWeight"},
        {text: "Gross weight(kg.)", sortable:false,   value: "grossWeight"},
        {text: "Volume (m3)", sortable:false,   value: "volume"},
        {text: "Package type",  sortable:false,  value: "packageType"},
        {text: "action", sortable:false,   value: "action"},

      ]
    }
  }
}
</script>
<style lang="">
  
</style>