<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="search_form">
        <v-row class="mx-0 px-0 mb-2 mt-4 pa-4 w-full" justify="center">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="User ID"
              outlined
              class="rounded-lg"
              v-model="search.user_id"
              hide-details
              dense
              clearable
              @keyup.enter="filter"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="First name"
              outlined
              class="rounded-lg"
              v-model="search.first_name"
              hide-details
              dense
              clearable
              @keyup.enter="filter"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Last name"
              outlined
              class="rounded-lg"
              v-model="search.last_name"
              hide-details
              dense
              clearable
              @keyup.enter="filter"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2" style="max-width: 240px;"
          >
            <el-date-picker
              v-model="search.start_time"
              type="datetime"
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
              v-model="search.end_time"
              type="datetime"
              placeholder="To"
              :picker-options="pickerOptions"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col class="" cols="12" lg="12" >
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
                @click="filter"
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
      :items="users"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      :loading="loading"
      class="mt-4 rounded-lg"
      :options.sync="options"
      @update:items-per-page="getItemSize"
      @update:page="page"
      :server-items-length="totalElements"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">Users</div>
            <v-btn color="#7631FF" class="rounded-lg" dark @click.stop="new_user = true">
              <v-icon>mdi-plus</v-icon>
              user
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex">
          <v-tooltip top color="gray">
            <template #activator="{on, attrs}">
              <v-btn
                icon color="gray"
                @click.stop="getUserInfo(item)"
                v-on="on"
                v-bind="attrs"
              >
                <v-icon
                  size="25"
                  color="gray"
                >
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </template>
            <span>Details</span>
          </v-tooltip>
        </div>
      </template>
      <template #item.status="{item}">
        <v-select
          @change="changeStatus(item)"
          :background-color="statusColor(item.status)"
          :items="status_enums"
          append-icon="mdi-chevron-down"
          v-model="item.status"
          hide-details
          dark
          rounded
        />
      </template>
      <template #item.lang="{item}">
        <div class="d-flex align-center">
          <v-img max-width="25" :src="langFlag(item.lang)" class="mr-3"/>
          {{ item.lang }}
        </div>
      </template>
      <template #item.username="{item}">
        <div class="d-flex align-center my-2">
          <v-avatar>
            <v-img :src="item.photo"/>
          </v-avatar>
          <div class="ml-2">
            <div class="username-name">{{ item.username }}</div>
            <div class="username-email">
              {{ item.email }}
              <v-tooltip top color="green">
                <template #activator="{ on, attrs }">
                  <div @click.stop="getCopyKey(item.email)" v-bind="attrs" v-on="on">
                    <v-img src="/copy.svg" width="15" class="ml-2 pointer"/>
                  </div>
                </template>
                <span>Copy</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </template>
      <template #item.phoneNumber="{item}">
        <div class="d-flex align-center">
          {{ item.phoneNumber }}
          <v-tooltip top color="green">
          <template #activator="{ on, attrs }">
            <div @click.stop="getCopyKey(item.phoneNumber)" v-bind="attrs" v-on="on">
              <v-img src="/copy.svg" width="15" class="ml-2 pointer"/>
            </div>
          </template>
          <span>Copy</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete User information</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this user information?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="deleteDialog = false"
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
    <v-dialog v-model="new_user" max-width="680" persistent>
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Add user</div>
          <v-btn icon @click="resetUserDialog">
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation ref="new_user" v-model="new_valid">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="d-flex align-center">
                  <v-img :src="avatar ? avatar : '/upload-default.svg'" max-width="120" v-ripple class="rounded-lg"/>
                  <v-btn color="#F1EBFE" elevation="0" class="rounded-lg ml-6 text-capitalize" @click="handleFileImport">
                    <v-img src="/upload-btn-icon.svg" width="20" class="mr-2"/>
                    <div class="btn-color">Upload photo</div>
                  </v-btn>
                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    @change="onFileChanged"
                    accept="image/*"
                  />
                </div>
              </v-col>
              <v-col cols="12" lg="6" align-self="end">
                <v-text-field
                  label="Username"
                  filled
                  dense
                  color="#7631FF"
                  placeholder="Enter username"
                  v-model="user_data.username"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col cols="12" lg="6">
                <v-text-field
                  label="First name"
                  filled
                  dense
                  color="#7631FF"
                  placeholder="Enter first name"
                  v-model="user_data.firstname"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="Last name"
                  filled
                  dense
                  color="#7631FF"
                  placeholder="Enter last name"
                  v-model="user_data.lastname"
                  :rules="[formRules.required]"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="Phone number"
                  filled
                  dense
                  color="#7631FF"
                  v-mask="'(##) ### ## ##'"
                  prefix="+998"
                  placeholder="(--) --- -- --"
                  v-model.trim="user_data.phone"
                  validate-on-blur
                />
              </v-col>

              <v-col cols="12" lg="6">
                <v-text-field
                  label="E-mail"
                  filled
                  dense
                  color="#7631FF"
                  placeholder="Enter e-mail"
                  class="mb-3"
                  v-model="user_data.email"
                  validate-on-blur
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-select
                  :items="gender_enums"
                  label="Gender"
                  filled
                  dense
                  color="#7631FF"
                  placeholder="Select gender"
                  class="mb-3"
                  v-model="user_data.gender"
                  :rules="[formRules.required]"
                  validate-on-blur
                  append-icon="mdi-chevron-down"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-select
                  :items="lang_list" label="Language"
                  v-model="user_data.lang" append-icon="mdi-chevron-down"
                  filled
                  dense
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
              <v-col cols="12" class="d-flex justify-center align-center mb-2" v-if="!!createdUser.password">
                <p class="text-body-1 mb-0 mr-2">Password:</p>
                <span class="text-body-1 font-weight-bold">{{ createdUser.password }}</span>
                <v-btn icon class="ml-2" @click="copyPassword(createdUser.password)">
                  <v-img src="/copy.svg" max-width="20" contain/>
                </v-btn>
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
            @click="resetUserDialog"
          >cancel</v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="addUser"
          >add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_user" max-width="680">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>Edit user</div>
          <v-btn icon @click="edit_user = false">
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>

          <v-row class="mt-4">
            <v-col cols="12" lg="6">
              <v-text-field
                label="First name"
                filled
                dense
                color="#7631FF"
                placeholder="Enter first name"
                v-model="user_update_data.firstName"
                :rules="[formRules.required]"
                validate-on-blur
                disabled
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                label="Last name"
                filled
                dense
                color="#7631FF"
                placeholder="Enter last name"
                v-model="user_update_data.lastName"
                :rules="[formRules.required]"
                validate-on-blur
                disabled
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                label="Phone number"
                filled
                dense
                color="#7631FF"
                v-mask="'+### (##) ### ## ##'"
                placeholder="(--) --- -- --"
                v-model.trim="user_update_data.phoneNumber"
                :rules="[formRules.required]"
                validate-on-blur
                disabled
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                label="Username"
                filled
                dense
                color="#7631FF"
                placeholder="Enter username"
                v-model="user_update_data.username"
                :rules="[formRules.required]"
                validate-on-blur
                disabled
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                label="E-mail"
                filled
                dense
                color="#7631FF"
                placeholder="Enter e-mail"
                class="mb-3"
                v-model="user_update_data.email"
                :rules="[formRules.required]"
                validate-on-blur
                disabled
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-select
                :items="status_list" label="Status"
                v-model="user_status" append-icon="mdi-chevron-down"
                filled
                dense
                :rules="[formRules.required]"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#7631FF"
            width="163"
            @click.stop="edit_user = false"
          >cancel</v-btn>
          <v-btn
            class="text-capitalize rounded-lg font-weight-bold"
            color="#7631FF"
            dark
            width="163"
            @click="changeUserStatus"
          >add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'UserManagementPage',
  data() {
    return {
      modal: null,
      edit_user: false,
      gender_enums: ['MALE', 'FEMALE'],
      lang_list: [
        {title: "EN", code: "en", icon: "/us.svg"},
        {title: "UZ", code: "uz", icon: "/uz.svg"},
        {title: "RU", code: "ru", icon: "/ru.svg"},
      ],
      deleteDialog: false,
      valid_search: true,
      status_enums: ['ACTIVE', 'PENDING', 'DISABLED'],
      search: {
        user_id: '',
        first_name: '',
        last_name: '',
        start_time: '',
        end_time: ''
      },
      date: '',
      menu2: false,
      headers: [
        {text: 'ID', align: 'start', sortable: true, value: 'id'},
        {text: 'Username', align: 'start', sortable: false, value: 'username'},
        {text: 'First Name', align: 'start', sortable: true, value: 'firstName'},
        {text: 'Last Name', align: 'start', sortable: true, value: 'lastName'},
        {text: 'Phone number', align: 'start', sortable: false, value: 'phoneNumber'},
        {text: 'Update at', align: 'start', sortable: true, value: 'updatedAt'},
        {text: 'Lang', align: 'start', sortable: false, value: 'lang'},
        {text: 'Status', align: 'start', sortable: false, value: 'status', width: 180},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions', width: 90},
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
      new_user: false,
      user_status: '',
      status_list: ['ACTIVE', 'DISABLED', 'PENDING'],
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
      user_update_data: {
        photo: null,
        firstName: '',
        lastName: '',
        phone: '',
        username: '',
        email: '',
        lang: {},
      },
      avatar: null,
      new_valid: true,
      options: {},
      itemPerPage: 10,
      current_page: 0,
      users: []
    }
  },
  computed: {
    ...mapGetters({
      all_users: 'users/users',
      loading: 'users/loading',
      totalElements: 'users/totalElements',
      createdUser: 'users/createdUser'
    }),
  },
  watch: {
    options: {
      handler () {
        this.getDataFromApi()
      },
      deep: true,
    },
    all_users(val) {
      this.users = JSON.parse(JSON.stringify(val))
    },
  },
  methods: {
    ...mapActions({
      filterUsers: 'users/filterUsers',
      createUser: 'users/createUser',
      getUsers: 'users/getUsers',
      updateUserStatus: 'users/updateUserStatus',
      sortUser: 'users/sortUsers',
    }),
    resetUserDialog() {
      this.$refs.new_user.reset()
      this.$store.commit('users/setCreatedUser', {})
      this.avatar = ''
      this.new_user = !this.new_user
    },
    copyPassword(item) {
      navigator.clipboard.writeText(item)
      this.$toasted.success(`Copied ${item}`, {
        action: {
          text: '',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      })
    },
    changeStatus(item) {
      this.updateUserStatus(
        {
          id: item.id,
          status: item.status,
          page: this.current_page,
          size: this.itemPerPage
        })
    },
    getDataFromApi () {
      this.fakeApiCall()
    },
    fakeApiCall () {
      return new Promise((resolve, reject) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options
        this.sortUser({sortBy: sortBy, sortDesc: sortDesc})
      })
    },
    getItemSize(val) {
      this.itemPerPage = val;
      this.getUsers({page: this.current_page, size: this.itemPerPage})
    },
    page(val) {
      // arrows < > value page
      this.current_page = val - 1
      this.getUsers({page: this.current_page, size: this.itemPerPage})

    },
    async changeUserStatus() {
      await this.updateUserStatus({id: this.user_update_data.id, status: this.user_status})
      this.edit_user = false
    },
    filter() {
      this.filterUsers({
        lastName: this.search.last_name,
        firstName: this.search.first_name,
        userId: this.search.user_id,
        startTime: this.search.start_time,
        endTime: this.search.end_time
      })
    },
    async addUser() {
      const valid = this.$refs.new_user.validate()
      if(valid) {
        const user = {...this.user_data}
        user.lang = user.lang.title
        await this.createUser(user)
      }
    },
    getUserInfo(data) {
      const user = {...data}
      const langFull = () => {
        switch (user.lang) {
          case 'UZ':
            return {title: "UZ", code: "uz", icon: "/uz.svg"}
          case 'RU':
            return {title: "RU", code: "ru", icon: "/ru.svg"}
          case 'EN':
            return {title: "EN", code: "en", icon: "/us.svg"}
        }
      }
      user.lang = langFull()
      // this.$store.commit('users/setCurrentUser', user)
      this.$router.push(`/user-management/${user.id}`)
    },
    handleFileImport() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.user_data.photo = e.target.files[0];
      this.avatar = URL.createObjectURL(this.user_data.photo);
    },
    getCopyKey(item) {
      navigator.clipboard.writeText(item)
      this.$toasted.success(`Copied ${item}`, {
        action: {
          text: '',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      })
    },
    statusColor(color) {
      switch (color) {
        case 'ACTIVE':
          return 'green';
        case 'DISABLED':
          return 'red'
        case 'PENDING':
          return 'amber'
      }
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
    resetSearch() {
      this.$refs.search_form.reset();
      this.search.end_time = this.search.start_time = ''
      this.getUsers({page: this.current_page, size: this.itemPerPage})
    },
    editItem(item) {
      this.edit_user = !this.edit_user;
      this.user_status = item.status
      this.user_update_data = {...item}
    },
    deleteItem(item) {
      this.deleteDialog = !this.deleteDialog;
    }
  },
  mounted() {
    this.$store.dispatch('users/getUsers', {page: this.current_page, size: this.itemPerPage})
    this.$store.commit('setPageTitle', 'User management');
  }
}
</script>

<style lang="scss">
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 14px;
  font-size: 14px;
}
.username-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1D2433;
}

.username-email {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #777C85;
  display: flex;
  align-items: center;
}

.btn-color {
  font-size: 14px;
  line-height: 140%;
  color: #7631FF;
}
.el-input__inner {
  border-radius: 10px !important;
  border: 1px solid #919191;
  color: #000000 !important;
}
</style>
