<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Role ID"
              outlined
              class="rounded-lg"
              v-model="filters.financeNumber"
              hide-details
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Role name"
              outlined
              class="rounded-lg"
              v-model="filters.modelId"
              hide-details
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-select
              label="Status"
              outlined
              class="rounded-lg"
              v-model="filters.partnerId"
              hide-details
              append-icon="mdi-chevron-down"
              dense
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filters.createAt"
                  label="Created at"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  append-icon="mdi-lock"
                  class="rounded-lg"
                  hide-details
                  style="width: 200px"
                >
                  <template #append>
                    <v-img src="/date-icon.svg"/>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="filters.createAt"
                @input="menu2 = false"
                color="#7631FF"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="" cols="12" lg="4">
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
      :items="role"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50]
      }"
      :loading="loading"
      class="mt-4 rounded-lg"
      :options.sync="options"
      @update:items-per-page="getItemSize"
      @click:row="(item) => pushRow(item)"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">Permission</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = !new_dialog">
              <v-icon>mdi-plus</v-icon>
              Role
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>

      <template #item.actions="{item}">
        <v-btn icon color="green" @click.stop="editItem(item)">
          <v-icon size="20">mdi-square-edit-outline</v-icon>
        </v-btn>
        <v-btn icon color="red" @click.stop="getDeleteItem(item)">
          <v-icon size="20">mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
      <template #item.status="{item}">
        <div>
          <v-select
            @click.stop="statusChange"
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
          <div>Create role</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mt-4">
              <v-col cols="12">
                <v-text-field
                  label="Role name"
                  filled
                  dense
                  v-model="new_role.name"
                  color="#7631FF"
                  placeholder="Enter role name"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  filled
                  v-model="new_role.description"
                  dense
                  rows="1"
                  color="#7631FF"
                  placeholder="Enter role description"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Permission"
                  filled
                  dense
                  v-model="new_permission"
                  color="#7631FF"
                  placeholder="Enter role permissions"
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
          >create
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
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mt-4">
              <v-col cols="12" md="6">
                <v-text-field
                  label="Role ID"
                  filled
                  dense
                  v-model="edit_role.id"
                  color="#7631FF"
                  placeholder="Enter role id"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Status"
                  filled
                  dense
                  v-model="edit_role.status"
                  :items="statusEnums"
                  color="#7631FF"
                  placeholder="Enter status"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Role name"
                  filled
                  dense
                  v-model="edit_role.name"
                  color="#7631FF"
                  placeholder="Enter role name"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  filled
                  dense
                  v-model="edit_role.description"
                  color="#7631FF"
                  placeholder="Person who sews materials"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Permission"
                  v-model="edit_permission"
                  filled
                  multiple
                  chips
                  dense
                  color="#7631FF"
                  placeholder="Enter permission"
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
            @click="edit_dialog = !edit_dialog"
          >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="postRoleData"
          >create
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
            @click="deleteRole"
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
  name: 'RolePage',
  data: () => {
    return{
      delete_dialog: false,
      new_validate: true,
      edit_dialog: false,
      new_dialog: false,
      options: {},
      valid_search: '',
      filters:{},
      menu2: '',
      headers: [
        {text: 'ID', value: 'id', sortable: false,},
        {text: 'Role name', value: 'roleName'},
        {text: 'Description', value: 'description'},
        {text: 'Status', value: 'status', width: '150'},
        {text: 'Created', value: 'created'},
        {text: 'Created by', value: 'createdBy'},
        {text: 'Updated', value: 'updated'},
        {text: 'Updated by', value: 'updatedBy'},
        {text: 'Actions', align: 'center', value: 'actions', sortable: false}
      ],
      // NEW ROLE
      new_role: {
        name: '',
        description: '',
      },
      new_permission: [],
      id: '',
      // EDIT ROLE
      edit_permission: [],
      edit_role: {
        id: '',
        name: '',
        description: '',
        status: '',
      },
      role: [
        {
          id: 1, roleName: 'Sewer',
          description: 'Person who sews materials',
          status: 'ACTIVE', created: '12.10.2022 17:09:08',
          createdBy: 'John Doe', updated: '21.11.2022 17:09:08',
          updatedBy: 'Lisa Doe'
        },
        {
          id: 2, roleName: 'Sewer',
          description: 'Person who sews materials',
          status: 'DISABLED', created: '12.10.2022 17:09:08',
          createdBy: 'John Doe', updated: '21.11.2022 17:09:08',
          updatedBy: 'Lisa Doe'
        },
        {
          id: 3, roleName: 'Sewer',
          description: 'Person who sews materials',
          status: 'PENDING', created: '12.10.2022 17:09:08',
          createdBy: 'John Doe', updated: '21.11.2022 17:09:08',
          updatedBy: 'Lisa Doe'
        }
      ],
      current_page: 0,
      itemPerPage: 10,
    }
  },
  computed: {
    ...mapGetters({
      loading: 'permission/loading',
      // role: 'permission/role',
    })
  },
  methods: {
    ...mapActions({
      getRoleAllData: 'permission/getRoleAllData',
      postRole: "permission/postRole",
    }),
    // POST ROLE
    async postRoleData(){
      console.log('click')
      const validate = this.$refs.new_form.validate();
      if (validate){
        await this.postRole(this.new_role);
        this.$refs.new_form.reset();
        this.new_dialog = false;
      }
    },
    statusChange(){},
    // DELETE ROLE
    deleteRole(){
      console.log(this.id)
    },
    getDeleteItem(item){
      console.log(item);
      this.delete_dialog = true;
      this.id = item.id
    },
    editItem(item){
      console.log(item);
      this.edit_role = {...item}
      this.edit_dialog = true;
    },
    // GET ROLE
    getItemSize(val){
      this.itemPerPage = val;
      this.getRoleAllData({page: this.current_page, size: this.itemPerPage})
    },
    pushRow(item){
      this.$router.push(`/role/${item.id}`)
    },
    resetFilters(){},
    save(){
      console.log('click')
    },
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Access control')
    this.$store.dispatch('permission/getRoleAllData', {page: this.current_page, size: this.itemPerPage})
  },
}
</script>

<style scoped>

</style>
