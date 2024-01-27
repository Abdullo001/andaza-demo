<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card color="#fff" elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ currentUser.username }}</div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="label">{{ $t('userManagement.child.photo') }}</div>
            <div class="overlay" @click="handleFileImport">
              <v-img :src="one_user.photo" class="rounded-lg mb-4" width="120"/>
              <v-icon
                style="position: absolute; top:50%; left: 50%; z-index: 10; transform: translate(-50%, -50%)"
                color="#fff"
              >mdi-square-edit-outline
              </v-icon>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                @change="onFileChanged"
                accept="image/*"
              />
            </div>
            <div class="label">{{ $t('userManagement.child.username') }}</div>
            <v-text-field
              v-model="one_user.username"
              outlined
              class="base rounded-lg"
              dense
              height="44"
              clearable
              style="max-width: 400px"
              :disabled="fields_status"
              color="#544B99"
            />
            <div class="label">{{ $t('userManagement.child.lang') }}</div>
            <v-select
              :items="lang_list"
              v-model="one_user.lang" append-icon="mdi-chevron-down"
              outlined
              height="44"
              class="base rounded-lg"
              dense
              clearable
              :disabled="fields_status"
              style="max-width: 400px;"
              color="#544B99"
            >
              <template #selection="{item, index}">
                <v-img :src="item.icon" max-width="22" class="mr-4" contain/>
                {{ item.title }}
              </template>
              <template #item="{item}">
                <v-img :src="item.icon" max-width="22" class="mr-4" contain/>
                {{ item.title }}
              </template>
            </v-select>
          </v-col>
          <v-col>
            <div class="label">ID</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.id"
              dense
              height="44"
              disabled
              style="max-width: 400px"
            />
            <div class="label">{{ $t('userManagement.child.lastName') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.lastName"
              dense
              height="44"
              :disabled="fields_status"
              style="max-width: 400px"
              color="#544B99"
            />
            <div class="label">{{ $t('userManagement.child.eMail') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.email"
              dense
              height="44"
              :disabled="fields_status"
              style="max-width: 400px"
              color="#544B99"
            />
            <div class="label">{{ $t('userManagement.child.registeredDate') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.registeredDate"
              dense
              height="44"
              disabled
              style="max-width: 400px"
              color="#544B99"
            />
          </v-col>
          <v-col>
            <div class="label">{{ $t('userManagement.child.firstName') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.firstName"
              dense
              height="44"
              :disabled="fields_status"
              style="max-width: 400px"
              color="#544B99"
            />
            <div class="label">{{ $t('userManagement.child.phoneNumber') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.phoneNumber"
              dense
              height="44"
              :disabled="fields_status"
              color="#544B99"
              style="max-width: 400px"
            />
            <div class="label">{{ $t('userManagement.child.status') }}</div>
            <v-select
              outlined
              class="base rounded-lg"
              v-model="one_user.status"
              dense
              height="44"
              :items="status_list"
              append-icon="mdi-chevron-down"
              disabled
              style="max-width: 400px"
            />
            <div v-if="!!userPasswordData?.password">
              <div class="label">
                {{ $t('userManagement.child.password') }}
              </div>
              <div
                class="d-flex align-center"
              >
                <div class="body-1">{{ userPasswordData.password }}</div>
                <v-tooltip top color="green">
                  <template v-slot:activator="{on, attrs}">
                    <v-btn
                      icon
                      v-on="on"
                      v-bind="attrs"
                      class="ml-4"
                      @click="getPassword(userPasswordData.password)"
                    >
                      <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>Copy</span>
                </v-tooltip>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="#544B99"
          dark
          class="text-none font-weight-bold mx-3 mb-4 px-5"
          height="40"
          @click="updatePassword"
        >{{ $t('userManagement.child.update') }}
        </v-btn>
        <v-btn
          color="#544B99"
          dark
          class="text-capitalize font-weight-bold mx-3 mb-4 px-5"
          height="40"
          @click="saveChanges"
        >{{ $t('userManagement.child.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card color="#fff" elevation="0" class="mt-8">
      <v-card-title class="d-flex justify-space-between">
        <div>Permissions</div>

      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-data-table
          class="mt-4 rounded-lg"
          :headers="headers"
          :items="permisionList"
          :items-per-page="16"
          hide-default-footer
        >
        <template #item.checker="{item}">
          <v-simple-checkbox
            v-model="item.isChecked"
            color="#544B99"
          ></v-simple-checkbox>
        </template>
        <template #item.canWrite="{item}">
          <v-switch v-model="item.canWrite" v-if="item.isChecked" @click="changeStatus(item)" inset color="#4F46E5"/>
        </template>
        <template #item.canRead="{item}">
          <v-switch v-model="item.canRead" v-if="item.isChecked"  @click="changeStatus(item)" inset color="#4F46E5"/>
        </template>
        <template #item.canUpdate="{item}">
          <v-switch v-model="item.canUpdate" v-if="item.isChecked"  @click="changeStatus(item)" inset color="#4F46E5"/>
        </template>
        <template #item.canDelete="{item}">
          <v-switch v-model="item.canDelete" v-if="item.isChecked"  @click="changeStatus(item)" inset color="#4F46E5"/>
        </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="permission_dialog" width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            New permission
          </div>
          <v-btn icon color="#544B99" @click="permission_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12">
              <div class="label">Permission name</div>
              <v-select
                append-icon="mdi-chevron-down"
                v-model="newPermission.permissionName"
                :rules="[formRules.required]"
                :items="otherPermissions"
                hide-details
                color="#544B99"
                class="base rounded-lg"
                rounded
                outlined
                dense
                placeholder="Select permission name"
              />
            </v-col>
            <v-col cols="3">
              <div class="label">Can write</div>
              <v-switch v-model="newPermission.canWrite" inset color="#4F46E5"/>
            </v-col>
            <v-col cols="3">
              <div class="label">Can read</div>
              <v-switch v-model="newPermission.canRead" inset color="#4F46E5"/>
            </v-col>
            <v-col cols="3">
              <div class="label">Can update</div>
              <v-switch v-model="newPermission.canUpdate" inset color="#4F46E5"/>
            </v-col>
            <v-col cols="3">
              <div class="label">Can delete</div>
              <v-switch v-model="newPermission.canDelete" inset color="#4F46E5"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="130"
            @click="setPermissonFunc"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="loader" v-if="loader">
      <v-progress-circular
        indeterminate
        color="#544B99"
        class="progress"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  components: {Breadcrumbs},
  data() {
    return {
      map_links: [
        {
          text: this.$t('userManagement.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('userManagement.child.userManagement'),
          disabled: false,
          to: this.localePath('/user-management'),
          icon: true
        },
        {
          text: this.$t('userManagement.child.details'),
          disabled: true,
          to: this.localePath(`/user-management/${this.$route.params.id}`),
          icon: false
        },
      ],
      headers:[
        { text: "", value: "checker",sortable: false },
        { text: "Permission name", value: "permissionName", width: 400,sortable: false},
        { text: "View ", value: "canRead",sortable: false  },
        { text: "Create", value: "canWrite",sortable: false  },
        { text: "Update", value: "canUpdate",sortable: false  },
        { text: "Delete", value: "canDelete",sortable: false  },

      ],
      newPermission:{
        permissionName:"",
        canWrite:false,
        canRead:false,
        canUpdate:false,
        canDelete:false,
      },
      otherPermissions:
      [
        "MODEL",
        "CALCULATION",
        "ORDER",
        "FABRIC_PLANNING_ORDERING",
        "ACCESSORY_PLANNING",
        "SAMPLE",
        "FABRIC_WAREHOUSE",
        "ACCESSORY_WAREHOUSE",
        "READY_GARMENT_WAREHOUSE",
        "PRODUCTION",
        "SHIPPING",
        "MANAGEMENT_FORM",
        "PRODUCTION_FORM",
        "CATALOG",
        "SETTING",
        "REPORT"
      ],
      permission_dialog:false,
      permisionList:[
      ],
      fields_status: false,
      lang_list: [
        {title: "EN", code: "en", icon: "/en.svg"},
        {title: "UZ", code: "uz", icon: "/uz.svg"},
        {title: "RU", code: "ru", icon: "/ru.svg"},
      ],
      user_data: {
        photo: null,
        firstname: '',
        lastname: '',
        phone: '',
        username: '',
        email: '',
        lang: {},
        gender: ''
      },
      one_user: {},
      status_list: ['ACTIVE', 'DISABLED', 'PENDING'],
      avatar: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/currentUser',
      userPasswordData: 'users/userPasswordData',
      loader: 'users/loader',
      primaryPermissionsList: 'users/permissionsList',

    })
  },
  watch: {
    currentUser(val) {
      this.one_user = JSON.parse(JSON.stringify(val))
      const langFull = () => {
        switch (this.one_user.lang) {
          case 'UZ':
            return {title: "UZ", code: "uz", icon: "/uz.svg"}
          case 'RU':
            return {title: "RU", code: "ru", icon: "/ru.svg"}
          case 'EN':
            return {title: "EN", code: "en", icon: "/us.svg"}
        }
      }
      this.one_user.lang = langFull()
    },
    primaryPermissionsList(list){
      let otherPermissions=
      [
        "MODEL",
        "CALCULATION",
        "ORDER",
        "FABRIC_PLANNING_ORDERING",
        "ACCESSORY_PLANNING",
        "SAMPLE",
        "FABRIC_WAREHOUSE",
        "ACCESSORY_WAREHOUSE",
        "READY_GARMENT_WAREHOUSE",
        "PRODUCTION",
        "SHIPPING",
        "MANAGEMENT_FORM",
        "PRODUCTION_FORM",
        "CATALOG",
        "SETTING",
        "REPORT"
      ]
      const specialList=list.map((item)=>{

        return{
          ...item,
          isChecked:true,
        }
      })
      list.forEach((el)=>{
        otherPermissions=otherPermissions.filter(item=>item!==el.permissionName)
      })
      const specialListForOther=otherPermissions.map((item)=>{
        return{
          permissionName:item,
          canRead:false,
          canWrite:false,
          canUpdate:false,
          canDelete:false,
          isChecked:false,
        }
      })
      specialList.push(...specialListForOther)
      console.log(specialList);
      this.permisionList=JSON.parse(JSON.stringify(specialList))

    }
  },
  methods: {
    ...mapActions({
      updateUser: "users/updateUser",
      resetPassword: 'users/resetPassword',
      setPermission: 'users/setPermission',
    }),
    getPassword(password) {
      navigator.clipboard.writeText(password);
      this.$toast.success(`Copied to clipboard !`);
    },
    updatePassword() {
      this.$store.commit('users/setLoader', true);
      const data = {...this.one_user};
      this.resetPassword( data.email );
    },
    handleFileImport() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.avatar = e.target.files[0];
      if (this.avatar !== undefined) {
        this.one_user.photo = window.URL.createObjectURL(this.avatar);
      }
    },
    addPermission(){
      this.permisionList.forEach((el)=>{
        this.otherPermissions=this.otherPermissions.filter(item=>item!==el.permissionName)
      })
    },
    setPermissonFunc(){
      const data={
        userId:this.$route.params.id,
        ...this.newPermission
      }
      this.setPermission(data)
      this.newPermission={
        permissionName:"",
        canWrite:false,
        canRead:false,
        canUpdate:false,
        canDelete:false,
      }
    },
    changeStatus(item){
      const data={
        userId:this.$route.params.id,
        ...item
      }
      this.setPermission(data)
    },
    saveChanges() {
      let data = JSON.parse(JSON.stringify(this.one_user))
      data.lang = data.lang.title;
      ['registeredDate', 'password', 'status'].forEach(e => delete data[e])
      if (typeof this.avatar === "object") {
        data.photo = this.avatar
      } else data.photo = null
      console.log(data)
      this.updateUser(data);
    },
    langFlag(lang) {
      switch (lang) {
        case 'UZ':
          return '/flag-uz.svg';
        case 'RU':
          return '/flag-ru.svg';
        case 'EN':
          return '/flag-en.svg';
      }
    },
  },
  mounted() {
    const id = this.$route.params.id
    this.$store.dispatch('users/getOneUser', id)
    this.$store.dispatch('users/getPermissionsList', id)
  }
}
</script>

<style lang="scss">
.loader {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 10;
  > .v-progress-circular {
    position: absolute;
    z-index: 1000;
    left: 50%;
    top: 50%;
  }
}
.overlay {
  position: relative;
  max-width: 120px;

  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    max-width: 120px;
    opacity: 0;
    transition: all linear 0.2s;
  }

  &:hover::after {
    content: '';
    opacity: 1;
  }

  > .v-icon {
    opacity: 0;
  }

  &:hover > .v-icon {
    opacity: 1;
  }
}

.v-btn--outlined {
  border: 1px solid;
}

.base-color {
  color: #544B99;
}
</style>
