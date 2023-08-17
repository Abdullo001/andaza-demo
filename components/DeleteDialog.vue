<template>
  <div>
    <v-dialog v-model="deleteDialog" max-width="500" persistent>
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40" />
        </div>
        <v-card-title class="d-flex justify-center">
          {{ $t("deleteTitle") }}
        </v-card-title>
        <v-card-text>
          {{ $t("deleteContent") }}
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="closeDialog"
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
            @click="deleteFunction"
          >
            {{ $t("catalogsPartnerType.dialog.deleteBtn") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    deleteDialog: {
      type: Boolean,
      default: false,
      required: true
    },
    deleteFunction: {
      type: Function,
      default: () => {},
      required: true
    },
    closeDialog: {
      type: Function,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      delete_dialog: false,
    }
  },
  async deletePartner() {
    const id = this.delete_partner.id
    await this.deletePartnerType({id: id, page: this.current_page, size: this.itemPrePage});
    this.delete_dialog = false;
  },
}
</script>

<style lang="scss" scoped>

</style>
