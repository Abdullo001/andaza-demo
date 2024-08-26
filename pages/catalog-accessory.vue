<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-lg">
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filter_accessory.id"
              :label="$t('catalogAccessory.table.IdAccessory')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filter_accessory.name"
              :label="$t('catalogAccessory.table.accessoryName')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              style="width: 100%"
              v-model="filter_accessory.createdAt"
              type="datetime"
               :placeholder="$t('measurementUnit.child.created')"
              class="filter_picker"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              style="width: 100%"
              v-model="filter_accessory.updatedAt"
              type="datetime"
             :placeholder="$t('measurementUnit.child.updated')"
              class="filter_picker"
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
                {{ $t("partners.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                 {{ $t("partners.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items-per-page="itemPrePage"
      :loading="loading"
      :server-items-length="totalElements"
      :items="accessory_list"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">{{ $t("catalogAccessory.dialog.accessory") }}</div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("catalogAccessory.dialog.addAccessory") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.checkbox="{ item }">
        <v-checkbox />
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
          <div class="text-capitalize font-weight-bold"> {{ $t("catalogAccessory.dialog.addAccessory") }}</div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t("catalogAccessory.table.accessoryName") }}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="create_accessory.name"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('catalogAccessory.dialog.enterNameAccessory')"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">{{ $t("catalogAccessory.table.measurementUnit") }}</div>
                <v-select
                  v-model="create_accessory.measurementUnitId"
                  :items="measurement"

                  :rules="[ formRules.required ]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"

                  dense
                  item-text="name"
                  item-value="id"
                  :placeholder="$t('catalogAccessory.dialog.selectMeasurementUnit')"
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="7">
                <div class="label">{{ $t("catalogAccessory.dialog.addSpecification") }}</div>
                <v-text-field
                  v-model="specification"
                  color="#544B99"
                  :placeholder="$t('catalogAccessory.dialog.enterSpecification')"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                  @keydown.enter="addSpecification"
                />
              </v-col>
              <v-col cols="12" md="5" class="d-flex align-end">
                <v-btn
                  @click="addSpecification"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                 {{ $t("catalogAccessory.dialog.addSpecification") }}
                </v-btn>
              </v-col>

              <v-col cols="12">
                <div class="label">{{ $t("catalogAccessory.dialog.specifications") }}</div>
                <v-autocomplete
                  chips
                  multiple
                  v-model="create_accessory.specification"
                  :items="specificationList"
                  deletable-chips
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Select specification name"
                  single-line
                  color="#544B99"
                >
                  <template v-slot:selection="{item, attrs, on}">
                    <v-chip
                      v-bind="attrs"
                      v-on="on"
                      color="#544B99"
                      dark
                      close
                      @click:close="remove(item)"
                    >
                      {{ item }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12">
                <div class="label">{{ $t("catalogAccessory.table.description") }}</div>
                <v-textarea
                  v-model="create_accessory.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  rows="1"
                  dense
                  auto-grow
                   :placeholder="$t('catalogAccessory.dialog.enterDescription')"
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
            {{ $t("sizeTemplate.dialog.cancel")}}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("sizeTemplate.dialog.add")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Accessory</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label">Name accessory</div>
                <v-text-field
                  v-model="edit_accessory.name"

                  :rules="[ formRules.required ]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"

                  placeholder="Enter Name accessory"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label">Measurement unit</div>
                <v-select
                  v-model="edit_accessory.measurementUnitId"

                  :rules="[ formRules.required ]"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"

                  :items="measurement"
                  item-text="name"
                  item-value="id"
                  placeholder="Select Measurement unit"
                  dense
                  append-icon="mdi-chevron-down"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" md="7">
                <div class="label">Add Specification</div>
                <v-text-field
                  v-model="editSpecification"
                  color="#544B99"
                  placeholder="Enter specification"
                  outlined
                  hide-details
                  height="44"
                  dense
                  class="base rounded-lg mr-3"
                  @keydown.enter="editSpecificationFunc"
                />
              </v-col>
              <v-col cols="12" md="5" class="d-flex align-end">
                <v-btn
                  @click="editSpecificationFunc"
                  color="#544B99"
                  class="rounded-lg text-capitalize"
                  dark
                >
                  <v-icon>mdi-plus</v-icon>
                  Add Specification
                </v-btn>
              </v-col>

              <v-col cols="12">
                <div class="label">Specifications</div>
                <v-autocomplete
                  chips
                  multiple
                  v-model="edit_accessory.specification"
                  :items="specificationList"
                  deletable-chips
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  placeholder="Select specification name"
                  single-line
                  color="#544B99"
                >
                  <template v-slot:selection="{item, attrs, on}">
                    <v-chip
                      v-bind="attrs"
                      v-on="on"
                      color="#544B99"
                      dark
                      close
                      @click:close="remove(item)"
                    >
                      {{ item }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  v-model="edit_accessory.description"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  rows="1"
                  auto-grow
                  placeholder="Enter Description"
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
            cancel
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
        <v-card-title class="d-flex justify-center"
          >Delete Accessory</v-card-title
        >
        <v-card-text>
          Are you sure you want to Delete this Accessory?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteItem"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CatalogAccessoryPage",
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,
      delete_accessory_id: "",
      edit_validate: true,
      validate: true,
      create_accessory: {
        measurementUnitId: "",
        name: "",
        specification: [],
        description: "",
      },
      specification:"",
      editSpecification:"",
      edit_accessory: {},
      filter_accessory: {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      },
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        { text: this.$t("sizeTemplate.table.id"),  value: "id", sortable: false },
        { text:this.$t("samplePurposes.table.name"), value: "name", sortable: false },
        { text: this.$t("catalogAccessory.table.specification"), value: "specification", sortable: false },
        { text:  this.$t("catalogAccessory.table.measurementUnit"), value: "measurementUnit", sortable: false },
        { text:  this.$t("catalogAccessory.table.accessoryType"), value: "accessoryType", sortable: false },
        { text: this.$t("samplePurposes.table.createdAt"), value: "createdAt", sortable: false },
        { text:  this.$t("catalogAccessory.table.description"), value: "description", sortable: false },
        { text: this.$t("samplePurposes.table.updatedAt"), value: "updatedAt", sortable: false },
        { text: this.$t("samplePurposes.table.actions"), value: "actions", align: "center", sortable: false },
      ],
      specificationList:[],

    };
  },
  async created() {
    await this.getAccessoryList({ page: 0, size: 10 });
    await this.$store.dispatch("packageshape/getMeasurementUnit");
    await this.getAccessoryTypeId({ page: 0, size: 50 });
  },
  computed: {
    ...mapGetters({
      loading: "catalogAccessory/loading",
      accessory_list: "catalogAccessory/accessory_list",
      measurement: "packageshape/measurement",
      totalElements: "catalogAccessory/totalElements",
      accessory_type_id: "catalogAccessory/accessory_type_id",
    }),
  },

  watch:{
    "create_accessory.specification"(value) {
      this.specificationList = value
    },
    "edit_accessory.specification"(value) {
      this.specificationList = value
    },
  },

  methods: {
    ...mapActions({
      getAccessoryList: "catalogAccessory/getAccessoryList",
      getAccessoryTypeId: "catalogAccessory/getAccessoryTypeId",
      createAccessoryList: "catalogAccessory/createAccessoryList",
      updateAccessoryList: "catalogAccessory/updateAccessoryList",
      deleteAccessoryList: "catalogAccessory/deleteAccessoryList",
      filterAccessoryList: "catalogAccessory/filterAccessoryList",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getAccessoryList({ page: 0, size: this.itemPrePage });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getAccessoryList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },

    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        const item = { ...this.create_accessory };
        await this.createAccessoryList(item);
        this.$refs.new_form.reset();
        this.new_dialog = false;
      }
    },
    editSpecificationFunc() {
      if (this.editSpecification !== "") {
        const item = this.editSpecification;
        this.edit_accessory.specification.push(item);
        this.editSpecification = "";
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate) {
        const { id, description, measurementUnitId, name, specification } =
          this.edit_accessory;
        const item = {
          id,
          description,
          measurementUnitId,
          name,
          specification,
        };
        await this.updateAccessoryList(item);
        this.edit_dialog = false;
      }
    },
    async deleteItem() {
      await this.deleteAccessoryList(this.delete_accessory_id);
      this.delete_dialog = false;
    },
    editItem(item) {
      this.edit_accessory = { ...item };
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_accessory_id = item.id;
      this.delete_dialog = true;
    },
    async filterData() {
      await this.filterAccessoryList(this.filter_accessory);
    },

    addSpecification() {
      const item = this.specification;
      if (!!item) {
        this.create_accessory.specification.push(item);
        this.specification = "";
      }
    },

    remove(item) {
      const index = this.specificationList.indexOf(item)
      if (index >= 0) this.specificationList.splice(index, 1)
    },

    async resetFilters() {
      this.filter_accessory = {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      };
      await this.getAccessoryList({ page: 0, size: 10 });
    },
  },
  mounted() {
    this.$store.commit("setPageTitle",this.$t('sidebar.catalogs'));
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
