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
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form lazy-validation v-model="validate" ref="form">
          <v-row>
            <v-col cols="12" md="4">
              <div class="label">Role ID</div>
              <v-text-field
                :disabled="disabled"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                v-model="get_one_role.id"
                color="#544B99"
                placeholder="Enter role id"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="label">Role name</div>
              <v-text-field
                :disabled="disabled"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                v-model="get_one_role.name"
                color="#544B99"
                placeholder="Enter role name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="label">Description</div>
              <v-textarea
                :disabled="disabled"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                rows="1"
                dense
                v-model="get_one_role.description"
                auto-grow
                color="#544B99"
                placeholder="Enter role description"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="label">Status</div>
              <v-select
                :disabled="disabled"
                :items="statusEnums"
                dense
                append-icon="mdi-chevron-down"
                v-model="get_one_role.status"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                color="#544B99"
                validate-on-blur
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <div class="label">Role name</div>
              <v-text-field
                :disabled="disabled"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                disabled
                v-model="get_one_role.createdAt"
                color="#544B99"
                placeholder="Enter role name"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="label">Role name</div>
              <v-text-field
                :disabled="disabled"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                disabled
                v-model="get_one_role.updatedAt"
                color="#544B99"
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
          color="#544B99"
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
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation v-model="edit_form" ref="new_form">
            <v-row class="mt-4">
              <v-col cols="12" md="6">
                <div class="label">Role ID</div>
                <v-text-field
                  placeholder="Enter role ID"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                  validate-on-blur
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <div class="label">Status</div>
                <v-select
                  placeholder="Select Status"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  color="#544B99"
                  :rules="[formRules.required]"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <div class="label">Permission name</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  color="#544B99"
                  placeholder="Enter permission name"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Description</div>
                <v-textarea
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  color="#544B99"
                  placeholder="Person who sews materials"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12">
                <div class="label">Permission</div>
                <v-text-field
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  dense
                  color="#544B99"
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
            color="#544B99"
            width="163"
            @click="edit_dialog = !edit_dialog"
          >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
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
              <v-btn color="#544B99" class="rounded-lg text-capitalize" dark @click="add_dialog = !add_dialog">
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
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="label">Permission</div>
          <v-select
            label="Select permission"
            outlined
            hide-details
            height="44"
            class="rounded-lg base"
            dense
            chips
            append-icon="mdi-chevron-down"
            deletable-chips
            multiple
            :items="permissionSelect"
            color="#544B99"
          >
          </v-select>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#544B99"
            width="163"
            @click="add_dialog = !add_dialog"
          >cancel
          </v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
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
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  components: {Breadcrumbs},
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
