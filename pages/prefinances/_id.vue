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
              v-model="refinances.modelId"
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
              v-model="refinances.partnerId"
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
              v-model="refinances.primaryCurrency"
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
              v-model="refinances.tertiaryCurrency"
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
              v-model="refinances.secondaryCurrency"
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
        <v-card class="mt-4 rounded-lg" elevation="0">
          <v-card-title>Photos of models</v-card-title>
          <v-divider/>
          <v-card-text>
            <div class="big-image">
              <div class="default-data">
                <v-img src="/default-image.svg" max-width="56"/>
                <div>
                  <v-img src="/upload.svg" max-width="20"/>

                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="7">
        <v-card class="mt-4 rounded-lg" elevation="0">
          <v-card-title>
            Calculations
            <v-spacer/>
            <v-btn outlined class="text-capitalize rounded-lg">
              <v-img src="/clear.svg" max-width="16" class="mr-2"/>
              clear
            </v-btn>
          </v-card-title>
          <v-divider/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      refinances: {
        prefinanceNumber: '',
        modelId: '',
        partnerId: '',
        partner: '',
        primaryCurrency: '',
        tertiaryCurrency: '',
        secondaryCurrency: '',
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

<style lang="scss" src="assets/abstracts/_preficances.scss" scoped>

</style>
