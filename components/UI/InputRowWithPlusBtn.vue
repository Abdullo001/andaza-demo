<template>
  <div>
    <v-row v-for="(person, index) in people" :key="index">
      <v-col cols="6">
        <div class="label">Position</div>
        <v-text-field
          v-model="person.position"
          placeholder="Enter position"
          outlined
          hide-details
          height="44"
          class="rounded-lg base"
          validate-on-blur
          dense
          color="#544B99"
          @input="emitDataToParent"
        />
      </v-col>
      <v-col cols="6">
        <div class="label">Name</div>
        <div class="d-flex align-center">
          <v-text-field
            v-model="person.name"
            placeholder="Enter name"
            outlined
            hide-details
            height="44"
            class="rounded-lg base mr-4"
            validate-on-blur
            dense
            color="#544B99"
            @input="emitDataToParent"
          />
          <v-btn
            v-if="index === 0"
            icon
            height="44"
            width="44"
            color="#544B99"
            @click="addNewRow"
          >
            <v-img src="/plus.svg" max-width="30"/>
          </v-btn>
          <v-btn
            v-else
            icon
            height="44"
            width="44"
            color="#544B99"
            @click="deleteRow(index)"
          >
            <v-img src="/minus.svg" max-width="30"/>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      people: [
        {
          position: '',
          name: '',
        },
      ],
    }
  },

  methods: {
    addNewRow() {
      this.people.push({
        position: '',
        name: '',
      });
      this.emitDataToParent();
    },

    deleteRow(index) {
      if (this.people.length > 1) {
        this.people.splice(index, 1);
        this.emitDataToParent();
      }
    },

    emitDataToParent() {
      this.$emit('input', this.people);
    }
  },
}
</script>
<style lang="">

</style>
