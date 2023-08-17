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
              :label="$t('permissionControl.dialog.permissionName')"
              outlined
              v-model="filter_search.key"
              class="rounded-lg filter"
              hide-details
              dense
              @keyup.enter="filterPermission"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-select
              :label="$t('permissionControl.dialog.permissionPath')"
              outlined
              v-model="filter_search.property_type"
              class="rounded-lg filter"
              hide-details
              dense
              append-icon="mdi-chevron-down"
              :items="property_type"
              @keyup.enter="filterPermission"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-select
              :label="$t('permissionControl.dialog.status')"
              outlined
              :items="statusEnums"
              v-model="filter_search.status"
              class="rounded-lg filter"
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
              :placeholder="$t('from')"
              class="filter_picker"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              type="datetime"
              class="filter_picker"
              :placeholder="$t('to')"
              v-model="filter_search.value_to"
              :picker-options="pickerShortcuts"
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
                {{ $t('permissionControl.dialog.reset') }}
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg font-weight-bold"
                @click="filterPermission"
              >
                {{ $t('permissionControl.dialog.search') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="permission_list"
      :items-per-page="10"
      :no-data-text="$t('noDataText')"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50],
        itemsPerPageText: this.$t('allDataTableText')
      }"
      :loading="loading"
      class="mt-4 rounded-lg"
      :options.sync="options"
      @update:items-per-page="getItemSize"
      :server-items-length="totalElement"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">{{ $t('permissionControl.dialog.permission') }}</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = !new_dialog">
              <v-icon>mdi-plus</v-icon>
              {{ $t('permissionControl.dialog.permission') }}
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
          <v-img src="/edit-active.svg" max-width="22"/>
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
          <div>{{ $t('permissionControl.dialog.newPermission') }}</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row class="mt-4">
              <v-col cols="12">
                <div class="label">{{$t('permissionControl.dialog.permissionName')}}</div>
                <v-text-field
                  outlined
                  height="44"
                  hide-details
                  class="rounded-lg base"
                  dense
                  v-model="new_permissionData.name"
                  color="#7631FF"
                  :placeholder="$t('permissionControl.dialog.enterPermissionName')"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('permissionControl.dialog.description')}}</div>
                <v-textarea
                  outlined
                  hide-details
                  class="rounded-lg base"
                  dense
                  v-model="new_permissionData.description"
                  color="#7631FF"
                  :placeholder="$t('permissionControl.dialog.enterPermissionDescription')"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('permissionControl.dialog.permissionPath')}}</div>
                <v-text-field
                  outlined
                  height="44"
                  hide-details
                  class="rounded-lg base"
                  dense
                  v-model="new_permissionData.path"
                  color="#7631FF"
                  :placeholder="$t('permissionControl.dialog.enterPermissionPath')"
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
          >{{ $t('permissionControl.dialog.cancel') }}
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="save"
          >
            {{ $t('permissionControl.dialog.create') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="600">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>{{ $t('permissionControl.dialog.editUser') }}</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row class="mt-4">
              <v-col cols="12" md="6">
                <div class="label">ID</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  disabled
                  v-model="edit_permission.id"
                  color="#7631FF"
                  placeholder="Enter permission name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">{{ $t('permissionControl.dialog.status') }}</div>
                <v-select
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  :items="statusEnums"
                  v-model="edit_permission.status"
                  color="#7631FF"
                  append-icon="mdi-chevron-down"
                  :placeholder="$t('permissionControl.dialog.selectStatus')"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{ $t('permissionControl.dialog.permissionName') }}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  v-model="edit_permission.name"
                  color="#7631FF"
                  :placeholder="$t('permissionControl.dialog.enterPermissionName')"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{ $t('permissionControl.dialog.description') }}</div>
                <v-textarea
                  outlined
                  hide-details
                  class="rounded-lg base"
                  dense
                  v-model="edit_permission.description"
                  color="#7631FF"
                  :placeholder="$t('permissionControl.dialog.enterPermissionDescription')"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{ $t('permissionControl.dialog.permissionPath') }}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  v-model="edit_permission.path"
                  color="#7631FF"
                  :placeholder="$t('permissionControl.dialog.enterPermissionPath')"
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
          >{{ $t('permissionControl.dialog.cancel') }}
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="updatePermission"
          >
            {{ $t('update') }}
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
      edit_dialog: false,
      new_dialog: false,
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: this.$t('permissionControl.table.permissionName'), value: 'name'},
        {text: this.$t('permissionControl.table.description'), value: 'description'},
        {text: this.$t('permissionControl.table.path'), value: 'path'},
        {text: this.$t('permissionControl.table.created'), value: 'createdAt', align: 'center'},
        {text: this.$t('permissionControl.table.status'), value: 'status', width: '150'},
        {text: this.$t('permissionControl.table.updated'), value: 'updatedAt', align: 'center'},
        {text: this.$t('permissionControl.table.actions'), value: 'actions', width: '180', align: 'center', sortable: false},
      ],
      permission_list: [],
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
  watch: {
    permissions(val){
      this.permission_list = JSON.parse(JSON.stringify(val));
    },
  },
  async created(){
    await this.$store.dispatch('permission/getPermission', {page: this.current_page, size: this.itemPerPage});
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
      changeStatusPermission: "permission/changeStatusPermission",
    }),
    async statusChange(item) {
      await this.changeStatusPermission({id: item.id, status: item.status});
    },
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
    resetSearch() {
      this.$refs.search_form.reset();
      this.filter_search.value = this.filter_search.value_to = '';
      this.getPermission({page: this.current_page, size: this.itemPerPage});
    },
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
    async filterPermission() {
      const item = {...this.filter_search};
      await this.filterData(item);
    },
  },
  mounted() {
    this.$store.commit('setPageTitle', this.$t('permissionControl.dialog.permission'));
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
.el-input__inner::placeholder,
.el-input__icon, .el-icon-time {
  color: #919191 !important;
}
.v-data-table-header {
  background-color: #E9EAEB;
}
</style>
