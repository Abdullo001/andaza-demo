<template>
  <div>
    <v-dialog v-model="dialogState" max-width="500" persistent>
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img :src="dialogIcon" max-width="100" />
        </div>
        <v-card-title class="d-flex justify-center">
          Warning
        </v-card-title>
        <v-card-text>
          <div v-html="dialogText"></div>
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="dialogCloser"
          >
            {{ $t("catalogsPartnerType.dialog.cancelBtn") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="actionFunc"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogState: {
      type: Boolean,
      default: false,
      required: true
    },
    voidFunction: {
      type: Function,
      default: () => {},
      required: true
    },
    dialogCloser: {
      type: Function,
      default: () => {},
      required: true
    },
    dialogIcon: {
      type: String,
      default: "/error-icon.svg",
    },
    dialogText:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      delete_dialog: false,
    }
  },

  methods:{
    async actionFunc() {
      this.voidFunction()
    },
  }
  
}
</script>

<style lang="scss" scoped>

</style>
