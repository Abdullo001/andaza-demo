<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>
          {{ $t("forms.inspectionFiles.title") }}
        </div>
        <v-spacer />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row class="mb-5">
            <v-col cols="12" lg="3">
              <div class="label">
                {{ $t("forms.placedOrdersBox.modelNumber") }}
              </div>
              <v-combobox
                v-model="modelNumber"
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
                :placeholder="
                  $t('forms.placedOrdersBox.modelNumberPlaceholder')
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
    <v-data-table
      :headers="headers"
      :items="inspectionList"
      :items-per-page="50"
      class="elevation-0 mt-4"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <div class="title">
              {{ $t("forms.inspectionFiles.inspection") }}
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.sendDate="{item}">
        {{ formatLong(item.sendDate) }}
      </template>
      <template #item.result="{item}">
        <v-chip :color="statusColor.inspectionStatus(item.result)" dark class="font-weight-bold ml-5">{{ item.result }}</v-chip>
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-tooltip top color="#544B99">
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                class="ml-2"
                :href="item.filePath"
                :download="`Document.${item.filePath}`"
                v-on="on"
                v-bind="attrs"
                @click.stop
              >
                <v-img src="/download.svg" max-width="24" />
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      modelNumber: "",
      modelNumSearch: "",
      filter_form: true,
      headers: [
        {text:  this.$t('inspectionBox.inspectionDate'), sortable: false, value: 'sendDate'},
        {text: this.$t('inspectionBox.titleDoc'), sortable: false, value: 'title'},
        {text:this.$t('listsModels.child.description'), sortable: false, value: 'description'},
        {text: this.$t('partners.table.status'),  sortable: false, value: 'result'},
        {text: this.$t("catalogGroups.tabs.table.createdAt"), sortable: false, value: 'createdAt'},
        {text: this.$t("catalogGroups.tabs.table.actions"), sortable: false, align: 'center', value: 'actions'},
      ],
      inspectionList: [],
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
    ...mapGetters({
      modelsList: "models/modelsList",
      inspectionFileList: "inspectionFile/inspectionFileList",
    }),
  },
  watch: {
    inspectionFileList(val) {
      this.inspectionList = JSON.parse(JSON.stringify(val));
      
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
      getModelsList: "models/getModelsList",
      getInspectionFileList: "inspectionFile/getInspectionFileList",
    }),
    resetFilter() {
      this.$refs.filters.reset();
    },
    filter() {
      this.getInspectionFileList(this.modelNumber.id);
    },
  },
};
</script>
<style lang=""></style>
