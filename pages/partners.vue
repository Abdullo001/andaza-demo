<template>
  <div>
    <v-card elevation="0" class="rounded-lg">
      <v-card-title>
        <div>Partners</div>
        <v-spacer/>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            Delete
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            class="text-capitalize rounded-lg"
            color="#777C85"
          >
            <v-img :src="fields_status ? '/edit.svg' : '/edit-active.svg'" class="mr-1"/>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text class="mt-4">
        <v-row>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Group code"
              filled
              disabled
              dense
              placeholder="Enter Group code"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Group name"
              filled
              dense
              disabled
              placeholder="Enter Group name"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Creator"
              filled
              disabled
              dense
              placeholder="Enter Creator"
              class="mb-4"
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Created date"
              filled
              dense
              disabled
              placeholder="Select Created date"
              class="mb-4"
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-text-field
              label="Update by"
              filled dense
              item-value="id"
              item-text="name"
              placeholder="Enter Update by"
              class="mb-4"
              disabled
              color="#7631FF"
            />
          </v-col>
          <v-col cols="12" lg="3" md="6">
            <v-select
              label="Update date"
              filled dense
              append-icon="mdi-chevron-down"
              placeholder="Select Update date"
              class="mb-4"
              disabled
              color="#7631FF"
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-6 pr-4">
        <v-spacer/>
        <v-btn
          color="#7631FF"
          class="text-capitalize rounded-lg"
          width="130"
          height="44"
          dark
        >
          save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-5 elevation-0 rounded-lg">
      <v-tabs
        color="#7631FF"
        v-model="tab"
      >
        <v-tab
          class="text-capitalize"
          v-for="item in tab_items"
          :key="item"
        >
          {{ item }}
        </v-tab>
        <v-tabs-slider color="#7631FF"/>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <SuppliersPages/>
          </v-tab-item>
          <v-tab-item>
            <ClientsPages/>
          </v-tab-item>
          <v-tab-item>
            <SubcontractorsPages/>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import ClientsPages from "@/components/partners/Clients.vue";
import SubcontractorsPages from "@/components/partners/Subcontractors.vue";
import SuppliersPages from "@/components/partners/Suppliers.vue";

export default {
  name: "PartnersPages",
  components: {SuppliersPages, SubcontractorsPages, ClientsPages},
  data() {
    return {
      new_dialog: false,
      tab_items: ["Suppliers", "Clients", "Subcontractors"],
      tab: null,
      fields_status: true,
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', 'Catalogs');
  }
}
</script>

<style lang="scss" scoped>
.active-tab {
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: #7631FF;
}

.el-date-editor--datetime {
  width: 100%;
  border: 5px solid red;
}
</style>
