<template>
  <div>
    <v-data-table
      :headers="headers"
      :items-per-page="10"
      :items="items"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Canvas Type</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Canvas Type
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.checkbox="{ item }">
        <v-checkbox/>
      </template>
      <template #item.actions="{item}">
        <div class="d-flex justify-end">
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-icon size="20">mdi-square-edit-outline</v-icon>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-icon size="20">mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Create Canvas Type</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form  ref="new_form">
            <v-text-field
              filled
              label="Canvas type"
              placeholder="Select canvas type"
              dense
            />
            <v-text-field
              filled
              label="Canvas type specification"
              placeholder="Enter Canvas type specification"
              dense
            />
            <v-textarea
              filled
              label="Description"
              placeholder="Enter Canvas type"
              dense
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Canvas type</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form  ref="new_form">
            <v-text-field
              filled
              label="Canvas type"
              placeholder="Select canvas type"
              dense
            />
            <v-text-field
              filled
              label="Canvas type specification"
              placeholder="Enter Canvas type specification"
              dense
            />
            <v-textarea
              filled
              label="Description"
              placeholder="Enter Canvas type"
              dense
            />
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
        <v-card-title class="d-flex justify-center">Delete Canvas type</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this Canvas type?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
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
  name: "CanvasTypePage",
  data() {
    return {
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        {text: "Catalogs group code", value: "catalog"},
        {text: "Group part code", value: "group"},
        {text: "Canvas type", value: "canvasType"},
        {text: "Canvas type specifiaction", value: "specifiaction"},
        {text: "Description", value: "description"},
        {text: "Creator", value: "creator"},
        {text: "Created date", value: "Created date"},
        {text: "Actions", value: "actions", sortable: false},
      ],
      items: [
        {catalog: "Catalog"}
      ]
    }
  },
  methods:{
    editItem(item){
      this.edit_dialog = true
    },
    getDeleteItem(item){
      this.delete_dialog = true
    },
  },
}
</script>

<style lang="sass" scoped>

</style>
