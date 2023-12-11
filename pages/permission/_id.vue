<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-card-title>
        <div class="text-capitalize font-weight-bold">
          create permission
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form lazy-validation v-model="validate" ref="form">
          <v-row>
            <v-col cols="12" md="4">
              <div class="mb-2 text-body-1">Permission ID</div>
              <v-text-field
                :disabled="disabled"
                v-model="create_permission.id"
                outlined
                height="44"
                hide-details
                class="rounded-lg base"
                dense
                color="#544B99"
                placeholder="Enter permission name"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-2 text-body-1">Permission name</div>
              <v-text-field
                :disabled="disabled"
                v-model="create_permission.name"
                outlined
                height="44"
                hide-details
                class="rounded-lg base"
                dense
                color="#544B99"
                placeholder="Enter permission name"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-2 text-body-1">Description</div>
              <v-textarea
                :disabled="disabled"
                v-model="create_permission.description"
                outlined
                height="44"
                hide-details
                class="rounded-lg base"
                dense
                rows="1"
                auto-grow
                color="#544B99"
                placeholder="Enter permission description"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-2 text-body-1">Permission path</div>
              <v-text-field
                :disabled="disabled"
                v-model="create_permission.path"
                outlined
                height="44"
                hide-details
                class="rounded-lg base"
                dense
                color="#544B99"
                placeholder="Enter permission path"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-2 text-body-1">Status</div>
              <v-select
                :disabled="disabled"
                v-model="create_permission.status"
                dense
                :items="statusEnums"
                outlined
                height="44"
                hide-details
                class="rounded-lg base"
                append-icon="mdi-chevron-down"
                color="#544B99"
                validate-on-blur
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-2 text-body-1">Created</div>
              <el-date-picker
                :disabled="disabled"
                type="datetime"
                style="width: 100%; height: 44px"
                v-model="create_permission.createdAt"
                placeholder="From"
                value-format="dd.MM.yyyy HH:mm:ss"
                :picker-ptions="pickerShortcuts"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-2 text-body-1">Update</div>
              <el-date-picker
                :disabled="disabled"
                type="datetime"
                style="width: 100%; height: 44px"
                placeholder="To"
                v-model="create_permission.updatedAt"
                value-format="dd.MM.yyyy HH:mm:ss"
                :picker-ptions="pickerShortcuts"
              >
              </el-date-picker>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
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
            @click="deletePermission"
          >
            delete
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
      delete_dialog: false,
      disabled: true,
      validate: true,
      create_permission: {
        createdAt: '',
        updatedAt: '',
        name: '',
        path: '',
        status: '',
        description: '',
        id: '',
      },
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Permission',
          disabled: false,
          to: '/Permission',
          icon: true
        },
        {
          text: 'Create permission',
          disabled: true,
          to: '/user-management/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch('permission/getIdPermission', id);
    await this.$store.commit('setPageTitle', 'Access control');
    this.create_permission = {...this.permissionIdDAta}
  },
  computed:{
    ...mapGetters({
      permissionIdDAta: "permission/permissionIdDAta",
    })
  },
  methods: {
    // DELETE PERMISSION
    deletePermission(){
      console.log('click');
    },
    // DISABLED BUTTON
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

<style lang="scss" scoped>
</style>
