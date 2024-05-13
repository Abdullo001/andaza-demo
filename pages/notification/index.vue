<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <div class="d-flex align-center justify-space-between flex-fill mb-4">
            <v-select
              :items="notificationType"
              v-model="filters.modelGroup"
              placeholder="Type"
              dense
              outlined
              height="44"
              hide-details
              validate-on-blur
              class="rounded-lg filter mr-2"
              append-icon="mdi-chevron-down"
            />
            <v-text-field
              v-model="filters.title"
              placeholder="Title"
              outlined
              height="44"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
            />
            <v-text-field
              v-model="filters.createdBy"
              placeholder="Created by"
              outlined
              height="44"
              validate-on-blur
              dense
              hide-details
              class="rounded-lg filter mr-2"
            />
            <v-spacer/>
            <v-btn
              width="140"
              outlined
              color="#544B99"
              elevation="0"
              class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
              @click="resetFilter"
            >
              Reset
            </v-btn>
            <v-btn
              width="140"
              color="#544B99"
              dark
              elevation="0"
              class="text-capitalize rounded-lg font-weight-bold"
              @click="filterOrder"
            >
              Search
            </v-btn>
          </div>
          <div class="d-flex justify-center">
            
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="notificationList"
      :loading="loading"
      :items-per-page="itemPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
      @click:row="(item) => viewDetails(item)"
      item-key="modelNumber"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div>Notifications</div>
            <div>
              
              <v-btn
                color="#544B99"
                dark
                class="text-capitalize rounded-lg"
                @click="addNotification"
              >
                <v-icon>mdi-plus</v-icon>
                add Notification
              </v-btn>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>
     
      <template #item.type="{ item }">
        <div class="d-flex align-start m-0 p-0">
          <v-img
            :src="item.modelImageUrl"
            class="flex-sm-grow-0 mr-2 mt-2"
            :width="38"
            :height="38"
          />
          
        </div>
      </template>
      <template #item.action="{ item }">
        <v-tooltip top color="#544B99">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#544B99"
              v-on="on"
              v-bind="attrs"
              @click="viewDetails(item)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>Details</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
export default {
  data() {
    return {
      notificationType:["Push notification"],
      filter_form:true,
      loading: false,
      headers: [
        {text:"Type",value:"type",sortable:false},
        {text:"Title",value:"title",sortable:false},
        {text:"Created by",value:"createdBy",sortable:false},
        {text:"Created at",value:"sentTime",sortable:false},
        {text:"Action",value:"action",sortable:false},
      ],
      itemPerPage: 10,
      list: [],
      filters:{},
    };
  },

  computed:{
    ...mapGetters({
      totalElements:"notification/totalElements",
      notificationList:"notification/notificationList",
    })
  },

  methods: {
    ...mapActions({
      getNotificationList:"notification/getNotificationList",
    }),
    addNotification(){
      this.$router.push("/notification/add-notification")
    },
    async page(value) {
      this.current_page = value - 1;
      await this.getOrdersList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async size(value) {
      this.itemPrePage = value;
      await this.getOrdersList({ page: 0, size: this.itemPrePage });
    },

    filterOrder(){},

    resetFilter(){},
  },

  mounted(){
    this.getNotificationList({page:0,size:10})
  }
};
</script>
<style lang=""></style>
