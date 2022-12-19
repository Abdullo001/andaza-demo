<template>
  <div>
    <div class="breadcrumbs d-flex align-center ml-2">
      <div class="breadcrumbs d-flex align-center font-weight-medium mb-4 text-body-2" v-for="(item,idx) in map_links"
           :key="idx">
        <nuxt-link :to="item.to" class="base-color" v-if="!item.disabled">{{ item.text }}</nuxt-link>
        <div class="grey--text" v-if="item.disabled">{{ item.text }}</div>
        <v-icon class="mx-3" size="18" v-if="item.icon">mdi-slash-forward</v-icon>
      </div>
    </div>
    <v-card color="#fff" elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ currentUser.username }}</div>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            Delete
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg"
            @click="fields_status = !fields_status"
            :color="!fields_status ? 'green' : null"
          >
            <v-img :src="fields_status ? '/edit.svg' : '/edit-active.svg'" class="mr-1"/>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="mb-2 text-body-1">Photo</div>
            <v-img :src="currentUser.photo" class="rounded-lg mb-4" width="120"/>
            <div class="mb-1 text-body-1">Username</div>
            <v-text-field
              v-model="one_user.username"
              filled
              dense
              clearable
              style="max-width: 400px"
              :disabled="fields_status"
            />
            <div class="mb-2 text-body-1">Lang</div>
            <v-select
              :items="lang_list"
              v-model="currentUser.lang" append-icon="mdi-chevron-down"
              filled
              dense
              clearable
              :disabled="fields_status"
              style="max-width: 400px;"
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
            <div class="mb-2 text-body-1">ID</div>
            <v-text-field
              filled
              v-model="one_user.id"
              dense
              disabled
              style="max-width: 400px"
            />
            <div class="mb-1 text-body-1">Lastname</div>
            <v-text-field
              filled
              v-model="one_user.lastName"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="mb-2 text-body-1">E-mail</div>
            <v-text-field
              filled
              v-model="one_user.email"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="mb-2 text-body-1">Registered date</div>
            <v-text-field
              filled
              v-model="one_user.createdAt"
              dense
              disabled
              style="max-width: 400px"
            />
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">First name</div>
            <v-text-field
              filled
              v-model="one_user.firstName"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="mb-1 text-body-1">Phone number</div>
            <v-text-field
              filled
              v-model="one_user.phoneNumber"
              dense
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="mb-2 text-body-1">Status</div>
            <v-select
              filled
              v-model="one_user.status"
              dense
              :items="status_list"
              append-icon="mdi-chevron-down"
              :disabled="fields_status"
              style="max-width: 400px"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="#7631FF"
          dark
          class="text-capitalize font-weight-medium mx-3 mb-4"
          width="150"
        >save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'User-management',
          disabled: false,
          to: '/user-management',
          icon: true
        },
        {
          text: 'Details',
          disabled: true,
          to: '/user-management/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
      fields_status: true,
      lang_list: [
        {title: "EN", code: "en", icon: "/us.svg"},
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
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/currentUser'
    })
  },
  watch: {
    currentUser: {
      handler(val) {

      }, deep: true
    }
  },
  methods: {
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
    this.one_user = {...this.currentUser}
  }
}
</script>

<style scoped>
.v-btn--outlined {
  border: 1px solid;
}

.base-color {
  color: #7631FF;
}
</style>
