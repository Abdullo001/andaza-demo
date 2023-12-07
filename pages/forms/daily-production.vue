<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          Daily production quantity
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="12" lg="3">
              <div class="label">Daily production</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.daily"
                  type="date"
                  :disabled="!!filters.monthly||!!filters.yearly"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy"
                  :picker-options="pickerShortcuts"
                  value-format="dd-MM-yyyy"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">Monthly production</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.monthly"
                  :disabled="!!filters.daily||!!filters.yearly"
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
              <div class="label">Yearly production</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.yearly"
                  :disabled="!!filters.monthly||!!filters.daily"
                  type="year"
                  style="width: 100%; height: 100%"
                  placeholder="yyyy"
                  :picker-options="pickerShortcuts"
                  value-format="yyyy"
                >
                </el-date-picker>
              </div>
            </v-col>
          </v-row>
          <div class="d-flex justify-center">
            <v-btn
              width="140"
              outlined
              color="#7631FF"
              elevation="0"
              class="text-capitalize mr-4 rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              Reset filters
            </v-btn>
            <v-btn
              width="140"
              color="#7631FF"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filter"
            >
              Generate
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-overlay v-model="isLoad" class="align-center justify-center">
      <v-progress-circular
        color="#7631FF"
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
        monthly:"",
        daily:"",
        yearly:"",
      },
      isLoad: false,

      
      modelNumSearch: "",
      pdfServe: "",
      partnerName:"",
    };
  },
  created() {
    
  },

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
      this.pdfServe=objectUrl
      this.isLoad = false;
    },
   
  },

  methods: {
    ...mapActions({
      
      getPdfList: "generatePdf/getDailyProductionPdfList",
      
    }),

    resetFilter() {
      this.$refs.filters.reset();
      this.filters.daily=""
      this.filters.monthly=""
      this.filters.yearly=""
    },
    filter() {

      const data = {
        dateTime:"",
      };
      if(!!this.filters.daily){
        data.dateTime=this.filters.daily
      }
      if(!!this.filters.monthly){
        data.dateTime=this.filters.monthly
      }
      if(!!this.filters.yearly){
        data.dateTime=this.filters.yearly
      }
      this.getPdfList(data);
      this.isLoad = true;
    },
  },
};
</script>
<style lang="">
</style>