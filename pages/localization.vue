<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_key" ref="search_form">
        <v-row class="mx-0 px-0 mb-4 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="4" md="4" class="py-0">
            <v-text-field
              label="Key"
              outlined
              class="rounded-lg"
              v-model="key"
              hide-details
              dense
              clearable
            />
          </v-col>
          <v-spacer/>
          <v-col class="py-0" cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="keySearch"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-card color="#fff" elevation="0">
      <v-data-table
        :headers="headers"
        :items="allLocalization"
        :items-per-page="10"
        :loading="loading"
        @update:items-per-page="getItemSize"
        @update:page="page"
        :footer-props="{
        itemsPerPageOptions: [10, 20, 50, 100],
        }"
        :server-items-length="totalElements"
      >
        <template #top>
          <v-toolbar elevation="0" class="rounded-lg">
            <v-toolbar-title class="d-flex justify-space-between align-center w-full">
              <div>Localization</div>
              <v-btn
                color="#7631FF" elevation="0"
                class="rounded-lg text-capitalize"
                dark @click="new_dialog = true"
              >
                <v-icon>mdi-plus</v-icon>
                Localization
              </v-btn>
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template #item.actions="{item}">
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-icon size="20">mdi-square-edit-outline</v-icon>
          </v-btn>
          <v-btn icon color="red" @click.stop="delete_dialog = true">
            <v-icon size="20">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">add localization</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation v-model="new_valid" ref="new_form">
            <v-text-field
              filled
              label="Key"
              placeholder="key"
              v-model="new_localization.key"
              :rules="[formRules.required]"
              dense
            />
            <v-text-field
              filled
              label="UZ"
              placeholder="Message content"
              v-model="new_localization.uz"
              :rules="[formRules.required]"
              dense
            />
            <v-text-field
              filled
              label="RU"
              placeholder="Message content"
              v-model="new_localization.ru"
              :rules="[formRules.required]"
              dense
            />
            <v-text-field
              filled
              label="EN"
              placeholder="Message content"
              v-model="new_localization.en"
              :rules="[formRules.required]"
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
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">edit localization</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation v-model="edit_valid" ref="edit_form">
            <v-text-field
              filled
              label="Key"
              placeholder="key"
              v-model="edit_localization.key"
              :rules="[formRules.required]"
              dense
            />
            <v-text-field
              filled
              label="UZ"
              placeholder="Message content"
              v-model="edit_localization.uz"
              :rules="[formRules.required]"
              dense
            />
            <v-text-field
              filled
              label="RU"
              placeholder="Message content"
              v-model="edit_localization.ru"
              :rules="[formRules.required]"
              dense
            />
            <v-text-field
              filled
              label="EN"
              placeholder="Message content"
              v-model="edit_localization.en"
              :rules="[formRules.required]"
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
        <v-card-title class="d-flex justify-center">Delete Localization</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this user information?
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
            dark @click="deleteItem(item)"
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'LocalizationPage',
  data() {
    return {
      new_dialog: false,
      edit_dialog: false,
      new_valid: true,
      edit_valid: true,
      valid_key: true,
      delete_dialog: false,
      key: '',
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id'},
        {text: 'Lang', value: 'lang'},
        {text: 'Key', value: 'key'},
        {text: 'Message', value: 'message', width: 500},
        {text: 'Updated At', value: 'updatedAt'},
        {text: 'Actions', sortable: false, value: 'actions', width: 120},
      ],
      new_localization: {
        key: '',
        uz: '',
        ru: '',
        en: ''
      },
      edit_localization: {
        key: '',
        uz: '',
        ru: '',
        en: ''
      },
      itemPerPage: 10,
      current_page: 0,
    }
  },
  created() {
    this.$store.dispatch('localization/getLocalization', {page: 0, size: 10})
  },
  computed: {
    ...mapGetters({
      allLocalization: 'localization/allLocalization',
      totalElements: 'localization/totalElements',
      loading: 'localization/loading'
    })
  },
  methods: {
    ...mapActions({
      getLocalization: 'localization/getLocalization'
    }),
    getItemSize(val) {
      this.itemPerPage = val;
      this.getLocalization({page: this.current_page, size: this.itemPerPage})
    },
    page(val) {
      // arrows < > value page
      this.current_page = val - 1
      this.getLocalization({page: this.current_page, size: this.itemPerPage})

    },
    keySearch() {},
    editItem(item) {
      this.edit_localization = {...item}
      this.edit_dialog = true
    },
    deleteItem(item) {}
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Localization');
  }
}
</script>

<style scoped>

</style>
