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
        <div class="label">Outsourcing company</div>
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
      <v-col cols="12">
        <div class="label">Director Name</div>
        <v-text-field
          v-model="filters.directorName"
          placeholder="Enter director name"
          outlined
          hide-details
          height="44"
          class="rounded-lg base"
          validate-on-blur
          dense
          color="#544B99"
        />
      </v-col>
      <v-col cols="12">
        <!-- <v-row v-for="(people, index) in filters.responsiblePeople" :key="index">
          <v-col cols="6">
            <div class="label">Position</div>
            <v-text-field
              v-model="people.position"
              placeholder="Enter position"
              outlined
              hide-details
              height="44"
              class="rounded-lg base"
              validate-on-blur
              dense
              color="#544B99"
            />
          </v-col>
          <v-col cols="6">
            <div class="label">Name</div>
            <div class="d-flex align-center">
              <v-text-field
                v-model="people.name"
                placeholder="Enter name"
                outlined
                hide-details
                height="44"
                class="rounded-lg base mr-4"
                validate-on-blur
                dense
                color="#544B99"
              />
              <v-btn
                v-if="index === 0"
                icon
                height="44"
                width="44"
                color="#544B99"
                @click="addNewRow"
              >
                <v-img src="/plus.svg" max-width="30"/>
              </v-btn>
              <v-btn
                v-else
                icon
                height="44"
                width="44"
                color="#544B99"
                @click="deleteRow(index)"
              >
                <v-img src="/minus.svg" max-width="30"/>
              </v-btn>
            </div>
          </v-col>
        </v-row> -->
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
          title: "Cutting to Outsourcing",
          pdfList: this.$store.state.generatePdf.pdfData,
          filterFunc: this.generatePdf,
        };
      },
    },
    ...mapGetters({
      modelsList: "models/modelsList",
      partnerList: "partners/partnerList",
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
  },

  methods: {
    ...mapActions({
      pdfFunc: "generatePdf/getCuttingOutsorcingPdf",
      getModelsList: "models/getModelsList",
      getPartnerList: "partners/getPartnerList",
    }),

    generatePdf() {
      const data = {
        modelId: this.filters.modelNumber?.id
          ? this.filters.modelNumber?.id
          : null,
        partnerId: this.filters.subcontractorId?.id
          ? this.filters.subcontractorId?.id
          : null,
        directorName: this.filters.directorName
          ? this.filters.directorName
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
