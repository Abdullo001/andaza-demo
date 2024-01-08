<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="samplesList"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >
      <template #item.actions="{item}">
        <div>
          <v-btn icon class="mr-2" @click="editSamples(item)">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="removeSamples(item)">
            <v-img src="/trash-red.svg" max-width="20"/>
          </v-btn>
        </div>
      </template>
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title class="w-full d-flex">
            <div class="text-capitalize title mr-6">Samples</div>
            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#544B99"
              width="160" height="36"
              @click="new_dialog = true"
              dark
            >
              <v-icon>mdi-plus</v-icon>
              add row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.result="{item}">
        <div :class="checkResult(item.result)">{{item.result}}</div>
      </template>
    </v-data-table>
    <v-dialog max-width="900" v-model="new_dialog">
      <v-card>
        <v-card-title class="d-flex w-full justify-space-between">
          <div class="text-capitalize title">add samples</div>
          <v-btn icon color="#544B99" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-6">
          <v-form lazy-validation ref="ref_valid" v-model="new_valid">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label text-capitalize">Purpose</div>
                <v-select
                  outlined
                  placeholder="Select purpose"
                  class="rounded-lg base"
                  hide-details
                  height="44"
                  dense validate-on-blur
                  :items="purposesEnums"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  v-model="new_samples.samplePurposeId"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label text-capitalize"> simple send date</div>
                <el-date-picker
                  v-model="new_samples.sentDate"
                  type="datetime"
                  placeholder="Send date"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                  style="width: 100%; color: #544B99; height: 44px !important;"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <div class="label text-capitalize">Finished by</div>
                <v-select
                  outlined
                  placeholder="Select partner"
                  class="rounded-lg base"
                  hide-details
                  height="44"
                  dense validate-on-blur
                  :items="partner_enums"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  v-model="new_samples.partnerId"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <div class="label text-capitalize">Result</div>
                <v-select
                  outlined
                  placeholder="Select result"
                  class="rounded-lg base"
                  hide-details
                  height="44"
                  dense validate-on-blur
                  :items="result_enum"
                  append-icon="mdi-chevron-down"
                  v-model="new_samples.result"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="saveSamples"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="900" v-model="edit_dialog">
      <v-card>
        <v-card-title class="d-flex w-full justify-space-between">
          <div class="text-capitalize title">Edit samples</div>
          <v-btn icon color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-6">
          <v-form lazy-validation ref="ref_valid" v-model="new_valid">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="label text-capitalize">Purpose</div>
                <v-select
                  outlined
                  placeholder="Select purpose"
                  class="rounded-lg base"
                  hide-details
                  height="44"
                  dense validate-on-blur
                  :items="purposesEnums"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  v-model="edit_samples.samplePurposeId"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="label text-capitalize"> simple send date</div>
                <el-date-picker
                  v-model="edit_samples.sentDate"
                  type="datetime"
                  placeholder="Send date"
                  :picker-options="pickerShortcuts"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="base_picker"
                  style="width: 100%; color: #544B99; height: 44px"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <div class="label text-capitalize">Finished by</div>
                <v-select
                  outlined
                  placeholder="Select partner"
                  class="rounded-lg base"
                  hide-details
                  height="44"
                  dense validate-on-blur
                  :items="partner_enums"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  v-model="edit_samples.partnerId"
                  color="#544B99"
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <div class="label text-capitalize">Result</div>
                <v-select
                  outlined
                  placeholder="Select result"
                  class="rounded-lg base"
                  hide-details
                  height="44"
                  dense validate-on-blur
                  :items="result_enum"
                  append-icon="mdi-chevron-down"
                  v-model="edit_samples.result"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="saveSamplesChanges"
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
        <v-card-title class="d-flex justify-center">Delete Sample</v-card-title>
        <v-card-text>
          Are you sure you want to Delete samples row ?
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
            dark @click="deleteSamplesRow"
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
  name: "SamplesComponent",
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      new_samples: {
        modelId: '',
        partnerId: null,
        result: '',
        samplePurposeId: '',
        sentDate: '',
      },
      edit_samples: {
        id: '',
        modelId: '',
        partnerId: null,
        result: '',
        samplePurposeId: '',
        sentDate: '',
      },
      new_valid: true,
      new_dialog: false,
      purpose_enums: [],
      headers: [
        {text: 'Purpose', align: 'start', sortable: false, value: 'samplePurpose'},
        {text: 'Sent date', sortable: false, value: 'sentDate'},
        {text: 'Finished by', sortable: false, value: 'partner'},
        {text: 'Result', sortable: false, value: 'result'},
        {text: 'Creator', sortable: false, value: 'createdBy'},
        {text: 'Date', sortable: false, value: 'updatedAt'},
        {text: 'Actions', sortable: false, value: 'actions'},
      ],
      allSamples: [],
      result_enum: ['OK', 'NG'],
      current_elem: {}
    }
  },
  created() {
    this.getPurposesEnums();
  },
  computed: {
    ...mapGetters({
      purposesEnums: "samples/purposesEnums",
      partner_enums: "models/partner_enums",
      newModelId: "models/newModelId",
      samplesList: "samples/samplesList"
    })
  },
  methods: {
    ...mapActions({
      getSamplesList: "samples/getSamplesList",
      createSamples: "samples/createSamples",
      getPurposesEnums: "samples/getPurposesEnums",
      getPartnerList: "models/getPartnerList",
      deleteSamples: "samples/deleteSamples",
      updateSamples: "samples/updateSamples"
    }),
    checkResult(val) {
      return val === 'OK' ? 'green--text' : 'red--text'
    },
    editSamples(item) {
      let el = this.edit_samples;
      el.id = item.id;
      el.samplePurposeId = item.samplePurposeId;
      el.modelId = item.modelId;
      el.result = item.result;
      el.sentDate = item.sentDate;
      el.partnerId = item.partnerId;
      this.edit_dialog = true;
    },
    removeSamples(item) {
      this.delete_dialog = true;
      this.current_elem = item;
    },
    async saveSamplesChanges() {
      await this.updateSamples(this.edit_samples);
      this.edit_dialog = false;
    },
    async deleteSamplesRow() {
      let id = ''
      const params = this.$route.params.id;
      if(params === 'add-model') {
        id = this.newModelId
      } else id = this.current_elem.modelId;
      await this.deleteSamples({
        modelId: id,
        elemId: this.current_elem.id
      })
    },
    async saveSamples() {
      const param = this.$route.params.id;
      if(param === 'add-model') {
        this.new_samples.modelId = this.newModelId;
      } else this.new_samples.modelId = param;
      await this.createSamples(this.new_samples);
      this.new_dialog = !this.new_dialog;
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if(id !== 'add-model') await this.getSamplesList(id)
    else this.$store.commit('samples/setSamples', [])

  }
}
</script>

