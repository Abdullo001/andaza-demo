<template>
  <div>
    <v-card color="#fff" elevation="0" class="rounded-t-lg">
      <v-form>
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="4" md="4">
            <v-text-field
              v-model.trim="filters.composition"
              :label="$t('composition.child.name')"
              outlined
              class="rounded-lg filter"
              hide-details
              dense
              @keydown.enter="filterData"
            />
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <v-combobox
              v-model="filters.createdBy"
              :items="users"
              :search-input.sync="creatorSearch"
              item-text="name"
              item-value="id"
              validate-on-blur
              outlined
              hide-details
              height="44"
              class="rounded-lg filter"
              :return-object="true"
              dense
              :placeholder="$t('forms.calculationsList.creatorPlaceholder')"
              prepend-icon=""
            >
              <template #append>
                <v-icon class="d-inline-block" color="#544B99">
                  mdi-magnify
                </v-icon>
              </template>
            </v-combobox>
          </v-col>

          <v-spacer />
          <v-col cols="12" lg="2" md="2">
            <div class="d-flex justify-end">
              <v-btn
                width="140"
                outlined
                color="#544B99"
                elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click.stop="resetFilters"
              >
                {{ $t("composition.child.reset") }}
              </v-btn>
              <v-btn
                width="140"
                color="#544B99"
                dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterData"
              >
                {{ $t("composition.child.search") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items-per-page="itemPrePage"
      :items="composition_list"
      :loading="loading"
      :options.sync="options"
      :server-items-length="totalElements"
      :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
      }"
      class="mt-4 rounded-lg"
      @update:page="page"
      @update:items-per-page="size"
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="d-flex justify-space-between w-full">
            <div class="font-weight-medium text-capitalize">
              {{ $t("composition.dialog.menuName") }}
            </div>
            <v-btn
              color="#544B99"
              class="rounded-lg text-capitalize"
              dark
              @click="new_dialog = true"
            >
              <v-icon>mdi-plus</v-icon>
              {{ $t("composition.dialog.addMainName") }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
        <v-divider />
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex justify-center">
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22" />
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27" />
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("composition.dialog.enterMainName") }}
          </div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{ $t("composition.dialog.name") }}</div>
                <v-text-field
                  v-model="create_composition.name"
                  outlined
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  :placeholder="$t('composition.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">
                  {{ $t("composition.dialog.description") }}
                </div>
                <v-textarea
                  v-model="create_composition.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('composition.dialog.descriptionPlacholder')"
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="new_dialog = false"
          >
            {{ $t("composition.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="save"
          >
            {{ $t("composition.dialog.createBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">
            {{ $t("composition.dialog.editDialog") }}
          </div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12">
                <div class="label">{{ $t("composition.dialog.name") }}</div>
                <v-text-field
                  v-model="edit_composition.name"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  height="44"
                  :placeholder="$t('composition.dialog.enterMainName')"
                  dense
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12">
                <div class="label">
                  {{ $t("composition.dialog.description") }}
                </div>
                <v-textarea
                  v-model="edit_composition.description"
                  outlined
                  hide-details
                  class="rounded-lg base"
                  :placeholder="$t('composition.dialog.descriptionPlacholder')"
                  dense
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined
            color="#544B99"
            width="163"
            @click="edit_dialog = false"
          >
            {{ $t("composition.dialog.cancelBtn") }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#544B99"
            dark
            width="163"
            @click="update"
          >
            {{ $t("update") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center">
          {{ $t("composition.dialog.deleteDialog") }}
        </v-card-title>
        <v-card-text>
          {{ $t("composition.dialog.deleteText") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t("composition.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="deleteSample"
          >
            {{ $t("composition.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "compositionPages",
  data() {
    return {
      creatorSearch: "",
      edit_dialog: false,
      delete_dialog: false,
      new_dialog: false,
      itemPrePage: 10,
      current_page: 0,
      options: {},
      headers: [
        {
          text: this.$t("composition.table.id"),
          value: "id",
          align: "start",
          sortable: false,
          width: "100",
        },
        { text: this.$t("composition.table.name"), value: "name" },
        {
          text: this.$t("composition.table.description"),
          value: "description",
        },
        {
          text: this.$t("composition.table.created"),
          value: "createdAt",
        },
        {
          text: this.$t("composition.table.createdBy"),
          value: "createdBy",
        },
        {
          text: this.$t("composition.table.actions"),
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      create_composition: {
        name: "",
        description: "",
      },
      edit_composition: {
        name: "",
        description: "",
      },
      delete_sample: {},
      filters: {
        id: "",
        name: "",
        createdBy: "",
        createdAt: "",
      },
      users: [],
    };
  },
  watch: {
    usersList(list) {
      list.map((item) => {
        this.users.push({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        });
      });
    },
  },
  async created() {
    await this.getCompositionList({ page: 0, size: 10 });
    this.getUsersList();
  },
  computed: {
    ...mapGetters({
      loading: "composition/loading",
      composition_list: "composition/composition_list",
      totalElements: "composition/totalElements",
      usersList: "orders/usersList",
    }),
  },
  methods: {
    ...mapActions({
      getCompositionList: "composition/getCompositionList",
      createComposition: "composition/createComposition",
      updateComposition: "composition/updateComposition",
      deleteComposition: "composition/deleteComposition",
      filterCompositionData: "composition/filterCompositionData",
      getUsersList: "orders/getUsersList",
    }),
    async size(val) {
      this.itemPrePage = val;
      await this.getCompositionList({
        page: 0,
        size: this.itemPrePage,
      });
    },
    async page(val) {
      this.current_page = val - 1;
      await this.getCompositionList({
        page: this.current_page,
        size: this.itemPrePage,
      });
    },
    async deleteSample() {
      const id = this.delete_sample.id;
      await this.deleteComposition({ id });
      this.delete_dialog = false;
    },
    async save() {
      const items = { ...this.create_composition };
      await this.createComposition(items);
      this.create_composition = {
        name: "",
        description: "",
      };
      this.new_dialog = false;
    },
    async update() {
      const items = { ...this.edit_composition };
      await this.updateComposition(items);
      this.edit_dialog = false;
    },
    async getDeleteItem(item) {
      this.delete_sample = { ...item };
      this.delete_dialog = true;
    },
    editItem(item) {
      this.edit_composition = { ...item };
      this.edit_dialog = true;
    },
    async resetFilters() {
      this.filters = {
        id: "",
        name: "",
        createdBy: "",
        createdAt: "",
      };
      await this.getCompositionList({ page: 0, size: 10 });
    },
    async filterData() {
      await this.getCompositionList({
        page: 0,
        size: 10,
        composition: this.filters.composition,
        createdBy: this.filters.createdBy.id,
      });
    },
  },
  mounted() {
    this.$store.commit("setPageTitle", this.$t("sidebar.catalog"));
  },
};
</script>

<style lang="scss">
.el-input__inner::placeholder,
.el-input__icon,
.el-icon-time {
  color: #919191 !important;
}
</style>
