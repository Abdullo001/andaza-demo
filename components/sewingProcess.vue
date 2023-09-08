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
      <v-btn icon @click="getClassification(item)">
        <v-img src="/t-shirt.svg" max-width="20"/>
      </v-btn>
      <v-btn icon @click="getHistory(item)">
        <v-img src="/history.svg" max-width="20"/>
      </v-btn>
      <v-btn icon color="green" @click.stop="editItem(item)">
        <v-img src="/edit-active.svg" max-width="22"/>
      </v-btn>
      <v-btn icon color="red" @click.stop="deleteItem(item)">
        <v-img src="/delete.svg" max-width="27"/>
      </v-btn>
    </template>
  </v-data-table>

  
  <v-dialog v-model="classification_dialog" max-width="600">
    <v-card flat>
      <v-card-title>
        <div class="title">Add classification</div>
        <v-spacer/>
        <v-btn
          icon
          @click="classification_dialog=false"
          color="#7631FF"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="3">
            <div class="label">24</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter branch number"
              v-model.trim="classificationList['24']"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="label">26</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter branch number"
              v-model.trim="classificationList['26']"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="label">28</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter branch number"
              v-model.trim="classificationList['28']"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <div class="label">30</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter branch number"
              v-model.trim="classificationList['30']"
            />
          </v-col>
          <v-col cols="12" lg="6">
            <div class="label">Reason</div>
            <v-select
              :items="classificationEnums"
              v-model.trim="classificationList.reason"
              append-icon="mdi-chevron-down"
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter branch number"
            />
          </v-col>
          <v-col cols="12" lg="6">
            <div class="label">Comment</div>
            <v-text-field
              v-model.trim="classificationList.comment"
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter branch number"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-10 pb-5">
        <v-spacer/>
        <v-btn
          outlined
          class="rounded-lg text-capitalize font-weight-bold"
          color="#7631FF"
          width="163" height="44"
          @click="classification_dialog=false"
          style="border-width: 2px"
        >
          {{ $t('planningProduction.planning.cancel') }}
        </v-btn>
        <v-btn
          class="rounded-lg text-capitalize font-weight-bold ml-8"
          color="#7631FF" dark
          width="163" height="44"
        >
          Save
        </v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="history_dialog" max-width="600">
    <v-card flat>
      <v-card-title>
        <div class="title">History</div>
        <v-spacer/>
        <v-btn
          icon
          @click="history_dialog=false"
          color="#7631FF"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="historyHeaders"
          hide-default-footer
          :items="historyList"
          class="mt-4 rounded-lg"
          style="border: 1px solid #E9EAEB"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>


  <v-dialog v-model="edit_dialog" width="600">
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
            <v-col cols="12" lg="3" v-for="(item,idx) in selectedItem.sizes" :key="idx">
              <div class="label">{{item.size}}</div>
              <v-text-field
                v-model="item.quantity"
                placeholder="0"
                outlined
                hide-details
                height="44"
                class="rounded-lg base "
                validate-on-blur
                dense
                color="#7631FF"   
              />
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
      
      <v-divider></v-divider>

        <div class="px-4 pb-4">
          <v-data-table
            :headers="historyHeaders"
            hide-default-footer
            :items="historyList"
            class="mt-4 rounded-lg"
            style="border: 1px solid #E9EAEB"
          >
          <template #top>
            <div class="title ma-4">History</div>
          </template>
          </v-data-table>
        </div>
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

      
      history_dialog:false,
      classification_dialog:false,

      historyHeaders: [
        {text: 'Date', sortable: false, align: 'start', value: 'date'},
        {text: '24', sortable: false, align: '24', value: '24'},
        {text: '26', sortable: false, align: '26', value: '26'},
        {text: '28', sortable: false, align: '28', value: '28'},
        {text: '30', sortable: false, align: '30', value: '30'},
        {text: 'Done By', sortable: false, align: 'center', value: 'doneBy'},
      ],

      historyList: [
        {
          date: '08.01.2023',
          24: '180',
          26: '200',
          28: '300',
          30: '350',
          doneBy: 'Shavkatova M.'
        },
        {
          date: '08.01.2023',
          24: '180',
          26: '200',
          28: '300',
          30: '350',
          doneBy: 'Shavkatova M.'
        },
        {
          date: '08.01.2023',
          24: '180',
          26: '200',
          28: '300',
          30: '350',
          doneBy: 'Shavkatova M.'
        },

      ],

      classificationList: {
        24: 100,
        26: 120,
        28: 140,
        30: 160,
        reason: 'Defect',
        comment: ''
      },
      classificationEnums: ['Defect', 'Effect )'],

    }
  },

  methods:{
    getHistory(item) {
      this.history_dialog = true;
    },

    getClassification(item) {
      this.classification_dialog = true;
    },

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