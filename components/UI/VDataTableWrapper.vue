<template>
  <div>
    <v-skeleton-loader v-if="loader" type="table"></v-skeleton-loader>
    <v-data-table
      v-else
      :item-value="uniqKey"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :server-items-length="totalElements"
      :page="currentPage"
      @update:items-per-page="updateItemsPerPage"
      @update:page="updatePage"
      class="elevation-1 rounded-lg"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
    >
      <template v-if="$slots.top" #top>
        <slot name="top"></slot>
      </template>

      <template v-for="header in headers" v-slot:[`item.${header.value}`]="{ item }">
        <slot :name="`item.${header.value}`" :item="item">
          {{ item[header.value] }}
        </slot>
      </template>

      <template v-if="$slots['item.actions']" #item.actions="{ item }">
        <slot name="item.actions" :item="item"></slot>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    headers: Array,
    items: Array,
    loading: Boolean,
    totalElements: Number,
    callerFunction: Function,
    uniqKey:{
      type: String,
      default: "id",
      required: false,
    }
  },
  data() {
    return {
      itemsPerPage: 10,
      currentPage: 1,
      loader: true,
    };
  },
  computed: {
    ...mapGetters({
      pageName: 'dataTable/pageName',
      pageNumber: 'dataTable/pageNumber',
      pageSize: 'dataTable/pageSize',
    }),
  },
  watch: {
    // items(val){
    //   this.loader = false;
    // }
  },
  methods: {
    async updateItemsPerPage(val) {
      const prevPageSize = this.itemsPerPage
      this.loader = true;
      try{
        this.itemsPerPage = val;
        this.$store.commit("dataTable/setPageSize", this.itemsPerPage);
        await this.callerFunction({page: 0, size: this.pageSize});
      }catch(error){
        console.log(error);
        this.itemsPerPage = prevPageSize;
        this.$store.commit("dataTable/setPageSize", prevPageSize);
      }finally{
        this.loader = false;
      }
    },
    async updatePage(val) {
      const prevPage = this.currentPage
      this.loader = true;
      try{
        this.currentPage = val;
        this.$store.commit("dataTable/setPageNumber", this.currentPage-1);
        await this.callerFunction({page: this.pageNumber, size: this.pageSize});
      }catch(error){
        console.log(error);
        this.currentPage = prevPage;
        this.$store.commit("dataTable/setPageNumber", prevPage-1);
      }finally{
        this.loader = false;
      }
    }
  },
  created(){
    this.loader = true
    if(this.pageName !== this.$route.fullPath.split('/').filter(item => item !== '')[0]){
      this.$store.commit("dataTable/setPageName", this.$route.fullPath.split('/').filter(item => item !== '')[0]);
      this.$store.commit("dataTable/setPageNumber", 0);
      this.$store.commit("dataTable/setPageSize", 10);
    }
  },
  async mounted(){
    if(this.callerFunction){
      this.loader = true;
      try{
        await this.callerFunction({page: this.pageNumber, size: this.pageSize});
      }catch(error){
        console.log(error);
      }finally{
        this.loader = false
      }
      this.currentPage = this.pageNumber+1;
      this.itemsPerPage = this.pageSize;
    }
  }
};
</script>
