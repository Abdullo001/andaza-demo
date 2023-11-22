<template >
  <div>
    <v-card elevation="0">
      <v-card-title>
        <v-radio-group row v-model.trim="filter" class="">
          <v-radio color="#7631FF" label="All" value="ALL"></v-radio>
          <v-radio
            color="#7631FF"
            label="Management"
            value="MANAGEMENT"
          ></v-radio>
          <v-radio
            color="#7631FF"
            label="Production"
            value="PRODUCTION"
          ></v-radio>
        </v-radio-group>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-2">
        <v-row>
          <v-col cols="3" v-for="(item, idx) in buttons" :key="idx">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card
                :elevation="hover ? 10 : 2"
                :class="{ 'on-hover': hover }"
                height="130"
                style="cursor: pointer"
                @click="$router.push(`${item.to}`)"
              >
                <v-card-title class="d-flex align-center justify-center">
                  <div style="color: #7631ff" class=" text-center">
                    {{ item.title }}
                  </div>
                </v-card-title>
                <v-card-text class="d-flex align-center justify-center">
                  <div style="text-align:center">{{item.subtitle}}</div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: "ALL",
      buttons: [
        {
          title: "Calculation form",
          subtitle: "Calculation form for one model",
          to: "/forms/calculation-form",
        },
        {
          title: "Calculations list",
          subtitle: "Calculation form for one model",
          to: "/forms/calculation-list",
        },
        {
          title: "Placed orders",
          subtitle: "All important informations related to actual orders",
          to: "/forms/order-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Ordered fabrics",
          subtitle: "Prints list related all models",
          to: "/forms/ordered-fabric-form",
        },
        {
          title: "Received fabrics",
          subtitle: "Production list related to all current models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Suppliers form of ordered fabrics",
          subtitle: "Status list related to production",
          to: "/forms/suppliers-fabric-form",
        },
        {
          title: "Ordered accessories",
          subtitle: "List of ordered fabrics and full information related to current models fabric",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Prints",
          subtitle: "Prints list related all models",
          to: "/forms/print-pdf-generation",
        },
      ],
    };
  },
  mounted() {
    this.$store.commit("setPageTitle", "Forms");
  },
};
</script>
<style lang="scss" scoped>
.width-100p {
  width: 100%;
}
.v-btn__content {
  flex-direction: column !important;
}
</style>