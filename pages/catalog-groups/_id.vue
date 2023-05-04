<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
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
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="3" md="6">
            <div class="mb-2 text-body-1">Catalogs group code</div>
            <v-text-field
              v-model="catalogs_list.groupCode"
              label="Enter Catalogs group code"
              filled
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <div class="mb-2 text-body-1">Catalogs group name</div>
            <v-text-field
              v-model="catalogs_list.groupName"
              label="Enter Catalogs group name"
              filled
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <div class="mb-2 text-body-1">Creator</div>
            <v-text-field
              v-model="catalogs_list.createdAt"
              filled
              disabled
              label="Enter Creator"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <div class="mb-2 text-body-1">Created date</div>
            <v-text-field
              v-model="catalogs_list.updatedAt"
              filled
              disabled
              label="Enter Created date"
              class="mb-4"
              color="#7631FF"
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
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="save"
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="elevation-0 rounded-lg mt-5">
      <v-tabs
        v-if="catalogGroupId !== ''"
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
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CanvasTypePage from "../../components/FabricCatalogs/CanvasType.vue";
import YarnTypePage from "../../components/FabricCatalogs/YarnType.vue";
import YarnNumberPage from "../../components/FabricCatalogs/YarnNumberPage.vue";
import CompositionPage from "../../components/FabricCatalogs/Composition.vue";

export default {
  components: {CompositionPage, YarnNumberPage, YarnTypePage, CanvasTypePage},
  data() {
    return {
      tab_boolean: false,
      tab: null,
      items: ['Canvas type', 'Yarn type', 'Yarn number', 'Composition'],
      componentsData: ["CanvasTypePage", "YarnTypePage", "YarnNumberPage", "CompositionPage"],
      catalogs_list: {
        groupCode: "",
        groupName: "",
        createdAt: "",
        updatedAt: ""
      },
      map_links: [
        {
          text: this.$t('billingCompany.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: "Catalog Groups",
          disabled: false,
          to: this.localePath('/catalog-groups'),
          icon: true
        },
        {
          text: this.$t('billingCompany.child.details'),
          disabled: true,
          to: this.localePath('/catalog-groups/'),
          icon: false
        },
      ],
    }
  },
  watch: {
    async catalog_one_list(elem) {
      this.catalogs_list = JSON.parse(JSON.stringify(elem));
    },
  },
  computed: {
    ...mapGetters({
      catalog_one_list: "catalogGroups/catalog_one_list",
      catalogGroupId: "catalogGroups/catalogGroupId",
    })
  },
  methods: {
    ...mapActions({
      getCatalogOneId: "catalogGroups/getCatalogOneId",
      createFabricCatalogs: "catalogGroups/createFabricCatalogs",
    }),
    async save() {
      const {groupCode, groupName} = this.catalogs_list;
      const item = {groupCode, groupName}
      await this.createFabricCatalogs(item);
    },
  },
  async mounted() {
    if (this.$route.params.id !== "create") {
      this.tab_boolean = true;
      const id = this.$route.params.id;
      await this.$store.commit("catalogGroups/setCatalogGroupId", id);
      const catalog_one_id = this.$route.params.id;
      await this.getCatalogOneId(catalog_one_id);
    }
    await this.$store.commit('setPageTitle', 'Catalogs');
  },
}
</script>

<style lang="scss" scoped>

</style>
