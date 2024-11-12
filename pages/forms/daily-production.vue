<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          {{ $t("forms.dailyProductionQuantity.title") }}
        </div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <!-- <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.dailyProductionQuantity.daily") }}
              </div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.daily"
                  type="date"
                  :disabled="!!filters.monthly || !!filters.yearly"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy"
                  :picker-options="pickerShortcuts"
                  value-format="dd-MM-yyyy"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.dailyProductionQuantity.monthly") }}
              </div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.monthly"
                  :disabled="!!filters.daily || !!filters.yearly"
                  type="month"
                  style="width: 100%; height: 100%"
                  placeholder="MM.yyyy"
                  :picker-options="pickerShortcuts"
                  value-format="MM-yyyy"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.dailyProductionQuantity.yearly") }}
              </div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.yearly"
                  :disabled="!!filters.monthly || !!filters.daily"
                  type="year"
                  style="width: 100%; height: 100%"
                  placeholder="yyyy"
                  :picker-options="pickerShortcuts"
                  value-format="yyyy"
                >
                </el-date-picker>
              </div>
            </v-col> -->
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.placedOrdersBox.fromDate") }}
              </div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.from"
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
            <v-col cols="12" lg="3">
              <div class="label">{{ $t("forms.placedOrdersBox.toDate") }}</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.to"
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
          </v-row>
          <div class="d-flex justify-center">
            <v-btn
              width="140"
              outlined
              color="#544B99"
              elevation="0"
              class="text-capitalize mr-4 rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              {{ $t("forms.calculationsList.btnReset") }}
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filter"
            >
              {{ $t("forms.calculationsList.btnGenerate") }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-overlay v-model="isLoad" class="align-center justify-center">
      <v-progress-circular
        color="#544B99"
        indeterminate
        size="80"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      filter_form: true,
      filters: {
        to: "",
        from: "",
      },
      isLoad: false,

      modelNumSearch: "",
      pdfServe: "",
      partnerName: "",
    };
  },
  created() {},

  computed: {
    ...mapGetters({
      pdfList: "generatePdf/dailyProductionPdfList",
    }),
  },

  watch: {
    pdfList(val) {
      const blob = new Blob(
        [new Uint8Array([...val].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
      this.pdfServe = objectUrl;
      this.isLoad = false;
    },
  },

  methods: {
    ...mapActions({
      getPdfList: "generatePdf/getDailyProductionPdfList",
    }),

    resetFilter() {
      this.$refs.filters.reset();
      this.filters.to = "";
      this.filters.from = "";
    },
    filter() {
      const data = {
        from:this.filters.from,
        to:this.filters.to,
      };
      if(data.from&&data.to){
        this.getPdfList(data);
        this.isLoad = true;
      }
    },
  },
};
</script>
<style lang=""></style>
