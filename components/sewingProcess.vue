<template >
  <div>
    <v-data-table
    :headers="headers"
    :items="items"
    item-key="cuttingTable"
  >
    <template #top>
      <div class="title ma-4">Done works’ quantities</div>
    </template>
    <template #item.actions="{item}">
      <v-btn icon color="green" @click.stop="editItem(item)">
        <v-img src="/edit-active.svg" max-width="22"/>
      </v-btn>
      <v-btn icon color="red" @click.stop="deleteItem(item)">
        <v-img src="/delete.svg" max-width="27"/>
      </v-btn>
    </template>
  </v-data-table>

  <v-dialog v-model="edit_dialog" width="450">
    <v-card>
      <v-card-title class="d-flex justify-space-between w-full">
        <div class="text-capitalize font-weight-bold">Edit sewing info</div>
        <v-btn icon color="#7631FF" @click="edit_dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-4">
        <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
          <v-row>
            <v-col cols="12" >
              <div class="label">Color</div>
              <v-select
                append-icon="mdi-chevron-down"
                :rules="[formRules.required]"
                item-text="name"
                item-value="id"
                hide-details
                color="#7631FF"
                class=" base rounded-lg"
                rounded
                outlined
                dense
                placeholder="Select color"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" lg="3" v-for="(item,idx) in selectedItem.sizes" :key="idx">
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
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-center mt-4">
              <v-radio-group v-model="radioGroup" row class="d-flex"    >
                <v-radio color="#7631FF"  value="2" >
                  <template v-slot:label>
                    <div class="body-1 font-weight-medium ">Addition (+)</div>
                  </template>
                </v-radio>
                <v-spacer/>
                <v-radio color="#7631FF"  value="1" >
                  <template v-slot:label>
                    <div class="body-1 font-weight-medium ">Subtraction (-)</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-8">
        <v-btn
          class="rounded-lg text-capitalize font-weight-bold"
          outlined color="#7631FF"
          width="130"
          @click="edit_dialog = false"
        >
          cancel
        </v-btn>
        <v-btn
          class="rounded-lg text-capitalize ml-4 font-weight-bold"
          color="#7631FF" dark
          width="130"
          @click="save"
        >
          save
        </v-btn>
      </v-card-actions>
      
    </v-card>
  </v-dialog>

  <v-dialog v-model="delete_dialog" max-width="500">
    <v-card class="pa-4 text-center">
      <div class="d-flex justify-center mb-2">
        <v-img src="/error-icon.svg" max-width="40"/>
      </div>
      <v-card-title class="d-flex justify-center">
        Delete sewing info
      </v-card-title>
      <v-card-text>
        Are you sure you want to  Delete  sewing info? 
      </v-card-text>
      <v-card-actions class="px-16">
        <v-btn
          outlined
          class="rounded-lg text-capitalize font-weight-bold"
          color="#777C85"
          width="140"
          @click.stop="delete_dialog = false"
        >
          Cancel
        </v-btn>
        <v-spacer/>
        <v-btn
          class="rounded-lg text-capitalize font-weight-bold"
          color="#FF4E4F"
          width="140"
          elevation="0"
          dark
          @click="deleteSewing"
        >
          Delete
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
      headers:[
        {text: 'Color', align: 'start', value: 'color'},
        {text: '24', sortable: false, align: 'start', value: '24'},
        {text: '26', sortable: false, align: 'start', value: '26'},
        {text: '28', sortable: false, align: 'start', value: '28'},
        {text: '30', sortable: false, align: 'start', value: '30'},
        {text: 'Produced total', sortable: false, align: 'start', value: 'producedTotal'},
        {text: 'Actions', sortable: false, align: 'start', value: 'actions'},        
      ],
      items:[
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
          ],
        }
      ],
      delete_dialog:false,
      radioGroup:"",
      selectedItem:{},
      edit_dialog:false,
      edit_validate:true,

    }
  },

  methods:{
    editItem(item){
      this.edit_dialog=true
      this.selectedItem={...item}
    },
    deleteItem(){
      this.delete_dialog=true
    },

    save(){

    },
    deleteSewing(){

    },
  }
  
}
</script>
<style lang="">
  
</style>