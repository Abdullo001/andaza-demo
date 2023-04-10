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
          :label="$t('appBar.search')"
          :placeholder="$t('appBar.pSearch')"
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
      <v-card
        v-click-outside="onClickOutsideStandard"
        @click="clickShowLang"
        class="mr-7 elevation-0"
        :ripple="false"
      >
        <div class="language d-flex">
          <div class="language__selected">
            <img :src="`/${$i18n.locale}.svg`" alt="flag">
            <span class="ml-2 mr-1 text-capitalize">{{ $i18n.locale }}</span>
            <v-icon color="#7631FF">mdi-chevron-down</v-icon>
          </div>

          <div :class="`language__list ${active ? 'active' : null}`">
          <span v-for="(lang, idx) in availableLocales" :key="idx">
            <nuxt-link :to="switchLocalePath(lang.code)" class="d-flex align-center">
              <img :src="lang.icon" alt="flag">
              <span style="color: black">{{ lang.title }}</span>
            </nuxt-link>
            </span>
          </div>
        </div>
      </v-card>
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
  // head: {
  //   script: [
  //     {
  //       src: "https://raw.githubusercontent.com/biggora/device-uuid/master/lib/device-uuid.min.js",
  //     },
  //   ],
  // },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      right: true,
      search: '',
      active: false,
    }
  },
  computed: {
    items: {
      get(){
        return [
          {
            icon: 'house.svg',
            title: this.$t('sidebar.dashboard'),
            has_child: true,
            to: this.localePath('/'),
            child: [
              {
                title: this.$t('sidebar.analytics'),
                to: this.localePath('/analytics'),
              },
            ]
          },
          {
            icon: 'user.svg',
            title: this.$t('sidebar.userManagement'),
            to: this.localePath('/user-management'),
            has_child: false,
          },
          {
            icon: 'localization.svg',
            title: this.$t('sidebar.localization'),
            to: this.localePath('/localization'),
            has_child: false,
          },
          {
            icon: 'prefinances.svg',
            title: this.$t('sidebar.prefinances'),
            to: this.localePath('/prefinances'),
            has_child: false,
          },
          {
            icon: 'lock.svg',
            title: this.$t('sidebar.fraudManagement'),
            to: this.localePath('/fraud-devices'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.devices'),
                to: this.localePath('/fraud-devices'),
              },
              {
                title: this.$t('sidebar.users'),
                to: this.localePath('/fraud-users'),
              },
            ]
          },
          {
            icon: 'access.svg',
            title: this.$t('sidebar.accessControl'),
            to: this.localePath('/permission'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.permission'),
                to: this.localePath('/permission'),
              },
              {
                title: this.$t('sidebar.role'),
                to: this.localePath('/role'),
              },
            ]
          },
          {
            icon: 'billing.svg',
            title: this.$t('sidebar.billing'),
            to: this.localePath('/billing'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.company'),
                to: this.localePath('/billing-company'),
              },
              {
                title: this.$t('sidebar.billing'),
                to: this.localePath('/billing-billing'),
              },
            ]
          },
          {
            icon: 'file.svg',
            title: this.$t('sidebar.lists'),
            to: this.localePath('/models'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.models'),
                to: this.localePath('/models'),
              },
              {
                title: this.$t('sidebar.orders'),
                to: this.localePath('/orders'),
              },
            ]
          },
          {
            icon: 'catalog.svg',
            title: this.$t('sidebar.catalogs'),
            to: this.localePath('/partner'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.partnersType'),
                to: this.localePath('/partner',)
              },
              {
                title: this.$t('sidebar.modelGroups'),
                to: this.localePath("/model")
              },
              {
                title: this.$t('sidebar.samplePurposes'),
                to: this.localePath("/sample")
              },
              {
                title: this.$t('sidebar.bodyParts'),
                to: this.localePath("/body-parts")
              },
              {
                title: this.$t('sidebar.cooperationType'),
                to: this.localePath("/cooperation-type")
              },
              {
                title: this.$t('sidebar.expenseGroup'),
                to: this.localePath("/expense-group")
              },
              {
                title: this.$t('sidebar.measurementUnit'),
                to: this.localePath("/measurement")
              },
              {
                title: this.$t('sidebar.packageShape'),
                to: this.localePath("/package-shape")
              },
              {
                title: this.$t('sidebar.fabricCatalogs'),
                to: this.localePath("/fabric-catalogs")
              },
              {
                title: this.$t('sidebar.productCatalogs'),
                to: this.localePath("/product-catalogs")
              },
              {
                title: this.$t('sidebar.partners'),
                to: this.localePath("/partners")
              },
              {
                title: this.$t('sidebar.size'),
                to: this.localePath("/catalog-size")
              },
              {
                title: this.$t('sidebar.colors'),
                to: this.localePath('/colors'),
              },
              {
                title: this.$t('sidebar.genderType'),
                to: this.localePath('/gender-type'),
              },
              {
                title: this.$t('sidebar.accessory'),
                to: this.localePath('/catalog-accessory'),
              },
            ]
          },
          {
            icon: 'planning.svg',
            title: this.$t('sidebar.planning'),
            to: this.localePath('/planning'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.fabric'),
                to: this.localePath('/fabric'),
              },
              {
                title: this.$t('sidebar.accessory'),
                to: this.localePath('/accessory'),
              },
            ]
          },
          {
            icon: 'prod2.svg',
            title: this.$t('sidebar.production'),
            to: this.localePath('/production'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.planningOfProduction'),
                to: this.localePath('/planning-production'),
              },
              {
                title: this.$t('sidebar.workingOperations'),
                to: this.localePath('/working-operations'),
              },
            ]
          },
        ]
      }
    },
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    ...mapGetters({
      pageTitle: 'pageTitle'
    })
  },
  methods: {
    clickShowLang(){
      this.active = !this.active;
    },
    onClickOutsideStandard(){
      this.active = false;
    },
    getSearch() {
      console.log('hello search')
    },
    selectedLang() {
      const current_lang = document.querySelector('.language__list');
      current_lang.classList.toggle('active')
    },
  },
}
</script>

<style lang="scss" src="assets/abstracts/_sidebar.scss" />
