<template>
  <div>
    <FormTemplate v-bind="formProps">
      <v-col cols="12" lg="3">
        <div class="label">
          {{ $t("forms.placedOrdersBox.modelNumber") }}
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
      <v-col cols="12" lg="3">
        <div class="label">
          Subcontractor
        </div>
        <v-combobox
          v-model="filters.subcontractorId"
          :items="partnerList"
          :search-input.sync="partnerName"
          item-text="name"
          item-value="name"
          validate-on-blur
          outlined
          hide-details
          height="44"
          class="rounded-lg filter d-flex align-center justify-center mr-2"
          :return-object="true"
          dense
          placeholder="Subcontractor name"
          prepend-icon=""
        >
          <template #append>
            <v-icon class="d-inline-block" color="#544B99">
              mdi-magnify
            </v-icon>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="12" lg="3">
        <div class="label">Send By</div>
        <v-text-field
          v-model="filters.sendBy"
          class="rounded-lg filter mb-4"
          dense
          height="44"
          hide-details
          outlined
          placeholder="Enter send by"
          validate-on-blur
        />
      </v-col>
      <v-col cols="12" lg="3">
        <div class="label">Received By</div>
        <v-text-field
          v-model="filters.receivedBy"
          class="rounded-lg filter mb-4"
          dense
          height="44"
          hide-details
          outlined
          placeholder="Enter received by"
          validate-on-blur
        />
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
    this.getPartnerList({page: 0, size: 10})
  },

  computed: {
    formProps: {
      get() {
        return {
          title:"Cutting list of subcontractor",
          pdfList:this.$store.state.generatePdf.pdfData,
          filterFunc:this.generatePdf,
        };
      },
    },
    ...mapGetters({
      modelsList: "models/modelsList",
      partnerList: "partners/partnerList",
    }),
  },

  watch:{
    partnerName(val) {
      this.getPartnerList({ page: 0, size: 10, partnerName: val });
    },
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
      pdfFunc: "generatePdf/getSubcontractorFormPdf",
      getModelsList: "models/getModelsList",
      getPartnerList: "partners/getPartnerList",
    }),

    generatePdf() {
      const data = {
        modelId: this.filters.modelNumber?.id?this.filters.modelNumber?.id:null,
        subcontractorId: this.filters.subcontractorId?.id?this.filters.subcontractorId?.id:null,
        sendBy:  this.filters.sendBy,
        receivedBy: this.filters.receivedBy,
      };
      this.pdfFunc(data)
    },
    
  },
};
</script>
<style lang=""></style>
