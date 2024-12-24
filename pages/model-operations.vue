<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form lazy-validation>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="3">
            <v-text-field
              :placeholder="$t('modelOperations.modelOperation')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              v-model.trim="filterByName"
              @keydown.enter.prevent="filterData"
            />
          </v-col>
          <v-spacer />
          <v-col cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="resetFilters"
              >
                {{ $t("wastes.wastesWarehouse.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("wastes.wastesWarehouse.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="modelOperationList"
      :server-items-length="totalElements"
      :items-per-page="itemPrePage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
      :loading="loading"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("sidebar.modelOperations") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("sidebar.modelOperations") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <div>
          <v-btn icon color="green">
            <v-img src="/edit-active.svg" max-width="22" @click="updateBtn(item)" />
          </v-btn>
          <v-btn icon color="red" @click="deleteDataBtn(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{$t('modelOperations.modelOperation')}}</div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form>
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('modelOperations.operationName')}}</div>
                <v-text-field
                  v-model="createData.name"
                  outlined
                  hide-details
                  height="44"
                  class="base rounded-lg"
                  :placeholder="$t('modelOperations.enterOperationName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('modelOperations.description')}}</div>
                <v-textarea
                  v-model="createData.description"
                  outlined
                  hide-details
                  class="base rounded-lg"
                  :placeholder="$t('modelOperations.enterDescription')"
                  dense
                  height="44"
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
            @click="createDataBtn"
          >
            {{ $t("catalogsModelGroup.dialog.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="update_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{$t('modelOperations.modelOperation')}}</div>
          <v-btn icon color="#544B99" @click="update_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form>
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('modelOperations.operationName')}}</div>
                <v-text-field
                  v-model="updateData.name"
                  outlined
                  hide-details
                  height="44"
                  class="base rounded-lg"
                  :placeholder="$t('modelOperations.enterOperationName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('modelOperations.description')}}</div>
                <v-textarea
                  v-model="updateData.description"
                  outlined
                  hide-details
                  class="base rounded-lg"
                  :placeholder="$t('modelOperations.enterDescription')"
                  dense
                  height="44"
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
            @click="update_dialog = false"
          >
            {{ $t("catalogsModelGroup.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="updateDataBtn"
          >
            {{ $t("catalogsModelGroup.dialog.editBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DeleteDialog v-bind="deleteData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DeleteDialog from "../components/DeleteDialog.vue";

export default {
  name: "BankDetails",
  components: {
    DeleteDialog,
  },
  data() {
    return {
      headers: [
        {
          text: "№",
          value: "id",
        },
        {
          text: this.$t('sidebar.modelOperations'),
          value: "name",
          sortable: false,
        },
        {
          text: this.$t('modelOperations.description'),
          value: "description",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t('modelOperations.createdAt'),
          value: "createdAt",
          align: "center",
        },
        {
          text: this.$t('modelOperations.creator'),
          value: "createdBy",
          align: "center",
        },
        {
          text: this.$t("bankDetails.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      itemPrePage: 10,
      current_page: 0,
      filterByName: "",
      new_dialog: false,
      update_dialog: false,
      createData: {
        name: "",
        description: "",
      },
      updateData: {
        name: "",
        description: "",
      },
      deleteDialog: false,
      modelOperationId: null,
    };
  },
  async created() {
    await this.getModelOperationList({ page: 0, size: 10 });
  },
  computed: {
    ...mapGetters({
      modelOperationList: "modelOperations/modelOperationList",
      loading: "modelOperations/loading",
      totalElements: "modelOperations/totalElements",
    }),
    deleteData: {
      get() {
        return {
          deleteDialog: this.deleteDialog,
          deleteFunction: () => {
            this.deleteModelOperation(this.modelOperationId);
            this.deleteDialog = false;
          },
          closeDialog: () => {
            this.deleteDialog = false;
          },
        };
      },
    },
  },
  methods: {
    ...mapActions({
      getModelOperationList: "modelOperations/getModelOperationList",
      createModelOperation: "modelOperations/createModelOperation",
      deleteModelOperation: "modelOperations/deleteModelOperation",
      updateModelOperation: "modelOperations/updateModelOperation",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getModelOperationList({ page: 0, size: this.itemPrePage });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getModelOperationList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async filterData() {
      await this.getModelOperationList({
        page: 0,
        size: 10,
        name: this.filterByName,
      });
    },
    async resetFilters() {
      this.filterByName = "";

      await this.getModelOperationList({
        page: 0,
        size: 10,
      });
    },
    async createDataBtn() {
      const data = this.createData;
      await this.createModelOperation(data);
      this.new_dialog = false;
      this.createData = {
        name: "",
        description: "",
      };
    },
    updateBtn(item){
      this.modelOperationId = item.id
      this.update_dialog = true;
      this.updateData = {
        name: item.name,
        description: item?.description,
      };
    },
    async updateDataBtn() {
      const data = this.updateData;
      const id = this.modelOperationId;
      await this.updateModelOperation({ id, data });
      this.update_dialog = false;
      this.updateData = {
        name: "",
        description: "",
      };
    },
    deleteDataBtn(item) {
      this.deleteDialog = true;
      this.modelOperationId = item.id;
    },
  },
};
</script>

<style lang="scss"></style>
