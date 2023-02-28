<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allSamples"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >
      <template #item.actions="{item}">
        <div>
          <v-btn icon class="mr-2" @click="editSizeChart(item)">
            <v-img src="/edit-green.svg" max-width="20"/>
          </v-btn>
          <v-btn icon @click="deleteSizeChart(item)">
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
              color="#7631FF"
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
    </v-data-table>
    <v-dialog max-width="900" v-model="new_dialog">
      <v-card>
        <v-card-title class="d-flex w-full justify-space-between">
          <div class="text-capitalize title">add samples</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-6">
          <v-form lazy-validation ref="ref_valid" v-model="new_valid">
            <v-row>
              <v-col cols="12" lg="6">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2">Purpose</div>
                <v-select
                  outlined
                  placeholder="Select purpose"
                  class="rounded-lg"
                  dense validate-on-blur
                  :items="purposesEnums"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  v-model="new_samples.samplePurposeId"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2"> simple send date</div>
                <el-date-picker
                  v-model="new_samples.sentDate"
                  type="datetime"
                  placeholder="Send date"
                  :picker-options="pickerOptions"
                  value-format="dd.MM.yyyy HH:mm:ss"
                  class="printing-date"
                  style="width: 100%; color: #7631FF;"
                >
                </el-date-picker>
              </v-col>
              <v-col cols="12" lg="6">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2">Finished by</div>
                <v-select
                  outlined
                  placeholder="Select partner"
                  class="rounded-lg"
                  dense validate-on-blur
                  :items="purposesEnums"
                  item-text="name"
                  item-value="id"
                  append-icon="mdi-chevron-down"
                  v-model="new_samples.partnerId"
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" lg="6">
                <div class="text-body-1 font-weight-medium text-capitalize mb-2">Result</div>
                <v-select
                  outlined
                  placeholder="Select result"
                  class="rounded-lg"
                  dense validate-on-blur
                  :items="result_enum"
                  append-icon="mdi-chevron-down"
                  v-model="new_samples.result"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#7631FF"
            width="140" height="40"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      new_samples: {
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
        {text: 'Purpose', align: 'start', sortable: false, value: 'purpose'},
        {text: 'Sent date', sortable: false, value: 'sentDate'},
        {text: 'Finished by', sortable: false, value: 'finishedBy'},
        {text: 'Result', sortable: false, value: 'result'},
        {text: 'Creator', sortable: false, value: 'createdBy'},
        {text: 'Date', sortable: false, value: 'updatedAt'},
        {text: 'Actions', sortable: false, value: 'actions'},
      ],
      allSamples: [],
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
      result_enum: ['OK', 'NG']
    }
  },
  created() {
    this.getPurposesEnums();
  },
  computed: {
    ...mapGetters({
      purposesEnums: "samples/purposesEnums"
    })
  },
  methods: {
    ...mapActions({
      getSamplesList: "samples/getSamplesList",
      createSamples: "samples/createSamples",
      getPurposesEnums: "samples/getPurposesEnums"
    })
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getSamplesList(id);
  }
}
</script>

