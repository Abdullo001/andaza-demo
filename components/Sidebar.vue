<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      width="296"
    >
      <div class="d-flex align-center ma-8">
        <v-img src="/logo.svg" max-width="100"/>
        <div class="navbar-text">Automatization of Textile Production</div>
      </div>

      <v-list class="rounded-lg mx-4">
        <div v-for="(nav, idx) in items" :key="idx">
          <v-list-item
            v-if="!nav.has_child"
            :to="nav.to"
            router
            exact
            class="my-2"
          >
            <v-list-item-action>
              <v-img :src="nav.icon"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="active-link">{{ nav.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-else :value="true">
            <template #prependIcon>
              <v-img :src="nav.icon"/>
            </template>

            <template #activator>
              <v-list-item-title>{{ nav.title }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(child, idx) in nav.child"
              :key="idx"
              link class="my-2"
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
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer/>

    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: '/sidebar/house.svg',
          title: 'Dashboard',
          has_child: true,
          to: '/',
          child: [
            {
              title: 'Analytics',
              to: '/prefinances',
            },
          ]
        },
        {
          icon: '/sidebar/user.svg',
          title: 'User management',
          to: '/user-management',
          has_child: false,
        },
        {
          icon: '/sidebar/localization.svg',
          title: 'Localization',
          to: '/localization',
          has_child: false,
        },
        {
          icon: '/sidebar/prefinances.svg',
          title: 'Prefinances',
          to: '/prefinances',
          has_child: false,
        },
        {
          icon: '/sidebar/lock.svg',
          title: 'Fraud management',
          to: '/fraud-management',
          has_child: true,
          child: [
            {
              title: 'Devices',
              to: '/prefinances',
            },
            {
              title: 'Users',
              to: '/prefinances',
            },
          ]
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Page name'
    }
  },
}
</script>

<style lang="scss">
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
  color: #7631FF;
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
  color: rgba(118, 49, 255, 0.19);
  border-radius: 8px;
}
.v-list-item.v-list-item--link {
  height: 52px;
}
.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light {
  color: #000000 !important;
  background: #FFFFFF;
}
</style>
