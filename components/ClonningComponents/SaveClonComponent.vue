<template>
  <div>
    <v-btn
      color="#544B99"
      class="text-capitalize rounded-lg mr-4"
      height="44"
      outlined
      @click="templateDialog = true"
    >
      {{ $t("accessoryPlanning.saveAsTemplate") }}
    </v-btn>
    <v-dialog v-model="templateDialog" max-width="500">
      <v-card class="pa-4 text-center">
        <v-card-title class="d-flex justify-center"
          >{{ $t("accessoryPlanning.saveAsTemplate") }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <div class="label">Template name</div>
              <v-text-field
                v-model="templateName"
                outlined
                hide-details
                class="rounded-lg base mb-4"
                height="44"
                dense
                style="max-width: 400px"
                placeholder="Enter template name"
                color="#544B99"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="templateDialog = false"
          >
            {{ $t("localization.dialog.cancel") }}
          </v-btn>
          <v-spacer />
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#544B99"
            width="140"
            elevation="0"
            dark
            @click="saveTemplate"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      templateDialog: false,
      templateName: "",
    };
  },

  methods: {
    saveTemplate() {
      this.$emit("saveTemplate", this.templateName);
      this.templateDialog = false;
    },
  },
};
</script>
<style lang=""></style>
