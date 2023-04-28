
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
              label="Color code"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Color name"
              outlined
              class="rounded-lg"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              style="width: 100%"
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
              style="width: 100%;"
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
        <v-toolbar class="rounded-lg" elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Colors</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Add Color
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider/>
      </template>

      <template #item.apperance="{ item }">
        <input type="color" :value="item.apperance" disabled>
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
          <div class="text-capitalize font-weight-bold">Add Color</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form  ref="new_form">
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Color code"
                  placeholder="Enter Color code"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Color name"
                  placeholder="Enter Color name"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      filled
                      label="Code and apperance"
                      placeholder="Enter Code and apperance"
                      dense
                      color="#7631FF"
                      v-model="color"
                      v-on="on"
                      v-bind="attrs"
                    />
                  </template>
                  <v-card>
                    <v-card-text>
                      <v-color-picker
                        canvas-height="100"
                        v-model="color"
                      >
                      </v-color-picker>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn class="text-capitalize primary darken-1" small @click="menu = false">save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
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
          <v-form  ref="edit_form">
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Color code"
                  placeholder="Enter Color code"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  filled
                  label="Color name"
                  placeholder="Enter Color name"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="edit_menu"
                  :close-on-content-click="false"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      filled
                      label="Code and apperance"
                      placeholder="Enter Code and apperance"
                      dense
                      color="#7631FF"
                      v-model="color"
                      v-on="on"
                      v-bind="attrs"
                    />
                  </template>
                  <v-card>
                    <v-card-text>
                      <v-color-picker
                        canvas-height="100"
                        v-model="color"
                      >
                      </v-color-picker>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn class="text-capitalize primary darken-1" small @click="edit_menu = false">save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
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
        <v-card-title class="d-flex justify-center">Delete Color</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this color?
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
  name: "CatalogsColorPages",
  data() {
    return {
      filter_partner: {},
      valid_search: true,
      edit_menu: false,
      menu: false,
      color: "",
      fields_status: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      headers: [
        {text: "ID", value: "id", sortable: false},
        {text: "Color code", value: "colorCode"},
        {text: "Name", value: "name"},
        {text: "Apperance", value: "apperance"},
        {text: "Pantone code", value: "pantoneCode"},
        {text: "Description", value: "description"},
        {text: "Created", value: "created"},
        {text: "Updated", value: "updated"},
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
      items: [
        {colorCode: "Catalog", apperance: "#FF0000FF"}
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
