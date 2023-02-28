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
    <v-dialog max-width="700" v-model="new_dialog">
      <v-card>
        <v-card-title class="d-flex w-full justify-space-between">
          <div class="text-capitalize title">add samples</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation ref="ref_valid" v-model="new_valid">
            <v-row>
              <v-col>

              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
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
      allSamples: []
    }
  },
  methods: {
    ...mapActions({
      getSamplesList: "samples/getSamplesList",
      createSamples: "samples/createSamples"
    })
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.getSamplesList(id);
  }
}
</script>

<style lang="scss" scoped>

</style>
