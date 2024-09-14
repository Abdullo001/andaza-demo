<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filters.name"
              :label="$t('bodyParts.child.name')"
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
                {{ $t("bodyParts.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("bodyParts.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="departmentList"
      :options.sync="options"
      :loading="loading"
      :server-items-length="totalElements"
      :items-per-page="itemPrePage"
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
              Department
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              Department
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
            {{ $t("bodyParts.dialog.addMainName") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{$t('bodyParts.dialog.name')}}</div>
                <v-text-field
                  v-model="newDialog.name"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  :placeholder="$t('bodyParts.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('bodyParts.dialog.description')}}</div>
                <v-textarea
                  v-model="newDialog.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('bodyParts.dialog.descriptionPlacholder')"
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
            {{ $t("bodyParts.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            v-if="newDialog.title==='new'"
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("bodyParts.dialog.createBtn") }}
          </v-btn>
          <v-btn
            v-else
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="update"
          >
            Update
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
          {{ $t("bodyParts.dialog.deleteDialog") }}
        </v-card-title>
        <v-card-text>
          {{ $t("bodyParts.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("bodyParts.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteBody"
          >
            {{ $t("bodyParts.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BodyPartsPages",
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
          value: "departmentId",
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
      newDialog: {
        name: "",
        description: "",
        title:"new"

      },
      edit_bodyParts: {
        name: "",
        description: "",
      },
      delete_bodyParts: {},
      filters: {
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
          await this.sortBodyParts({
            page: this.current_page,
            size: this.itemPrePage,
            data: items,
          });
        }
      }
    },
  },
  async created() {

  },
  computed: {
    ...mapGetters({
      loading: "department/loading",
      departmentList: "department/departmentList",
      totalElements: "department/totalElements",
    }),
  },
  methods: {
    ...mapActions({
      getDepartmentList: "department/getDepartmentList",
      createDepartment: "department/createDepartment",
      updateDepartment: "department/updateDepartment",
      deleteDepartment: "department/deleteDepartment",
      filterBodyParts: "bodyParts/filterBodyParts",
      sortBodyParts: "bodyParts/sortBodyParts",
    }),
    async size(val) {
      this.itemPrePage = val;
      this.getDepartmentList({page:0,size:this.itemPrePage})

    },
    async page(val) {
      this.current_page = val - 1;
      this.getDepartmentList({page:this.current_page,size:this.itemPrePage})
    },

    async getDeleteItem(item) {
      this.delete_bodyParts = { ...item };
      this.delete_dialog = true;
    },
    async deleteBody() {
      const id = this.delete_bodyParts.departmentId;
      await this.deleteDepartment(id);
      this.delete_dialog = false;
    },
    async save() {
      const items = { ...this.newDialog };
      await this.createDepartment(items);
      this.newDialog = {
        name: "",
        description: "",
      };
      this.new_dialog = false;
    },
    async update() {
      const items = { ...this.newDialog };
      await this.updateDepartment(items);
      
      this.newDialog.name=""
      this.newDialog.description=""
      this.newDialog.departmentId=""
      this.new_dialog = false;
      this.newDialog.title="new"
    },
    
    editItem(item) {
      this.newDialog = { ...item };
      this.newDialog.title="edit"
      this.new_dialog = true;
    },

    
    async resetFilters() {
      this.filters = {
        name: "",
        updatedAt: "",
        createdAt: "",
      };
      await this.getDepartmentList({ page: 0, size: 10 });
    },
    async filterData() {
      const items = { ...this.filters };
      await this.getDepartmentList({page:0,size:10,name:this.filters.name});
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", this.$t("sidebar.catalogs"));
    this.getDepartmentList({page:0,size:10})
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
