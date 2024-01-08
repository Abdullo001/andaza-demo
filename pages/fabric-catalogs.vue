<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>Fabric catalogs</div>
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
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Catalogs group code"
              filled
              disabled
              dense
              placeholder="Enter Catalogs Group code"
              class="mb-4"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Catalogs group name"
              filled
              dense
              disabled
              placeholder="Enter Catalogs group name"
              class="mb-4"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Group parts code"
              filled
              dense
              disabled
              placeholder="Enter Group parts code"
              class="mb-4"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Group part name"
              filled
              dense
              disabled
              placeholder="Enter Group part name"
              class="mb-4"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Creator"
              filled
              disabled
              dense
              placeholder="Enter Creator"
              class="mb-4"
              color="#544B99"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Created date"
              filled
              dense
              disabled
              placeholder="Select Created date"
              class="mb-4"
              color="#544B99"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer/>
        <v-btn
          color="#544B99"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="elevation-0 rounded-lg mt-5">
      <v-tabs
        color="#544B99"
        v-model="tab"
      >
        <v-tab
          class="text-capitalize"
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
        <v-tabs-slider color="#544B99"/>
        <v-tabs-items
          v-model="tab"
        >
          <v-tab-item
            v-for="component in componentsData"
            :key="component"
          >
            <div v-if="component === 'CanvasTypePage'">
              <CanvasTypePage/>
            </div>
            <div v-if="component === 'YarnTypePage'">
              <YarnTypePage/>
            </div>
            <div v-if="component === 'YarnNumberPage'">
              <YarnNumberPage/>
            </div>
            <div v-if="component === 'CompositionPage'">
              <CompositionPage/>
            </div>
            <div v-if="component === 'DensityPage'">
              <DensityPage/>
            </div>
            <div v-if="component === 'Wool'">
              <WoolPage/>
            </div>
            <div v-if="component === 'PeachEffectPage'">
              <PeachEffectPage/>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>


import CanvasTypePage from "./canvas-type.vue";
import YarnNumberPage from "./yarn-numbers.vue";
import CompositionPage from "../components/FabricCatalogs/Composition.vue";
import DensityPage from "../components/FabricCatalogs/Density.vue";
import WoolPage from "../components/FabricCatalogs/Wool.vue";
import PeachEffectPage from "../components/FabricCatalogs/PeachEffect.vue";
import YarnTypePage from "../components/FabricCatalogs/YarnType.vue";

export default {
  name: 'CatalogFabricPage',
  components: {YarnTypePage, PeachEffectPage, WoolPage, DensityPage, CompositionPage, YarnNumberPage, CanvasTypePage},
  data() {
    return {
      new_dialog: false,
      items: ['Canvas type', 'Yarn type', 'Yarn number', 'Composition', 'Density', 'Wool', 'Peach effect'],
      componentsData: ["CanvasTypePage", "YarnTypePage", "YarnNumberPage", "CompositionPage", "DensityPage", "Wool", "PeachEffectPage"],
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

}
</script>

<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #544B99;
}

.el-date-editor--datetime {
  width: 100%;
  border: 5px solid red;
}
</style>
