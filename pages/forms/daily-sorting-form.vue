<template>
  <div>
    <FormTemplate v-bind="formProps" @loadingDisabler="stopLoading">
      <v-col cols="12" lg="6">
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
  },

  methods: {
    ...mapActions({
      pdfFunc: "generatePdf/getDailySorting",
    }),
    generatePdf() {
      const data = {
        date: this.filters.date
          ? this.filters.date
          : null,
      };
      data.responsiblePeople = this.filters.responsiblePeople.filter(
        (item) => item.name !== "" && item.position !== ""
      );
      console.log(data);

      // this.pdfFunc(data);
    },

    stopLoading() {
      this.isload = false;
    },
  },
};
</script>
<style lang=""></style>
