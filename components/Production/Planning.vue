<template>
  <v-card flat>
    <v-data-table
      :headers="headers"
      :items="planningList"
      :items-per-page="10"
    >
      <template #top>
        <v-card-title class="d-flex">
          <div class="title">Planning of production</div>
          <v-spacer/>
          <v-btn
            color="#7631FF" dark
            class="rounded-lg text-capitalize font-weight-bold"
            width="200" height="40"
            @click="openDialog('add')"
          >
            <v-icon>mdi-plus</v-icon>
            add processing
          </v-btn>
        </v-card-title>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="1000">
      <v-card flat>
        <v-card-title class="d-flex mb-4">
          <div class="title text-capitalize">{{ title }} process</div>
          <v-spacer/>
          <v-btn color="#7631FF" icon @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Working process</div>
              <v-select
                filled
                append-icon="mdi-chevron-down"
                placeholder="Select working process"
                v-model="new_process.workingProcess"
              />
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Workshop</div>
              <v-select
                filled
                append-icon="mdi-chevron-down"
                placeholder="Select workshop"
                v-model="new_process.workshop"
              />
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Contract date</div>
              <el-date-picker
                v-model="new_process.contractDate"
                type="datetime"
                placeholder="DD.MM.YYYY"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="custom-picker"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Started date</div>
              <el-date-picker
                v-model="new_process.startedDate"
                type="datetime"
                placeholder="DD.MM.YYYY"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="custom-picker"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Finished date</div>
              <el-date-picker
                v-model="new_process.finishedDate"
                type="datetime"
                placeholder="DD.MM.YYYY"
                :picker-options="pickerShortcuts"
                value-format="dd.MM.yyyy HH:mm:ss"
                class="custom-picker"
              >
              </el-date-picker>
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Fabric color</div>
              <v-select
                filled
                append-icon="mdi-chevron-down"
                placeholder="Select fabric color"
                v-model="new_process.fabricColor"
              />
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Quantity</div>
              <v-text-field
                filled
                placeholder="0"
                v-model="new_process.quantity"
              />
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Currency</div>
              <v-select
                filled
                append-icon="mdi-chevron-down"
                placeholder="Select currency"
                v-model="new_process.currency"
              />
            </v-col>
            <v-col cols="12" lg="4">
              <div class="text-body-1 mb-3 font-weight-bold">Unit price</div>
              <v-text-field
                filled
                placeholder="0"
                v-model="new_process.unitPrice"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <div class="text-body-1 mb-3 font-weight-bold">Comment</div>
              <v-text-field
                filled
                placeholder="Comment"
                v-model="new_process.description"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#7631FF"
            width="163" height="44"
            @click="dialog=false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold ml-8"
            color="#7631FF" dark
            width="163" height="44"
          >
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'ProductionOfPlanningComponent',
  data() {
    return {
      headers: [
        {text: 'Working process', align: 'start', sortable: false, value: 'workingProcess'},
        {text: 'Workshop', sortable: false, value: 'workshop'},
        {text: 'Contract date', sortable: false, value: 'contractDate'},
        {text: 'Started date', sortable: false, value: 'startedDate'},
        {text: 'Finished date', sortable: false, value: 'finishedDate'},
        {text: 'Fabric color', sortable: false, value: 'fabricColor'},
        {text: 'Comment', sortable: false, value: 'description'},
        {text: 'Quantity', sortable: false, value: 'quantity'},
        {text: 'Currency', sortable: false, value: 'currency'},
        {text: 'Unit price', sortable: false, value: 'unitPrice'},
        {text: 'Total price', sortable: false, value: 'totalPrice'},
        {text: 'Created date', sortable: false, value: 'createdDate'},
        {text: '', sortable: false, value: 'actions'},

      ],
      planningList: [],
      dialog: false,
      title: 'Add',
      new_process: {
        workingProcess: '',
        workshop: '',
        contractDate: '',
        startedDate: '',
        finishedDate: '',
        fabricColor: '',
        description: '',
        quantity: '',
        currency: '',
        unitPrice: '',
        totalPrice: '',
      }
    }
  },
  methods: {
    openDialog(title) {
      this.title = title;
      this.dialog = true;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
