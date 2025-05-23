<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>{{ $t("forms.calculationsList.title") }}</div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.calculationsList.clientName") }}
              </div>
              <v-combobox
                v-model="filters.clientName"
                :items="partnerWithTypes"
                item-text="name"
                item-value="name"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="
                  $t('forms.calculationsList.clientNamePlaceholder')
                "
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
              <div class="label">{{ $t("forms.calculationsList.gender") }}</div>
              <v-select
                :items="gander_enums"
                item-text="text"
                item-value="val"
                v-model="filters.gender"
                :placeholder="$t('forms.calculationsList.genderPlaceholder')"
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
                {{ $t("forms.calculationsList.fromDate") }}
              </div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.fromDate"
                  type="date"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="timestamp"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">{{ $t("forms.calculationsList.toDate") }}</div>
              <div style="height: 40px !important">
                <el-date-picker
                  v-model="filters.toDate"
                  type="date"
                  style="width: 100%; height: 100%"
                  placeholder="dd.MM.yyyy HH:mm:ss"
                  :picker-options="pickerShortcuts"
                  value-format="timestamp"
                >
                </el-date-picker>
              </div>
            </v-col>
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.calculationsList.country") }}
              </div>
              <v-combobox
                v-model="filters.country"
                :items="countryList"
                :search-input.sync="countryIdSearch"
                item-text="name"
                item-value="id"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="$t('forms.calculationsList.country')"
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
              <div class="label">{{ $t("forms.calculationsList.season") }}</div>
              <v-select
                :items="season_enums"
                v-model="filters.season"
                :placeholder="$t('forms.calculationsList.seasonPlaceholder')"
                item-text="text"
                item-value="key"
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
                {{ $t("forms.calculationsList.creator") }}
              </div>
              <v-combobox
                v-model="filters.creatorId"
                :items="users"
                :search-input.sync="creatorSearch"
                item-text="name"
                item-value="id"
                validate-on-blur
                outlined
                hide-details
                height="44"
                class="rounded-lg filter d-flex align-center justify-center mr-2"
                :return-object="true"
                dense
                :placeholder="$t('forms.calculationsList.creatorPlaceholder')"
                prepend-icon=""
              >
                <template #append>
                  <v-icon class="d-inline-block" color="#544B99">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-combobox>
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
        clientName: "",
        country: "",
        season: "",
        fromDate: "",
        toDate: "",
        gender: "",
        creatorId: "",
      },
      season_enums: [
        {
          key: "SS",
          text: this.$t("forms.calculationsList.season_enums.spring"),
        },
        {
          key: "AW",
          text: this.$t("forms.calculationsList.season_enums.autumn"),
        },
      ],
      gander_enums: [
        {
          val: "MALE",
          text: this.$t("forms.calculationsList.gender_enums.male"),
        },
        {
          val: "FEMALE",
          text: this.$t("forms.calculationsList.gender_enums.female"),
        },
        {
          val: "BOY",
          text: this.$t("forms.calculationsList.gender_enums.boy"),
        },
        {
          val: "GIRL",
          text: this.$t("forms.calculationsList.gender_enums.girl"),
        },
        {
          val: "UNISEX",
          text: this.$t("forms.calculationsList.gender_enums.unisex"),
        },
      ],
      fabric_status: ["NOT_PLANNED", "PLANNED", "GENERATED_FABRIC", "ORDERED"],
      accessory_status: ["NOT_PLANNED", "PLANNED", "ORDERED"],
      isLoad: false,

      clientSearch: "",
      countryIdSearch: "",
      creatorSearch: "",
      users: [],
      pdfServe: "",
    };
  },
  created() {
    this.getCountryList({ name: this.countryIdSearch });
    this.getUsersList();
    this.getPartnersWithTypes(["buyer"])
  },

  computed: {
    ...mapGetters({
      partnerWithTypes: "partners/partnerWithTypes",
      countryList: "partners/countryList",
      usersList: "orders/usersList",
      pdfList: "generatePdf/calculationsPdfList",
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
    usersList(list) {
      list.map((item) => {
        this.users.push({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        });
      });
    },

    countryIdSearch(val) {
      this.getCountryList({ name: val });
    },
  },

  methods: {
    ...mapActions({
      getPartnersWithTypes: "partners/getPartnersWithTypes",
      getCountryList: "partners/getCountryList",
      getUsersList: "orders/getUsersList",
      getPdfList: "generatePdf/getCalculationsPdfList",
    }),

    resetFilter() {
      this.$refs.filters.reset();
    },
    filter() {
      const data = {
        clientId: this.filters.clientName?.id || null,
        countryId: this.filters.country?.id || null,
        creatorId: this.filters.creatorId?.id || null,
        from: this.filters.fromDate || null,
        gender: this.filters.gender || null,
        season: this.filters.season || null,
        to: this.filters.toDate || null,
      };
      this.getPdfList(data);
      this.isLoad = true;
    },
  },
};
</script>
<style lang=""></style>
