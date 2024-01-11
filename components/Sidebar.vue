<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      :clipped="clipped"
      fixed
      app
      width="310"
    >
      <nuxt-link to="/" class="d-flex align-center ma-8">
        <v-img src="/andaza.svg" max-width="200"/>
      </nuxt-link>

    <div class="d-flex flex-column justify-space-between pb-2" style="min-height:86vh !important ;">
      <v-list class="rounded-lg mx-4" flat>
        <div v-for="(nav, idx) in checkedAndLocalizationSidebarItems" :key="idx">
          <v-list-item
            v-if="!nav.has_child"
            :to="localePath(nav.to)"
            router
            exact
            class="my-2"
            ref="active_class"
            multi-line
            active-class="active"
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
              :to="localePath(child.to)"
              active-class="active"
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
      
        <v-btn
          text
          color="#544B99"
          class="logout text-none mx-4"
          @click="dialog=true"
        >
          Log out
        </v-btn>
      
    </div>
    </v-navigation-drawer>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5 d-flex justify-center align-center">
          <div>Are you sure</div>
          <div>you want to exit the platform ?</div>
        </v-card-title>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="amber darken-1"
            text
            @click="dialog = false"
            class="text-none"
          >
            Cancel
          </v-btn>

          <v-btn
            color="#544B99"
            text
            @click="logOutApp"
            class="text-none"
          >
            Log out
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          color="#544B99"
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
            <v-icon color="#544B99">mdi-chevron-down</v-icon>
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
          <div class="profile__title">{{ currentUser?.fullName }}</div>
          <div class="profile__role">{{ currentUser?.username }}</div>
        </div>
        <v-img :src="currentUser?.photoUrl" width="52" height="52" class="rounded-pill"/>
      </div>
    </v-app-bar>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SidebarComponent',
  data() {
    return {
      dialog: false,
      isOpen: [],
      clipped: false,
      drawer: true,
      fixed: false,
      right: true,
      search: '',
      active: false,
      checkedSidebarItems:[],
    }
  },
  computed: {
    items: {
      get() {
        return [
          {
            icon: ['models.svg', "models-active.svg"],
            title: this.$t('sidebar.model'),
            to: this.localePath('/models'),
            has_child: false,
            name:"MODEL",
            localization:"model",
          },
          {
            icon: ['calculation.svg', "calculation-active.svg"],
            title: this.$t('sidebar.calculations'),
            to: this.localePath('/prefinances'),
            has_child: false,
            name:"CALCULATION",
            localization:"calculations",
          },
          {
            icon: ['orders.svg', "orders-active.svg"],
            title: this.$t('sidebar.orders'),
            to: this.localePath('/orders'),
            has_child: false,
            name:"ORDER",
            localization:"orders",
          },
          {
            icon: ['planning.svg', "planning-active.svg"],
            title: this.$t('sidebar.planning'),
            to: this.localePath('/planning'),
            has_child: true,
            name:"PLANNING",
            localization:"planning",
            child:[],
            children: [
              {
                title: this.$t('sidebar.fabric'),
                to: this.localePath('/fabric'),
                name:"FABRIC_PLANNING_ORDERING",
                localization:"fabric",

              },
              {
                title: this.$t('sidebar.fabricOrdering'),
                to: this.localePath('/fabric-ordering'),
                name:"FABRIC_PLANNING_ORDERING",
                localization:"fabricOrdering",
              },
              {
                title: this.$t('sidebar.accessory'),
                to: this.localePath('/accessory'),
                name:"ACCESSORY_PLANNING",
                localization:"accessory",

              },
              {
                title: this.$t('sidebar.samples'),
                to: this.localePath('/samples'),
                name:"SAMPLE",
                localization:"samples",
              },
            ]
          },
          {
            icon: ['warehouse.svg', "warehouse-active.svg"],
            title: this.$t('sidebar.warehouse'),
            to: this.localePath('/warehouse'),
            has_child: true,
            name:"WAREHOUSE",
            localization:"warehouse",
            child:[],
            children: [
              {
                title: this.$t('sidebar.fabricWarehouse'),
                to: this.localePath('/fabric-warehouse'),
                name:"FABRIC_WAREHOUSE",
                localization:"fabricWarehouse",
              },
              {
                title: this.$t('sidebar.accessoryWarehouse'),
                to: this.localePath('/accessory-warehouse'),
                name:"ACCESSORY_WAREHOUSE",
                localization:"accessoryWarehouse",

              },
              {
                title: this.$t('sidebar.finishedProducts'),
                to: this.localePath('/ready-warehouse'),
                name:"READY_GARMENT_WAREHOUSE",
                localization:"finishedProducts",

              },
            ]
          },
          {
            icon: ['production.svg', 'production-active.svg'],
            title: this.$t('sidebar.production'),
            to: this.localePath('/production'),
            has_child: false,
            name:"PRODUCTION",
            localization:"production",
          },
          {
            icon: ['shipping.svg', "shipping-active.svg"],
            title: this.$t('sidebar.shipping'),
            to: this.localePath('/shipping'),
            has_child: false,
            name:"SHIPPING",
            localization:"shipping",
          },
          {
            icon: ['forms-icon.svg', "forms-icon-active.svg"],
            title: 'Forms',
            to: this.localePath('/forms'),
            has_child: false,
            name:"FORMS",
            localization:"forms",
          },
          {
            icon: ['report.svg', "report-active.svg"],
            title: this.$t('sidebar.report'),
            to: this.localePath('/report'),
            has_child: false,
            name:"REPORT",
            localization:"report",
          },
          {
            icon: ['billing.svg', "billing-active.svg"],
            title: this.$t('sidebar.billing'),
            to: this.localePath('/billing'),
            name:"BILLING",
            has_child: true,
            localization:"billing",
            child:[],
            children: [
              {
                title: this.$t('sidebar.company'),
                to: this.localePath('/billing-company'),
                name:"company",
                localization:"company",

              },
              {
                title: this.$t('sidebar.billing'),
                to: this.localePath('/billing-billing'),
                name:"billing",
                localization:"billing",
              },
            ]
          },
          {
            icon: ['catalogs.svg', 'catalogs-active.svg'],
            title: this.$t('sidebar.catalog'),
            to: this.localePath('/partner'),
            has_child: true,
            name:"CATALOG",
            localization:"catalog",
            child:[],
            children: [
              {
                title: this.$t('sidebar.partnersType'),
                to: this.localePath('/partner'),
                localization:"partnersType",
              },
              {
                title: this.$t('sidebar.modelGroups'),
                to: this.localePath("/model"),
                localization:"modelGroups",
              },
              {
                title: this.$t('sidebar.samplePurposes'),
                to: this.localePath("/sample"),
                localization:"samplePurposes",
              },
              {
                title: this.$t('sidebar.bodyParts'),
                to: this.localePath("/body-parts"),
                localization:"bodyParts",
              },
              {
                title: this.$t('sidebar.cooperationType'),
                to: this.localePath("/cooperation-type"),
                localization:"cooperationType",
              },
              {
                title: this.$t('sidebar.expenseGroup'),
                to: this.localePath("/expense-group"),
                localization:"expenseGroup",
              },
              {
                title: this.$t('sidebar.measurementUnit'),
                to: this.localePath("/measurement"),
                localization:"measurementUnit",
              },
              {
                title: this.$t('sidebar.packageShape'),
                to: this.localePath("/package-shape"),
                localization:"packageShape",
              },
              {
                title: this.$t('sidebar.partners'),
                to: this.localePath("/partners"),
                localization:"partners",
              },
              {
                title: this.$t('sidebar.sizeTemplate'),
                to: this.localePath("/size-template"),
                localization:"sizeTemplate",
              },
              {
                title: this.$t('sidebar.colors'),
                to: this.localePath('/colors'),
                localization:"colors",
              },
              {
                title: this.$t('sidebar.accessory'),
                to: this.localePath('/catalog-accessory'),
                localization:"accessory",
              },
              {
                title: this.$t('sidebar.canvasType'),
                to: this.localePath('/canvas-type'),
                localization:"canvasType",
              },
              {
                title: "Yarn numbers",
                to: this.localePath('/yarn-numbers'),
                localization:"yarn-numbers",
              },
              {
                title: this.$t('sidebar.composition'),
                to: this.localePath('/composition'),
                localization:"composition",
              },
              {
                title: this.$t('sidebar.printType'),
                to: this.localePath('/print-type'),
                localization:"printType",
              },
              {
                title: this.$t('sidebar.boxSize'),
                to: this.localePath('/box-size'),
                localization:"boxSize",
              },
              {
                title: this.$t('sidebar.process'),
                to: this.localePath('/catalog-process'),
                localization:"process",
              },
            ]
          },
          {
            icon: ['settings.svg', "settings-active.svg"],
            title: this.$t('sidebar.setting'),
            to: this.localePath('/billing'),
            has_child: true,
            name:"SETTING",
            localization:"setting",
            child:[],
            children: [
              {
                icon: 'user.svg',
                title: this.$t('sidebar.usermanagement'),
                to: this.localePath('/user-management'),
                has_child: false,
                name:"usermanagement",
                localization:"usermanagement",

              },
              {
                icon: 'localization.svg',
                title: this.$t('sidebar.localization'),
                to: this.localePath('/localization'),
                has_child: false,
                name:"localization",
                localization:"localization",

              },
              {
                title: this.$t('sidebar.permission'),
                to: this.localePath('/permission'),
                name:"permission",
                localization:"permission",

              },
              {
                title: this.$t('sidebar.role'),
                to: this.localePath('/role'),
                name:"role",
                localization:"role",
              },
              {
                title: this.$t('sidebar.devices'),
                to: this.localePath('/fraud-devices'),
                name:"devices",
                localization:"devices",
              },
              {
                title: this.$t('sidebar.users'),
                to: this.localePath('/fraud-users'),
                name:"users",
                localization:"users",
              },
            ]
          },
        ]
      }
    },
    checkedAndLocalizationSidebarItems:{
      get(){
        this.checkedSidebarItems.forEach((item)=>{
          item.title=this.$t(`sidebar.${item.localization}`)
          if(item.has_child){
            item.child.forEach((child)=>{
              child.title=this.$t(`sidebar.${child.localization}`)
            })
          }
        })
        return [
          ...this.checkedSidebarItems
        ]
      }
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    ...mapGetters({
      pageTitle: 'pageTitle',
      currentUser: 'currentUser',
      permissionsList: 'permissionsList',
    })
  },
  methods: {
    ...mapActions({
      logOut: 'logOut'
    }),
    logOutApp() {
      this.$auth.logout();
    },
    clickShowLang() {
      this.active = !this.active;
    },
    onClickOutsideStandard() {
      this.active = false;
    },
    getSearch() {
      console.log('hello search')
    },
  },
  mounted(){
    let afterPermissionList=[]
    const permissionList=JSON.parse(window.localStorage.getItem("permissionList"))||[]
    permissionList.forEach((perName)=>{
      this.items.forEach((item)=>{
        if(!item.has_child){
          if(perName.permissionName===item.name){
            afterPermissionList.push(item)
          }
        }
        if(item.has_child){
          if(perName.permissionName===item.name){
            item.child=[...item.children]
            afterPermissionList.push(item)
          }else{
            const childChecker=[]

            item.children.forEach((el)=>{

              if(perName.permissionName==el.name){
                childChecker.push(el)
              }
            })

            if(childChecker.length){
              item.child.push(...childChecker)
              afterPermissionList.push(item)
              const uniqueElements = new Set(afterPermissionList);
              afterPermissionList=[...uniqueElements]
            }
          }
        }
      })
      if(perName.permissionName==="MANAGEMENT_FORM"||perName.permissionName==="PRODUCTION_FORM"){
        
        let has_form=false
        afterPermissionList.forEach((item)=>{
          if(item.title==='Forms'){
            has_form=true
          }
        })
        if(!has_form){
          afterPermissionList.push({
            icon: ['forms-icon.svg', "forms-icon-active.svg"],
            title: 'Forms',
            to: this.localePath('/forms'),
            has_child: false,
            name:"FORMS",
            localization:"forms",
          })
        }
      }
    })
    this.checkedSidebarItems=JSON.parse(JSON.stringify(afterPermissionList))
  }
}
</script>

<style lang="scss" src="../assets/abstracts/_sidebar.scss"/>
