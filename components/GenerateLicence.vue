<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="d-flex align-center justify-space-between w-full">
        <div>Generate licence</div>
        <v-btn outlined class="text-capitalize rounded-lg border-grey">
          <v-img src="/clear.svg" max-width="16" class="mr-2"/>
          clear
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <div class="mb-2 text-body-1">Licence key</div>
            <div class="d-flex">
              <v-text-field
                v-model="licenceKey"
                label="Generate key"
                single-line
                outlined validate-on-blur
                dense
                class="rounded-lg mr-2"
                color="#7631FF"
                background-color="#F8F4FE"
              />
              <v-btn
               color="#C6ADF8"
               class="rounded-lg text-capitalize"
               min-width="180"
               elevation="0"
               style="color: #7631FF;"
              >
                Regenerate
              </v-btn>

            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      licenceKey: 'ABCSD-FDSFV-ASDAAD8-FGDDFG-DSFF1',

    }
  },
}
</script>

<style lang="scss" scoped>

</style>
