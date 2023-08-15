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
        <v-btn icon>
          <v-img src="/history.svg" max-width="20"/>
        </v-btn>
        <v-btn icon @click="returnDialog(item)">
          <v-img src="/rotate.svg" max-width="20"/>
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
            <v-text-field
              outlined
              hide-details
              dense
              height="44"
              class="rounded-lg base" color="#7631FF"
              placeholder="Enter returned fabric quantity"
              v-model.trim="returned_fabric.quantity"
            />
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
  </div>
</template>

<script>
export default {
  name: 'CuttingComponent',
  data() {
    return {
      return_dialog: false,
      headers: [
        {text: 'Sip №', sortable: false, align: 'start', value: 'sipNumber'},
        {text: 'Batch №', sortable: false, align: 'start', value: 'batchNumber'},
        {text: 'Fabric specification', sortable: false, align: 'start', value: 'fabricSpecification'},
        {text: 'Given fabric quantity for cut.', sortable: false, align: 'start', value: 'quantity'},
        {text: 'Used fabric', sortable: false, align: 'start', value: 'usedFabric'},
        {text: 'Color', sortable: false, align: 'start', value: 'color'},
        {text: 'Cut quantity', sortable: false, align: 'start', value: 'cutQuantity'},
        {text: 'Produced total', sortable: false, align: 'start', value: 'producedTotal'},
        {text: 'Actions', sortable: false, align: 'end' , value: 'actions'},
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
        quantity: ''
      },
      selected: [],
      singleSelect: false,

    }
  },
  methods: {
    returnDialog(item) {
      this.return_dialog = true;
      this.returned_fabric = {...item};
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
