<template>
  <div>
    <v-data-table
      :headers="headers"
      :items-per-page="itemPrePage"
      :loading="loading"
      :items="canvas_type_list"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
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
        <div>
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>
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
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-text-field
              :rules="[ formRules.required ]"
              v-model="create_canvas_type.name"
              filled
              label="Canvas type"
              placeholder="Select canvas type"
              color="#7631FF"
            />
            <v-text-field
              :rules="[ formRules.required ]"
              v-model="create_canvas_type.specification"
              filled
              label="Canvas type specification"
              placeholder="Enter Canvas type specification"
              color="#7631FF"
            />
            <v-textarea
              rows="1"
              auto-grow
              v-model="create_canvas_type.description"
              filled
              label="Description"
              placeholder="Enter Canvas type"
              color="#7631FF"
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
            @click="save"
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
          <v-form ref="new_form">
            <v-text-field
              v-model="edit_canvas_type.name"
              filled
              :rules="[ formRules.required ]"
              label="Canvas type"
              placeholder="Select canvas type"
              color="#7631FF"
            />
            <v-text-field
              v-model="edit_canvas_type.specification"
              filled
              :rules="[ formRules.required ]"
              label="Canvas type specification"
              placeholder="Enter Canvas type specification"
              color="#7631FF"
            />
            <v-textarea
              rows="1"
              auto-grow
              v-model="edit_canvas_type.description"
              filled
              label="Description"
              placeholder="Enter Canvas type"
              color="#7631FF"
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
            @click="update"
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
            @click="deleteCanvas"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CanvasTypePage",
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,
      validate: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      create_canvas_type: {
        catalogGroupId: "",
        description: "",
        name: "",
        specification: ""
      },
      edit_canvas_type: {
        description: "",
        name: "",
        specification: ""
      },
      delete_canvas_id: "",
      headers: [
        {text: "ID", value: "id", sortable: false},
        {text: "Name", value: "name", sortable: false},
        {text: "Catalogs group code", value: "catalogGroupCode", sortable: false},
        {text: "Catalog Group Name", value: "catalogGroupName", sortable: false},
        {text: "createdAt", value: "createdAt", sortable: false},
        {text: "Description", value: "description", sortable: false},
        {text: "UpdatedAt", value: "updatedAt", sortable: false},
        {text: "Actions", value: "actions", align: "center", sortable: false},
      ],
    }
  },
  computed: {
    ...mapGetters({
      loading: "canvasType/loading",
      canvas_type_list: "canvasType/canvas_type_list",
      totalElements: "canvasType/totalElements",
      catalogGroupId: "catalogGroups/catalogGroupId",
    })
  },
  methods: {
    ...mapActions({
      getCanvasTypeList: "canvasType/getCanvasTypeList",
      createCanvasType: "canvasType/createCanvasType",
      updateCanvasType: "canvasType/updateCanvasType",
      deleteCanvasType: "canvasType/deleteCanvasType",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getCanvasTypeList({page: 0, size: this.itemPrePage, id: this.create_canvas_type.catalogGroupId});
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getCanvasTypeList({page: this.current_page, size: this.itemPrePage, id: this.create_canvas_type.catalogGroupId});
    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        const item = {...this.create_canvas_type};
        await this.createCanvasType(item);
        this.new_dialog = false;
        this.$refs.new_form.reset();
      }
    },
    async update() {
      const {catalogGroupId, name, id, description, specification} = this.edit_canvas_type;
      const item = {catalogGroupId, description, id, name, specification};
      await this.updateCanvasType(item);
      this.edit_dialog = false;
    },
    async deleteCanvas() {
      await this.deleteCanvasType({id: this.delete_canvas_id, groupId: this.create_canvas_type.catalogGroupId});
      this.delete_dialog = false
    },
    editItem(item) {
      this.edit_canvas_type = {...item};
      this.edit_dialog = true
    },
    getDeleteItem(item) {
      this.delete_canvas_id = item.id
      this.delete_dialog = true
    },
  },
  async mounted() {
    const catalog_one_id = this.catalogGroupId;
    this.create_canvas_type.catalogGroupId = catalog_one_id;
    await this.getCanvasTypeList({page: 0, size: 10, id: catalog_one_id});
  }
}
</script>

<style lang="sass" scoped>

</style>
