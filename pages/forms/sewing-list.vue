<template>
  <div>
    <FormTemplate v-bind="formProps" @loadingDisabler="stopLoading">
      <v-col cols="12" lg="3">
        <div class="label">
          {{ $t("forms.placedOrdersBox.modelNumber") }}<span style="color: red">*</span>
        </div>
        <v-combobox
          v-model="filters.modelNumber"
          :items="modelsList"
          :search-input.sync="modelNumSearch"
          item-text="modelNumber"
          item-value="modelNumber"
          validate-on-blur
          outlined
          hide-details
          height="44"
          class="rounded-lg filter d-flex align-center justify-center mr-2"
          :return-object="true"
          dense
          :placeholder="$t('forms.placedOrdersBox.modelNumberPlaceholder')"
          prepend-icon=""
        >
          <template #append>
            <v-icon class="d-inline-block" color="#544B99">
              mdi-magnify
            </v-icon>
          </template>
        </v-combobox>
      </v-col>
    </FormTemplate>
  </div>
</template>
<script>
import FormTemplate from "@/components/FormTemplate.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    FormTemplate,
  },
  data() {
    return {
      filters: {},
      modelNumSearch:"",
      partnerName:"",
      isload:false,

    };
  },

  created() {
    this.getModelsList({
      page: 0,
      size: 10,
      modelNumber: this.modelNumSearch,
      partner: "",
      status: "ACTIVE",
    });
  },

  computed: {
    formProps: {
      get() {
        return {
          title:"Sewing list",
          pdfList:this.$store.state.generatePdf.pdfData,
          filterFunc:this.generatePdf,
          funcState:this.isload,
        };
      },
    },
    ...mapGetters({
      modelsList: "models/modelsList",
      partnerList: "partners/partnerList",
    }),
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
  },

  methods: {
    ...mapActions({
      pdfFunc: "generatePdf/getSewingListPdf",
      getModelsList: "models/getModelsList",
      getPartnerList: "partners/getPartnerList",
    }),

    generatePdf() {
      if(this.filters.modelNumber?.id){
        this.isload=true
        const modelId= this.filters.modelNumber?.id
        this.pdfFunc(modelId)
      }
    },
    stopLoading(){
      this.isload=false
    }

  },
};
</script>
<style lang=""></style>
