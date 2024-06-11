<template >
  <div>
    <v-card elevation="0">
      <v-card-title>
        <v-radio-group row v-model.trim="filter" class="">
          <v-radio             
            :readonly="managementStatus||productionStatus"
            color="#544B99" 
            label="All" 
            value="ALL"
          ></v-radio>
          <v-radio
            :readonly="managementStatus"
            color="#544B99"
            label="Management"
            value="MANAGEMENT"
          ></v-radio>
          <v-radio
            :readonly="productionStatus"
            color="#544B99"
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
                v-if="item.status==filter||filter==='ALL'"
                height="150"
                style="cursor: pointer"
                @click="$router.push(`${item.to}`)"
              >
                <v-card-title class="d-flex align-center justify-center">
                  <div style="color: #544b99" class=" text-center">
                    {{ item.title }}
                  </div>
                </v-card-title>
                <v-card-text class="">
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
      productionStatus:true,
      managementStatus:true,
      buttons: [
        {
          title: "Calculations list",
          subtitle: "Calculation form for all model",
          to: "/forms/calculation-list",
          status:"MANAGEMENT"
        },
        {
          title: "Placed orders",
          subtitle: "All important informations related to actual orders",
          to: "/forms/order-pdf-generation",
          status:"MANAGEMENT"

        },
        {
          title: "Prints",
          subtitle: "Prints list related to all models",
          to: "/forms/print-pdf-generation",
          status:"MANAGEMENT"

        },
        {
          title: "Ordered fabrics",
          subtitle: "Ordered fabrics list to one supplier",
          to: "/forms/ordered-fabric-form",
          status:"MANAGEMENT"

        },
        {
          title: "Received fabrics",
          subtitle: "Received fabrics list from one supplier",
          to: "/forms/recieved-fabric-form",
          status:"MANAGEMENT"
        },
        {
          title: "Ordered fabrics amount ",
          subtitle: "All ordered fabrics amount of the current models",
          to: "/forms/suppliers-fabric-form",
          status:"MANAGEMENT"
        },
        {
          title: "Ordered accessories",
          subtitle: "All ordered accessories list of the current models",
          status:"MANAGEMENT",
          to: "/forms/ordered-accessory-form",
        },
        {
          title: "Received accessories",
          subtitle: "All received accessories list of the current models",
          status:"MANAGEMENT",
          to: "/forms/recieved-accessory-form",
        },
        {
          title: "Inspection files",
          subtitle: "Inspection files of each model",
          status:"MANAGEMENT",
          to: "/forms/inspection-files",
        },
        {
          title: "Cutting form",
          subtitle: "Cutting information form related to one model",
          status:"PRODUCTION",
          to: "/forms/cutting",
        },
        {
          title: "Sewing form",
          subtitle: "Sewing information form related to one model",
          status:"PRODUCTION",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Production list",
          subtitle: "Production information related to all models of one client",
          status:"PRODUCTION",
          to: "/forms/production-list",
        },
        {
          title: "Production status",
          subtitle: "Production information with status related to all models of one client ",
          status:"PRODUCTION",
          to: "/forms/production-status",
        },
        {
          title: "Daily/Monthly production q-ty",
          subtitle: "Daily/monthly/annual production quantity information ",
          status:"PRODUCTION",
          to: "/forms/daily-production",
        },
        {
          title: "Cuttings list of subcontractor",
          subtitle: "Cutting information list related to all models of one subcontractor",
          status:"PRODUCTION",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Printings list of subcontractor",
          subtitle: "Printing information list related to all models of one subcontractor",
          status:"PRODUCTION",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Inconming from printing subcontractor",
          subtitle: "Cutting information list related to one model of one subcontractor",
          status:"PRODUCTION",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Sewing list of subcontractor",
          subtitle: "Cutting information list related to one model of one subcontractor",
          status:"PRODUCTION",
          to: "/forms/print-pdf-generation",
        },
        {
          title: "Inconming from sewing subcontractor",
          subtitle: "Cutting information list related to one model of one subcontractor",
          status:"PRODUCTION",
          to: "/forms/print-pdf-generation",
        },
        
      ],
      filteredButtons:[],
    };
  },
  watch:{

  },
  methods:{

  },
  mounted() {
    this.$store.commit("setPageTitle", "Forms");
    const permisionList=JSON.parse(localStorage.getItem("permissionList"))
    permisionList.forEach((item)=>{
      if(item.permissionName==="MANAGEMENT_FORM"){
        this.filter="MANAGEMENT"
        this.managementStatus=false
      }
      if(item.permissionName==="PRODUCTION_FORM"){
        this.filter="PRODUCTION"
        this.productionStatus=false

      }
      if(!this.productionStatus&&!this.managementStatus){
        this.filter="ALL"
      }
    })
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
