<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="search_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="User ID"
              outlined
              class="rounded-lg"
              v-model="search.user_id"
              hide-details
              style="width: 200px"
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="First name"
              outlined
              class="rounded-lg"
              v-model="search.first_name"
              style="width: 200px"
              hide-details
              dense
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Last name"
              outlined
              class="rounded-lg"
              v-model="search.last_name"
              style="width: 200px"
              hide-details
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
                  v-model="date"
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
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="" cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="resetSearch"
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
      :items="users"
      :items-per-page="10"
      class="mt-6 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium">Users</div>
            <v-btn color="#7631FF" class="rounded-lg" dark>
              <v-icon>mdi-plus</v-icon> user
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
          <v-divider/>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex">
          <v-tooltip top color="green">
            <template #activator="{on, attrs}">
              <v-btn
                icon color="green"
                @click="editItem(item)"
                v-on="on"
                v-bind="attrs"
              >
                <v-icon
                  size="20"
                  color="green"
                >
                  mdi-square-edit-outline
                </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>

          <v-tooltip top color="red">
            <template #activator="{on, attrs}">
              <v-btn
                color="red" icon
                @click="deleteItem(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon
                  size="20"
                  color="red"
                >
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>

        </div>

      </template>
      <template #item.status="{item}">
        <v-chip :color="statusColor(item.status)" outlined dark>
          {{ item.status }}
        </v-chip>
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
            <v-img :src="item.avatar"/>
          </v-avatar>
          <div class="ml-2">
            <div class="username-name">{{ item.username }}</div>
            <div class="username-email">
              {{ item.email }}
              <div  @click.stop="getCopyKey(item.email)">
                <v-img src="/copy.svg" width="15" class="ml-2 pointer"/>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #item.phoneNumber="{item}">
        <div class="d-flex align-center">
          {{ item.phoneNumber }}
          <v-img src="/copy.svg" class="ml-2 pointer" max-width="15" @click.stop="getCopyKey(item.phoneNumber)" />
        </div>
      </template>
      <template #item.id="{ item }">
        <v-checkbox
          color="#7631FF"
          v-model="item.selected"
          :label="String(item.id)"
        />
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete User information</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this user inforamtion?
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteDialog: false,
      valid_search: true,
      search: {
        user_id: '',
        first_name: '',
        last_name: '',
        created_at: ''
      },
      date: '',
      menu2: false,
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: 'Username', align: 'start', sortable: false, value: 'username'},
        {text: 'First Name', align: 'start', sortable: false, value: 'firstName'},
        {text: 'Last Name', align: 'start', sortable: false, value: 'lastName'},
        {text: 'Phone number', align: 'start', sortable: false, value: 'phoneNumber'},
        {text: 'Lang', align: 'start', sortable: false, value: 'lang'},
        {text: 'Status', align: 'start', sortable: false, value: 'status'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions', width: 90},
      ],
      users: [
        {
          id: 5481,
          username: 'Jane Cooper',
          avatar: '/avatar-user.svg',
          email: 'awesome@asgardia.team',
          firstName: 'Lisa',
          lastName: 'Doe',
          phoneNumber: '+998 90 564 01 03',
          lang: 'UZ',
          status: 'Active',
          selected: false
        },
        {
          id: 6584,
          username: 'Lisa Doe',
          avatar: '/avatar-user.svg',
          email: 'jane.cooper@example.com',
          firstName: 'Lisa',
          lastName: 'Doe',
          phoneNumber: '+998 90 123 45 67',
          lang: 'EN',
          status: 'Blocked',
          selected: true
        },
      ]
    }
  },
  methods: {
    getCopyKey(item) {
      navigator.clipboard.writeText(item)
      this.$toasted.success(`Copied ${item}`, {
        action:{
          text:'Cancel',
          onClick:(e,toastObject)=>{
            toastObject.goAway(0);
          }
        }
      })
    },
    statusColor(color) {
      switch (color) {
        case 'Active':
          return 'green';
        case 'Blocked':
          return 'red'
        case 'Waiting':
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
    },
    editItem(item) {},
    deleteItem(item) {
      this.deleteDialog = !this.deleteDialog;
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', 'User management')
  }
}
</script>

<style scoped lang="scss">
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
</style>
