<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.id"
              :label="$t('measurementUnit.child.idSearch')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.name"
              :label="$t('measurementUnit.child.name')"
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
              v-model="filters.createdAt"
              type="datetime"
              class="filter_picker"
              :placeholder="$t('measurementUnit.child.created')"
              :picker-options="pickerShortcuts"
              format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              style="width: 100%"
              v-model="filters.updatedAt"
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
                {{ $t("measurementUnit.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("measurementUnit.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="measurementUnit"
      :items-per-page="itemPrePage"
      :options.sync="options"
      :server-items-length="totalElements"
      :loading="loading"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("measurementUnit.dialog.menuName") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("measurementUnit.dialog.addMainName") }}
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
            {{ $t("measurementUnit.dialog.enterMainName") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">

            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('measurementUnit.dialog.name')}}</div>
                <v-text-field
                  v-model="create_measurement.name"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  :placeholder="$t('measurementUnit.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('measurementUnit.dialog.description')}}</div>
                <v-textarea
                  v-model="create_measurement.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('measurementUnit.dialog.descriptionPlacholder')"
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
            {{ $t("measurementUnit.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("measurementUnit.dialog.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("measurementUnit.dialog.editDialog") }}
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('measurementUnit.dialog.name')}}</div>
                <v-text-field
                  v-model="edit_measurement.name"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  :placeholder="$t('measurementUnit.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('measurementUnit.dialog.description')}}</div>
                <v-textarea
                  v-model="edit_measurement.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('measurementUnit.dialog.descriptionPlacholder')"
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
            {{ $t("measurementUnit.dialog.cancelBtn") }}
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
        <v-card-title class="d-flex justify-center">
          {{ $t("measurementUnit.dialog.deleteDialog") }}</v-card-title
        >
        <v-card-text>
          {{ $t("measurementUnit.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("measurementUnit.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSample"
          >
            {{ $t("measurementUnit.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MeasurementUnitPages",
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      itemPrePage: 10,
      current_page: 0,
      options: {},
      headers: [
        {
          text: this.$t("samplePurposes.table.id"),
          value: "id",
          align: "start",
          sortable: false,
          width: "100",
        },
        { text: this.$t("samplePurposes.table.name"), value: "name" },
        {
          text: this.$t("samplePurposes.table.description"),
          value: "description",
        },
        {
          text: this.$t("samplePurposes.table.createdAt"),
          value: "createdAt",
        },
        {
          text: this.$t("samplePurposes.table.updatedAt"),
          value: "updatedAt",
        },
        {
          text: this.$t("samplePurposes.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      create_measurement: {
        name: "",
        description: "",
      },
      edit_measurement: {
        name: "",
        description: "",
      },
      delete_measurement: {},
      filters: {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      },
    };
  },
  watch: {
    async "options.sortBy"(elem) {
      if (elem[0] !== undefined) {
        if (this.options.sortDesc[0] !== undefined) {
          const items = {
            sortDesc: this.options.sortDesc[0],
            sortBy: elem[0],
          };
          await this.sortMeasurementUnit({
            page: this.current_page,
            size: this.itemPrePage,
            data: items,
          });
        }
      }
    },
  },
  async created() {
    await this.$store.dispatch("measurement/getMeasurementUnit", {
      page: 0,
      size: 10,
    });
  },
  computed: {
    ...mapGetters({
      loading: "measurement/loading",
      measurementUnit: "measurement/measurementUnit",
      totalElements: "measurement/totalElements",
    }),
  },
  methods: {
    ...mapActions({
      getMeasurementUnit: "measurement/getMeasurementUnit",
      createMeasurementUnit: "measurement/createMeasurementUnit",
      updateMeasurementUnit: "measurement/updateMeasurementUnit",
      deleteMeasurementUnit: "measurement/deleteMeasurementUnit",
      filterMeasurementUnit: "measurement/filterMeasurementUnit",
      sortMeasurementUnit: "measurement/sortMeasurementUnit",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.$store.dispatch("measurement/getMeasurementUnit", {
        page: 0,
        size: this.itemPrePage,
      });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.$store.dispatch("measurement/getMeasurementUnit", {
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async deleteSample() {
      const id = this.delete_measurement.id;
      await this.deleteMeasurementUnit(id);
      this.delete_dialog = false;
    },
    async save() {
      const items = { ...this.create_measurement };
      await this.createMeasurementUnit(items);
      this.create_measurement = {
        name: "",
        description: "",
      };
      this.new_dialog = false;
    },
    async update() {
      const items = { ...this.edit_measurement };
      await this.updateMeasurementUnit(items);
      this.edit_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_measurement = { ...item };
      this.delete_dialog = true;
    },
    editItem(item) {
      delete item.createdAt;
      delete item.updatedAt;
      this.edit_measurement = { ...item };
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      };
      await this.getMeasurementUnit({ page: 0, size: 10 });
    },
    async filterData() {
      const items = { ...this.filters };
      await this.filterMeasurementUnit(items);
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
