<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-card elevation="0">
      <v-card-title>
        <div>Add Models</div>
        <v-spacer />
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
            @click="clearOrder"
          >
            <v-img src="/trash.svg" class="mr-1" />
            Clear
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            color="#777C85"
            @click="editOrder"
          >
            <v-img
              :src="fields_status ? '/edit.svg' : '/edit-active.svg'"
              class="mr-1"
            />
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-row>
          <v-col>
            <v-text-field
              v-model="order.number"
              label="Order number"
              filled
              dense
              style="max-width: 400px"
              placeholder="Enter order number"
              class="mb-4"
            />
            <div class="mb-2 black--text text-body-1">Permission</div>
            <v-chip color="#10BF41" dark class="font-weight-bold">Edit</v-chip>
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.clientName"
              label="Client name"
              filled
              dense
              style="max-width: 400px"
              placeholder="Client name"
              class="mb-4"
            />

            <v-text-field
              v-model="order.givenPrice"
              label="Given price"
              filled
              dense
              style="max-width: 400px"
              placeholder="0.00"
              value="0"
              class="mb-4"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.modelNumber"
              label="Model number"
              filled
              dense
              style="max-width: 400px"
              placeholder="Enter model number"
              class="mb-4"
            />

            <v-text-field
              v-model="order.totalPrice"
              label="Total price"
              filled
              dense
              style="max-width: 400px"
              placeholder="0.00"
              value="0"
              class="mb-4"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.modelName"
              label="Model name"
              filled
              dense
              style="max-width: 400px"
              placeholder="Enter model name"
              class="mb-4"
            />

            <el-date-picker
              v-model="order.deadline"
              class="rounded-lg mb-4"
              color="#7631FF"
              dense
              type="datetime"
              placeholder="Deadline"
              value-format="dd.MM.yyyy HH:mm:ss"
            >
            </el-date-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-textarea
              label="Description"
              filled
              dense
              placeholder="Enter description"
              class="mb-4"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer />
        <v-btn
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
          @click="saveOrder"
          >save</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs.vue";
export default {
  components: {
    Breadcrumbs,
  },

  data() {
    return {
      fields_status: true,
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Orders",
          disabled: false,
          to: "/orders",
          icon: true,
        },
        {
          text: "add orders",
          disabled: true,
          to: "/orders/7",
          icon: false,
        },
      ],
      order: {
        number: "",
        clientName: "",
        modelNumber: "",
        modelName: "",
        givenPrice: 0,
        totalPrice: 0,
        deadline: "",
      },
      
    };
  },

  methods:{
    editOrder(){

    },

    clearOrder(){

    },

    saveOrder(){

    },
  },
};
</script>

<style lang="scss" scoped>
.el-date-editor--datetime {
  width: 100%;
}
</style>
