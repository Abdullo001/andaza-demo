<template>
  <div>
    <v-combobox
      v-model="selectedItem"
      :items="itemsList"
      :item-text="itemText"
      :item-value="itemValue"
      outlined
      hide-details
      class="rounded-lg filter"
      :return-object="true"
      color="#544B99"
      dense
      :placeholder="placeholder"
      validate-on-blur
    >
      <template #append>
        <v-icon color="#544B99">mdi-magnify</v-icon>
      </template>
      <!-- <template v-slot:selection="{ item, index }">
        <v-chip
          v-if="item === Object(item)"
          :color="`${item.raw.color}-lighten-3`"
          :text="item.title"
          size="small"
          variant="flat"
          closable
          label
        ></v-chip>
      </template> -->
    </v-combobox>
  </div>
</template>
<script>
export default {
  props:{
    itemsList:{
      type:Array,
      required:true,
    },
    itemText:{
      type:String,
      default:"name"
    },
    itemValue:{
      type:String,
      default:"id"
    },
    placeholder:{
      type:String,
      required:true,
    },
  },
  data(){
    return{
      selectedItem:null
    }
  },

  watch:{
    selectedItem(val) {
      if(typeof val!=='string'){
        this.$emit("input", val ? val : null);
      }
    },
  },

  methods:{

  }
};
</script>
<style lang=""></style>
