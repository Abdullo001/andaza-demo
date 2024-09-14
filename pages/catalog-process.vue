<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model.trim="filters.id"
              :label="$t('process.child.idSearch')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model.trim="filters.name"
              :label="$t('process.child.name')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model.trim="filters.createdBy"
              :label="$t('process.child.createdBy')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <el-date-picker
              v-model="filters.createdAt"
              type="datetime"
              class="filter_picker"
              style="width: 100%;"
              :placeholder="$t('process.child.created')"
              :picker-options="pickerShortcuts"
              format="dd.MM.yyyy HH:mm:ss"
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
                {{ $t("process.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("process.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="processList"
      :loading="loading"
      :options.sync="options"
      :items-per-page="itemPrePage"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("process.dialog.menuName") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("process.dialog.addMainName") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex justify-center">
          <v-btn icon color="green" @click.stop="editItem(item)">

            <v-img src="/edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>

          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("process.dialog.addMainName") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('process.dialog.name')}}</div>
                <v-text-field
                  v-model="create_process.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('process.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Process type</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="create_process.processTypeId"
                  :items="processTypeList"
                  item-text="processType"
                  item-value="id"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  placeholder="Select process type"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('process.dialog.description')}}</div>
                <v-textarea
                  v-model="create_process.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('process.dialog.descriptionPlacholder')"
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
            {{ $t('process.dialog.cancelBtn') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
          {{ $t('process.dialog.createBtn') }}

          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t('process.dialog.editDialog') }}

          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('process.dialog.name')}}</div>
                <v-text-field
                  v-model="edit_process.name"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  :placeholder="$t('process.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">Process type</div>
                <v-select
                  append-icon="mdi-chevron-down"
                  v-model="edit_process.processTypeId"
                  :items="processTypeList"
                  item-text="processType"
                  item-value="id"
                  dense
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  validate-on-blur
                  placeholder="Select process type"
                />
              </v-col>

              <v-col cols="12">
                <div class="label">{{$t('process.dialog.description')}}</div>
                <v-textarea
                  v-model="edit_process.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('process.dialog.descriptionPlacholder')"
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
            {{ $t('process.dialog.cancelBtn') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="update"
          >
          {{$t("update")}}
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
          {{ $t("process.dialog.deleteDialog") }}
        </v-card-title>
        <v-card-text>
          {{ $t("process.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("process.dialog.cancelBtn") }}
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
            {{ $t("process.dialog.deleteBtn") }}
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
      delete_dialog: false,
      new_dialog: false,
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
        { text: this.$t("process.table.name"), value: "name" },
        {
          text: this.$t("process.table.description"),
          value: "description",
        },
        {
          text: this.$t("process.table.created"),
          value: "createdAt",
        },
        {
          text: this.$t("process.table.createdBy"),
          value: "createdBy",
        },
        {
          text: this.$t("process.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      create_process: {
        name: "",
        processTypeId:null,
        description: "",
      },
      edit_process: {
        name: "",
        description: "",
      },
      delete_sample: {},
      filters: {
        id: "",
        name: "",
        createdBy:"",
        createdAt: "",
      },
    };
  },
  watch: {
    processTypeList(val){
      console.log(val);
    }
  },
  async created() {
    await this.$store.dispatch("process/getProcessList", { page: 0, size: 10 });
    this.getProcessTypeList()
  },
  computed: {
    ...mapGetters({
      loading: "process/loading",
      processList: "process/processList",
      totalElements: "process/totalElements",
      processTypeList: "process/processTypeList",
    }),
  },
  methods: {
    ...mapActions({
      getProcessList: "process/getProcessList",
      getProcessTypeList: "process/getProcessTypeList",
      createProcess: "process/createProcess",
      updateProcess: "process/updateProcess",
      deleteProcess: "process/deleteProcess",
      filterProcessData: "process/filterProcessData",
      createPrintType: "printType/createPrintType",
      updatePrintType: "printType/updatePrintType",
      deletePrintType: "printType/deletePrintType",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.$store.dispatch("process/getProcessList", {
        page: 0,
        size: this.itemPrePage,
      });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.$store.dispatch("process/getProcessList", {
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async deleteSample() {
      const id = this.delete_sample.id;
      await this.deleteProcess({id});
      this.delete_dialog = false;
    },
    async save() {
      const items = { ...this.create_process };
      await this.createProcess(items);
      this.create_process = {
        name: "",
        processTypeId:null,
        description: "",
      };
      this.new_dialog = false;
    },
    async update() {
      const items = { ...this.edit_process };
      await this.updateProcess(items);
      this.edit_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_sample = { ...item };
      this.delete_dialog = true;
    },
    editItem(item) {
      this.edit_process = { ...item };
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        createdBy: "",
        createdAt: "",
      };
      await this.getProcessList({ page: 0, size: 10 });
    },
    async filterData() {
      const items = { ...this.filters };
      await this.filterProcessData(items);
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
