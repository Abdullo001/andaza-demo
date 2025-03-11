<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="calculation"
      :items-per-page="10"
      class="elevation-0"
      hide-default-footer
    >
      <template #top class="px-0">
        <div class="text-h6">
         {{$t('planning.calculations.title')}}
        </div>
        <v-divider class="my-4"></v-divider>
      </template>
      <template #item.first="{item}">
        <v-text-field
          solo flat
          v-model="item.first"
          placeholder="0.0"
          hide-details
          :background-color="!item.status?'#F8F4FE':'transparent'"
          class="pa-0 ma-0"
          :rules="[formRules.onlyNumber]"
          type="number"
          hide-spin-buttons
        />
      </template>
      <template #item.second="{item}">
        <v-text-field
          solo flat
          v-model="item.second"
          :placeholder="!item.editable?'':'0.0'"
          hide-details
          :background-color="item.editable?'#F8F4FE':'transparent'"
          class="pa-0 ma-0"
          :disabled="!item.editable"
          :rules="[formRules.onlyNumber]"
          type="number"
          hide-spin-buttons
        />
      </template>
      <template #item.third="{item}">
        <v-text-field
          solo flat
          v-model="item.third"
          :placeholder="!item.editable?'':'0.0'"
          hide-details
          :background-color="item.editable?'#F8F4FE':'transparent'"
          class="pa-0 ma-0"
          :disabled="!item.editable"
          :readonly="true"
          :rules="[formRules.onlyNumber]"
          type="number"
          hide-spin-buttons
        />
      </template>
      <template #footer>
      <v-divider/>
        <div class="d-flex">
          <v-spacer/>
          <v-btn
            class="text-capitalize rounded-lg mt-3"
            color="#544B99"
            dark
            width="130"
            height="44"
          >
            {{$t('planning.calculations.calculate')}}
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text:  this.$t('planning.expenseGroup.name'),
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: '',
          value: 'first',
          width: 100,
          align: 'center',
          sortable: false,
        },
        {
          text: '',
          value: 'second',
          width: 100,
          align: 'center',
          sortable: false,
        },
        {
          text: '',
          value: 'third',
          width: 100,
          align: 'center',
          sortable: false,
        },
      ],
      calculation: [
        {
          id: 1,
          name:  this.$t('planning.calculations.width'),
          first: '',
          second: '',
          third: '',
          editable: true
        },
        {
          id: 2,
          name: this.$t('planning.calculations.length'),
          first: '',
          second: '',
          third: '',
          editable: true
        },
        {
          id: 3,
          name: this.$t('planning.calculations.density'),
          first: '',
          second: '',
          third: '',
          editable: false
        },
        {
          id: 4,
          name: this.$t('planning.calculations.productQuantity'),
          first: '',
          second: '',
          third: '',
          editable: false
        },
        {
          id: 5,
          name: this.$t('planning.calculations.overProduction'),
          first: '',
          second: '',
          third: '',
          editable: false
        },
        {
          id: 6,
          name:  this.$t('planning.calculations.fabricAmount'),
          first: '',
          second: '',
          third: '',
          editable: false
        },
      ]
    }
  },
  watch: {
    calculation: {
      handler(val) {
        val[0].third = (+val[0].first + +val[0].second).toFixed(3);
        val[1].third = (+val[1].first + +val[1].second).toFixed(3);
        if(!!val[4].first) {
          val[5].first = (val[0].third * val[1].third * val[2].first / val[3].first * (1 + val[4].first / 100)).toFixed(4)
        }
      }, deep: true
    }
  }
}
</script>

<style lang="scss">
td.text-center {
  padding: 0 !important;
}
thead tr {
  background-color: rgb(248, 244, 254)
}
</style>
