<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="sizeChartList"
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
                >
                  Size template
                </v-btn>
              </template>

              <v-list>
                <v-text-field
                  placeholder="Enter size template"
                  outlined
                  class="rounded-lg mx-3"
                  color="#D2D3D6"
                  dense hide-details
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
              Add row
            </v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-divider/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'SizeChartComponent',
  data() {
    return {
      items: [],
      headers: [
        { text: '№', align: 'start', sortable: false, value: 'id' },
        { text: 'Code', sortable: false, value: 'code' },
        { text: 'Size name', sortable: false,  value: 'sizeName' },

        { text: 'Tolerance', sortable: false,  value: 'tolerance' },
        { text: 'Shrinkage', sortable: false,  value: 'shrinkage' },
        { text: 'Gradation',  sortable: false, value: 'gradation' },
        { text: 'Comment', sortable: false,  value: 'comment' },
        { text: 'Creator',  sortable: false, value: 'creator' },
        { text: 'Date',  sortable: false, value: 'date' },
        { text: 'Actions', sortable: false,  value: 'actions' },
      ],
      sizeChartList: [
        {
          id: 1,
          code: 'A',
          sizeName: 'Back full length',
          s: '41.5',
          m: '43.0',
          l: '44.5',
          x: '45',
          xl: '46.0',
          xxl: '48.0',
          tolerance: '-0.2',
          shrinkage: '5%',
          gradation: '1.5',
          comment: 'Women sleepwear upper part',
          creator: 'Aziza Azimova',
          date: '12.10.2022'
        },
        {
          id: 2,
          code: 'B',
          sizeName: 'Back full length',
          s: '41.5',
          m: '43.0',
          l: '44.5',
          xl: '46.0',
          xxl: '48.0',
          tolerance: '+0.2',
          shrinkage: '5%',
          gradation: '1.5',
          comment: 'Women sleepwear upper part',
          creator: 'Aziza Azim ova',
          date: '12.10.2022'
        },
      ],
      sizeChartDialog: false,
    }
  },

  computed: {
    ...mapGetters({
      sizeTemplate: "sizeChart/sizeTemplate"
    })
  },
  methods: {
    ...mapActions({
      getChartSizes: 'sizeChart/getChartSizes',
      getSizeTemplate: 'sizeChart/getSizeTemplate'
    }),
    getTemplate(item) {
      const first = this.headers.slice(0,3);
      const last = this.headers.slice(-7);
      this.headers = [...first, ...last];

      item = item.split(',');
      item.forEach((el, idx) => {
        idx = idx + 3
        let head =  {
          text: el.toUpperCase().trim(),
          sortable: false,
          value: el.toLowerCase().trim()
        }
        this.headers.splice(idx, 0, head)
      })
    },
    editSizeChart() {},
    deleteSizeChart() {},
    newDialog() {
      console.log('hello')
    }
  },
  async mounted() {
    await this.getSizeTemplate()
    const id = this.$route.params.id;
    if(id !== 'add-model') {
      await this.getChartSizes(id);
    }
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
