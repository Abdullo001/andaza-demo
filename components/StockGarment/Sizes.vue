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
            <div class="title mr-6">{{ $t('readyWarehouse.measurementList.title') }}</div>
            <v-menu
              :nudge-bottom="40"
              origin="center center"
              transition="slide-x-transition"
              :close-on-content-click="true"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  class="rounded-lg text-none white--text"
                  color="#544B99"
                  height="36"
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!!allSizeChart.length"
                >
                {{ $t('readyWarehouse.measurementList.sizeTemplate') }}
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
              color="#544B99"
              width="160" height="36"
              @click="newDialog"
              dark
            >
              <v-icon>mdi-plus</v-icon>
             {{ $t('readyWarehouse.measurementList.sizeChart') }}
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.shrinkagePercent="{item}">
        <div>{{ item.shrinkagePercent }} %</div>
      </template>
    </v-data-table>
    <v-divider/>
    <v-dialog v-model="new_dialog" max-width="1000">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between w-full">
          <div class="title">{{ $t('readyWarehouse.measurementList.title') }}</div>
          <v-btn icon large color="#544B99" @click="new_dialog = false">
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
                <div class="label">{{ el.text }}</div>
                <v-text-field
                  outlined
                  height="44"
                  dense
                  class="rounded-lg base"
                  validate-on-blur
                  :placeholder="`Enter  ${el.text}`"
                  v-model="new_chart[el.value]"
                  color="#544B99"
                  :suffix="el.text === 'Shrinkage'?'%':null"
                >
                  <template #prepend-inner>
                    <v-img
                      v-if="el.text === 'Tolerance'"
                      src="/plus-minus.svg"
                      width="12"
                      class="mt-1 custom-icon"
                    />
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pb-6">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="new_dialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="saveChart"
          >
            save
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" max-width="1000">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between w-full">
          <div class="title">Edit measurement items</div>
          <v-btn icon large color="#544B99" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-6">
          <v-form lazy-validation ref="edit_validate">
            <v-row>
              <v-col
                v-for="(el, idx) in headFields"
                :key="`forms_edit${idx}`"
                cols="12"
                lg="4"
              >
                <div class="label">{{ el.text }}</div>
                <v-text-field
                  hide-details
                  height="44"
                  class="rounded-lg base"
                  outlined dense
                  validate-on-blur
                  :placeholder="`Enter ${el.text}`"
                  v-model="edit_chart[el.value]"
                  color="#544B99"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pb-6">
          <v-spacer/>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg border"
            outlined color="#544B99"
            width="140" height="40"
            @click="edit_dialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="font-weight-bold text-capitalize rounded-lg ml-4"
            color="#544B99" dark
            width="140" height="40"
            @click="editChart"
          >
            {{ $t('update') }}
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete size chart row</v-card-title>
        <v-card-text>
          Are you sure you want to Delete size chart row?
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
            dark @click="deleteChart"
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
  name: 'SizeChartComponent',
  data() {
    return {
      new_chart: {
        code: '',
        sizeName: '',
        gradation: '',
        deviation: '',
        shrinkagePercent: '',
        description: '',
      },
      currentTemplate: [],
      headers: [
        {text:this.$t('readyWarehouse.measurementList.no'), align: 'start', sortable: false, value: 'id'},
        {text:this.$t('readyWarehouse.measurementList.code'), sortable: false, value: 'code'},
        {text: this.$t('readyWarehouse.measurementList.sizeName'), sortable: false, value: 'sizeName'},
        {text: this.$t('readyWarehouse.measurementList.gradation'), sortable: false, value: 'gradation'},
        {text:this.$t('readyWarehouse.measurementList.tolerance'), sortable: false, value: 'deviation'},
        {text: this.$t('readyWarehouse.measurementList.shrinkage'), sortable: false, value: 'shrinkagePercent'},
        {text: this.$t('readyWarehouse.measurementList.comment'), sortable: false, value: 'description'},
        {text:this.$t('readyWarehouse.measurementList.creator'), sortable: false, value: 'createdBy'},
        {text: this.$t('readyWarehouse.measurementList.date'), sortable: false, value: 'updatedAt'},
        {text: this.$t('readyWarehouse.measurementList.actions'), sortable: false, value: 'actions'},
      ],
      sizeChartDialog: false,
      new_dialog: false,
      templateStatus: null,
      allSizeChart: [],
      headFields: [],
      delete_dialog: false,
      selectedChart: {},
      edit_dialog: false,
      edit_chart: {},
      selected_sizes: []
    }
  },

  computed: {
    ...mapGetters({
      sizeTemplate: "sizeChart/sizeTemplate",
      chartSizes: "sizeChart/stockList",
      stockId: "garmentStock/stockId"
    })
  },
  watch: {
    
    new_chart: {
      handler(val) {
      }, deep: true
    },
    headers(val) {
      let data = [...val];
      data.shift();
      data = data.slice(0, -3);
      this.headFields = data;
    },
    chartSizes(val) {
      if (this.headers.length <= 10) {
        val[0]?.sizeTemplateSizeValues.forEach((el, idx) => {
          const res = {text: el.name, sortable: false, value: el.name.toUpperCase()};
          this.headers.splice(idx+4, 0, res)
        });
        let arr = [...this.headers];
        this.headers = arr
      }
      this.allSizeChart = [];
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
      getChartSizes: 'sizeChart/getStockSizeList',
      getSizeTemplate: 'sizeChart/getSizeTemplate',
      createSizeChart: 'sizeChart/createSizeChart',
      deleteOneSizeChart: 'sizeChart/deleteOneSizeChart',
      updateChartSizes: 'sizeChart/updateChartSizes',
    }),
    // uploadFile() {
    //   this.$refs.getFile.$el.querySelector('input').click();
    // },
    async saveChart() {
      let data = {...this.new_chart};
      data.stockId = this.uid
      
      for (let item in data){
        if(data[item]==="" || data[item]===null){
          data[item]=0
        }
      }
      if(data.code==="" || data.code===null || data.code===0){
        data.code=""
      }
      if(data.description==="" || data.description===null || data.description===0){
        data.description=""
      }
      if(data.sizeName==="" || data.sizeName===null || data.sizeName===0){
        data.sizeName=""
      }
      await this.createSizeChart(data);
      this.new_dialog = false;
      this.$refs.new_validate.reset();
    },
    getTemplate(item) {
      const first = this.headers.slice(0, 4);
      const last = this.headers.slice(-6);
      this.headers = [...first, ...last];
      item = item.split(',');
      this.currentTemplate = item;
      item.forEach((el, idx) => {
        idx = idx + 4;
        let head = {
          text: el.toUpperCase().trim(),
          sortable: false,
          value: el.toLowerCase().trim()
        }
        this.selected_sizes.push(head);
        this.headers.splice(idx, 0, head)
      })
    },
    editSizeChart(item) {
      this.edit_dialog = true;
      this.edit_chart = {...item}
    },
    async editChart() {
      await this.updateChartSizes(this.edit_chart);
      this.edit_dialog = false
    },
    deleteSizeChart(item) {
      this.selectedChart = item;
      this.delete_dialog = true;
    },
    async deleteChart() {
      await this.deleteOneSizeChart({
        chartId: this.selectedChart.id,
        stockId: this.selectedChart.stockId
      });
      this.delete_dialog = false
    },
    newDialog() {
      this.new_dialog = true;
      this.headFields.forEach(elem => {
        this.new_chart[elem.value] = ''
      });
    }
  },
  async mounted() {
    await this.getSizeTemplate()
    const id = this.$route.params.id;
    if (id !== 'add-garment') {
      await this.getChartSizes(id);
      this.uid=id
      this.templateStatus = true
    } else {
      this.templateStatus = false
      this.uid=this.stockId.id

    }
    let data = [...this.headers];
    data.shift();
    data = data.slice(0, -3);
    this.headFields = data;
  }
}
</script>

<style lang="scss">
.present {
  font-size: 20px;
  margin-top: 2px;
}

.v-list-item.primary--text {
  color: #544B99 !important;

  &:after {
    content: '✔';
    display: inline-block;
  }
}

.v-list-item-group .v-list-item--active {
  color: #544B99;
}
.v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__prepend-outer, .v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__prepend-inner, .v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__append-inner, .v-text-field--full-width.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__append-outer, .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__prepend-outer, .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__prepend-inner, .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__append-inner, .v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--outlined .v-input__append-outer {
  margin-top: 6px;
}
</style>
