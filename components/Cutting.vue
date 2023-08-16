<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="sipNumber"
      show-select
      :single-select="singleSelect"
      v-model="selected"

    >
      <template #top>
        <div class="title ma-4">Cutting</div>
      </template>
      <template #item.actions="{item}">
        <v-btn icon @click="returnDialog(item)">
          <v-img src="/rotate.svg" max-width="20"/>
        </v-btn>
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
      <template #[`header.data-table-select`]="{ props, on }">
        <v-simple-checkbox
          :value="props.value || props.indeterminate"
          v-on="on"
          :indeterminate="props.indeterminate"
          color="#7631FF"
        />
      </template>
      <template #item.data-table-select="{isSelected, select}">
        <v-simple-checkbox
          color="#7631FF"
          v-ripple
          :value="isSelected"
          @input="select($event)"
        />
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="return_dialog">
      <v-card>
        <v-card-title class="d-flex align-center w-full">
          <div class="title">Returned fabric</div>
          <v-spacer/>
          <v-btn
            icon
            color="#7631FF"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-col cols="12">
            <div class="label">Sip №</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter spin number"
              v-model.trim="returned_fabric.sipNumber"
            />
          </v-col>
          <v-col cols="12">
            <div class="label">Batch №</div>
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter branch number"
              v-model.trim="returned_fabric.batchNumber"
            />
          </v-col>
          <v-col cols="12">
            <div class="label">Returned fabric quantity</div>
            <div class="d-flex align-center">
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-l-lg base" color="#7631FF"
                placeholder="Enter returned fabric quantity"
                v-model.trim="returned_fabric.quantity"
              />
              <v-select
                :items="fabricEnums"
                v-model="returned_fabric.type"
                outlined
                hide-details
                dense
                height="44"
                append-icon="mdi-chevron-down"
                style="max-width: 100px;"
                class="rounded-r-lg base" color="#7631FF"
                placeholder="Select.."
              />
            </div>
          </v-col>
        </v-card-text>
        <v-card-actions class="px-10 pb-5">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#7631FF"
            width="163" height="44"
            @click="return_dialog=false"
            style="border-width: 2px"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#7631FF" dark
            width="163" height="44"
          >
            Save
          </v-btn>
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

  </div>
</template>

<script>
export default {
  name: 'CuttingComponent',
  data() {
    return {
      return_dialog: false,
      history_dialog: false,
      classification_dialog: false,
      headers: [
        {text: 'Sip №', sortable: false, align: 'start', value: 'sipNumber'},
        {text: 'Batch №', sortable: false, align: 'start', value: 'batchNumber'},
        {text: 'Fabric specification', sortable: false, align: 'start', value: 'fabricSpecification'},
        {text: 'Given fabric quantity for cut.', sortable: false, align: 'start', value: 'quantity'},
        {text: 'Used fabric', sortable: false, align: 'start', value: 'usedFabric'},
        {text: 'Color', sortable: false, align: 'start', value: 'color'},
        {text: 'Cut quantity', sortable: false, align: 'start', value: 'cutQuantity'},
        {text: 'Produced total', sortable: false, align: 'start', value: 'producedTotal'},
        {text: 'Actions', sortable: false, align: 'end', value: 'actions'},
      ],
      items: [
        {
          sipNumber: 'ART005/03-23',
          batchNumber: '02259-89',
          fabricSpecification: 'Description of Suppliers catalogs',
          quantity: '1000 kg',
          usedFabric: '900 kg',
          color: 'Grey 8996 TPX',
          cutQuantity: '',
          producedTotal: '21',
        },
        {
          sipNumber: 'ART005/03-24',
          batchNumber: '02259-89',
          fabricSpecification: 'Description of Suppliers catalogs',
          quantity: '1000 kg',
          usedFabric: '900 kg',
          color: 'Grey 8996 TPX',
          cutQuantity: '',
          producedTotal: '21',
        },
        {
          sipNumber: 'ART005/03-25',
          batchNumber: '02259-89',
          fabricSpecification: 'Description of Suppliers catalogs',
          quantity: '1000 kg',
          usedFabric: '900 kg',
          color: 'Grey 8996 TPX',
          cutQuantity: '',
          producedTotal: '21',
        },
      ],
      returned_fabric: {
        sipNumber: '',
        batchNumber: '',
        quantity: '',
        type: 'KG'
      },
      classificationList: {
        24: 100,
        26: 120,
        28: 140,
        30: 160,
        reason: 'Defect',
        comment: ''
      },
      classificationEnums: ['Defect', 'Effect )'],
      selected: [],
      singleSelect: false,
      fabricEnums: ['KG', 'm'],
      historyHeaders: [
        {text: 'Date', sortable: false, align: 'start', value: 'date'},
        {text: '24', sortable: false, align: '24', value: '24'},
        {text: '26', sortable: false, align: '26', value: '26'},
        {text: '28', sortable: false, align: '28', value: '28'},
        {text: '30', sortable: false, align: '30', value: '30'},
        {text: 'Done By', sortable: false, align: 'canter', value: 'doneBy'},
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

      ]
    }
  },
  methods: {
    returnDialog(item) {
      this.return_dialog = true;
      this.returned_fabric = {...item};
    },
    getHistory(item) {
      this.history_dialog = true;
    },
    getClassification(item) {
      this.classification_dialog = true;
    },
    editItem(item) {
    },
    deleteItem(item) {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
