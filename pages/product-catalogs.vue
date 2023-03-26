<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        <div> Product catalogs</div>
        <v-spacer/>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            Delete
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            color="#777C85"
          >
            <v-img :src="fields_status ? '/edit.svg' : '/edit-active.svg'" class="mr-1"/>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="4" md="6">
            <v-text-field
              label="Catalogs group code"
              filled
              dense
              placeholder="Enter Catalogs group code"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="4" md="6">
            <v-text-field
              label="Catalogs group name"
              filled
              dense
              placeholder="Enter Catalogs group name"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="4" md="6">
            <v-text-field
              label="Group parts code"
              filled
              dense
              placeholder="Enter Group parts code"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="4" md="6">
            <v-text-field
              label="Group part name"
              filled
              dense
              placeholder="Select Group part name"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="4" md="6">
            <v-text-field
              label="Creator"
              filled dense
              item-value="id"
              item-text="name"
              placeholder="Enter Creator"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="4" md="6">
            <v-select
              label="Created date"
              filled dense
              append-icon="mdi-chevron-down"
              placeholder="Select Created date"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer/>
        <v-btn
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
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
  name: 'addOrEditModelsPage',
  components: {ProductTypePages, SizeCatalogsPages, GenderTypePages},
  data() {
    return {
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
  mounted() {
    this.$store.commit('setPageTitle', 'Catalogs');
  },
}
</script>

<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #7631FF;
}

.el-date-editor--datetime {
  width: 100%;
  border: 5px solid red;
}
</style>
