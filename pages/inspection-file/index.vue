<template >
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-text>
        <v-form lazy-validation v-model="filter_form" ref="filters">
          <v-row>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.modelNumber"
                :label="$t('inspectionBox.model')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            <v-col cols="12" lg="2" md="2">
              <v-text-field
                v-model.trim="filters.clientName"
                :label="$t('inspectionBox.clientName')"
                outlined validate-on-blur
                dense hide-details
                class="rounded-lg filter"
                @keydown.enter="filterModel"
              />
            </v-col>
            
            <v-spacer/>
            <v-col cols="12" lg="3">
              <div class="d-flex justify-end">
                <v-btn
                  width="140" outlined
                  color="#544B99" elevation="0"
                  class="text-capitalize mr-4 border-primary rounded-lg font-weight-bold"
                  @click.stop="resetFilter"
                >
                  {{ $t('listsModels.dialog.reset') }}
                </v-btn>
                <v-btn
                  width="140" color="#544B99" dark
                  elevation="0"
                  class="text-capitalize rounded-lg font-weight-bold"
                  @click="filterModel"
                >
                  {{ $t('listsModels.dialog.search') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-data-table
      class="mt-4 rounded-lg pt-4"
      :headers="headers"
      :items="inspectionList"
      :items-per-page="itemPerPage"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      @update:page="page"
      @update:items-per-page="size"
      :server-items-length="totalElements"
    >
    <template #top>
      <v-toolbar elevation="0">
        <v-toolbar-title
          class="d-flex w-full align-center justify-space-between"
        >
          <div>{{$t('inspectionBox.modelInspection')}}</div>
          <div>
            
            <v-btn
              color="#544B99"
              dark
              class="text-capitalize rounded-lg"
              @click="addInspection"
            >
              <v-icon>mdi-plus</v-icon>
              {{$t('inspectionBox.addInspection')}}
            </v-btn>
          </div>
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template #item.result="{item}">
      <v-chip :color="statusColor.inspectionStatus(item.result)" dark class="font-weight-bold">{{ item.result }}</v-chip>
    </template>

    <template #item.sendDate="{item}">
      {{ !!item.sendDate?formatLong(item.sendDate):"" }}
    </template>

    <template #item.action="{item}">
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
  data(){
    return{
      filter_form:true,
      filters:{
        modelNumber:"",
        clientName:"",
      },
      list:[],
      headers:[
        {text:this.$t('inspectionBox.model'),value:"modelNumber",sortable:false},
        {text:this.$t('inspectionBox.clientName'),value:"clientName",sortable:false},
        {text:this.$t('inspectionBox.inspectionDate'),value:"sendDate",sortable:false},
        {text: this.$t('partners.table.status'),value:"result",sortable:false},
        {text: this.$t('modelBox.modelPartsBox.creator'),value:"createdBy",sortable:false},
        {text:this.$t("catalogGroups.tabs.table.createdAt"),value:"createdAt",sortable:false},
        {text: this.$t("catalogGroups.tabs.table.actions"),value:"action",sortable:false},
      ],
      itemPerPage:10,
      currentPage:0,

    }
  },

  computed:{
    ...mapGetters({
      inspectionList:"inspectionFile/inspectionList",
      totalElements:"inspectionFile/totalElements",
    })
  },

  watch:{
    inspectionList(val){
      // console.log(val);
    },
  },

  methods:{
    ...mapActions({
      getInspectionList:"inspectionFile/getInspectionList",
    }),
    filterModel(){
      const data={
        modelNumber:this.filters.modelNumber,
        clientName:this.filters.clientName,
        page:0,
        size:10,
      }
      this.getInspectionList(data)

    },
    resetFilter(){
      this.$refs.filters.reset()
      this.getInspectionList({page:0,size:10})
    },
    addInspection(){
      this.$router.push('/inspection-file/add-inspection')
    },
    viewDetails(item){
      this.$router.push(`/inspection-file/${item.modelId}`)
      this.$store.commit("inspectionFile/setModel",{id:item.modelId,modelNumber:item.modelNumber})
    },
    page(val){
      this.currentPage=val-1
      const data={
        modelNumber:this.filters.modelNumber,
        clientName:this.filters.clientName,
        page:this.currentPage,
        size:this.itemPerPage,
      }
      this.getInspectionList(data)
    },
    size(val){
      this.itemPerPage=val
      const data={
        modelNumber:this.filters.modelNumber,
        clientName:this.filters.clientName,
        page:0,
        size:this.itemPerPage,
      }
      this.getInspectionList(data)
    },
  },

  mounted(){
    this.getInspectionList({page:0,size:10})
  }
}
</script>
<style lang="">
  
</style>