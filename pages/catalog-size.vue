<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="ID size"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Size name"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2" style="max-width: 240px;"
          >
            <el-date-picker
              v-model="filter_partner.createdAt"
              type="datetime"
              placeholder="Created"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              v-model="filter_partner.updatedAt"
              type="datetime"
              placeholder="Updated"
              :picker-options="pickerShortcuts"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-spacer/>
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
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
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Size</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Add Size
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>
      <template #item.checkbox="{ item }">
        <v-checkbox/>
      </template>
      <template #item.actions="{item}">
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="delete.svg" max-width="27"/>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Add size</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form  ref="new_form">
            <v-row>
              <v-col cols="12" lg="6">
                <v-select
                  label="Gender"
                  filled dense
                  append-icon="mdi-chevron-down"
                  placeholder="Select Gender"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-select
                  label="Product type"
                  filled dense
                  append-icon="mdi-chevron-down"
                  placeholder="Select Product type"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Size from"
                  placeholder="Enter Size from"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Gradation"
                  placeholder="Enter Gradation"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Size to "
                  placeholder="Enter Size to "
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Description"
                  placeholder="Enter Description"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  chips
                  multiple
                  small-chips
                  deletable-chips
                  :items="select"
                  append-icon="mdi-chevron-down"
                  filled
                  label="Europe size"
                  placeholder="Enter Europe size"
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
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Size</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form  ref="new_form">
            <v-row>
              <v-col cols="12" lg="6">
                <v-select
                  label="Gender"
                  filled dense
                  append-icon="mdi-chevron-down"
                  placeholder="Select Gender"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-select
                  label="Product type"
                  filled dense
                  append-icon="mdi-chevron-down"
                  placeholder="Select Product type"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Size from"
                  placeholder="Enter Size from"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Gradation"
                  placeholder="Enter Gradation"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Size to "
                  placeholder="Enter Size to "
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Description"
                  placeholder="Enter Description"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12">
                <v-combobox
                  append-icon="mdi-chevron-down"
                  filled
                  label="Europe size"
                  placeholder="Enter Europe size"
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
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Size</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this size?
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
  name: "CatalogSizePage",
  data() {
    return {
      filter_partner: {},
      valid_search: true,
      fields_status: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        {text: "Catalogs group code", value: "catalog"},
        {text: "Gender", value: "gender"},
        {text: "Model group", value: "modelGroup"},
        {text: "Siz", value: "size"},
        {text: "Europen size", value: "europenSize"},
        {text: "Description", value: "description"},
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
      select: ["one", "two", "three"],
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
    filterData(){},
    resetFilters(){},
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Catalogs');
  }
}
</script>

<style lang="sass" scoped>

</style>
