<template>
  <v-card flat class="rounded-lg">
    <v-data-table
      item-key="calculation"
      :headers="headers"
      :items="items"
    >
      <template #top>
        <div class="pa-4 d-flex align-center justify-space-between">
          <div class="title">Classification of shortcomings</div>
        </div>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon class="mr-2" @click="editItem(item)" >
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="deleteItem(item)">
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="edit_dialog" width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit classification of shortcomings </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="6">
                <div class="label">Quantity</div>
                <v-text-field
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#544B99"
                  placeholder="Enter quatity"
                  v-model.trim="selectedItem.quantity"
                />
              </v-col>
              <v-col cols="6">
                <div class="label">Reason</div>
                <v-select
                  :items="classificationEnums"
                  v-model.trim="selectedItem.reason"
                  append-icon="mdi-chevron-down"
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#544B99"
                  placeholder=" "
                />
              </v-col>
              <v-col cols="6">
                <div class="label">Description</div>
                <v-text-field
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#544B99"
                  placeholder="Enter description"
                  v-model.trim="selectedItem.description"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-10 pb-5">
          <v-spacer/>
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="163" height="44"
            @click="edit_dialog=false"
            style="border-width: 2px"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#544B99" dark
            width="163" height="44"
            @click="editFunc"
          >
            Save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          Delete classification
        </v-card-title>
        <v-card-text>
          Are you sure you want to  Delete  classification for shortcomings?
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
            @click="deleteFunc"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'CalculationShortcomings',
  data() {
    return {
      edit_validate:true,
      delete_dialog:false,
      edit_dialog:false,
      headers: [
        {
          text: 'Colors',
          sortable: false,
          align: 'start',
          value: 'color'
        },
        {
          text: 'Size',
          sortable: false,
          align: 'start',
          value: 'size'
        },
        {
          text: 'Quantity',
          sortable: false,
          align: 'start',
          value: 'quantity'
        },
        {
          text: 'Reason',
          sortable: false,
          align: 'start',
          value: 'reason'
        },
        {
          text: 'Comment',
          sortable: false,
          align: 'start',
          value: 'description'
        },
        {
          text: '',
          sortable: false,
          align: 'end',
          value: 'actions',
          width: 120,
        },
      ],
      items: [],
      selectedItem:{},
      classificationEnums: ['DEFECT','PHOTO','PHOTO_SAMPLE','SAMPLE','LOST','OTHERS'],


    }
  },

  computed:{
    ...mapGetters({
      classificationList:"commonCalculationsShortcomings/shortcomingsList",
      planningProcessId:"commonProcess/planningProcessId",

    })
  },

  watch:{
    classificationList(val){
      this.headers=[
        {
          text: 'Colors',
          sortable: false,
          align: 'start',
          value: 'color'
        },
        {
          text: 'Size',
          sortable: false,
          align: 'start',
          value: 'size'
        },
        {
          text: 'Quantity',
          sortable: false,
          align: 'start',
          value: 'quantity'
        },
        {
          text: 'Reason',
          sortable: false,
          align: 'start',
          value: 'reason'
        },
        {
          text: 'Comment',
          sortable: false,
          align: 'start',
          value: 'description'
        },
        {
          text: '',
          sortable: false,
          align: 'end',
          value: 'actions',
          width: 120,
        },
      ]
      this.items=JSON.parse(JSON.stringify(val))

      if(val[0]?.partner){
        this.headers.splice(4,0,
          {
            text: 'Partner',
            sortable: false,
            align: 'start',
            value: 'partner'
          },

        )
      }
    }
  },

  methods:{
    ...mapActions({
      deleteClassification:"commonCalculationsShortcomings/deleteShortcomings",
      updateShortcomings:"commonCalculationsShortcomings/updateShortcomings",

    }),

    editItem(item){
      this.selectedItem={...item}
      this.edit_dialog=true

    },

    editFunc(){
      const data={
        description: this.selectedItem.description,
        id: this.selectedItem.id,
        quantity: this.selectedItem.quantity,
        reason: this.selectedItem.reason,
      }

      if(this.selectedItem.partner){
        data.partner=this.selectedItem.partner
      }

      this.updateShortcomings({data,id:this.planningProcessId})

      this.edit_dialog=false

    },

    deleteItem(item){
      this.delete_dialog=true
      this.selectedItem={...item}
    },
    deleteFunc(){
      this.delete_dialog=false
      this.deleteClassification({data:{...this.selectedItem},planningProcessId:this.planningProcessId})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
