<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="center">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('permissionRole.dialog.roleId')"
              outlined
              class="rounded-lg filter"
              v-model="filters.id"
              hide-details
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              :label="$t('permissionRole.dialog.roleName')"
              outlined
              class="rounded-lg filter"
              v-model="filters.key"
              hide-details
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-select
              :label="$t('permissionRole.dialog.status')"
              outlined
              :items="statusEnums"
              class="rounded-lg filter"
              v-model="filters.status"
              hide-details
              append-icon="mdi-chevron-down"
              dense
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2" style="max-width: 240px;"
          >
            <el-date-picker
              type="datetime"
              v-model="filters.value"
              class="filter_picker"
              :placeholder="$t('from')"
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
              v-model="filters.value_to"
              class="filter_picker"
              :placeholder="$t('to')"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col class="" cols="12" lg="4">
            <div class="d-flex justify-center">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t('permissionRole.dialog.reset') }}
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterRole"
              >
                {{ $t('permissionRole.dialog.search') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="all_role"
      :items-per-page="10"
      :no-data-text="$t('noDataText')"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50],
        temsPerPageText: this.$t('allDataTableText')
      }"
      :loading="loading"
      class="mt-4 rounded-lg"
      :options.sync="options"
      @update:items-per-page="getItemSize"
      :server-items-length="roleTotalElements"
      @click:row="(item) => $router.push(localePath(`/role/${item.id}`))"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">{{  $t('permissionRole.dialog.role') }}</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = !new_dialog">
              <v-icon>mdi-plus</v-icon>
              {{ $t('permissionRole.dialog.role') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>

      <template #item.actions="{item}">
        <v-btn icon color="green" @click.stop="editItem(item)">
          <v-img src="/edit-active.svg" max-width="22"/>
        </v-btn>
        <v-tooltip top color="primary">
          <template #activator="{on, attrs}">
            <v-btn
              icon color="primary"
              v-on="on" v-bind="attrs"
              @click="$router.push(localePath(`/role/${item.id}`))"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('prefinances.dialog.edit') }}</span>
        </v-tooltip>
      </template>
      <template #item.status="{item}">
        <div>
          <v-select
            @click.stop
            @change="statusChange(item)"
            :items="statusEnums"
            hide-details
            rounded
            v-model="item.status"
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
          <div>{{ $t('permissionRole.dialog.createRole') }}</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_form">
            <v-row class="mt-4">
              <v-col cols="12">
                <div class="label">{{$t('permissionRole.dialog.roleName')}}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  v-model="new_role.name"
                  color="#7631FF"
                  placeholder="Enter role name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('permissionRole.dialog.description')}}</div>
                <v-textarea
                  outlined
                  hide-details
                  class="rounded-lg base"
                  v-model="new_role.description"
                  dense
                  color="#7631FF"
                  placeholder="Enter role description"
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
          >{{ $t('permissionRole.dialog.cancel') }}
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="save"
          >
            {{ $t('permissionRole.dialog.create') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="600">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>{{ $t('permissionRole.dialog.editRole') }}</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="new_form">
            <v-row class="mt-4">
              <v-col cols="12">
                <div class="label">{{$t('permissionRole.dialog.status')}}</div>
                <v-select
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  append-icon="mdi-chevron-down"
                  v-model="edit_role.status"
                  :items="statusEnums"
                  color="#7631FF"
                  placeholder="Enter status"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('permissionRole.dialog.roleName')}}</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  v-model="edit_role.name"
                  color="#7631FF"
                  placeholder="Enter role name"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">{{$t('permissionRole.dialog.description')}}</div>
                <v-textarea
                  outlined
                  hide-details
                  class="rounded-lg base"
                  dense
                  v-model="edit_role.description"
                  color="#7631FF"
                  placeholder="Person who sews materials"
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
          >{{ $t('permissionRole.dialog.cancel') }}
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="putRoleData"
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
  name: 'RolePage',
  data() {
    return {
      delete_dialog: false,
      edit_dialog: false,
      new_dialog: false,
      options: {},
      filters: {
        id: "",
        key: "",
        status: "",
        value: "",
        value_to: "",
      },
      headers: [
        {text: 'ID', value: 'id', sortable: false,},
        {text: this.$t('permissionRole.table.roleName'), value: 'name'},
        {text: this.$t('permissionRole.table.description'), value: 'description'},
        {text: this.$t('permissionRole.table.created'), value: 'createdAt'},
        {text: this.$t('permissionRole.table.status'), value: 'status', width: '180'},
        {text: this.$t('permissionRole.table.updated'), value: 'updatedAt'},
        {text: this.$t('permissionRole.table.actions'), align: 'center', value: 'actions', sortable: false}
      ],
      all_role: [],
      new_role: {
        name: '',
        description: '',
      },
      new_permission: [],
      edit_permission: [],
      edit_role: {
        id: '',
        name: '',
        description: '',
        status: '',
      },
      current_page: 0,
      itemPerPage: 10,
    }
  },
  watch: {
    role(elem){
      this.all_role = JSON.parse(JSON.stringify(elem));
    },
  },
  async created() {
    this.$store.commit('setPageTitle', this.$t('permissionRole.dialog.accessControl'))
    await this.$store.dispatch('permission/getRoleAllData', {page: this.current_page, size: this.itemPerPage})
  },
  computed: {
    ...mapGetters({
      loading: 'permission/loading',
      role: 'permission/role',
      roleTotalElements: "permission/roleTotalElements"
    })
  },
  methods: {
    ...mapActions({
      getRoleAllData: 'permission/getRoleAllData',
      postRole: "permission/postRole",
      updateRole: "permission/updateRole",
      changeStatusRole: "permission/changeStatusRole",
      filterRoleData: "permission/filterRoleData",
    }),
    async putRoleData() {
      const data = this.edit_role;
      await this.updateRole(data);
      this.edit_dialog = false;
      this.edit_role = {
        id: '',
        name: '',
        description: '',
        status: '',
      }
    },
    async statusChange(item) {
      await this.changeStatusRole({id: item.id, status: item.status});
    },
    async save() {
      const data = {...this.new_role}
      await this.postRole(data);
      this.new_dialog = false;
      this.$refs.new_form.reset();
    },
    editItem(item) {
      this.edit_role = {
        id: item.id,
        name: item.name,
        description: item.description,
        status: item.status,
      }
      this.edit_dialog = true;
    },
    getItemSize(val) {
      this.itemPerPage = val;
      this.getRoleAllData({page: this.current_page, size: this.itemPerPage})
    },
    async resetFilters() {
      await this.$refs.filter_form.reset();
      this.filters.value = this.filters.value_to = "";
      await this.getRoleAllData({page: 0, size: 10});
    },
    async filterRole(){
      const item = {...this.filters};
      await this.filterRoleData(item);
    },
  },
}
</script>

<style scoped>
</style>
