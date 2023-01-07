<template>
  <div>
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="created_at"
          label="Created at"
          readonly
          v-bind="attrs"
          v-on="on"
          outlined
          dense
          append-icon="mdi-lock"
          class="rounded-lg"
          hide-details
          style="width: 200px"
        >
          <template #append>
            <v-img src="/date-icon.svg"/>
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="created_at"
        @input="menu2 = false"
        color="#7631FF"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu2: false,
      created_at: ''
    }
  },
}
</script>

<style scoped>

</style>
