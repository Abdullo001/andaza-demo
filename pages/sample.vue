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
              v-model.trim="filters.id"
              label="Id sample purposes"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model.trim="filters.name"
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
              style="width: 100%"
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
      :items="sampleData"
      :loading="loading"
      :options.sync="options"
      :items-per-page="itemPrePage"
      :server-items-length="sampleTotalElements"
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
            <div class="font-weight-medium text-capitalize">Sample purposes</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              sample purposes
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.actions="{item}">
        <div class="d-flex justify-center">
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
          <div class="text-capitalize font-weight-bold">create Sample purpose</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              v-model="create_sample.name"
              filled
              label="Name"
              placeholder="Enter name sample purpose"
              dense
              color="#7631FF"
            />
            <v-textarea
              v-model="create_sample.description"
              filled
              label="Description"
              placeholder="Enter sample purpose description"
              dense
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
          <div class="text-capitalize font-weight-bold">Edit Sample purpose</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              v-model="edit_sample.name"
              filled
              label="Sample purpose"
              placeholder="Enter sample purpose"
              dense
              color="#7631FF"
            />
            <v-textarea
              v-model="edit_sample.description"
              filled
              label="Description"
              placeholder="Enter sample purpose description"
              dense
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
        <v-card-title class="d-flex justify-center">Delete Sample purpose</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this sample purpose?
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
            @click="deleteSample"
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
  name: "SamplePurposesPages",
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
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
      create_sample: {
        name: "",
        description: "",
      },
      edit_sample: {
        name: "",
        description: "",
      },
      delete_sample: {},
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
          await this.sortSampleData({page: this.current_page, size: this.itemPrePage, data: items})
        }
      }
    }
  },
  async created() {
    await this.$store.dispatch("sample/getSampleData", {page: 0, size: 10});
  },
  computed: {
    ...mapGetters({
      loading: "sample/loading",
      sampleData: "sample/sampleData",
      sampleTotalElements: "sample/sampleTotalElements",
    })
  },
  methods: {
    ...mapActions({
      getSampleData: "sample/getSampleData",
      createSampleData: "sample/createSampleData",
      updateSampleData: "sample/updateSampleData",
      deleteSampleData: "sample/deleteSampleData",
      filterSampleData: "sample/filterSampleData",
      sortSampleData: "sample/sortSampleData",
    }),
    async size(val){
      this.itemPrePage = val;
      await this.$store.dispatch("sample/getSampleData", {page: 0, size: this.itemPrePage});
    },
    async page(val){
      this.current_page = val - 1;
      await this.$store.dispatch("sample/getSampleData", {page: this.current_page, size: this.itemPrePage});
    },
    async deleteSample() {
      const id = this.delete_sample.id;
      await this.deleteSampleData(id);
      this.delete_dialog = false;
    },
    async save() {
      const items = {...this.create_sample};
      await this.createSampleData(items);
      this.create_sample = {
        name: "",
        description: "",
      };
      this.new_dialog = false;
    },
    async update() {
      const items = {...this.edit_sample};
      await this.updateSampleData(items);
      this.edit_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_sample = {...item};
      this.delete_dialog = true;
    },
    editItem(item) {
      delete item.createdAt;
      delete item.updatedAt;
      this.edit_sample = {...item};
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        updatedAt: "",
        createdAt: "",
      };
      await this.getSampleData({page: 0, size: 10});
    },
    async filterData() {
      const items = {...this.filters};
      await this.filterSampleData(items);
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
