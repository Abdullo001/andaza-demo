<template >
  <div>
    <v-data-table
      class="rounded-lg"
      :headers="headers"
      :items="items"
      hide-default-footer
    >
      <template #top>
        <v-toolbar elevation="0">
          <v-toolbar-title
            class="d-flex w-full align-center justify-space-between"
          >
            <div> {{ title }}</div>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template #item.sizes="{ item }">
        <table style="width: 100% !important">
          <thead>
            <tr>
              <th
                class="mr-2"
                v-for="(el, idx) in item.sizeDistributions"
                :key="`${el.size}-${idx}`"
              >
                {{ el.size }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="(el, idx) in item.sizeDistributions"
                :key="`${el.size}` + `${idx}`"
              >
                {{ el.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template #item.photo="{item}">
        <div class="d-flex justify-center align-center">
          <ImageContainer :value="item.photo" :width="40" :height="`100%`"/>
        </div>
       </template>
    </v-data-table>
  </div>
</template>
<script>
import ImageContainer from "@/components/UI/ImageContainer.vue";
export default {
  components:{
    ImageContainer,
  },
  props:{
    headers:{
      type:Array,
      required:true,
    },
    items:{
      type:Array,
      required:true,
    },
    title:{
      type:String,
      required:true,
    },
  },
  data(){
    return{
      isloading:false,
      currentImage: null,
    }
  },
  methods:{
    showImage(photo) {
      this.currentImage = photo;
      this.image_dialog = true;
    },
  }
}
</script>
<style lang="">

</style>
