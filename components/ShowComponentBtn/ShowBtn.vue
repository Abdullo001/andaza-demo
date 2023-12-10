<template>
  <div>
    <v-btn
      outlined
      elevation="0"
      color="#544B99"
      class="text-capitalize rounded-lg mr-4 font-weight-bold"
      @click="clickBtn"
    >
      {{ show_btn_value ? "Show detail" : "Hide detail" }}
      <v-icon>
        mdi-chevron-{{ !show_btn_value ? 'up' : 'down' }}
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
