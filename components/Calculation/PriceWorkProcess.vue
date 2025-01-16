<template>
  <div class="price-work-process">
    <v-card></v-card>
      <v-card-title>{{$t('modelOperations.laborCost')}}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <div class="label">{{ $t('modelOperations.operationExpense')}} </div>
            <v-combobox
              v-model="selected"
              :items="modelOperationsList"
              class="rounded-lg base d-flex align-center justify-center"
              color="#544B99"
              dense
              height="44"
              hide-details
              item-text="name"
              item-value="id"
              outlined
              prepend-icon=""
              style="margin-bottom:22px"
            >
              <template #append>
                <v-icon class="d-inline-block" color="#544B99">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="2" v-for="(item, idx) in totalWorkPrice" :key="idx">
            <div class="label">{{ $t('modelOperations.totalIn') }} {{ item.currency }}</div>
            <v-text-field
              v-model="item.amount"
              outlined
              height="44"
              class="rounded-lg base"
              hide-details
              color="#544B99"
              dense
              disabled
            />
          </v-col>
        </v-row>
      </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PriceWorkProcess',
  props: {
    id: {
      type: Number,
      required: true,
    },
    modelCategoryId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selected: "",
      items: [],
      prefinanceId: null,
      modelOperationsList:[]
    };
  },
  computed: {
    ...mapGetters({
      totalWorkPrice: "preFinance/totalWorkPrice",
      selectedModelOperations: "model/selectedModelOperations",
    }),
  },
  watch: {
    id(newId) {
      if (newId) {
        this.prefinanceId = newId;
        this.getModelOperationsList(newId);
      }
    },
    modelCategoryId(val){
      if(val){
        this.getSelectedModelOperations(val);
      }
    },
    selectedModelOperations(list){
      this.modelOperationsList=list.map(({ modelOperationName, amount, currency }) => `${modelOperationName} - ${amount} ${currency}`);
      this.selected=this.modelOperationsList[0];
    }
  },
  methods: {
    ...mapActions({
      getModelOperationsList: "preFinance/getModelOperationsList",
      getSelectedModelOperations: "model/getSelectedModelOperations",
    }),
  },
  mounted() {
    if (this.id) {
      this.prefinanceId = this.id;
      this.getModelOperationsList(this.id);
    }
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
