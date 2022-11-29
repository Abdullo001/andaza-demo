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
          >
            <v-list-item-action>
              <v-img :src="nav.icon"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ nav.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else
            v-for="(child, idx) in nav.child"
            :key="idx"
            :value="true"
          >
            <template #prependIcon>
              <div>
                <v-img :src="nav.icon"/>
              </div>
            </template>
            <template v-slot:activator>
              <v-list-item-title>{{nav.title}}</v-list-item-title>
            </template>

            <v-list-item link>
              <v-list-item-icon>
  <!--              <v-icon>mdi-circle-medium</v-icon>-->
              </v-list-item-icon>
              <v-list-item-title v-text="child.title"></v-list-item-title>

            </v-list-item>

            <v-list-item>
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

<style lang="scss" scoped>
.navbar-text {
  min-width: 133px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  margin-left: 6px;
}
</style>
