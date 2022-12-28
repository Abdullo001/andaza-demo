<template>
  <div>
    <div class="breadcrumbs d-flex align-center ml-2">
      <div class="breadcrumbs d-flex align-center font-weight-medium mb-4 text-body-2" v-for="(item,idx) in map_links"
           :key="idx">
        <nuxt-link :to="item.to" class="base-color" v-if="!item.disabled">{{ item.text }}</nuxt-link>
        <div class="grey--text" v-if="item.disabled">{{ item.text }}</div>
        <v-icon class="mx-3" size="18" v-if="item.icon">mdi-slash-forward</v-icon>
      </div>
    </div>
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
                <v-img
                  src="/default-image.svg"
                  max-width="56"
                  max-height="56"
                />
                <div class="d-flex align-center upload-wrap pointer">
                  <v-img src="/upload.svg" max-width="20"/>
                  <div class="upload-btn">Upload Image</div>
                </div>
                <div class="upload-subtitle">
                  Upload a cover image for your product. <br>
                  File Format <b>jpeg, png</b> Recommend Size <b>600x600 (1:1)</b>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              class="text-capitalize mb-3 rounded-lg"
              outlined
              color="#5570F1"
            >
              add image
            </v-btn>
          </v-card-actions>
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
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="calculation"
              :items-per-page="10"
              hide-default-footer
            >
            <template #item.editable="{item}">
              <v-text-field
                solo
                v-model="item.editable"
                hide-details
                flat
                background-color="#F8F4FE"
              />
            </template>
            </v-data-table>
          </v-card-text>
          <v-divider/>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-4 rounded-lg" elevation="0">
      <v-card-text>
        <v-tabs
          v-model="tab"
          background-color="transparent"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            class="text-capitalize"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-data-table
              :headers="detailsHeaders"
              :items="allDetails"
              hide-default-footer
            >

            </v-data-table>
          </v-tab-item>
          <v-tab-item>
            <v-data-table
              :headers="documentsHeaders"
              :items="allDocuments"
              hide-default-footer
            >
              <template #top>
                <v-toolbar elevation="0">
                  <v-toolbar-title class="d-flex justify-space-between w-full">
                    <div class="text-h6">Documents</div>
                    <v-btn color="#7631FF" class="rounded-lg text-capitalize" dark>Upload document</v-btn>
                  </v-toolbar-title>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider/>
      <v-card-actions class="mt-4 mb-6">
        <v-spacer/>
        <v-btn outlined class="text-capitalize rounded-lg" width="130">
          <v-img src="/clear.svg" max-width="16" class="mr-2"/>
          clear
        </v-btn>
        <v-btn
          color="#7631FF"
          class="rounded-lg text-capitalize"
          dark
          width="130"
        >create</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map_links: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
          icon: true
        },
        {
          text: 'Prefinances',
          disabled: false,
          to: '/prefinances',
          icon: true
        },
        {
          text: 'Details',
          disabled: true,
          to: '/user-management/7a42ec47-7351-4128-9db9-5236adbbfe6d',
          icon: false
        },
      ],
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
      },
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '', value: 'editable', width: 100 },
        { text: 'USD', value: 'firstCurrency' },
        { text: 'UZS', value: 'secondCurrency' },
        { text: 'RUB', value: 'tertiaryCurrency' },
      ],
      detailsHeaders: [
        {
          text: 'Expence group',
          align: 'start',
          sortable: false,
          value: 'expenseGroup',
        },
        { text: 'Expense', value: 'expense', width: 100 },
        { text: 'Expense type description', value: 'expenseType' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Measurement unit', value: 'measurementUnit' },
        { text: 'Currency', value: 'currency' },
        { text: 'Price per unit', value: 'priceUnit' },
        { text: 'Price', value: 'price' },
      ],
      documentsHeaders: [
        {text: 'Type', align: 'start', sortable: false, value: 'type'},
        { text: 'Document name', value: 'documentName' },
        { text: 'Owner', value: 'owner' },
        { text: 'Date', value: 'Date' },
        { text: 'Actions', value: 'actions' },
      ],
      calculation: [
        {
          name: 'Cost subtotal',
          editable: '-',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0'
        },
        {
          name: 'Over-production %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0'
        },
        {
          name: 'Lost resource %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0'
        },
        {
          name: 'General expenses %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0'
        },
        {
          name: 'Extra expenses %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0'
        },
        {
          name: 'Target profit %',
          editable: '0.0',
          firstCurrency: '0.0',
          secondCurrency: '0.0',
          tertiaryCurrency: '0.0'
        },
      ],
      tab: null,
      items: ['Details', 'Documents'],
      allDetails: [
        {
          expenseGroup: 'Material',
          expense: 'Trikotaj',
          expenseType: 'Black thin material',
          quantity: '0.7',
          measurementUnit: 'kg',
          currency: 'USD',
          priceUnit: '3.00',
          price: '2.10'
        }
      ],
      allDocuments: [
        {
          type: 'word',

        }
      ],

    }
  },
}
</script>

<style lang="scss" src="assets/abstracts/_preficances.scss" scoped>

</style>
