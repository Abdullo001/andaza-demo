<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">

          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model.trim="filter_model.name"
              :label="$t('catalogsModelGroup.child.namePartnerType')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t("catalogsModelGroup.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("catalogsModelGroup.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg"
      :headers="headers"
      :items="allItems"
      :loading="loading"
      :options.sync="options"
      :server-items-length="modelTotalElements"
      :items-per-page="itemPrePage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:items-per-page="size"
      @update:page="page"
      @click:row="(item) => viewDetails(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("catalogsModelGroup.dialog.modelGroup") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("catalogsModelGroup.dialog.enterModelGroup") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex justify-center">
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
          <v-tooltip top color="#544B99">
            <template v-slot:activator="{on, attrs}">
              <v-btn
                icon color="#544B99"
                v-on="on" v-bind="attrs"
                @click="viewDetails(item)"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <span>Details</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogsModelGroup.dialog.addModelGroup") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('catalogsModelGroup.dialog.modelGroup')}}</div>
                <v-text-field
                  v-model="create_model.name"
                  outlined
                  hide-details
                  height="44"
                  class="base rounded-lg"
                  :placeholder="$t('catalogsModelGroup.dialog.enterModelGroup')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('catalogsModelGroup.dialog.description')}}</div>
                <v-textarea
                  v-model="create_model.description"
                  outlined
                  hide-details
                  class="base rounded-lg"
                  :placeholder="$t('catalogsModelGroup.dialog.descriptionPlacholder')"
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
            {{ $t("catalogsModelGroup.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("catalogsModelGroup.dialog.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogsModelGroup.dialog.editDialog") }}
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('catalogsModelGroup.dialog.modelGroup')}}</div>
                <v-text-field
                  v-model="edit_model.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('catalogsModelGroup.dialog.enterModelGroup')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('catalogsModelGroup.dialog.description')}}</div>
                <v-textarea
                  v-model="edit_model.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('catalogsModelGroup.dialog.descriptionPlacholder')"
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
            {{ $t("catalogsModelGroup.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="update"
          >
            {{ $t("update") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center">{{
          $t("catalogsModelGroup.dialog.deleteDialog")
        }}</v-card-title>
        <v-card-text>
          {{ $t("catalogsModelGroup.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("catalogsModelGroup.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteModel"
          >
            {{ $t("catalogsModelGroup.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      valid_search: true,
      itemPrePage: 10,
      current_page: 0,
      headers: [
        {
          text: this.$t("catalogsModelGroup.table.id"),
          value: "id",
          align: "start",
          sortable: false,
          width: "100",
        },
        { text: this.$t("catalogsModelGroup.table.name"), value: "name" },
        {
          text: this.$t("catalogsModelGroup.table.description"),
          value: "description",
        },
        {
          text: this.$t("catalogsModelGroup.table.createdAt"),
          value: "createdAt",
        },
        {
          text: this.$t("catalogsModelGroup.table.updatedAt"),
          value: "updatedAt",
        },
        {
          text: this.$t("catalogsModelGroup.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      create_model: {
        name: "",
        description: "",
      },
      edit_model: {
        name: "",
        description: "",
      },
      delete_model: {},
      filter_model: {
        description: "",
        createdAt: "",
        updatedAt: "",
        name: "",
        id: "",
      },
      options: {},
      allItems:[],
    };
  },
  watch: {
    modelGroupList(val){
      this.allItems=JSON.parse(JSON.stringify(val))
    },
    async "options.sortBy"(elem) {
      if (elem[0] !== undefined) {
        if (this.options.sortDesc[0] !== undefined) {
          const items = {
            sortDesc: this.options.sortDesc[0],
            sortBy: elem[0],
          };
          await this.sortModelData({
            page: this.current_page,
            size: this.itemPrePage,
            data: items,
          });
        }
      }
    },
  },
  async created() {
    this.getModelGroupList({page:0,size:10})
  },
  computed: {
    ...mapGetters({
      loading: "model/loading",
      modelGroupList: "model/modelGroupList",
      modelTotalElements: "model/modelTotalElements",
    }),
  },
  methods: {
    ...mapActions({
      getModelGroupList: "model/getModelGroupList",
      createModelData: "model/createModelData",
      updateModelData: "model/updateModelData",
      deleteModelData: "model/deleteModelData",
      filterModelData: "model/filterModelData",
      sortModelData: "model/sortModelData",
    }),
    async deleteModel() {
      const id = this.delete_model.id;
      await this.deleteModelData(id);
      this.delete_dialog = false;
    },
    async update() {
      const items = { ...this.edit_model };
      await this.updateModelData(items);
      this.edit_dialog = false;
    },
    async save() {
      const data = { ...this.create_model };
      await this.createModelData(data);
      (this.new_dialog = false),
        (this.create_model = {
          name: "",
          description: "",
        });
    },
    async page(value) {
      this.current_page = value - 1;
      await this.getModelGroupList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getModelGroupList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    getDeleteItem(item) {
      this.delete_model = { ...item };
      this.delete_dialog = true;
    },
    editItem(item) {
      delete item.createdAt;
      delete item.updatedAt;
      this.edit_model = { ...item };
      this.edit_dialog = true;
    },
    async resetFilters() {
      await this.getModelGroupList({ page: 0, size: 10 });
      this.filter_model = {
        description: "",
        createdAt: "",
        updatedAt: "",
        name: "",
        id: "",
      };
    },
    async filterData() {
      await this.getModelGroupList({ page: 0, size: 10, modelGroupName:this.filter_model.name })
    },
    viewDetails(item){
      this.$router.push(this.localePath(`/model/${item.id}`))
    },
  },

  mounted() {
    this.$store.commit("setPageTitle", this.$t("sidebar.catalogs"));
  },
};
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon,
.el-icon-time {
  color: #919191 !important;
}
</style>
