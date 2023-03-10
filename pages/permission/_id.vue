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
        <v-btn outlined class="text-capitalize rounded-lg mx-3" @click="delete_dialog = !delete_dialog">
          <v-img src="/trash.svg" max-width="16" class="mr-2"/>
          delete
        </v-btn>
        <v-btn outlined class="text-capitalize rounded-lg" @click="edit_user">
          <v-img src="/edit.svg " max-width="16" class="mr-2"/>
          {{this.disabled ? 'edit' : 'save'}}
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-form lazy-validation v-model="validate" ref="form">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :disabled="disabled"
                label="Permission ID"
                v-model="create_permission.id"
                filled
                dense
                color="#7631FF"
                placeholder="Enter permission name"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :disabled="disabled"
                v-model="create_permission.name"
                label="Permission name"
                filled
                dense
                color="#7631FF"
                placeholder="Enter permission name"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-textarea
                :disabled="disabled"
                label="Description"
                v-model="create_permission.description"
                filled
                dense
                rows="1"
                auto-grow
                color="#7631FF"
                placeholder="Enter permission description"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :disabled="disabled"
                label="Permission path"
                v-model="create_permission.path"
                filled
                dense
                color="#7631FF"
                placeholder="Enter permission path"
                :rules="[formRules.required]"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :disabled="disabled"
                label="Status"
                v-model="create_permission.status"
                class="rounded-lg"
                hide-details
                dense
                :items="statusEnums"
                filled
                append-icon="mdi-chevron-down"
                color="#7631FF"
                validate-on-blur
              >
              </v-select>
            </v-col>
            <v-col
              cols="12" md="4" style="max-width: 240px;"
            >
              <el-date-picker
                :disabled="disabled"
                type="datetime"
                v-model="create_permission.createdAt"
                placeholder="From"
                value-format="dd.MM.yyyy HH:mm:ss"
                :picker-ptions="pickerOptions"
              >
              </el-date-picker>
            </v-col>
            <v-col
              cols="12" md="4"
            >
              <el-date-picker
                :disabled="disabled"
                type="datetime"
                placeholder="To"
                v-model="create_permission.updatedAt"
                value-format="dd.MM.yyyy HH:mm:ss"
                :picker-ptions="pickerOptions"
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

export default {
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
      pickerOptions: {
        shortcuts: [
          {
            text: "Cегодня",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Вчера",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "Неделя",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
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
