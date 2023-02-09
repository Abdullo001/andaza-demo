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
            <v-btn
              outlined
              class="rounded-lg text-none"
              color="#777C85"
            >
              Size template
            </v-btn>
            <v-btn
              outlined
              class="rounded-lg ml-4 text-none"
              color="#777C85"
            >
              Add new size row
            </v-btn>
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
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'SizeChartComponent',
  data() {
    return {
      headers: [
        { text: '№', align: 'start', sortable: false, value: 'id' },
        { text: 'Code', value: 'code' },
        { text: 'Size name', value: 'sizeName' },
        { text: 'S', value: 's' },
        { text: 'M', value: 'm' },
        { text: 'L', value: 'l' },
        { text: 'XL', value: 'xl' },
        { text: 'XXL', value: 'xxl' },
        { text: 'Tolerance', value: 'tolerance' },
        { text: 'Shrinkage', value: 'shrinkage' },
        { text: 'Gradation', value: 'gradation' },
        { text: 'Comment', value: 'comment' },
        { text: 'Creator', value: 'creator' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'actions' },
      ],
      sizeChartList: [
        {
          id: 1,
          code: 'A',
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
          creator: 'Aziza Azimova',
          date: '12.10.2022'
        },
      ],
      sizeChartDialog: false,

    }
  },
  methods: {
    ...mapActions({
      getChartSizes: 'sizeChart/getChartSizes'
    }),
    editSizeChart() {},
    deleteSizeChart() {},
    newDialog() {
      console.log('hello')
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    if(id !== 'add-model') {
      await this.getChartSizes(id);
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
