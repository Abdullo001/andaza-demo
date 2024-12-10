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
        <v-img src="/andaza.svg" max-width="200" />
      </nuxt-link>

      <div
        class="d-flex flex-column justify-space-between pb-2"
        style="min-height: 86vh !important"
      >
        <v-list class="rounded-lg mx-4" flat>
          <div
            v-for="(nav, idx) in checkedAndLocalizationSidebarItems"
            :key="idx"
          >
            <v-list-item
              v-if="!nav.has_child"
              :to="localePath(nav.to)"
              router
              exact
              class="my-2"
              ref="active_class"
              multi-line
              active-class="active"
              :disabled="!nav.disabledMenu"
            >
              <template #default="{ active }">
                <v-list-item-action style="max-width: 56px">
                  <v-img
                    :src="
                      !active
                        ? `/sidebar/${nav.icon[0]}`
                        : `/sidebar/${nav.icon[1]}`
                    "
                    :class="!nav.disabledMenu?'disabled':''"
                  />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="active-link">{{
                    nav.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-group v-else class="parent-link" v-model="isOpen[idx]" :disabled="!nav.disabledMenu">
              <template #prependIcon>
                <v-img
                  class="mt-n1"
                  :src="`/sidebar/${!isOpen[idx] ? nav.icon[0] : nav.icon[1]}`"
                  :class="!nav.disabledMenu?'disabled':''"
                />
              </template>

              <template #activator >
                <v-list-item-title :class="!nav.disabledMenu?'disabled':''">{{ nav.title }}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(child, idx) in nav.children"
                :key="idx"
                link
                class="my-2 child-link transparent"
                route
                :to="localePath(child.to)"
                active-class="active"
                :disabled="!child.disabledMenu"

              >
                <template #default="{ active }">
                  <div class="ml-4 d-flex align-center">
                    <div class="dots" v-if="active"></div>
                    <div class="no-dots" v-else></div>
                    <v-list-item-title v-text="child.title" />
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
          @click="dialog = true"
        >
          Log out
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5 d-flex justify-center align-center">
          <div>Are you sure</div>
          <div>you want to exit the platform ?</div>
        </v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="amber darken-1"
            text
            @click="dialog = false"
            class="text-none"
          >
            Cancel
          </v-btn>

          <v-btn color="#544B99" text @click="logOutApp" class="text-none">
            Log out
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-app-bar :clipped-left="clipped" fixed app color="white" elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="main-title">{{ pageTitle }}</v-toolbar-title>
      <v-spacer />
      <!-- <div>
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
            <v-img src="/search.svg" class="mr-2" />
          </template>
        </v-text-field>
      </div> -->
      <v-spacer />

      <template>
        <div class="text-center">
          <v-menu

            v-model="menu"
            transition="slide-y-transition"

          >
            <template v-slot:activator="{ props }">

              <v-btn icon class="mr-6" color="indigo" v-bind="props" @click="menu=!menu">
                <v-badge :content="countUnreadNotification" v-if="!!countUnreadNotification" color="red">
                  <v-icon color="#544B99">mdi-bell-ring</v-icon>
                </v-badge>
                <v-icon v-if="!countUnreadNotification" color="#544B99">mdi-bell-ring</v-icon>

              </v-btn>
            </template>

            <v-card min-width="300"  class="" >
              <v-card-title class="d-flex align-center justify-center">
                <div class="d-flex align-center justify-center">
                  Notifications
                  <v-chip
                    dark
                    color="#544B99"
                    class="ml-4"
                  >
                    {{ countUnreadNotification }}
                  </v-chip></div>
              </v-card-title>


              <v-data-table
                  :headers="headers"
                  :items="recivedNotificationList"
                  :no-data-text="$t('noDataText')"
                  hide-default-header
                  hide-default-footer
                  class="mt-4 rounded-lg notification-list"

                  @click:row="(item) => getMessageInfo(item)"
                >
                  <template #item.mainPart="{item}">
                    <div style="cursor:pointer" class=" d-flex align-center  " :class="!item.read?'notification-item':''">
                      <v-col cols="2" class=" "><div  :class="!item.read?'dot':''"></div></v-col>
                      <v-col cols="10" class="me-auto">
                        <span class="notification-creator">{{ item.createdBy }}:</span>{{ item.title }}
                        <div class="sent-time d-flex justify-end">
                          {{$timeElapsedFromGivenDate($dateToISOFormat(item.sentTime))}}
                        </div>
                      </v-col>
                    </div>
                    <v-divider></v-divider>
                  </template>
                </v-data-table>


              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#544B99"
                  text
                  @click="openNotificationTable"
                >
                  See all
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </template>
      <v-card
        v-click-outside="onClickOutsideStandard"
        @click="clickShowLang"
        class="mr-7 elevation-0"
        :ripple="false"
      >
        <div class="language d-flex">
          <div class="language__selected">
            <img :src="`/${$i18n.locale}.svg`" alt="flag" />
            <span class="ml-2 mr-1 text-capitalize">{{ $i18n.locale }}</span>
            <v-icon color="#544B99">mdi-chevron-down</v-icon>
          </div>

          <div :class="`language__list ${active ? 'active' : null}`">
            <span v-for="(lang, idx) in availableLocales" :key="idx" @click="setLocalStorage(lang)">
              <nuxt-link
                :to="switchLocalePath(lang.code)"
                class="d-flex align-center"
              >
                <img :src="lang.icon" alt="flag" />
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
        <v-img
          :src="currentUser?.photoUrl"
          width="52"
          height="52"
          class="rounded-pill"
        />
      </div>
    </v-app-bar>

    <v-dialog v-model="notificationDialog" width="500">
      <v-card elevation="0">
        <v-card-title>
          <v-img class="mr-2" src="/message.svg" max-width="20" height="" />
          <span class="notification-title">Message </span>
          <v-icon color="#544B99">mdi-circle-small</v-icon>
          <span class="sent-time">
            {{ selectedMessage.givenTime }}

          </span>
        </v-card-title>

        <v-card-text>
          <div>
            <h3 class="mb-3 text-h5" style="color:#544B99">{{selectedMessage.createdBy}}</h3>
            <div style="color:#000; " class="text-h6 mb-6">
              <span class="font-weight-black">Title:</span>{{ selectedMessage.title }}
            </div>
          </div>

          <v-divider class="mb-6"/>

          <p class="text-body-1">
            {{ selectedMessage.body }}
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
                color="green"
                dark
                class="text-capitalize rounded-lg"
                @click="closeDialog"
              >
                OK
              </v-btn>
          <v-spacer/>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="notificationListDialog" width="800">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Notification list </div>
          <v-btn icon color="#544B99" @click="notificationListDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-data-table
            class="mt-4 rounded-lg pt-4"
            :headers="headersNotification"
            :items="recivedNotificationList"
            :items-per-page="itemPerPage"
            :footer-props="{
              itemsPerPageOptions: [5,10, 20, 50, 100],
            }"
            @update:page="page"
            @update:items-per-page="size"
            :server-items-length="recivedNotificationListTotalElements"
            @click:row="(item) => getMessageInfo(item)"
            :item-class="rowClass"
          >

          <template #item.read="{item}">
            <div :class="!item.read?'unread':''" v-if="!item.read">
              *
            </div>
          </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SidebarComponent",
  data() {
    return {
      itemPerPage:5,
      current_page:0,
      notificationDialog:false,
      notificationListDialog:false,
      headers:[
        {text:"",value:"mainPart",sortable:false}
      ],
      headersNotification:[
        {text:"",value:"read",sortable:false},
        {text:"Name",value:"createdBy",sortable:false},
        {text:"Title",value:"title",sortable:false},
        {text:"Body",value:"body",sortable:false},
        {text:"Recieved time",value:"sentTime",sortable:false},
      ],
      menu: false,
      dialog: false,
      isOpen: [],
      clipped: false,
      drawer: true,
      fixed: false,
      right: true,
      search: "",
      active: false,
      checkedSidebarItems: [],
      listenersStarted: false,
      idToken: "",
      selectedMessage:{
        sentTime:""
      },
    };
  },
  computed: {
    items: {
      get() {
        return [
          {
            icon: ["catalogs.svg", "catalogs-active.svg"],
            title: this.$t("sidebar.catalog"),
            to: this.localePath("/partner"),
            has_child: true,
            name: "CATALOG",
            localization: "catalog",
            child: [],
            children: [
              {
                title: this.$t("sidebar.modelGroups"),
                to: this.localePath("/model"),
                localization: "modelGroups",
              },
              {
                title: this.$t("sidebar.bodyParts"),
                to: this.localePath("/body-parts"),
                localization: "bodyParts",
              },
              {
                title: this.$t("sidebar.expenseGroup"),
                to: this.localePath("/expense-group"),
                localization: "expenseGroup",
              },
              {
                title: this.$t("sidebar.measurementUnit"),
                to: this.localePath("/measurement"),
                localization: "measurementUnit",
              },
              {
                title: this.$t("sidebar.packageShape"),
                to: this.localePath("/package-shape"),
                localization: "packageShape",
              },
              {
                title: this.$t("sidebar.partners"),
                to: this.localePath("/partners"),
                localization: "partners",
              },
              {
                title: this.$t("sidebar.sizeTemplate"),
                to: this.localePath("/size-template"),
                localization: "sizeTemplate",
              },
              {
                title: this.$t("sidebar.colors"),
                to: this.localePath("/colors"),
                localization: "colors",
              },
              {
                title: this.$t("sidebar.accessory"),
                to: this.localePath("/catalog-accessory"),
                localization: "accessory",
              },
              {
                title: this.$t("sidebar.canvasType"),
                to: this.localePath("/canvas-type"),
                localization: "canvasType",
              },
              {
                title: "Yarn numbers",
                to: this.localePath("/yarn-numbers"),
                localization: "yarnNumbers",
              },
              {
                title: this.$t("sidebar.composition"),
                to: this.localePath("/composition"),
                localization: "composition",
              },
              {
                title: this.$t("sidebar.printType"),
                to: this.localePath("/print-type"),
                localization: "printType",
              },
              {
                title: this.$t("sidebar.boxSize"),
                to: this.localePath("/box-size"),
                localization: "boxSize",
              },
              {
                title: "Fabric rework",
                to: this.localePath("/fabric-rework"),
                localization: "fabricRework",
              },
              {
                title: "Department",
                to: this.localePath("/department"),
                localization: "department",
              },
              {
                title: "Bank details",
                to: this.localePath("/bank-details"),
                localization: "bankDetails",
              },
              {
                title: "List of workers",
                to: this.localePath("/list-of-workers"),
                localization: "listOfWorkers",
              },
            ],
          },
          {
            icon: ["models.svg", "models-active.svg"],
            title: this.$t("sidebar.model"),
            to: this.localePath("/models"),
            has_child: false,
            name: "MODEL",
            localization: "model",
          },
          {
            icon: ["calculation.svg", "calculation-active.svg"],
            title: this.$t("sidebar.calculations"),
            to: this.localePath("/prefinances"),
            has_child: false,
            name: "CALCULATION",
            localization: "calculations",
          },
          {
            icon: ["inspection.svg", "orders-active.svg"],
            title: this.$t("sidebar.inspection"),
            to: this.localePath("/inspection-file"),
            has_child: false,
            name: "INSPECTION",
            localization: "inspection",
          },
          {
            icon: ["orders.svg", "orders-active.svg"],
            title: this.$t("sidebar.orders"),
            to: this.localePath("/orders"),
            has_child: false,
            name: "ORDER",
            localization: "orders",
          },
          {
            icon: ["planning.svg", "planning-active.svg"],
            title: this.$t("sidebar.planning"),
            to: this.localePath("/planning"),
            has_child: true,
            name: "PLANNING",
            localization: "planning",
            child: [],
            children: [
              {
                title: this.$t("sidebar.fabric"),
                to: this.localePath("/fabric"),
                name: "FABRIC_PLANNING_ORDERING",
                localization: "fabric",
              },
              {
                title: this.$t("sidebar.fabricOrdering"),
                to: this.localePath("/fabric-ordering"),
                name: "FABRIC_PLANNING_ORDERING",
                localization: "fabricOrdering",
              },
              {
                title: this.$t("sidebar.accessory"),
                to: this.localePath("/accessory"),
                name: "ACCESSORY_PLANNING",
                localization: "accessory",
              },
              {
                title: this.$t("sidebar.samples"),
                to: this.localePath("/samples"),
                name: "SAMPLE",
                localization: "samples",
              },
            ],
          },
          {
            icon: ["warehouse.svg", "warehouse-active.svg"],
            title: this.$t("sidebar.warehouse"),
            to: this.localePath("/warehouse"),
            has_child: true,
            name: "WAREHOUSE",
            localization: "warehouse",
            child: [],
            children: [
              {
                title: this.$t("sidebar.centralWarehouse"),
                to: this.localePath("/central-warehouse"),
                localization: "centralWarehouse",
              },
              {
                title: this.$t("sidebar.fabricWarehouse"),
                to: this.localePath("/fabric-warehouse"),
                name: "FABRIC_WAREHOUSE",
                localization: "fabricWarehouse",
              },
              {
                title: this.$t("sidebar.accessoryWarehouse"),
                to: this.localePath("/accessory-warehouse"),
                name: "ACCESSORY_WAREHOUSE",
                localization: "accessoryWarehouse",
              },
              {
                title: this.$t("sidebar.finishedProducts"),
                to: this.localePath("/ready-warehouse"),
                name: "READY_GARMENT_WAREHOUSE",
                localization: "finishedProducts",
              },
              {
                title: "Wastes warehouse",
                to: this.localePath("/wastes-warehouse"),
                localization: "wastesWarehouse",
              },
              {
                title: "Supply warehouse",
                to: this.localePath("/supply-warehouse"),
                localization: "supplyWarehouse",
              },
              {
                title: "Secondary warehouse",
                to: this.localePath("/secondary-warehouse"),
                localization: "secondaryWarehouse",
              },
            ],
          },
          {
            icon: ["production.svg", "production-active.svg"],
            title: this.$t("sidebar.production"),
            to: this.localePath("/production"),
            has_child: false,
            name: "PRODUCTION",
            localization: "production",
          },
          {
            icon: ["shipping.svg", "shipping-active.svg"],
            title: this.$t("sidebar.shipping"),
            to: this.localePath("/shipping"),
            has_child: false,
            name: "SHIPPING",
            localization: "shipping",
          },
          {
            icon: ["forms-icon.svg", "forms-icon-active.svg"],
            title: "Forms",
            to: this.localePath("/forms"),
            has_child: false,
            name: "FORMS",
            localization: "forms",
          },
          {
            icon: ["report.svg", "report-active.svg"],
            title: "Analytics",
            to: this.localePath("/analytics"),
            has_child: true,
            name: "ANALYTICS",
            localization: "analytics",
            child: [],
            children: [
              {
                title: this.$t("sidebar.report"),
                to: this.localePath("/report"),
                localization: "report",
              },
              {
                title: "PPG",
                to: this.localePath("/ppg"),
                localization: "ppg",
              },
              {
                title: "By models",
                to: this.localePath("/ppg"),
                localization: "byModels",
              },
            ]
          },
          {
            icon: ["settings.svg", "settings-active.svg"],
            title: this.$t("sidebar.setting"),
            to: this.localePath("/billing"),
            has_child: true,
            name: "SETTING",
            localization: "setting",
            child: [],
            children: [
              {
                icon: "user.svg",
                title: this.$t("sidebar.usermanagement"),
                to: this.localePath("/user-management"),
                has_child: false,
                localization: "usermanagement",
              },
              {
                icon: "localization.svg",
                title: this.$t("sidebar.localization"),
                to: this.localePath("/localization"),
                has_child: false,
                localization: "localization",
              },
              {
                title: this.$t("sidebar.permission"),
                to: this.localePath("/permission"),
                localization: "permission",
              },
              {
                title: this.$t("sidebar.role"),
                to: this.localePath("/role"),
                localization: "role",
              },
              {
                title: this.$t("sidebar.devices"),
                to: this.localePath("/fraud-devices"),
                localization: "devices",
              },
              {
                title: this.$t("sidebar.users"),
                to: this.localePath("/fraud-users"),
                localization: "users",
              },
              {
                title: this.$t("sidebar.notification"),
                to: this.localePath("/notification"),
                localization: "notification",
                name:"NOTIFICATION"
              },
            ],
          },
        ];
      },
    },
    checkedAndLocalizationSidebarItems: {
      get() {
        this.checkedSidebarItems.forEach((item) => {
          item.title = this.$t(`sidebar.${item.localization}`);
          if (item.has_child) {
            item.children.forEach((child) => {
              child.title = this.$t(`sidebar.${child.localization}`);
            });
          }
        });
        return [...this.checkedSidebarItems];
      },
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    ...mapGetters({
      pageTitle: "pageTitle",
      currentUser: "currentUser",
      permissionsList: "permissionsList",
      countUnreadNotification: "notification/countUnreadNotification",
      recivedNotificationList: "notification/recivedNotificationList",
      recivedNotificationListTotalElements: "notification/recivedNotificationListTotalElements",
    }),
  },

  watch:{
    menu(val){
      if(!!val){
        this.getRecivedNotification({id:this.currentUser.id,page:0,size:5})

      }
    },
    currentUser(val){
      if(!!val && !!this.idToken && val.fcmToken!==this.idToken){
        this.setFcmToken({ token:this.idToken, userId: val.id });
      }
      if(!!val){
        this.getCountUnreadNotification(val.id)
        // this.getRecivedNotification({id:val.id,page:0,size:5})
      }
    }
  },

  methods: {
    ...mapActions({
      logOut: "logOut",
      setFcmToken: "setFcmToken",
      getCountUnreadNotification: "notification/getCountUnreadNotification",
      getRecivedNotification: "notification/getRecivedNotification",
      markAsRead: "notification/markAsRead",
      changeLang: "users/changeLang",
    }),
    openNotificationTable(){
      this.menu=false
      this.notificationListDialog=true
    },
    async page(value) {
      this.current_page = value - 1;
      await this.getRecivedNotification({
        id:this.currentUser.id,
        page: this.current_page,
        size: this.itemPerPage,
      });
    },
    async size(value) {
      this.itemPerPage = value;
      await this.getRecivedNotification({
        id:this.currentUser.id,
        page: 0,
        size: this.itemPerPage,
      });
    },
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
      console.log("hello search");
    },
    setLocalStorage(item){
      localStorage.setItem("lang",this.$i18n.locale)
      this.changeLang({userId:this.currentUser.id, lang:this.$i18n.locale})
    },

    getMessageInfo(item){
      this.selectedMessage={...item}
      this.notificationDialog=true
      this.selectedMessage.givenTime=this.$timeElapsedFromGivenDate(this.$dateToISOFormat(this.selectedMessage?.sentTime))
      this.markAsRead({id:item.id,userId:this.currentUser.id})
      this.notificationListDialog=false
    },

    closeDialog(){
      this.notificationDialog=false
    },

    rowClass(item) {
      return !item.read ? 'notification-item' : ''
    },

    async startListeners() {
      await this.requestPermission();
      await this.getIdToken();

      await this.startOnMessageListener();
      this.listenersStarted = true;
    },
    startOnMessageListener() {
      try {
        this.$fire.messaging.onMessage((payload) => {
          console.info("Message received : ", payload);
          console.log(payload.notification.body);
          this.getCountUnreadNotification(this.currentUser.id)
          this.getRecivedNotification({id:this.currentUser.id,page:0,size:5})
        });
      } catch (e) {
        console.error("Error : ", e);
      }
    },

    async requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        console.log("GIVEN notify perms");
        console.log(permission);
      } catch (e) {
        console.error("Error : ", e);
      }
    },
    async getIdToken() {
      try {
        const token = await this.$fire.messaging.getToken();
        if (!token) {
          console.log(
            "No token received, check service worker and permissions"
          );
          return;
        }
        this.idToken=token
        console.log("FCM Token:", token);

      } catch (e) {
        console.error("Failed to get token:", e);
      }
    },
  },
  mounted() {
    let afterPermissionList = [];
    const permissionList =
      JSON.parse(window.localStorage.getItem("permissionList")) || [];

    this.startListeners();


    this.items.forEach(item=>{
      item.disabledMenu=true
      permissionList.forEach(perName=>{
        if(item.name===perName.permissionName && perName.canRead){
          item.disabledMenu=true

        }
        if(item.name===perName.permissionName && !perName.canRead){
          item.disabledMenu=false
        }
      })

      if(!!item.has_child){
          item.children.forEach(child=>{
            if(!child.name){
              child.disabledMenu=true
            }
            permissionList.forEach(perName=>{
              if(!!child.name && child.name===perName.permissionName && perName.canRead){
                child.disabledMenu=true

              }
              if(!!child.name && child.name===perName.permissionName && !perName.canRead){
                child.disabledMenu=false

              }


            })
          })
        }
    })
    this.checkedSidebarItems = JSON.parse(JSON.stringify(this.items));


  },
};
</script>

<style lang="scss" src="../assets/abstracts/_sidebar.scss"  >

</style>
