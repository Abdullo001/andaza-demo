<template>
  <div>
    <v-data-table
      :headers="headers"
      :items-per-page="itemPrePage"
      :server-items-length="totalElements"
      :loading="loading"
      :items="composition_list"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100]
      }"
      class="mt-4 rounded-lg"
      @update:items-per-page="size"
      @update:page="page"
    >
      <template #top>
        <v-toolbar elevation="0" class="rounded-lg">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("catalogGroups.tabs.composition") }}

            </div>
            <v-btn color="#544B99" class="rounded-lg text-capitalize" dark @click="new_dialog = true">
              <v-icon>mdi-plus</v-icon>
              {{ $t("catalogGroups.tabs.composition") }}

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
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogGroups.composition.dialogs.create") }}

          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form" lazy-validation v-model="validate">
            <v-text-field
              v-model="create_composition.name"
              :rules="[formRules.required]"
              filled
              :label="$t('catalogGroups.tabs.composition')"
              :placeholder="$t('catalogGroups.composition.dialogs.select')"
              color="#544B99"
            />
            <v-textarea
              v-model="create_composition.description"
              rows="1"
              auto-grow
              filled
              :label="$t('catalogGroups.composition.dialogs.description')"
              :placeholder="
                $t('catalogGroups.composition.dialogs.enterDescription')
              "
              color="#544B99"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
          {{ $t("catalogGroups.composition.dialogs.cancelBtn") }}

          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
            @click="save"
          >
          {{ $t("catalogGroups.composition.dialogs.createBtn") }}

          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("catalogGroups.composition.dialogs.edit") }}

          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="edit_form" lazy-validation v-model="edit_validate">
            <v-text-field
              v-model="edit_composition.name"
              :rules="[formRules.required]"
              filled
              :label="$t('catalogGroups.tabs.composition')"
              :placeholder="$t('catalogGroups.composition.dialogs.select')"
              color="#544B99"
            />
            <v-textarea
              v-model="edit_composition.description"
              filled
              rows="1"
              auto-grow
              :label="$t('catalogGroups.composition.dialogs.description')"
              :placeholder="
                $t('catalogGroups.composition.dialogs.enterDescription')
              "
              color="#544B99"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
          {{ $t("catalogGroups.composition.dialogs.cancelBtn") }}

          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99" dark
            width="163"
            @click="update"
          >
          {{$t("update")}}

          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          {{ $t("catalogGroups.composition.dialogs.deleteDialog") }}

        </v-card-title>
        <v-card-text>
          {{ $t("catalogGroups.composition.dialogs.deleteText") }}

        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
          {{ $t("catalogGroups.composition.dialogs.cancelBtn") }}

          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteItem"
          >
          {{ $t("catalogGroups.composition.dialogs.deleteBtn") }}

          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CompositionPage",
  data() {
    return {
      itemPrePage: 10,
      current_page: 0,
      edit_validate: true,
      validate: true,
      edit_dialog: false,
      new_dialog: false,
      delete_dialog: false,
      create_composition: {
        catalogGroupId: "",
        description: "",
        name: ""
      },
      edit_composition: {
        catalogGroupId: "",
        description: "",
        name: ""
      },
      delete_composition_id: "",
      headers: [
        {
          text: this.$t("catalogGroups.tabs.table.id"),
          value: "id",
          align: "start",

          width: "100",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.name"),
          sortable: false,
          value: "name",
        },
        {
          text: this.$t("catalogGroups.tabs.table.code"),
          value: "catalogGroupCode",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.groupName"),
          value: "catalogGroupName",
          sortable: false,
        },

        {
          text: this.$t("catalogGroups.tabs.table.createdAt"),
          value: "createdAt",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.updatedAt"),
          value: "updatedAt",
          sortable: false,
        },
        {
          text: this.$t("catalogGroups.tabs.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      loading: "composition/loading",
      composition_list: "composition/composition_list",
      totalElements: "composition/totalElements",
      catalogGroupId: "catalogGroups/catalogGroupId",
    })
  },
  methods: {
    ...mapActions({
      getCompositionList: "composition/getCompositionList",
      createComposition: "composition/createComposition",
      updateComposition: "composition/updateComposition",
      deleteComposition: "composition/deleteComposition",
    }),
    async size(val){
      this.itemPrePage = val;
      await this.getCompositionList({page: 0, size: this.itemPrePage, id: this.create_composition.catalogGroupId});
    },
    async page(val){
      this.current_page = val - 1;
      await this.getCompositionList({page: this.current_page, size: this.itemPrePage, id: this.create_composition.catalogGroupId});
    },
    async save() {
      const validate = this.$refs.new_form.validate();
      if (validate) {
        await this.createComposition(this.create_composition);
        this.$refs.new_form.reset();
        this.new_dialog = false;
      }
    },
    async update() {
      const edit_validate = this.$refs.edit_form.validate();
      const {catalogGroupId, id, name, description} = this.edit_composition;
      if (edit_validate) {
        const item = {catalogGroupId, id, name, description};
        await this.updateComposition(item);
        this.edit_dialog = false;
      }
    },
    async deleteItem() {
      await this.deleteComposition({id: this.delete_composition_id, groupId: this.create_composition.catalogGroupId});
      this.delete_dialog = false
    },
    editItem(item) {
      this.edit_composition = {...item};
      this.edit_dialog = true
    },
    getDeleteItem(item) {
      this.delete_composition_id = item.id;
      this.delete_dialog = true;
    },
  },
  async mounted() {
    const catalogGroupId = this.$route.params.id;
    this.create_composition.catalogGroupId = catalogGroupId;
    await this.getCompositionList({page: 0, size: 10, id: catalogGroupId});
  },
}
</script>

<style lang="sass" scoped>

</style>
