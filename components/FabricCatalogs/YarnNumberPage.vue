<template>
  <div>
    <v-data-table
      :headers="headers"
      :items-per-page="10"
      :items="yarn_number_list"
      :loading="loading"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">Yarn Number</div>
            <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              Yarn Number
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
          <div class="text-capitalize font-weight-bold">Create Yarn Number</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-text-field
              v-model="create_yarn_number.name"
              :rules="[ formRules.required ]"
              filled
              label="Yarn number type"
              placeholder="Select yarn number type"
              color="#7631FF"
            />
            <v-textarea
              rows="1"
              auto-grow
              v-model="create_yarn_number.description"
              filled
              label="Description"
              placeholder="Enter yarn number type"
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
          <div class="text-capitalize font-weight-bold">Edit Yarn number</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <v-text-field
              v-model="edit_yarn_number.name"
              :rules="[ formRules.required ]"
              filled
              label="Yarn number type"
              placeholder="Select yarn number type"
              color="#7631FF"
            />
            <v-textarea
              v-model="edit_yarn_number.description"
              rows="1"
              auto-grow
              filled
              label="Description"
              placeholder="Enter yarn number type"
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
        <v-card-title class="d-flex justify-center">Delete Yarn Number type</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this Yarn number type?
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
            @click="deleteYarn"
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
  name: "YarnNumberPage",
  data() {
    return {
      edit_validate: true,
      validate: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      create_yarn_number: {
        catalogGroupId: "",
        name: "",
        description: ""
      },
      edit_yarn_number: {
        catalogGroupId: "",
        name: "",
        description: ""
      },
      delete_yarn_id: "",
      headers: [
        {text: "ID", value: "id", sortable: false},
        {text: "name", value: "name", sortable: false},
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
      loading: "yarnNumber/loading",
      yarn_number_list: "yarnNumber/yarn_number_list",
      totalElements: "yarnNumber/totalElements",
      catalogGroupId: "catalogGroups/catalogGroupId",
    })
  },
  methods: {
    ...mapActions({
      getYarnNumberList: "yarnNumber/getYarnNumberList",
      createYarnNumber: "yarnNumber/createYarnNumber",
      updateYarnNumber: "yarnNumber/updateYarnNumber",
      deleteYarnNumber: "yarnNumber/deleteYarnNumber",
    }),
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        await this.createYarnNumber(this.create_yarn_number);
        this.$refs.new_form.reset();
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      const {catalogGroupId, id, description, name} = this.edit_yarn_number;
      if (edit_validate) {
        const item = {catalogGroupId, id, description, name}
        await this.updateYarnNumber(item);
        this.edit_dialog = false;
      }
    },
    async deleteYarn() {
      await this.deleteYarnNumber({id: this.delete_yarn_id, groupId: this.create_yarn_number.catalogGroupId});
      this.delete_dialog = false;
    },
    editItem(item) {
      this.edit_yarn_number = {...item};
      this.edit_dialog = true;
    },
    getDeleteItem(item) {
      this.delete_yarn_id = item.id;
      this.delete_dialog = true
    },
  },
  async mounted() {
    const catalogGroupId = this.catalogGroupId;
    this.create_yarn_number.catalogGroupId = catalogGroupId;
    await this.getYarnNumberList({page: 0, size: 10, id: catalogGroupId});
  },
}
</script>

<style lang="sass" scoped>

</style>
