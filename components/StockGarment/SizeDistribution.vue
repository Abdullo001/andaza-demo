<template >
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
    >
    <template #top>
      <v-toolbar elevation="0">
        <v-toolbar-title
          class="d-flex w-full align-center justify-space-between"
        >
          <div>{{ $t('readyWarehouse.quantityBySizes.title') }}</div>
          <div>
            <v-btn
              color="#544B99"
              dark
              class="text-capitalize rounded-lg"
              @click="openCreateDialog"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t('readyWarehouse.quantityBySizes.addRow') }}
            </v-btn>
          </div>
        </v-toolbar-title>

      </v-toolbar>

    </template>

    <template #item.actions="{ item }">
      <div style="min-width: 100px">
        <v-btn icon class="mr-2" @click="edit(item)">
          <v-img src="/edit-green.svg" max-width="20" />
        </v-btn>
        <v-btn icon @click="deleteOpenDialog(item)">
          <v-img src="/trash-red.svg" max-width="20" />
        </v-btn>
      </div>
    </template>

    </v-data-table>

    <v-dialog v-model="new_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex justify-space-between">
          <div>{{ newGarment.status==="add"?"Create":"Edit" }} color/Size</div>
          <v-btn @click="new_dialog = !new_dialog" icon>
            <v-icon color="#544B99">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="new_form">
            <v-row class="mb-4 d-flex justify-space-between">
              <v-col cols="6">
                <div class="label">{{ $t('readyWarehouse.quantityBySizes.mainColor') }}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="newGarment.mainColor"
                  :placeholder="$t('readyWarehouse.quantityBySizes.mainColor')"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                />
              </v-col>
              <v-col cols="6">
                <div class="label">{{ $t('readyWarehouse.quantityBySizes.colorCode') }}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="newGarment.colorCode"
                  :placeholder="$t('readyWarehouse.quantityBySizes.colorCode')"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" v-for="(item,idx) in newGarment.sizeDistributions" :key="idx">
                <div class="label">{{item.size}}</div>
                <v-text-field
                  :rules="[formRules.required]"
                  v-model="item.quantity"
                  placeholder="0"
                  single-line
                  outlined
                  hide-details
                  height="44"
                  validate-on-blur
                  dense
                  class="rounded-lg base"
                  color="#544B99"
                  background-color="#F8F4FE"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="text-capitalize rounded-lg font-weight-bold mr-6"
            color="#544B99"
            width="163"
            @click="new_dialog = !new_dialog"
            >{{ $t('userManagement.dialog.cancel') }}
          </v-btn>
          <v-btn
            v-if="newGarment.status==='add'"
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="createSizeDistirbution"
          >
           {{ $t('userManagement.child.save') }}
          </v-btn>
          <v-btn
            v-else
            class="text-capitalize rounded-lg font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="saveUpdate"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DeleteDialog v-bind="deleteData" />
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import DeleteDialog from "@/components/DeleteDialog.vue"
export default {
  
  components:{
    DeleteDialog
  },

  data(){
    return{
      new_dialog:false,
      new_validate:true,
      headers:[
        {text:this.$t('readyWarehouse.quantityBySizes.mainColor'), value:"mainColor",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.colorCode'), value:"colorCode",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.total'), value:"total",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.price'), value:"price",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.totalPrice'), value:"totalPrice",sortable:false},
        {text:this.$t('readyWarehouse.quantityBySizes.actions'), value:"actions",sortable:false},
      ],

      items:[],

      newGarment:{
        mainColor:"",
        colorCode:"",
        sizeDistributions:[],
      },
      uid:null,
      deleteDialog:false,
    }
  },

  computed:{
    deleteData:{
      get(){
        return{
          deleteDialog:this.deleteDialog,
          deleteFunction:this.deleteFunc,
          closeDialog:()=>{this.deleteDialog=false}
        }
      }
    },
    ...mapGetters({
      sizeList:"garmentStock/sizeList",
      stockId: "garmentStock/stockId",
      sizeQuantityList: "garmentStock/sizeQuantityList",

    })
  },

  created(){
    
  },

  watch:{
    sizeQuantityList(list){
      const specialList=list.map((item)=>{
        const sizes={}
        item.sizeDistributions.forEach((item)=>{
          sizes[item.size]=item.quantity
        })
        return{
          ...item,
          ...sizes,
        }
      })
      this.items=JSON.parse(JSON.stringify(specialList))
    },
    sizeList(val){
      if(val.length!==0){
        this.newGarment.sizeDistributions=[]
        this.headers=[
          {text:"Main color", value:"mainColor",sortable:false},
          {text:"Color code", value:"colorCode",sortable:false},
        ]

        val.forEach((item)=>{
          this.headers.push({text:item,value:item,sortable:false})
          this.newGarment.sizeDistributions.push({quantity:null,size:item})
        })

        this.headers.push(
          {text:"Total", value:"total",sortable:false},
          {text:"Price", value:"price",sortable:false},
          {text:"Total price", value:"totalPrice",sortable:false},
          {text:"Actions", value:"actions",sortable:false},
        )


      }
    },

    new_dialog(val){
      if(!val){
        this.$refs.new_form.reset()
      }
    },

    stockId(val){
      this.uid=val.id
    },

    uid(val){
      if(!!val){
        this.getStockDistribution(val)
        this.getStockSizes(val)
      }
    }
  },

  methods:{
    ...mapActions({
      getStockDistribution:"garmentStock/getStockDistribution",
      getStockSizes:"garmentStock/getStockSizes",
      saveStockSize:"garmentStock/saveStockSize",
      updateStockSize:"garmentStock/updateStockSize",
      deleteStockSize:"garmentStock/deleteStockSize",
    }),

    openCreateDialog(){
      this.new_dialog=true
      this.newGarment.status="add"
    },

    async createSizeDistirbution(){
      const data=JSON.parse(JSON.stringify(this.newGarment))

      await this.saveStockSize({mainColor:data.mainColor,colorCode:data.colorCode,sizeDistributions:data.sizeDistributions,stockId:this.uid})
      this.new_dialog=false
    },

    edit(item){
      this.newGarment=JSON.parse(JSON.stringify(item))
      this.new_dialog=true
      this.newGarment.status="edit"
    },

    async saveUpdate(){
      const data=JSON.parse(JSON.stringify(this.newGarment))

      await this.updateStockSize({data:{colorCode:data.colorCode,mainColor:data.mainColor,sizeDistributions:data.sizeDistributions,stockId:this.uid},id:this.newGarment.id})
      this.new_dialog=false

    },

    deleteOpenDialog(item){
      this.deleteDialog=true
      this.newGarment={...item}
    },

    deleteFunc(){
      this.deleteStockSize({id:this.newGarment.id,stockId:this.uid})
    }
  },

  mounted(){
    const id=this.$route.params.id
    if(id!=="add-garment"){
      this.uid=id
    }else{
      this.uid=this.stockId.id
    }

    this.getStockDistribution(this.uid)
    this.getStockSizes(this.uid)
  }
}
</script>
<style lang="">
  
</style>