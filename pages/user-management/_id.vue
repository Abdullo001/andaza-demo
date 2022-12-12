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
          >
            <v-img src="/edit.svg" class="mr-1"/>
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
            <div class="black--text text-body-1 mb-5">{{ currentUser.username }}</div>
            <div class="mb-2 text-body-1">Lang</div>
            <div class="d-flex align-center">
              <v-img :src="langFlag(currentUser.lang)" max-width="25" class="rounded-md" contain/>
              <div class="black--text text-body-1 ml-2">{{ currentUser.lang }}</div>
            </div>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">ID</div>
            <div class="black--text text-body-1 mb-5">{{ currentUser.id }}</div>
            <div class="mb-1 text-body-1">Lastname</div>
            <div class="black--text text-body-1 mb-10">{{ currentUser.lastName }}</div>
            <div class="mb-2 text-body-1">E-mail</div>
            <div class="black--text text-body-1 mb-5">{{ currentUser.email }}</div>
            <div class="mb-2 text-body-1">Registered date</div>
            <div class="black--text text-body-1 mb-5">{{ currentUser.createdAt }}</div>
          </v-col>
          <v-col>
            <div class="mb-2 text-body-1">First name</div>
            <div class="black--text text-body-1 mb-5">{{ currentUser.firstName }}</div>
            <div class="mb-1 text-body-1">Phone number</div>
            <div class="black--text text-body-1 mb-10">{{ currentUser.phoneNumber }}</div>
            <div class="mb-2 text-body-1">Status</div>
            <div class="black--text text-body-1 mb-5">{{ currentUser.status }}</div>
          </v-col>
        </v-row>
      </v-card-text>
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
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/currentUser'
    })
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
