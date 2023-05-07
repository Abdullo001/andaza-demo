<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.id"
              label="Id packege shape"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.name"
              label="Name"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              style="width: 100%"
              v-model="filters.createdAt"
              type="datetime"
              placeholder="Created"
              :picker-options="pickerShortcuts"
              format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              style="width: 100%;"
              v-model="filters.updatedAt"
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
    <v-data-table
      :headers="headers"
      :items="packageShape"
      :loading="loading"
      :server-items-length="totalElements"
      :options.sync="options"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Package shape</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Package shape
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="delete.svg" max-width="27"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Create Package shape</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              v-model="create_package.name"
              filled
              label="Name"
              placeholder="Enter name package shape"
              color="#7631FF"
            />
            <v-textarea
              v-model="create_package.description"
              filled
              label="Description"
              placeholder="Enter package shape description"
              color="#7631FF"
            />
            <v-select
              v-model="create_package.measurementId"
              :items="measurement"
              filled
              item-text="name"
              item-value="id"
              append-icon="mdi-chevron-down"
              label="Measurement unit ID"
              placeholder="Select Measurement unit ID"
              color="#7631FF"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="save"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Package shape</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              v-model="edit_package.name"
              filled
              label="Name"
              placeholder="Enter name package shape"
              color="#7631FF"
            />
            <v-textarea
              v-model="edit_package.description"
              filled
              label="Description"
              placeholder="Enter package shape description"
              color="#7631FF"
            />
            <v-select
              v-model="edit_package.measurement"
              :items="measurement"
              filled
              disabled
              append-icon="mdi-chevron-down"
              item-text="name"
              item-value="id"
              label="Measurement unit ID"
              placeholder="Select Measurement unit ID"
              color="#7631FF"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="update"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Package shape</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this package shape?
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
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deletePackage"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PackageShapePage",
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      itemPrePage: 10,
      current_page: 0,
      options: {},
      headers: [
        {text: "Id", value: "id", sortable: false},
        {text: "Name", value: "name",},
        {text: "Description", value: "description",},
        {text: "Created At", value: "createdAt",},
        {text: "Updated At", value: "updatedAt",},
        {text: "Measurement", value: "measurementUnit",},
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
      create_package: {
        name: "",
        measurementId: "",
        description: "",
      },
      edit_package: {
        name: "",
        description: "",
        measurement: {
          id: "",
          name: "",
        },
      },
      delete_package: {},
      filters: {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      },
    }
  },
  watch: {
    async "options.sortBy"(elem) {
      if (elem[0] !== undefined) {
        if (this.options.sortDesc[0] !== undefined) {
          const items = {
            sortDesc: this.options.sortDesc[0],
            sortBy: elem[0]
          }
          await this.sortPackageShape({page: this.current_page, size: this.itemPrePage, data: items})
        }
      }
    }
  },
  async created() {
    await this.$store.dispatch("packageshape/getPackageShape", {page: 0, size: 10});
    await this.$store.dispatch("packageshape/getMeasurementUnit");
  },
  computed: {
    ...mapGetters({
      loading: "packageshape/loading",
      packageShape: "packageshape/packageShape",
      totalElements: "packageshape/totalElements",
      measurement: "packageshape/measurement",
    })
  },
  methods: {
    ...mapActions({
      getPackageShape: "packageshape/getPackageShape",
      createPackageShape: "packageshape/createPackageShape",
      updatePackageShape: "packageshape/updatePackageShape",
      deletePackageShape: "packageshape/deletePackageShape",
      filterPackageShape: "packageshape/filterPackageShape",
      sortPackageShape: "packageshape/sortPackageShape",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.$store.dispatch("packageshape/getPackageShape", {page: 0, size: this.itemPrePage});
    },
    async page(val) {
      this.current_page = val - 1;
      await this.$store.dispatch("packageshape/getPackageShape", {page: this.current_page, size: this.itemPrePage});
    },
    async deletePackage() {
      const id = this.delete_package.id;
      await this.deletePackageShape(id);
      this.delete_dialog = false;
    },
    async save() {
      const items = {...this.create_package};
      await this.createPackageShape(items);
      this.create_package = {
        name: "",
        measurementId: "",
        description: "",
      };
      this.new_dialog = false;
    },
    async update() {
      const items = {
        name: this.edit_package.name,
        id: this.edit_package.id,
        description: this.edit_package.description,
        measurementId: this.edit_package.measurement.id,
      }
      await this.updatePackageShape(items);
      this.edit_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_package = {...item};
      this.delete_dialog = true;
    },
    editItem(item) {
      delete item.createdAt;
      delete item.updatedAt;
      this.edit_package = {
        name: item.name,
        id: item.id,
        description: item.description,
        measurement: {
          id: item.measurementUnitId,
          name: item.measurementUnit,
        }
      }
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      };
      await this.getPackageShape({page: 0, size: 10});
    },
    async filterData() {
      const items = {...this.filters};
      await this.filterPackageShape(items);
    },
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Catalogs');
  }
}
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon, .el-icon-time {
  color: #919191 !important;
}
</style>
