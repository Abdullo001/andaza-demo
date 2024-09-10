<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Size/m"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.size"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="CBM/m3"
              outlined
              class="rounded-lg filter"
              v-model.trim="filters.cbm"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2" style="max-width: 240px">
            <el-date-picker
              v-model="filters.createdAt"
              type="datetime"
              class="filter_picker"
              :placeholder="$t('catalogsPartnerType.child.created')"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              v-model="filters.updatedAt"
              type="datetime"
              class="filter_picker"
              :placeholder="$t('catalogsPartnerType.child.updated')"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
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
                {{ $t("catalogsPartnerType.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("catalogsPartnerType.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="boxSizeList"
      :items-per-page="itemPrePage"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      :loading="loading"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
             {{ $t('accessoryWarehouse.boxSize') }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
             {{ $t('accessoryWarehouse.addBoxSize') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
           {{ $t('accessoryWarehouse.addBoxSize') }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="8">
                <div class="label">{{ $t('accessoryWarehouse.size') }}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="base rounded-lg"
                  v-model="create_boxSize.size"
                  placeholder="Enter sizes of box sites"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="4">
                <div class="label">CBM/m3</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="base rounded-lg"
                  v-model="create_boxSize.cbm"
                  dense
                  disabled
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{ $t('prefinances.child.description') }}</div>
                <v-textarea
                  outlined
                  hide-details
                  class="base rounded-lg"
                  v-model="create_boxSize.description"
                  placeholder="Enter sizes  description"
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
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveBoxSizeList"
          >
            {{ $t("catalogsPartnerType.dialog.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
                Edit Box Size
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="8">
                <div class="label">Size/m</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="base rounded-lg"
                  v-model="edit_boxSize.size"
                  placeholder="Enter sizes of box sites"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="4">
                <div class="label">CBM/m3</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="base rounded-lg"
                  v-model="edit_boxSize.cbm"
                  dense
                  disabled
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  outlined
                  hide-details
                  class="base rounded-lg"
                  v-model="edit_boxSize.description"
                  placeholder="Enter sizes  description"
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
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="updateBoxSizeSample"
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
        <v-card-title class="d-flex justify-center">
          Delete Box Size
        </v-card-title>
        <v-card-text>
          Are you sure you want to Delete this box size?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteBoxSizeSample"
          >
            {{ $t("catalogsPartnerType.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "compositionPages",
  data() {
    return {
      edit_dialog: false,
      valid_search: false,
      delete_dialog: false,
      new_dialog: false,
      valid_date: false,
      itemPrePage: 10,
      current_page: 0,
      options: {},
      headers: [
        {
          text: this.$t("process.table.id"),
          value: "id",
          align: "start",
          sortable: false,
          width: "100",
        },
        {
          text: this.$t('accessoryWarehouse.size'),
          value: "size",
          align: "start",
          sortable: false,
          width: "100",
        },
        { text: "CBM/m3", value: "cbm" },
        {
          text: this.$t('prefinances.child.description'),
          value: "description",
        },
        {
          text: this.$t('catalogsPartnerType.child.created'),
          value: "createdAt",
        },
        {
          text: this.$t('catalogsPartnerType.child.updated'),
          value: "updatedAt",
        },
        {
          text: this.$t("process.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      create_boxSize: {
        size: "",
        cbm: "",
        description: "",
      },
      edit_boxSize: {
        size: "",
        cbm: "",
        id: "",
        description: "",
      },
      delete_sample: {},
      filters: {
        size: "",
        cbm: "",
        createdBy:"",
        createdAt: "",
      },
    };
  },
  watch: {
    'create_boxSize.size'(val){
      let res = val?.split("*");
      let result = res?.reduce((acc, currentValue) => acc * currentValue, 1);
      result = parseFloat(result.toFixed(3));
      this.create_boxSize.cbm = result
    },
    'edit_boxSize.size'(val){
      let res = val?.split("*");
      let result = res?.reduce((acc, currentValue) => acc * currentValue, 1);
      result = parseFloat(result.toFixed(2));
      this.edit_boxSize.cbm = result
    },
  },
  async created() {
    await this.$store.dispatch("boxSize/getBoxSizeList", { page: 0, size: 10 });
  },
  computed: {
    ...mapGetters({
      loading: "boxSize/loading",
      boxSizeList: "boxSize/boxSizeList",
    }),
  },
  methods: {
    ...mapActions({
      getBoxSizeList: "boxSize/getBoxSizeList",
      createBoxSize: "boxSize/createBoxSize",
      updateBoxSize: "boxSize/updateBoxSize",
      deleteBoxSize: "boxSize/deleteBoxSize",
      filterBoxSizeData: "boxSize/filterBoxSizeData",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.$store.dispatch("boxSize/getBoxSizeList", {
        page: 0,
        size: this.itemPrePage,
      });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.$store.dispatch("boxSize/getBoxSizeList", {
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async getDeleteItem(item) {
      this.delete_sample = { ...item };
      this.delete_dialog = true;
    },
    async deleteBoxSizeSample() {
      const id = this.delete_sample.id;
      await this.deleteBoxSize({id});
      this.delete_dialog = false;
    },
    async saveBoxSizeList() {
      console.log(this.boxSizeList)
      const items = { ...this.create_boxSize };
      await this.createBoxSize(items);
      this.create_boxSize = {
        size: "",
        cbm: "",
        description: "",
      };
      this.new_dialog = false;
    },
    editItem(item) {
      this.edit_boxSize = { ...item };
      this.edit_dialog = true;
    },
    async updateBoxSizeSample() {
      const items = { ...this.edit_boxSize };
      await this.updateBoxSize(items);
      this.edit_dialog = false;
    },
    async resetFilters() {
      this.filters = {
        size: "",
        cbm: "",
        createdBy: "",
        createdAt: "",
      };
      await this.getBoxSizeList({ page: 0, size: 10 });
    },
    async filterData() {
      const items = { ...this.filters };
      if(items.createdAt !== "" && items.updatedAt !== ""){
        await this.filterBoxSizeData(items);
        this.valid_date = true;
      }else {
        await this.filterBoxSizeData(items);
      }
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
