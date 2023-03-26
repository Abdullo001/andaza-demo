<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form ref="search_form">
        <v-row class="mx-0 px-0 mb-2 mt-4 pa-4 w-full" justify="center">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Permission name"
              outlined
              v-model="filter_search.key"
              class="rounded-lg"
              hide-details
              dense
              @keyup.enter="filterPermission"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-select
              label="Permission path"
              outlined
              v-model="filter_search.property_type"
              class="rounded-lg"
              hide-details
              dense
              append-icon="mdi-chevron-down"
              :items="property_type"
              @keyup.enter="filterPermission"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-select
              label="Status"
              outlined
              :items="statusEnums"
              v-model="filter_search.status"
              class="rounded-lg"
              hide-details
              dense
              append-icon="mdi-chevron-down"
              @keyup.enter="filterPermission"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2" style="max-width: 240px;"
          >
            <el-date-picker
              type="datetime"
              v-model="filter_search.value"
              placeholder="From"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              type="datetime"
              placeholder="To"
              v-model="filter_search.value_to"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col cols="12" lg="12">
            <div class="d-flex justify-center">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg font-weight-bold"
                @click.stop="resetSearch"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg font-weight-bold"
                @click="filterPermission"
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
      :items="permissions"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50]
      }"
      :loading="loading"
      class="mt-4 rounded-lg"
      :options.sync="options"
      @update:items-per-page="getItemSize"
      @click:row="(item) => rowPush(item)"
      :server-items-length="totalElement"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">Permission</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = !new_dialog">
              <v-icon>mdi-plus</v-icon>
              Permission
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>

      <template v-slot:header.id="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template #item.actions="{item}">
        <v-btn icon color="green" @click.stop="editItem(item)">
          <v-img src="edit-active.svg" max-width="22"/>
        </v-btn>
        <v-btn icon color="red" @click.stop="getDeleteItem(item)">
          <v-img src="delete.svg" max-width="27"/>
        </v-btn>
      </template>
      <template #item.status="{item}">
        <div>
          <v-select
            @change="statusChange(item)"
            :items="statusEnums"
            v-model="item.status"
            hide-details
            rounded
            append-icon="mdi-chevron-down"
            :background-color="statusColor.color(item.status)"
            dark
            class="text-caption mt-n2"
            flat
          />
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" max-width="600" ref="new_form">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>New Permission</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row class="mt-4">
              <v-col cols="12">
                <v-text-field
                  label="Permission name"
                  filled
                  dense
                  v-model="new_permissionData.name"
                  color="#7631FF"
                  placeholder="Enter permission name"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  filled
                  dense
                  v-model="new_permissionData.description"
                  color="#7631FF"
                  placeholder="Enter permission description"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Permission path"
                  filled
                  dense
                  v-model="new_permissionData.path"
                  color="#7631FF"
                  placeholder="Enter permission path"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#7631FF"
            width="163"
            @click="new_dialog = !new_dialog"
          >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="save"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="600">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit user</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row class="mt-4">
              <v-col cols="12" md="6">
                <v-text-field
                  label="ID"
                  filled
                  dense
                  disabled
                  v-model="edit_permission.id"
                  color="#7631FF"
                  placeholder="Enter permission name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Permission name"
                  filled
                  dense
                  :items="statusEnums"
                  v-model="edit_permission.status"
                  color="#7631FF"
                  append-icon="mdi-chevron-down"
                  placeholder="Enter permission name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Permission name"
                  filled
                  dense
                  v-model="edit_permission.name"
                  color="#7631FF"
                  placeholder="Enter permission name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  filled
                  dense
                  rows="1"
                  v-model="edit_permission.description"
                  color="#7631FF"
                  placeholder="Enter permission description"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Permission path"
                  filled
                  dense
                  v-model="edit_permission.path"
                  color="#7631FF"
                  placeholder="Enter permission path"
                  validate-on-blur
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#7631FF"
            width="163"
            @click="edit_dialog = !edit_dialog"
          >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="updatePermission"
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
        <v-card-title class="d-flex justify-center">Delete Permission</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this permission?
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
            @click="deleteData"
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
  name: 'PermissionPage',
  data() {
    return {
      delete_dialog: false,
      edit_dialog: false,
      new_dialog: false,
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: 'Permission name', value: 'name'},
        {text: 'Description', value: 'description'},
        {text: 'Path', value: 'path'},
        {text: 'Status', value: 'status', width: '150'},
        {text: 'Updated', value: 'updatedAt', align: 'center'},
        {text: 'Created', value: 'createdAt', align: 'center'},
        {text: 'Actions', value: 'actions', width: '180', align: 'center', sortable: false},
      ],
      options: {},
      filter_search: {
        key: '',
        status: '',
        property_type: '',
        value: '',
        value_to: '',
      },
      id: '',
      property_type: ['BOOLEAN', 'CHAR', 'DATE', 'DOUBLE', 'BIG_DECIMAL', 'INTEGER', 'LONG', 'STRING',],
      new_permissionData: {
        name: '',
        description: '',
        path: ''
      },
      edit_permission: {
        description: "",
        id: '',
        name: "",
        path: "",
        status: ""
      },
      itemPerPage: 10,
      current_page: 0,
      menu2: false,
    }
  },
  computed: {
    ...mapGetters({
      loading: "permission/loading",
      permissions: "permission/permissions",
      totalElement: "permission/totalElement",
    })
  },
  methods: {
    ...mapActions({
      getPermission: 'permission/getPermission',
      postPermission: 'permission/postPermission',
      filterData: 'permission/filterData',
      putPermission: "permission/putPermission",
    }),
    statusChange(item) {
      console.log(item)
    },
    // DELETE PERMISSION
    deleteData() {
      console.log(this.id)
    },
    // UPDATE PERMISSION
    async updatePermission() {
      await this.putPermission(this.edit_permission);
      this.edit_dialog = false;
    },
    editItem(item) {
      this.edit_dialog = true;
      this.edit_permission = {...item};
    },
    getItemSize(val) {
      this.itemPerPage = val;
      this.$store.commit("permission/setLoading", true);
      this.getPermission({page: this.current_page, size: this.itemPerPage});
    },
    rowPush(item) {
      // this.$router.push(`/permission/${item.id}`);
    },
    resetSearch() {
      this.$refs.search_form.reset();
      this.filter_search.value = this.filter_search.value_to = '';
      this.getPermission({page: this.current_page, size: this.itemPerPage});
    },
    // POST
    async save() {
      const data = this.new_permissionData;
      await this.postPermission(data);
      this.new_dialog = false;
      this.new_permissionData = {
        name: '',
        description: '',
        path: ''
      }
    },
    filterPermission() {
      this.filterData({
        key: this.filter_search.key,
        status: this.filter_search.status,
        value: this.filter_search.value,
        value_to: this.filter_search.value_to,
        property_type: this.filter_search.property_type
      })
    },
    getDeleteItem(item) {
      this.delete_dialog = true;
      this.id = item.id;
    },
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Permission');
    this.$store.dispatch('permission/getPermission', {page: this.current_page, size: this.itemPerPage});
  }
}
</script>

<style lang="scss">
tbody {
  tr {
    td {
      cursor: pointer;
    }
  }
}

.v-data-table-header {
  background-color: #E9EAEB;
}
</style>
