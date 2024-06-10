<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="itemList"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        
        <div class="text-h6 px-0">
          <v-combobox
            v-model="expense"
            :items="expenseGroup"
            :return-object="true"
            :search-input.sync="expenseSearch"
            class="rounded-lg base d-flex align-center justify-center mb-4"
            color="#544B99"
            dense
            height="44"
            hide-details
            item-text="name"
            item-value="id"
            outlined
            placeholder="Exponse group"
            @change="(e) => setExpense(e)"
          >
            <template #append>
              <v-icon class="d-inline-block" color="#544B99">
                mdi-magnify
              </v-icon>
            </template>
          </v-combobox>
        </div>
        <v-divider class="my-4"></v-divider>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props:{
    modelId:{
      type: Number,
    },
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "expense", sortable: false },
        { text: "Price (USD)", value: "price", sortable: false },
        { text: "Q-ty (kg)", value: "quantity", sortable: false },
      ],
      expense:"",
      itemList: [],
      expenseSearch:"",
    };
  },

  computed: {
    ...mapGetters({
      expenseGroup: "expenseGroup/expenseGroup",
      expenseForProduction: "expenseGroup/expenseForProduction",
    }),
  },

  watch:{
    expenseGroup(val){

    },

    expenseForProduction(val){
      this.itemList=val.possibleExpenseResponses
    },

    expenseSearch(val){
      this.filterExpenseGroup({id:"",name:val,createdAt:"",updateAt:""})
    }
  },

  methods: {
    ...mapActions({
      filterExpenseGroup: "expenseGroup/filterExpenseGroup",
      getExpenseProduction: "expenseGroup/getExpenseProduction",
    }),

    setExpense(e){
      if(!!e){
        this.getExpenseProduction({groupId:e.id,modelId:this.modelId})
      }
    }

  },

  mounted(){
    this.filterExpenseGroup({id:"",name:"",createdAt:"",updateAt:""})
  }
};
</script>
<style lang=""></style>
