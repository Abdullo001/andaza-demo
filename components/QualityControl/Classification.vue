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
          <v-card-title>Classification of shortcomings</v-card-title>
        </v-card>
      </template>
      <template #item.actions="{item}">
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
          <div class="title">Edit classification</div>
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
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'Classification',
  data() {
    return {
      headers: [
        {text: 'Color', align: 'start', sortable: false, value: 'color'},
        {text: 'Size', align: 'start', sortable: false, value: 'size'},
        {text: 'Quality', align: 'start', sortable: false, value: 'quality'},
        {text: 'Status', align: 'start', sortable: false, value: 'status'},
        {text: 'Comment', align: 'start', sortable: false, value: 'comment'},
        {text: 'Actions', align: 'end', sortable: false, value: 'actions'},
      ],
      checkedList: [
        {id: 1, color: 'Grey', size: '24', quality: '1', status: 'Photo sample', comment: 'test comment'},
        {id: 2, color: 'Black', size: '24', quality: '1', status: 'Sample to client', comment: 'test comment'},
        {id: 3, color: 'White', size: '24', quality: '3', status: 'Defect', comment: 'test comment'},
        {id: 4, color: 'Purple', size: '24', quality: '2', status: 'Barak', comment: 'test comment'},
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
      delete_dialog: false,
    }
  },
  methods: {
    ...mapActions({
      getOwnList: "commonProcess/getOwnList"
    }),
    saveClassification() {},
    deleteConfirm() {
    },
    getHistory(item) {},
    editItem() {
      this.classification_dialog = !this.classification_dialog;
    },
    deleteItem() {
      this.delete_dialog = !this.delete_dialog;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getOwnList(id);
  }
}
</script>

<style lang="scss" scoped>

</style>
