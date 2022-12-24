<template>
  <div>
    <v-card elevation="0" class="mt-2 rounded-lg">
      <v-card-title>
        <div>Add prefinance</div>
        <v-spacer/>
        <div>
          <v-btn outlined class="text-capitalize rounded-lg">
            <v-img src="/clear.svg" max-width="16" class="mr-2"/>
            clear
          </v-btn>
          <v-btn outlined class="text-capitalize rounded-lg ml-4">
            <v-img src="/edit.svg" max-width="16" class="mr-2"/>
            edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Prefinance number"
              placeholder="Enter prefinance number"
              v-model="refinances.prefinanceNumber"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="refinances.modelNumber"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Model number"
              placeholder="Enter model number"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Model name"
              placeholder="Model name"
              v-model="refinances.modelName"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="refinances.partner"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="Partner"
              placeholder="Partner name or phone"
            >
              <template #append>
                <v-icon color="#7631FF">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <div class="text-body-1 font-weight-medium">Permission</div>
            <v-chip
              color="#10BF41"
              class="text-capitalize px-4 mt-3 font-weight-bold"
              dark>
              edit
            </v-chip>
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="refinances.usd"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="USD"
              placeholder="0"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="refinances.uzs"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="UZS"
              placeholder="0"
            />
          </v-col>
          <v-col cols="12" lg="3" md="3">
            <v-text-field
              v-model="refinances.rub"
              filled
              class="rounded-lg"
              color="#7631FF"
              dense
              label="RUB"
              placeholder="0"
            />
          </v-col>
          <v-row class="ma-0">
            <v-col cols="12" lg="6" md="6">
              <v-textarea
                v-model="refinances.description"
                filled
                class="rounded-lg"
                color="#7631FF"
                dense
                label="Description"
                rows="4"
                placeholder="Enter description"
              />
            </v-col>
            <v-col cols="12" lg="6" md="6" class="d-flex flex-wrap">
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <v-text-field
                  v-model="refinances.owner"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Owner"
                  placeholder="Enter Owner"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="refinances.createdTime"
                  filled
                  class="rounded-lg"
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
              </v-col>
              <v-col cols="12" lg="6" class="pl-0 pt-0">
                <v-text-field
                  v-model="refinances.modifiedPerson"
                  filled
                  class="rounded-lg"
                  color="#7631FF"
                  dense
                  label="Modified person"
                  placeholder="Enter Modified person"
                  disabled
                />
              </v-col>
              <v-col cols="12" lg="6" class="pt-0 pr-0">
                <v-text-field
                  v-model="refinances.updatedTime"
                  filled
                  class="rounded-lg"
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
            </v-col>
          </v-row>
        </v-row>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" lg="5">
        <v-card>

        </v-card>
      </v-col>
      <v-col cols="12" lg="7"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      refinances: {
        prefinanceNumber: '',
        modelNumber: '',
        modelName: '',
        partner: '',
        usd: '',
        uzs: '',
        rub: '',
        description: '',
        owner: '',
        createdTime: '',
        modifiedPerson: '',
        updatedTime: '',
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
