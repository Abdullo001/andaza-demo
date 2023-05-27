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

      <v-list class="rounded-lg mx-4" flat>
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
                <v-img :src="!active ? `/sidebar/${nav.icon[0]}` : `/sidebar/${nav.icon[1]}`"/>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="active-link">{{ nav.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-group v-else class="parent-link" v-model="isOpen[idx]">
            <template #prependIcon>
              <v-img class="mt-n1" :src="`/sidebar/${!isOpen[idx] ? nav.icon[0] : nav.icon[1]}`"/>
            </template>

            <template #activator>
              <v-list-item-title >{{ nav.title }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(child, idx) in nav.child"
              :key="idx"
              link
              class="my-2 child-link transparent"
              route
              :to="child.to"
              active-class="transparent"
            >
              <template #default="{ active }">
                <div class="ml-4 d-flex align-center">
                  <div class="dots" v-if="active"></div>
                  <div class="no-dots" v-else></div>
                  <v-list-item-title v-text="child.title"/>
                </div>
              </template>
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
  data() {
    return {
      isOpen: [],
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
      get() {
        return [
          {
            icon: ['models.svg', "models-active.svg"],
            title: this.$t('sidebar.models'),
            to: this.localePath('/models'),
            has_child: false,
          },
          {
            icon: ['calculation.svg', "calculation-active.svg"],
            title: this.$t('sidebar.calculations'),
            to: this.localePath('/prefinances'),
            has_child: false,
          },
          {
            icon: ['orders.svg', "orders-active.svg"],
            title: this.$t('sidebar.orders'),
            to: this.localePath('/orders'),
            has_child: false,
          },
          {
            icon: ['planning.svg', "planning-active.svg"],
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
            icon: ['warehouse.svg', "warehouse-active.svg"],
            title: this.$t('sidebar.warehouse'),
            to: this.localePath('/warehouse'),
            has_child: false,
          },
          {
            icon: ['production.svg', 'production-active.svg'],
            title: this.$t('sidebar.production'),
            to: this.localePath('/production'),
            has_child: true,
            child: [
              {
                title: this.$t('sidebar.planningOfProduction'),
                to: this.localePath('/planning-production'),
              },
            ]
          },
          {
            icon: ['shipping.svg', "shipping-active.svg"],
            title: this.$t('sidebar.shipping'),
            to: this.localePath('/shipping'),
            has_child: false,
          },
          {
            icon: ['report.svg', "report-active.svg"],
            title: this.$t('sidebar.report'),
            to: this.localePath('/report'),
            has_child: false,
          },
          {
            icon: ['billing.svg', "billing-active.svg"],
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
            icon: ['catalogs.svg', 'catalogs-active.svg'],
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
              // {
              //   title: this.$t('sidebar.measurementUnit'),
              //   to: this.localePath("/measurement")
              // },
              {
                title: this.$t('sidebar.packageShape'),
                to: this.localePath("/package-shape")
              },
              {
                title: this.$t('sidebar.partners'),
                to: this.localePath("/partners")
              },
              {
                title: this.$t('sidebar.sizeTemplate'),
                to: this.localePath("/size-template")
              },
              {
                title: this.$t('sidebar.colors'),
                to: this.localePath('/colors'),
              },
              {
                title: this.$t('sidebar.accessory'),
                to: this.localePath('/catalog-accessory'),
              },
            ]
          },
          {
            icon: ['settings.svg', "settings-active.svg"],
            title: this.$t('sidebar.settings'),
            to: this.localePath('/billing'),
            has_child: true,
            child: [
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
                title: this.$t('sidebar.permission'),
                to: this.localePath('/permission'),
              },
              {
                title: this.$t('sidebar.role'),
                to: this.localePath('/role'),
              },
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
        ]
      }
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    ...mapGetters({
      pageTitle: 'pageTitle'
    })
  },
  methods: {
    clickShowLang() {
      this.active = !this.active;
    },
    onClickOutsideStandard() {
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

<style lang="scss" src="../assets/abstracts/_sidebar.scss"/>
