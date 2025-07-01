<template>
  <div>
    <FormTemplate v-bind="formProps" @loadingDisabler="stopLoading">
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
          Colors
        </div>
        <v-select
          :items="mainColorsList"
          v-model="filters.color"
          placeholder="Select color"
          dense
          outlined
          height="44"
          hide-details
          validate-on-blur
          class="rounded-lg filter mr-2"
          append-icon="mdi-chevron-down"
        />
      </v-col>
      <v-col cols="12">
        <InputsRow v-model="filters.responsiblePeople" />
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
    InputsRow: () => import("~/components/UI/InputRowWithPlusBtn.vue"),
  },
  data() {
    return {
      filters: {
        responsiblePeople: [
          {
            name: "",
            position: "",
          },
        ],
      },
      modelNumSearch: "",
      partnerName: "",
      isload: false,
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
    this.getPartnerList({ page: 0, size: 10 });
  },

  computed: {
    formProps: {
      get() {
        return {
          title: this.$t("forms.cuttingToOutsourcing"),
          pdfList: this.$store.state.generatePdf.pdfData,
          filterFunc: this.generatePdf,
        };
      },
    },
    ...mapGetters({
      modelsList: "models/modelsList",
      partnerList: "partners/partnerList",
      mainColorsList: "samplesTabs/mainColorsList",
    }),
  },

  watch: {
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
    "filters.modelNumber"(val) {
      if (val) {
        this.getMainColors(val.id);
      }
    },
  },

  methods: {
    ...mapActions({
      pdfFunc: "generatePdf/getProcessForm",
      getModelsList: "models/getModelsList",
      getMainColors: "samplesTabs/getMainColors",
      getPartnerList: "partners/getPartnerList",
    }),

    generatePdf() {
      const data = {
        modelId: this.filters.modelNumber?.id
          ? this.filters.modelNumber?.id
          : null,
        color: this.filters.color
          ? this.filters.color
          : null,
      };
      data.responsiblePeople = this.filters.responsiblePeople.filter(
        (item) => item.name !== "" && item.position !== ""
      );
      this.pdfFunc(data);
    },

    stopLoading() {
      this.isload = false;
    },
  },
};
</script>
<style lang=""></style>
