<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="modelPartsList"
      :items-per-page="50"
      class="elevation-0"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              width="160" height="36"
              @click="newDialog"
              dark
            >
              <v-icon>mdi-plus</v-icon>
              Add parts
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon class="mr-2" @click="editParts(item)">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon>
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-divider/>
    <v-dialog v-model="partsDialog" max-width="900">
      <v-card>
        <v-card-title>
          <div>{{ dialogTitle }} model parts</div>
          <v-spacer/>
          <v-btn icon color="#7631FF" @click="partsDialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="12" lg="6">
              <v-select
                v-model="newModelParts.bodyPartId"
                :items="partNames"
                item-text="partName"
                item-value="id"
                label="Part name"
                placeholder="Enter part name"
                filled dense
                color="#7631FF"
                append-icon="mdi-chevron-down"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                label="Composition"
                placeholder="Enter composition"
                v-model="newModelParts.partComposition"
                filled dense
                color="#7631FF"
              />
            </v-col>
            <v-col cols="12" lg="12">
              <v-text-field
                label="Description"
                placeholder="Enter description"
                v-model="newModelParts.description"
                filled dense
                color="#7631FF"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#7631FF"
            width="140" height="40"
            @click="partsDialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
            @click="saveModelParts"
            v-if="dialogTitle === 'Add'"
          >
            add
          </v-btn>
          <v-btn
            v-else
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
            @click="updateParts"
          >
            save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ModelPartsComponent',
  data() {
    return {
      headers: [
        {text: 'Part name', align: 'start', sortable: false, value: 'bodyPart'},
        {text: 'Composition', sortable: false, value: 'partComposition'},
        {text: 'Comment', sortable: false, value: 'description'},
        {text: 'Creator', sortable: false, value: 'createdBy'},
        {text: 'Created at', sortable: false, value: 'createdAt'},
        {text: 'Actions', sortable: false, align: 'center', value: 'actions'},
      ],
      partsDialog: false,
      newModelParts: {
        bodyPartId: '',
        partComposition: '',
        description: '',
        createdBy: '',
        createAt: ''
      },
      dialogTitle: ''
    }
  },
  created() {
    this.getPartName();
  },
  watch: {
    partsDialog(val) {
      if (!val) {
        this.newModelParts = {
          bodyPartId: '',
          partComposition: '',
          description: '',
          createdBy: '',
          createAt: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      partNames: 'modelParts/partName',
      newModelId: 'models/newModelId',
      modelPartsList: "modelParts/modelPartsList"
    }),
  },
  methods: {
    ...mapActions({
      getPartName: 'modelParts/getPartName',
      createModelParts: 'modelParts/createModelParts',
      updateModelParts: 'modelParts/updateModelParts',
    }),
    async saveModelParts() {
      await this.createModelParts({
        data: this.newModelParts,
        id: this.newModelId
      });
      this.partsDialog = false
    },
    editParts(item) {
      this.dialogTitle = 'Edit';
      console.log(item);
      this.newModelParts = item;
      this.partsDialog = true;
    },
    newDialog() {
      this.partsDialog = true;
      this.dialogTitle = 'Add';
    },
    updateParts() {
      this.updateModelParts(this.newModelParts)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table-header {
  background-color: #F4F5FA;
}

::v-deep th {
  color: #000 !important;
}
</style>
