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
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-img :src="item.icon"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
      <v-spacer />

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
          child: []
        },
        {
          icon: '/sidebar/user.svg',
          title: 'User management',
          to: '/user-management'
        }
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
