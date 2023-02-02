<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <div>Add Models</div>
        <v-spacer/>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#7631FF"
            class="text-capitalize rounded-lg mr-4 font-weight-bold"
          >
            Prefinance
          </v-btn>
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
           <v-col>
             <v-text-field
               label="Model number"
               filled
               dense
               style="max-width: 400px"
               placeholder="Enter model number"
               class="mb-4"
             />
             <div class="mb-2 black--text text-body-1">Permission</div>
             <v-chip color="#10BF41" dark class="font-weight-bold">Edit</v-chip>
           </v-col>
           <v-col>
             <v-text-field
               label="Model name"
               filled
               dense
               style="max-width: 400px"
               placeholder="Model name"
               class="mb-4"
             />
             <v-select
               label="Season"
               filled
               dense
               :items="season_enums"
               append-icon="mdi-chevron-down"
               style="max-width: 400px"
               placeholder="Select season"
               class="mb-4"
             />
           </v-col>
           <v-col>
             <v-select
               label="Model group"
               filled dense
               :items="group_enums"
               append-icon="mdi-chevron-down"
               style="max-width: 400px"
               placeholder="Select model group"
               class="mb-4"
             />
             <v-select
               label="License"
               filled dense
               :items="licence_enums"
               append-icon="mdi-chevron-down"
               style="max-width: 400px"
               placeholder="Select model group"
               class="mb-4"
             />
           </v-col>
           <v-col>
             <v-text-field
               label="Composition"
               filled dense
               style="max-width: 400px"
               placeholder="Enter model composition"
               class="mb-4"
             />
             <v-select
               label="Gender"
               filled dense
               :items="gander_enums"
               append-icon="mdi-chevron-down"
               style="max-width: 400px"
               placeholder="Select gender"
               class="mb-4"
             />
           </v-col>
         </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-textarea
              label="Description"
              filled dense
              placeholder="Enter description"
              class="mb-4"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              label="Creator"
              filled dense
              style="max-width: 400px"
              placeholder="Enter Creator"
              class="mb-4"
            />
            <v-text-field
              label="Modified person"
              filled dense
              style="max-width: 400px"
              placeholder="Enter Modified person"
              class="mb-4"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              filled
              class="rounded-lg mb-4"
              color="#7631FF"
              dense
              label="Created time"
              placeholder="dd.MM.yyyy HH:mm:ss"
              disabled
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
            <v-text-field
              filled
              class="rounded-lg mb-4"
              color="#7631FF"
              dense
              label="Updated time"
              placeholder="dd.MM.yyyy HH:mm:ss"
              disabled
            >
              <template #append>
                <v-img src="/date-icon.svg"/>
              </template>
            </v-text-field>
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
        >save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields_status: true,
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Models',
          disabled: false,
          to: '/models',
          icon: true
        },
        {
          text: 'add models',
          disabled: true,
          to: '/models/7',
          icon: false
        },
      ],
      model: {
        number: '',
        name: '',
        group: '',
        composition: '',
        season: '',

      },
      season_enums: ['Active', 'No active'],
      group_enums: ['test', 'test2', 'test3'],
      licence_enums: ['Yes', 'No'],
      gander_enums: ['Male', 'Female'],
      pickerOptions: {
        shortcuts: [
          {
            text: "Cегодня",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Вчера",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "Неделя",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.el-date-editor--datetime {
  width: 100%;
  border: 5px solid red;
}
</style>
