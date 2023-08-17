<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_key" ref="search_key">
        <v-row class="mx-0 px-0 mb-4 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="3" md="3" class="py-0">
            <v-text-field
              :label="$t('localization.dialog.key')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filter.key"
              hide-details
              dense
              clearable
              @keyup.enter="filterLocalize"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3" class="py-0">
            <v-text-field
              :label="$t('localization.dialog.message')"
              outlined
              class="rounded-lg filter"
              v-model.trim="filter.message"
              hide-details
              dense
              clearable
              @keyup.enter="filterLocalize"
              color="#7631FF"
            />
          </v-col>
          <v-spacer/>
          <v-col class="py-0" cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="resetFilters"
              >
                {{ $t('localization.dialog.reset') }}
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
                @click="filterLocalize"
              >
                {{ $t('localization.dialog.search') }}
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
        :no-data-text="$t('noDataText')"
        @update:items-per-page="getItemSize"
        @update:page="page"
        :footer-props="{
          itemsPerPageOptions: [10, 20, 50, 100],
          itemsPerPageText: this.$t('allDataTableText')
        }"
        :server-items-length="totalElements"
        :options.sync="options"
      >
        <template #top>
          <v-toolbar elevation="0" class="rounded-lg">
            <v-toolbar-title class="d-flex justify-space-between align-center w-full">
              <div>{{ $t('localization.dialog.localization') }}</div>
              <v-btn
                color="#7631FF" elevation="0"
                class="rounded-lg text-capitalize"
                dark @click="new_dialog = true"
              >
                <v-icon>mdi-plus</v-icon>
                {{ $t('localization.dialog.localization') }}
              </v-btn>
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template #item.actions="{item}">
          <v-btn icon color="green" @click.stop="editItem(item)">
            <v-img src="/edit-active.svg" max-width="22"/>
          </v-btn>
          <v-btn icon color="red" @click.stop="getDeleteItem(item)">
            <v-img src="/delete.svg" max-width="27"/>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ $t('localization.dialog.addLocalization') }}</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation v-model="new_valid" ref="new_form">
            <div class="label">{{ $t('localization.dialog.key') }}</div>
            <v-text-field
              outlined
              color="#7631FF"
              class="rounded-lg base"
              height="44"
              :placeholder="$t('localization.dialog.placeholderKey')"
              v-model="new_localization.key"
              :rules="[formRules.required]"
              dense
            />
            <div class="label">UZ</div>
            <v-textarea
              rows="2"
              auto-grow
              outlined
              color="#7631FF"
              class="rounded-lg base"
              :placeholder="$t('localization.dialog.messageContent')"
              v-model="new_localization.messageUz"
              :rules="[formRules.required]"
              dense
            />
            <div class="label">RU</div>
            <v-textarea
              rows="2"
              auto-grow
              outlined
              color="#7631FF"
              class="rounded-lg base"
              :placeholder="$t('localization.dialog.messageContent')"
              v-model="new_localization.messageRu"
              :rules="[formRules.required]"
              dense
            />
            <div class="label">EN</div>
            <v-textarea
              rows="2"
              auto-grow
              outlined
              color="#7631FF"
              class="rounded-lg base"
              :placeholder="$t('localization.dialog.messageContent')"
              v-model="new_localization.messageEn"
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
            {{ $t('localization.dialog.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="newLocalization"
          >
            {{ $t('localization.dialog.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">{{ $t('localization.dialog.editLocalization') }}</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form lazy-validation v-model="edit_valid" ref="edit_form">
            <div class="label">{{$t('localization.dialog.key')}}</div>
            <v-text-field
              height="44px"
              outlined
              color="#7631FF"
              class="rounded-lg base"
              :placeholder="$t('localization.dialog.key')"
              v-model="edit_localization.key"
              :rules="[formRules.required]"
              dense
            />
            <div class="label">{{ $t('localization.dialog.language') }}</div>
            <v-text-field
              height="44px"
              outlined
              color="#7631FF"
              class="rounded-lg base"
              :placeholder="$t('localization.dialog.messageContent')"
              v-model="edit_localization.lang"
              :rules="[formRules.required]"
              dense
            />
            <div class="label">{{ $t('localization.dialog.message') }}</div>
            <v-textarea
              outlined
              color="#7631FF"
              class="rounded-lg base"
              :placeholder="$t('localization.dialog.messageContent')"
              v-model="edit_localization.message"
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
            {{ $t('localization.dialog.cancel') }}
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
            @click="saveLocalization"
          >
            {{ $t('update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">{{ $t('localization.dialog.deleteDilaog') }}</v-card-title>
        <v-card-text>
          {{ $t('localization.dialog.deletetext') }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            {{ $t('localization.dialog.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark @click="deleteItem()"
          >
            {{ $t('localization.dialog.delete') }}
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
      options: {},
      new_dialog: false,
      edit_dialog: false,
      new_valid: true,
      edit_valid: true,
      valid_key: true,
      delete_dialog: false,
      filter: {
        key: '',
        message: ''
      },
      headers: [
        {text: 'ID', align: 'start', sortable: false, value: 'id', width: 50},
        {text: this.$t('localization.table.lang'), value: 'lang', width: 80},
        {text: this.$t('localization.table.key'), value: 'key', width: 150},
        {text: this.$t('localization.table.message'), value: 'message', width: 500},
        {text: this.$t('localization.table.updatedAt'), value: 'updatedAt', width: 128},
        {text: this.$t('localization.table.actions'), sortable: false, align: "center", value: 'actions', width: 120},
      ],
      new_localization: {
        key: '',
        messageUz: '',
        messageRu: '',
        messageEn: ''
      },
      edit_localization: {
        key: '',
        message: '',
        lang: '',
        id: ''
      },
      itemPerPage: 10,
      current_page: 0,
      delete_item: {}
    }
  },
  created() {
    this.$store.dispatch('localization/getLocalization', {
      page: 0,
      size: 10,
      key: '',
      message: ''
    })
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi()
      },
      deep: true,
    }
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
      getLocalization: 'localization/getLocalization',
      updateLocalization: 'localization/updateLocalization',
      createLocalization: 'localization/createLocalization',
      deleteLocalization: 'localization/deleteLocalization',
      filterLocalization: 'localization/filterLocalization'
    }),
    getDataFromApi() {
      return new Promise((resolve, reject) => {
        const {sortBy, sortDesc, page, itemsPerPage} = this.options
        // this.sortUser({sortBy: sortBy, sortDesc: sortDesc})
      })
    },
    async saveLocalization() {
      const valid = this.$refs.edit_form.validate();
      if (valid) {
        const data = {...this.edit_localization};
        ['updatedAt', 'createdAt'].forEach(el => delete data[el])
        await this.updateLocalization({
          page: this.current_page,
          size: this.itemPerPage,
          key: this.filter.key,
          message: this.filter.message,
          data,
        })
        this.edit_dialog = false
      }
    },
    async resetFilters() {
      this.$refs.search_key.reset();
      await this.getLocalization({
        page: 0,
        size: 10,
        key: '',
        message: ''
      })
    },
    async getItemSize(val) {
      this.itemPerPage = val;
      await this.getLocalization({
        page: this.current_page,
        size: this.itemPerPage,
        key: this.filter.key,
        message: this.filter.message
      })
    },
    async page(val) {
      // arrows < > value page
      this.current_page = val - 1
      await this.getLocalization({
        page: this.current_page,
        size: this.itemPerPage,
        key: this.filter.key,
        message: this.filter.message
      })
    },
    async newLocalization() {
      const valid = this.$refs.new_form.validate();
      if (valid) {
        await this.createLocalization({
          data: this.new_localization,
          size: this.itemPerPage,
          page: this.current_page
        });
        this.new_dialog = !this.new_dialog;
        this.$refs.new_form.reset();
      }
    },
    filterLocalize() {
      const data = {...this.filter};
      this.filterLocalization({key: data.key, message: data.message})
    },
    editItem(item) {
      this.edit_localization = {...item}
      this.edit_dialog = true
    },
    getDeleteItem(item) {
      this.delete_item = item;
      this.delete_dialog = true
    },
    async deleteItem() {
      await this.deleteLocalization({
        page: this.current_page,
        size: this.itemPerPage,
        id: this.delete_item.id
      })
      this.delete_dialog = false
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', this.$t('localization.dialog.localization'));
  }
}
</script>

<style scoped>

</style>
