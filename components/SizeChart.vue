<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allSizeChart"
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
            <div class="text-capitalize title mr-6">size chart</div>
            <v-menu
              :nudge-bottom="40"
              origin="center center"
              transition="slide-x-transition"
              :close-on-content-click="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  class="rounded-lg text-none"
                  color="#777C85"
                  height="36"
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!!allSizeChart.length"
                >
                  Size template
                </v-btn>
              </template>

              <v-list rounded>
                <v-text-field
                  placeholder="Enter size template"
                  outlined
                  class="rounded-lg mx-3"
                  color="#D2D3D6"
                  dense hide-details
                  @click.stop
                />
                <v-list-item-group class="mt-4">
                  <v-list-item
                    v-for="(item, i) in sizeTemplate" :key="`items_${i}`" @click="getTemplate(item)">
                    <v-list-item-title v-html="item" class="pointer"/>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>

            <v-spacer/>
            <v-btn
              class="rounded-lg text-capitalize"
              color="#7631FF"
              width="160" height="36"
              @click="newDialog"
              dark
            >
              <v-icon>mdi-plus</v-icon>
              size chart
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-divider/>
    <v-dialog v-model="new_dialog" max-width="1000">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between w-full">
          <div class="title">New chart size</div>
          <v-btn icon large color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-6">
          <v-form lazy-validation ref="new_validate">
            <v-row>
              <v-col
                v-for="(el, idx) in headFields"
                :key="`forms_${idx}`"
                cols="12"
                lg="4"
              >
                <v-text-field
                  :label="el.text"
                  filled dense
                  validate-on-blur
                  v-model="new_chart[el.value]"
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pb-6">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#7631FF"
            width="140" height="40"
            @click="new_dialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#7631FF" dark
            width="140" height="40"
            @click="saveChart"
          >
            save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'SizeChartComponent',
  data() {
    return {
      new_chart: {},
      currentTemplate: [],
      headers: [
        {text: '№', align: 'start', sortable: false, value: 'id'},
        {text: 'Code', sortable: false, value: 'code'},
        {text: 'Size name', sortable: false, value: 'sizeName'},
        {text: 'Deviation', sortable: false, value: 'deviation'},
        {text: 'Shrinkage', sortable: false, value: 'shrinkagePercent'},
        {text: 'Gradation', sortable: false, value: 'gradation'},
        {text: 'Comment', sortable: false, value: 'description'},
        {text: 'Creator', sortable: false, value: 'createdBy'},
        {text: 'Date', sortable: false, value: 'updatedAt'},
        {text: 'Actions', sortable: false, value: 'actions'},
      ],

      sizeChartDialog: false,
      new_dialog: false,
      templateStatus: null,
      allSizeChart: [],
      headFields: []
    }
  },

  computed: {
    ...mapGetters({
      sizeTemplate: "sizeChart/sizeTemplate",
      chartSizes: "sizeChart/chartSizes",
      newModelId: "models/newModelId"
    })
  },
  watch: {
    headers(val) {
      let data = [...val];
      data.shift();
      data = data.slice(0, -3);
      this.headFields = data;
    },
    chartSizes(val) {
      if (this.headers.length <= 10) {
        val[0]?.sizeTemplateSizeValues.forEach((el) => {
          const res = {text: el.name, sortable: false, value: el.name.toUpperCase()};
          this.headers.splice(3, 0, res);
        });
        let arr = [...this.headers]
        arr = arr.slice(0, 3)
          .concat(arr.slice(3, -7).reverse())
          .concat(arr.slice(-7));
        this.headers = arr
      }
      val.forEach((item) => {
        let oldObject = {...item};
        delete oldObject?.sizeTemplateSizeValues

        item?.sizeTemplateSizeValues.forEach(elem => {
          oldObject[elem.name] = elem.size
        })
        this.allSizeChart.push(oldObject);
      })
    },

  },
  methods: {
    ...mapActions({
      getChartSizes: 'sizeChart/getChartSizes',
      getSizeTemplate: 'sizeChart/getSizeTemplate',
      createSizeChart: 'sizeChart/createSizeChart'
    }),
    async saveChart() {
      let data = {...this.new_chart};
      const id = this.$route.params.id;
      if (id === 'add-model') {
        data.modelId = this.newModelId
      } else {
        data.modelId = id
      }
      await this.createSizeChart(data);
      this.new_dialog = false;
      this.$refs.new_validate.reset();
    },
    getTemplate(item) {
      const first = this.headers.slice(0, 3);
      const last = this.headers.slice(-7);
      this.headers = [...first, ...last];

      item = item.split(',');
      this.currentTemplate = item;
      item.forEach((el, idx) => {
        idx = idx + 3
        let head = {
          text: el.toUpperCase().trim(),
          sortable: false,
          value: el.toUpperCase().trim()
        }
        this.headers.splice(idx, 0, head)
      })
    },
    editSizeChart() {
    },
    deleteSizeChart() {
    },
    newDialog() {
      this.new_dialog = true;
    }
  },
  async mounted() {
    await this.getSizeTemplate()
    const id = this.$route.params.id;
    if (id !== 'add-model') {
      await this.getChartSizes(id);
      this.templateStatus = true
    } else {
      this.templateStatus = false
    }
    let data = [...this.headers];
    data.shift();
    data = data.slice(0, -3);
    this.headFields = data;
  }
}
</script>

<style lang="scss">
.v-list-item.primary--text {
  color: #7631FF !important;

  &:after {
    content: '✔';
    display: inline-block;
  }
}

.v-list-item-group .v-list-item--active {
  color: #7631FF;
}
</style>
