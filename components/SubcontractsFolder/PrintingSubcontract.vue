<template >
  <div>
    <v-data-table
      :headers="printingHeader"
      :items="printingList"
      :items-per-page="50"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="elevation-0"
      hide-default-footer
      show-expand
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      @item-expanded="loadDetails"
    >
      <template #item.actions="{item}">
        <v-btn icon color="green" @click.stop="editPrintingRow(item)">
          <v-img src="/edit-active.svg" max-width="22"/>
        </v-btn>
        <v-btn icon color="red" @click.stop="deletePrintingRow(item)">
          <v-img src="/delete.svg" max-width="27"/>
        </v-btn>
      </template>

      <template #expanded-item="{headers, item}">
        <td :colspan="headers.length">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div class="body-1 mb-3">
                    Sent date:
                    <span class="font-weight-bold ml-2"> {{ item?.sendDate }}</span>
                  </div>
                  <div class="body-1 mb-3">
                    Comment:
                    <span class="font-weight-bold ml-2"> {{ item?.comment }}</span>
                  </div>
                  
                </v-col>
                <v-col>
                  <div class="body-1 mb-3">
                    Deadline:
                    <span class="font-weight-bold ml-2"> {{ item?.deadline }}</span>
                  </div>
                  
                </v-col>
                
              </v-row>
            </v-card-text>
          </v-card>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" max-width="572">
      <v-card>
        <v-card-title class="w-full d-flex text-capitalize text-h6 justify-space-between">
          <div>Edit Info</div>
          <v-btn @click="edit_dialog = !edit_dialog" icon>
            <v-icon color="#7631FF">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation v-model="new_validate" ref="edit_form">
            <v-row class="mb-4">
              <v-col cols="12" lg="6">
                <div class="label">Price per work</div>
                <div class="d-flex align-center">
                  <v-text-field
                    placeholder="0.00"
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-l-lg rounded-r-0"
                    validate-on-blur
                    dense
                    color="#7631FF"
                  />
                  <v-select
                    :items="currency_enums"
                    style="max-width: 100px"
                    dense
                    outlined
                    hide-details
                    height="44"
                    class="rounded-lg base rounded-r-lg rounded-l-0"
                    validate-on-blur
                    append-icon="mdi-chevron-down"
                    color="#7631FF"
                  />
                </div>
              </v-col>

              <v-col cols="12" lg="6">
                <div class="label">Order date</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    type="datetime"
                    style="width: 100%; height: 100%"
                    placeholder="dd.MM.yyyy HH:mm:ss"
                    :picker-options="pickerShortcuts"
                    value-format="dd.MM.yyyy HH:mm:ss"
                    class="base_picker"
                  >
                  </el-date-picker>
                </div>
              </v-col>

              <v-col cols="12" lg="3" v-for="(item,idx) in selectedSubcontrac.sizes" :key="idx">
                <div class="label">{{item.size}}</div>
                <v-text-field
                  v-model="item.quantity"
                  placeholder="0"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base mb-4"
                  validate-on-blur
                  dense
                  color="#7631FF"
                  
                />
              </v-col>

              <v-col cols="12" lg="6" >
                <div class="label">Deadline</div>
                <div style="height: 40px !important">
                  <el-date-picker
                    type="datetime"
                    style="width: 100%; height: 100%"
                    placeholder="dd.MM.yyyy HH:mm:ss"
                    :picker-options="pickerShortcuts"
                    value-format="dd.MM.yyyy HH:mm:ss"
                    class="base_picker"
                  >
                  </el-date-picker>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="setSubcontract"
          >
            save
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="printingDelete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete printing</v-card-title>
        <v-card-text>
          Are you sure you want to Delete printing?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="printingDelete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deletePrintingItem"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      printingDelete_dialog:false,
      edit_dialog:false,
      singleExpand: true,
      expanded: [],
      new_validate:true,
      currency_enums:["USD","UZS","RUB"],
      selectedSubcontrac:{},

      printingHeader:[
        {text: 'Color', sortable: false, align: 'start', value: 'color'},
        {text: '24', sortable: false, align: 'start', value: '24'},
        {text: '26', sortable: false, align: 'start', value: '26'},
        {text: '28', sortable: false, align: 'start', value: '28'},
        {text: '30', sortable: false, align: 'start', value: '30'},

        {text: 'Recived total quantity', sortable: false, align: 'start', value: 'recivedTotalQuantity'},
        {text: 'Partner', sortable: false, align: 'start', value: 'partner'},
        {text: 'Price per work', sortable: false, align: 'start', value: 'pricePerWork'},
        {text: 'Total price', sortable: false, align: 'start', value: 'totalPrice'},
        {text: 'Status', sortable: false, align: 'start', value: 'status'},
        {text: 'Print photo', sortable: false, align: 'start', value: 'printPhoto'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
        {text: '', value: 'data-table-expand'},

      ],

      printingList:[
        {
          color:"red",
          sizes:[
            {
              size:24,
              quantity:0,
            },
            {
              size:26,
              quantity:0,
            },
            {
              size:28,
              quantity:0,
            },
            {
              size:30,
              quantity:0,
            },
          ]
        }
      ],
    }
  },

  methods:{
    loadDetails({item}) {
      // current opened || choose object ^
    },

    editPrintingRow(item){
      this.edit_dialog=true
      this.selectedSubcontrac={...item}
    },
    deletePrintingRow(){
      this.printingDelete_dialog=true
    },

    deletePrintingItem(){

    },

    setSubcontract(){
      
    }
  }
}
</script>
<style lang="">
  
</style>