<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-lg"
    >
      <v-form ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filter_partner.id"
              label="ID Accessory type"
              placeholder="Enter ID Accessory type"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              v-model="filter_partner.name"
              label="Accessory type name"
              placeholder="Enter Accessory type name"
              outlined
              class="rounded-lg"
              v-model.trim="filter_partner.name"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              style="width: 100%;"
              v-model="filter_partner.createdAt"
              type="datetime"
              placeholder="Created"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              style="width: 100%"
              v-model="filter_partner.updatedAt"
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
                color="#544B99" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#544B99" dark
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
      :items-per-page="itemPrePage"
      :loading="loading"
      :items="accessory_type_list"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Accessory Type</div>
            <v-btn color="#544B99" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Add Accessory Type
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.checkbox="{ item }">
        <v-checkbox/>
      </template>
      <template #item.actions="{item}">
        <div>
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
          <div class="text-capitalize font-weight-bold">Add Accessory type</div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="create_accessory_type.name"
                  filled
                  :rules="[formRules.required]"
                  label="Accessory type name"
                  placeholder="Enter Accessory type name"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  rows="1"
                  auto-grow
                  v-model="create_accessory_type.description"
                  filled
                  label="Description"
                  placeholder="Enter Description"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
            @click="save"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Accessory type</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="edit_accessory_type.name"
                  filled
                  label="Accessory type name"
                  placeholder="Enter Accessory type name"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="edit_accessory_type.description"
                  filled
                  label="Description"
                  placeholder="Enter Description"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
            @click="update"
          >
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Gender type</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this gender type?
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CatalogGenderPage",
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,
      delete_accessory_id: "",
      edit_validate: true,
      edit_accessory_type: {
        description: "",
        name: "",
        id: "",
      },
      validate: true,
      create_accessory_type: {
        description: "",
        name: ""
      },
      filter_partner: {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      },
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        {text: "Id", value: "id", sortable: false},
        {text: "Name", value: "name", sortable: false},
        {text: "Description", value: "description", sortable: false},
        {text: "CreatedAt", value: "createdAt", sortable: false},
        {text: "UpdatedAt", value: "updatedAt", sortable: false},
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
    }
  },
  async created() {
    await this.getAccessoryTypeList({page: 0, size: 10});
  },
  computed: {
    ...mapGetters({
      loading: "accessoryType/loading",
      accessory_type_list: "accessoryType/accessory_type_list",
      totalElements: "accessoryType/totalElements",
    })
  },
  methods: {
    ...mapActions({
      getAccessoryTypeList: "accessoryType/getAccessoryTypeList",
      createAccessoryType: "accessoryType/createAccessoryType",
      updateAccessoryType: "accessoryType/updateAccessoryType",
      deleteAccessoryType: "accessoryType/deleteAccessoryType",
      filterAccessoryTypeList: "accessoryType/filterAccessoryTypeList",
    }),
    async size(val){
      this.itemPrePage = val;
      await this.getAccessoryTypeList({page: 0, size: this.itemPrePage});
    },
    async page(val){
      this.current_page = val - 1;
      await this.getAccessoryTypeList({page: this.current_page, size: this.itemPrePage});
    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        const item = {...this.create_accessory_type};
        await this.createAccessoryType(item);
        this.$refs.new_form.reset();
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      if (edit_validate) {
        const {id, description, name} = this.edit_accessory_type;
        const item = {id, description, name};
        await this.updateAccessoryType(item);
        this.edit_dialog = false;
      }
    },
    async deleteItem() {
      await this.deleteAccessoryType(this.delete_accessory_id);
      this.delete_dialog = false;
    },
    editItem(item) {
      this.edit_accessory_type = {...item};
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_accessory_id = item.id;
      this.delete_dialog = true;
    },
    async resetFilters() {
      this.filter_partner = {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      };
      await this.getAccessoryTypeList({page: 0, size: 10});
    },
    async filterData() {
      await this.filterAccessoryTypeList(this.filter_partner);
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
