<template>
  <div>
    <FormTemplate v-bind="formProps" @loadingDisabler="stopLoading">
      <v-col cols="12" lg="3">
        <div class="label">
          Stream
        </div>
        <v-select
          :items="streamList"
          v-model="filters.streamId"
          item-text="streamNumber"
          item-value="streamId"
          placeholder="Select stream"
          dense
          outlined
          height="44"
          hide-details
          validate-on-blur
          class="rounded-lg filter mr-2"
          append-icon="mdi-chevron-down"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <div class="label">
          Date
        </div>
        <div style="height: 40px !important">
          <el-date-picker
            v-model="filters.date"
            type="date"
            style="width: 100%; height: 100%"
            placeholder="dd.MM.yyyy"
            :picker-options="pickerShortcuts"
            value-format="timestamp"
            format="dd.MM.yyyy"
          >
          </el-date-picker>
        </div>
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

  computed: {
    formProps: {
      get() {
        return {
          title: "Daily sorting form",
          pdfList: this.$store.state.generatePdf.pdfData,
          filterFunc: this.generatePdf,
        };
      },
    },
    ...mapGetters({
      streamList:"commonProcess/streamList",
    })
  },
  created() {
    this.getPatokList();
  },
  methods: {
    ...mapActions({
      pdfFunc: "generatePdf/getToStreamForm",
      getPatokList:"commonProcess/getPatokList",
    }),
    generatePdf() {
      const data = {
        streamId: this.filters.streamId
          ? this.filters.streamId
          : null,
        date: this.filters.date
          ? this.filters.date
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
