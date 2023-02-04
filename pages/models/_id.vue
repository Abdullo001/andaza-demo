<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card elevation="0">
      <v-card-title>
        <div>{{ modelStatus }} Models</div>
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
              v-model="model.number"
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
              v-model="model.name"
              label="Model name"
              filled
              dense
              style="max-width: 400px"
              placeholder="Model name"
              class="mb-4"
            />
            <v-select
              v-model="model.season"
              label="Season"
              filled
              dense
              :items="season_enums"
              item-value="key"
              item-text="text"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              placeholder="Select season"
              class="mb-4"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="model.group"
              label="Model group"
              filled dense
              :items="modelGroups"
              item-value="id"
              item-text="name"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              placeholder="Select model group"
              class="mb-4"
            />
            <v-select
              v-model="model.licence"
              label="License"
              filled dense
              :items="licence_enums"
              item-text="text"
              item-value="key"
              append-icon="mdi-chevron-down"
              style="max-width: 400px"
              placeholder="Select model group"
              class="mb-4"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="model.composition"
              label="Composition"
              filled dense
              style="max-width: 400px"
              placeholder="Enter model composition"
              class="mb-4"
            />
            <v-select
              v-model="model.gender"
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
              v-model="model.description"
              label="Description"
              filled dense
              placeholder="Enter description"
              class="mb-4"
            />
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              v-model="model.creator"
              label="Creator"
              filled dense
              style="max-width: 400px"
              placeholder="Enter Creator"
              class="mb-4"
              disabled
            />
            <v-text-field
              v-model="model.modifiedPerson"
              label="Modified person"
              filled dense
              style="max-width: 400px"
              placeholder="Enter Modified person"
              class="mb-4" disabled
            />
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              v-model="model.createdTime"
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
              v-model="model.updateTime"
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
        >save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'addOrEditModelsPage',
  data() {
    return {
      modelStatus: 'Add',
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
        licence: '',
        gender: '',
        description: '',
        creator: '',
        modifiedPerson: '',
        createdTime: null,
        updateTime: null
      },
      season_enums: [
        {key: 'SS', text: ' Spring/Summer'},
        {key: 'AW', text: 'Autumn/Winter'}
      ],

      licence_enums: [
        {key: true, text: 'Yes'},
        {key: false, text: 'No'}
      ],
      gander_enums: ['MALE', 'FEMALE', 'BOY', 'GIRL', 'UNISEX'],
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

  computed: {
    ...mapGetters({
      oneModel: 'models/oneModel',
      modelGroups: 'models/modelGroups'
    }),
  },
  watch: {
    oneModel(val) {
      const model = this.model
      model.number = val.modelNumber;
      model.name = val.name;
      model.group = val.modelGroupId;
      model.composition = val.composition;
      model.season = val.season;
      model.licence = val.licenceRequired;
      model.gender = val.gender;
      model.description = '';
      model.creator = val.createdBy;
      model.modifiedPerson = '';
      model.createdTime = val.createdAt;
      model.updateTime = val.updatedAt;
    }
  },
  methods: {
    ...mapActions({
      getOneModel: 'models/getOneModel',
      getModelGroup: 'models/getModelGroup',

    })
  },
  mounted() {
    const id = this.$route.params.id;
    if(id !== 'add-model') {
      this.getOneModel(id);
      this.modelStatus = 'Edit'
    } else this.modelStatus = 'Add'
    this.getModelGroup()
  }
}
</script>

<style lang="scss" scoped>
.el-date-editor--datetime {
  width: 100%;
  border: 5px solid red;
}
</style>
