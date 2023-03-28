<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Color code"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Color name"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2" style="max-width: 240px;"
          >
            <el-date-picker
              v-model="filter_partner.createdAt"
              type="datetime"
              placeholder="Created"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              v-model="filter_partner.updatedAt"
              type="datetime"
              placeholder="Updated"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-card class="rounded-lg mt-5 elevation-0">
      <v-tabs
        color="#7631FF"
        v-model="tab"
      >
        <v-tab
          class="text-capitalize"
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
        <v-tabs-slider color="#7631FF"/>
        <v-tabs-items
          v-model="tab"
        >
          <v-tab-item>
            <ProductTypePages/>
          </v-tab-item>
          <v-tab-item>
            <GenderTypePages/>
          </v-tab-item>
          <v-tab-item>
            <SizeCatalogsPages/>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>

import GenderTypePages from "@/components/productCatalogs/GenderType.vue";
import SizeCatalogsPages from "@/components/productCatalogs/SizeCatalogs.vue";
import ProductTypePages from "@/components/productCatalogs/ProcuctType.vue";

export default {
  name: 'CatalogProductPage',
  components: {ProductTypePages, SizeCatalogsPages, GenderTypePages},
  data() {
    return {
      filter_partner: {},
      valid_search: true,
      new_dialog: false,
      items: ["Product Type", "Gender Type", "Size"],
      tab: null,
      fields_status: true,
      headers: [
        {text: "Catalogs group code", value: "catalog"},
        {text: "Group part code", value: "group"},
        {text: "Canvas type", value: "canvasType"},
        {text: "Canvas type specifiaction", value: "specifiaction"},
        {text: "Description", value: "description"},
        {text: "Creator", value: "creator"},
        {text: "Created date", value: "Created date"},
      ],
    }
  },
  methods: {
    filterData(){},
    resetFilters(){},
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Catalogs');
  },
}
</script>

<style lang="scss" scoped>

</style>
