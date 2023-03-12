<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_search" ref="filter_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Id packege shape"
              outlined
              class="rounded-lg"
              v-model.trim="filters.financeNumber"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="2" md="2">
            <v-text-field
              label="Name"
              outlined
              class="rounded-lg"
              v-model.trim="filters.modelId"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col
            cols="12" lg="2" md="2" style="max-width: 240px;"
          >
            <el-date-picker
              v-model="search.start_time"
              type="datetime"
              placeholder="Created"
              :picker-options="pickerOptions"
              format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
          <v-col
            cols="12" lg="2" md="2"
          >
            <el-date-picker
              v-model="search.end_time"
              type="datetime"
              placeholder="Updated"
              :picker-options="pickerOptions"
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
      :items="items"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Package shape</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Package shape
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
          <div class="text-capitalize font-weight-bold">Create Package shape</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form  ref="new_form">
            <v-text-field
              filled
              label="Name"
              placeholder="Enter name package shape"
              dense
            />
            <v-textarea
              filled
              label="Description"
              placeholder="Enter package shape description"
              dense
            />
            <v-select
              filled
              append-icon="mdi-chevron-down"
              label="Measurement unit ID"
              placeholder="Select Measurement unit ID"
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
          <div class="text-capitalize font-weight-bold">Edit Package shape</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form  ref="new_form">
            <v-text-field
              filled
              label="Name"
              placeholder="Enter name package shape"
              dense
            />
            <v-textarea
              filled
              label="Description"
              placeholder="Enter package shape description"
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
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Package shape</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this package shape?
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
  name: "PackageShapePage",
  data(){
    return{
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      search: {},
      filters:{},
      valid_search: true,
      headers: [
        {text: "", value: "checkbox", align: "start", sortable: false, width: "50"},
        {text: "Id", value: "id", sortable: false},
        {text: "Name", value: "name",},
        {text: "Description", value: "description",},
        {text: "Measurement Name", value: "measurementName",},
        {text: "Created", value: "created",},
        {text: "Updated", value: "updated",},
        {text: "Actions", value: "actions", align: "end", sortable: false},
      ],
      items: [
        {id: 1, name: "valijon", description: "description", created: "created", updated: "updated"}
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "Cегодня",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Вчера",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "Неделя",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    }
  },
  methods:{
    getDeleteItem(item){
      this.delete_dialog = true
    },
    editItem(item){
      this.edit_dialog = true
    },
    resetFilters(){},
    filterData(){},
  },
}
</script>

<style lang="scss" scoped>
</style>
