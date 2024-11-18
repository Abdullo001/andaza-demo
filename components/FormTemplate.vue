<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          {{ title }}
        </div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <slot/>
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

    <v-overlay v-model="funcState" v-if="!funcState" class="align-center justify-center">
      <v-progress-circular
        color="#544B99"
        indeterminate
        size="80"
      ></v-progress-circular>
    </v-overlay>
    <v-overlay v-model="isLoad" v-else class="align-center justify-center">
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
  props:{
    title:{
      type:String,
      required:true
    },
    pdfList:{
      type:"",
      required:true
    },
    filterFunc:{
      type:Function,
      default:()=>{}
    },
    funcState:{
      type:Boolean,
      default: true,
    }
    // resetFunc:{
    //   type:Function,
    //   default:()=>{}
    // }

  },
  data() {
    return {
      filter_form: true,
      isLoad: false,

      modelNumSearch: "",
      pdfServe: "",
      partnerName: "",
    };
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
      this.$emit("loadingDisabler");

    },
  },

  methods: {
    resetFilter() {
      // this.resetFunc()
      this.$refs.filters.reset()

    },
    filter() {
      this.isLoad = true
      this.filterFunc()
    },
  },
};
</script>
<style lang=""></style>
