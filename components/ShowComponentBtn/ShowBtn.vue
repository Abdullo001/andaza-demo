<template>
  <div>
    <v-btn
      outlined
      elevation="0"
      color="#7631FF"
      class="text-capitalize rounded-lg mr-4 font-weight-bold"
      @click="clickBtn"
    >
      {{ show_btn_value ? "Hide detail" : "Show detail" }}
      <v-icon v-if="!show_btn_value">
        mdi-chevron-up
      </v-icon>
      <v-icon v-else>
        mdi-chevron-down
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ShowBtnComponent",
  props: {
    show_btn_value: {
      required: true,
      type: Boolean,
      default: true
    },
    clickBtn: {
      type: Function,
      required: true
    }
  }
}
</script>
