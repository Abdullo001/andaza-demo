<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-card-title>
        <div class="text-capitalize font-weight-bold">
          sewer
        </div>
        <v-spacer/>
        <v-btn outlined class="text-capitalize rounded-lg mx-3" @click="delete_dialog = !delete_dialog">
          <v-img src="/trash.svg" max-width="16" class="mr-2"/>
          delete
        </v-btn>
        <v-btn
          outlined
          class="text-capitalize rounded-lg"
          @click="edit_user"
          :color="!
          disabled ? 'green' : null"
        >
          <v-img src="/edit.svg " max-width="16" class="mr-2"/>
          edit
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form lazy-validation v-model="validate" ref="form">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :disabled="disabled"
                label="Role ID"
                filled
                dense
                v-model="get_one_role.id"
                color="#7631FF"
                placeholder="Enter role id"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :disabled="disabled"
                label="Role name"
                filled
                dense
                v-model="get_one_role.name"
                color="#7631FF"
                placeholder="Enter role name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-textarea
                :disabled="disabled"
                label="Description"
                filled
                rows="1"
                dense
                v-model="get_one_role.description"
                auto-grow
                color="#7631FF"
                placeholder="Enter role description"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :disabled="disabled"
                label="Status"
                class="rounded-lg"
                :items="statusEnums"
                hide-details
                dense
                append-icon="mdi-chevron-down"
                v-model="get_one_role.status"
                filled
                color="#7631FF"
                validate-on-blur
              >
              </v-select>
            </v-col>
            <v-col
              cols="12" md="4"
            >
              <v-text-field
                :disabled="disabled"
                label="Role name"
                filled
                dense
                disabled
                v-model="get_one_role.createdAt"
                color="#7631FF"
                placeholder="Enter role name"
                validate-on-blur
              />
            </v-col>
            <v-col
              cols="12" md="4"
            >
              <v-text-field
                :disabled="disabled"
                label="Role name"
                filled
                dense
                disabled
                v-model="get_one_role.updatedAt"
                color="#7631FF"
                placeholder="Enter role name"
                validate-on-blur
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="#7631FF"
          dark
          class="text-capitalize font-weight-medium mx-3 mb-4"
          width="150"
          @click="saveChanges"
        >save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Role</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this role?
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
          >
            delete
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
          <v-form lazy-validation v-model="edit_form" ref="new_form">
            <v-row class="mt-4">
              <v-col cols="12" md="6">
                <v-text-field
                  label="Role ID"
                  filled
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                  validate-on-blur
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Status"
                  filled
                  dense
                  color="#7631FF"
                  :rules="[formRules.required]"
                  validate-on-blur
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Permission name"
                  filled
                  dense
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
                  color="#7631FF"
                  placeholder="Person who sews materials"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Permission"
                  filled
                  dense
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
            @click="edit_dialog = !edit_dialog"
          >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg mt-7"
    >
      <v-data-table
        :headers="headers"
        class="mt-4 rounded-lg"
        :items-per-page="10"
        :footer-props="{
        itemsPerPageOptions: [10, 20, 50]
      }"
        :loading="loading"
      >
        <template #top>
          <v-toolbar elevation="0">
            <v-toolbar-title class="d-flex justify-space-between w-full">
              <div class="font-weight-medium">Permission</div>
              <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="add_dialog = !add_dialog">
                <v-icon>mdi-plus</v-icon>
                Permission
              </v-btn>
            </v-toolbar-title>
          </v-toolbar>
          <v-divider/>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="add_dialog" max-width="600">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit user</div>
          <v-btn @click="add_dialog = !add_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-select
            label="Permission"
            filled
            dense
            chips
            deletable-chips
            multiple
            :items="permissionSelect"
            color="#7631FF"
          >
          </v-select>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#7631FF"
            width="163"
            @click="add_dialog = !add_dialog"
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
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      validate: true,
      disabled: true,
      edit_form: true,
      delete_dialog: false,
      edit_dialog: false,
      add_dialog: false,
      loading: false,
      get_one_role:{
        id: "",
        createdAt: "",
        description: "",
        name: "",
        status: "",
        updatedAt: ""
      },
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Role',
          disabled: false,
          to: '/role',
          icon: true
        },
        {
          text: 'Sewer',
          disabled: true,
          to: '/role/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id',},
        {text: 'Permission name', align: 'start', sortable: false, value: 'name',},
        {text: 'Description', align: 'start', sortable: false, value: 'description',},
        {text: 'Create', align: 'start', sortable: false, value: 'createdAt'},
        {text: 'Status', align: 'start', sortable: false, value: 'status',},
        {text: 'Update', align: 'start', sortable: false, value: 'updatedAt',},
        {text: 'Delete', align: 'start', sortable: false, value: 'delete',},
      ],
      permissionSelect: ['Active', 'DontActive'],
    }
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch('permission/getRoleIdentifier', id)
    this.$store.commit('setPageTitle', 'Access control')
    this.get_one_role = this.roleOne
  },
  computed:{
    ...mapGetters({
      roleOne: "permission/roleOne",
    })
  },
  methods: {
    save() {},
    saveChanges(){

    },
    edit_user(){

      if (this.disabled){
        this.disabled = !this.disabled;
      }
      else {
        // POST PERMISSION
        console.log('click');
        this.disabled = !this.disabled
      }
    },
  },
}
</script>

<style lang="scss">
tbody tr {
  cursor: pointer;
}
</style>
