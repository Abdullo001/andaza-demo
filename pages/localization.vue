<template>
  <div>
    <v-card
      color="#fff"
      elevation="0"
      class="rounded-t-lg"
    >
      <v-form lazy-validation v-model="valid_key" ref="search_form">
        <v-row class="mx-0 px-0 mb-7 mt-4 pa-4 w-full" justify="start">
          <v-col cols="12" lg="4" md="4">
            <v-text-field
              label="Key"
              outlined
              class="rounded-lg"
              v-model="key"
              hide-details
              dense
            />
          </v-col>
         <v-spacer/>
          <v-col class="" cols="12" lg="4">
            <div class="d-flex justify-end">
              <v-btn
                width="140" outlined
                color="#397CFD" elevation="0"
                class="text-capitalize mr-4 rounded-lg"
                @click="resetSearch"
              >
                Reset
              </v-btn>
              <v-btn
                width="140" color="#397CFD" dark
                elevation="0"
                class="text-capitalize rounded-lg"
              >
                Search
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid_key: true,
      key: '',

    }
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Localization');
  }
}
</script>

<style scoped>

</style>
