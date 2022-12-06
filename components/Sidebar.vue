<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      :clipped="clipped"
      fixed
      app
      width="296"
    >
      <nuxt-link to="/" class="d-flex align-center ma-8">
        <v-img src="/logo.svg" max-width="100"/>
        <div class="navbar-text">Automatization of Textile Production</div>
      </nuxt-link>

      <v-list class="rounded-lg mx-4">
        <div v-for="(nav, idx) in items" :key="idx">
          <v-list-item
            v-if="!nav.has_child"
            :to="nav.to"
            router
            exact
            class="my-2"
            ref="active_class"
            multi-line
          >
            <template #default="{ active }">
              <v-list-item-action style="max-width: 56px;">
                <v-img :src="active ? `/sidebar/active-${nav.icon}` : `/sidebar/${nav.icon}`"/>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="active-link">{{ nav.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-group v-else>
             <template #prependIcon>
              <v-img class="mt-n1" :src="`/sidebar/${nav.icon}`"/>
            </template>

            <template #activator>
              <v-list-item-title>{{ nav.title }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(child, idx) in nav.child"
              :key="idx"
              link class="my-2 "
              route
              :to="child.to"
            >
              <v-list-item-icon/>
              <v-list-item-title v-text="child.title"/>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      elevation="0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title class="main-title">{{ pageTitle }}</v-toolbar-title>
      <v-spacer/>
      <div>
        <v-text-field
          label="Search"
          placeholder="search..."
          v-model="search"
          single-line
          clearable
          hide-details
          outlined
          dense
          prepend-inner-icon="mdi-magnify"
          @click:prepend-inner="getSearch"
          class="mr-6 rounded-lg"
          color="#7631FF"
          style="min-width: 350px"
        >
          <template #prepend-inner>
            <v-img src="/search.svg" class="mr-2"/>
          </template>
        </v-text-field>
      </div>
        <v-spacer/>
      <v-btn text class="mr-6" color="indigo">
        <v-img src="/notification.svg"/>
      </v-btn>
      <div class="language d-flex mr-7" @click="selectedLang">
        <div class="language__selected">
          <img :src="active_flag" alt="flag">
          <span class="ml-2 mr-1">{{ active_lang }}</span>
          <v-icon color="#7631FF">mdi-chevron-down</v-icon>
        </div>

        <div class="language__list">
          <span v-for="(lang, idx) in no_selected_lang" :key="idx" @click="selectLang(lang)">
            <img :src="lang.icon" alt="flag"> {{ lang.title }}
          </span>
        </div>
      </div>
      <div class="profile">
        <div class="mr-3">
          <div class="profile__title">Khamidullaev Abbos</div>
          <div class="profile__role">Admin</div>
        </div>
        <v-img src="/profilePicture.svg" width="52" height="52"/>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SidebarComponent',
  head: {
    script: [
      {
        src: "https://raw.githubusercontent.com/biggora/device-uuid/master/lib/device-uuid.min.js",
      },
    ],
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'house.svg',
          title: 'Dashboard',
          has_child: true,
          to: '/',
          child: [
            {
              title: 'Analytics',
              to: '/analytics',
            },
          ]
        },
        {
          icon: 'user.svg',
          title: 'User management',
          to: '/user-management',
          has_child: false,
        },
        {
          icon: 'localization.svg',
          title: 'Localization',
          to: '/localization',
          has_child: false,
        },
        {
          icon: 'prefinances.svg',
          title: 'Prefinances',
          to: '/prefinances',
          has_child: false,
        },
        {
          icon: 'lock.svg',
          title: 'Fraud management',
          to: '/fraud-management',
          has_child: true,
          child: [
            {
              title: 'Devices',
              to: '/devices',
            },
            {
              title: 'Users',
              to: '/users',
            },
          ]
        },
      ],
      right: true,
      search: '',
      no_selected_lang: [
        {title: "Uz", code: "uz", icon: "/uz.svg"},
        {title: "Ru", code: "ru", icon: "/ru.svg"},
      ],
      lang_list: [
        {title: "En", code: "en", icon: "/us.svg"},
        {title: "Uz", code: "uz", icon: "/uz.svg"},
        {title: "Ru", code: "ru", icon: "/ru.svg"},
      ],
      active_lang: "En",
      active_flag: '/us.svg',
    }
  },
  computed: {
    ...mapGetters({
      pageTitle: 'pageTitle'
    })
  },
  methods: {
    getSearch() {
      console.log('hello search')
    },
    selectedLang() {
      const current_lang = document.querySelector('.language__list');
      current_lang.classList.toggle('active')
    },
    selectLang(selected) {
      this.active_lang = selected.title;
      this.active_flag = selected.icon;
    },
  },
  mounted() {

  }
}
</script>

<style lang="scss" >
.navbar-text {
  min-width: 133px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  margin-left: 6px;
}
.v-list-item--active.v-list-item.v-list-item--link:hover {
  background-color: #6F31ED33 !important;
  color: #7631FF !important;
}

.v-navigation-drawer__content .v-list-item--active {
  background: linear-gradient(87.99deg, #6F31ED33 0%, #6F31ED33 100%);
  color: #7631FF !important;
  border-radius: 8px;
  min-width: 50px;
  width: 100%;
}
.v-list-item--active .active-link {
  color: #7631FF !important;
}
.v-list-item.v-list-item--link:hover {
  background-color: rgba(112, 50, 239, 0.1) !important;
  border-radius: 8px;
}
.v-list-item.v-list-item--link {
  height: 52px;
}
.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light {
  color: #000000 !important;
  background: #FFFFFF;
  border: 1px solid #7631FF;
}
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 14px;
}
.v-application--is-ltr .v-list-item__action:last-of-type:not(:only-child), .v-application--is-ltr .v-list-item__avatar:last-of-type:not(:only-child), .v-application--is-ltr .v-list-item__icon:last-of-type:not(:only-child) {
  margin-left: 5px;
  margin-top: 7px;
}
.v-application--is-ltr .v-list-item__action:last-of-type:not(:only-child), .v-application--is-ltr .v-list-item__avatar:last-of-type:not(:only-child), .v-application--is-ltr .v-list-item__icon:last-of-type:not(:only-child) {
  margin-top: 0;
}
.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light {
  color: #1D2433 !important;
}
.main-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #777C85;
}
.profile {
  cursor: pointer;
  display: flex;
  align-items: center;
  &__title {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #1D2433;
  }
  &__role {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #777C85;
  }
}
.v-btn--outlined {
  border: 2px solid;
}
a {
  text-decoration: none;
}
</style>
