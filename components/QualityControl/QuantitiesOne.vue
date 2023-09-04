<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="checkedList"
      hide-default-footer
      style="border: 1px solid #eae9e9"
      class="rounded-lg overflow-hidden"
    >
      <template #top>
        <v-card flat>
          <v-card-title>Checked products’ quantities (1 sort)</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
              @click="getClassification(item)"
            >
              <v-img src="/t-shirt.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">classification</span>
        </v-tooltip>
        <v-tooltip
          top
          color="#7631FF"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="#7631FF"
              @click="getHistory(item)"
            >
              <v-img src="/history.svg" max-width="22"/>
            </v-btn>
          </template>
          <span class="text-capitalize">History</span>
        </v-tooltip>
        <v-tooltip
          top
          color="green"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="green"
              @click="editItem(item)"
            >
              <v-img src="/edit-active.svg" max-width="21"/>
            </v-btn>
          </template>
          <span class="text-capitalize">edit</span>
        </v-tooltip>
        <v-tooltip
          top
          color="red"
          class="pointer"
          v-if="Object.keys(item).length > 2"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="red"
              @click="deleteItem(item)"
            >
              <v-img src="/delete.svg" max-width="24"/>
            </v-btn>
          </template>
          <span class="text-capitalize">delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="classification_dialog" max-width="600">
      <v-card flat>
        <v-card-title>
          <div class="title">Add classification</div>
          <v-spacer/>
          <v-btn
            icon
            @click="classification_dialog = !classification_dialog"
            color="#7631FF"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12" lg="3" v-for="(item,idx) in sizeDistributions" :key="idx">
              <div class="label">{{ item.size }}</div>
              <v-text-field
                outlined
                hide-details
                dense
                height="44"
                class="rounded-lg base" color="#7631FF"
                placeholder="Enter branch number"
                v-model.trim="item.quantity"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="label">Reason</div>
              <v-select
                :items="classificationEnums"
                v-model.trim="classification.reason"
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
                v-model.trim="classification.comment"
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
            @click="classification_dialog = !classification_dialog"
            style="border-width: 2px"
          >
            {{ $t('planningProduction.planning.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#7631FF" dark
            width="163" height="44"
            @click="saveClassification"
          >
            Save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="history_dialog" max-width="1200">
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
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          Delete this info
        </v-card-title>
        <v-card-text>
          Are you sure you want to Delete this info?
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
            @click="deleteConfirm"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            Edit Checked products’ quantities (1 sort)
          </div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" v-model="edit_validate" lazy-validation>
            <v-row>
              <v-col cols="12" lg="3" v-for="(item,idx) in sizeDistributions" :key="idx">
                <div class="label">{{ item.size }}</div>
                <v-text-field
                  outlined
                  hide-details
                  dense
                  height="44"
                  class="rounded-lg base" color="#7631FF"
                  placeholder="Enter branch number"
                  v-model.trim="item.quantity"
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
            @click="saveChanges"
          >
            save
          </v-btn>
        </v-card-actions>
        <v-divider/>
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
            <template #item.actions="{item}">
              <v-btn icon color="green" @click.stop="editHistoryItem(item)">
                <v-img src="/edit-active.svg" max-width="22"/>
              </v-btn>
              <v-btn icon color="red" @click.stop="deleteHistoryItem(item)">
                <v-img src="/delete.svg" max-width="27"/>
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'QuantitiesOne',
  components: {
  },
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: '24', align: 'start', sortable: false, value: '24'},
        {text: '26', align: 'start', sortable: false, value: '26'},
        {text: '28', align: 'start', sortable: false, value: '28'},
        {text: '30', align: 'start', sortable: false, value: '30'},
        {text: 'Produced total', align: 'start', sortable: false, value: 'producedTotal'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      checkedList: [
        {id: 1, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 2, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 3, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
        {id: 4, color: 'Grey 8996 TPX', 24: '24', 26: '26', 28: '28', 30: '30', producedTotal: '2105'},
      ],
      classification_dialog: false,
      sizeDistributions: [
        {size: 24, quantity: 24},
        {size: 26, quantity: 26},
        {size: 28, quantity: 28},
        {size: 30, quantity: 30},
      ],
      classification: {
        reason: 'DEFECT',
        comment: ''
      },
      classificationEnums: ['DEFECT', 'PHOTO', 'PHOTO_SAMPLE', 'SAMPLE', 'LOST', 'OTHERS'],
      history_dialog: false,
      delete_dialog: false,
      historyHeaders: [
        {text: "Date", sortable: false, align: 'start', value: 'date'},
        {text: "26", sortable: false, align: 'center', value: '26'},
        {text: "28", sortable: false, align: 'center', value: '28'},
        {text: "30", sortable: false, align: 'center', value: '30'},
        {text: "34", sortable: false, align: 'center', value: '34'},
        {text: "Done by ", sortable: false, align: 'center', value: 'doneBy'},
      ],
      historyList: [
        {
          id: 1,
          date: '07.03.2024',
          26: "26",
          28: "28",
          30: "30",
          34: "34",
          doneBy: 'Shavkatova M.'
        },
        {
          id: 2,
          date: '07.03.2024',
          26: "26",
          28: "28",
          30: "30",
          34: "34",
          doneBy: 'Shavkatova M.'
        },
        {
          id: 3,
          date: '07.03.2024',
          26: "26",
          28: "28",
          30: "30",
          34: "34",
          doneBy: 'Shavkatova M.'
        },
      ],
      edit_dialog: false,
      edit_validate: true,

    }
  },
  methods: {
    ...mapActions({
      getOwnList: "commonProcess/getOwnList"
    }),
    getClassification(item) {
      this.classification_dialog = !this.classification_dialog;
    },
    getHistory(item) {
      this.history_dialog = !this.history_dialog;
    },
    editItem() {
      this.edit_dialog = !this.edit_dialog;
    },
    deleteItem(item) {
      this.delete_dialog = true;
    },
    deleteConfirm() {
    },
    saveClassification() {
    },
    saveChanges() {
    },
    editHistoryItem(item) {
    },
    deleteHistoryItem(item) {}
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getOwnList(id);
  }
}
</script>

<style lang="scss" scoped>

</style>
