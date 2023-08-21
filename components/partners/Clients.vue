<template>
  <div>
    <v-data-table
      :headers="header"
    >
      <template #top>
        <div class="text-capitalize d-flex justify-space-between pa-4">
          clients
          <v-btn
            @click="new_dialog = true"
            dark
            elevation="0"
            class="text-capitalize"
            rounded-lg
            color="#7631FF"
          >
            <v-icon>
              mdi-plus
            </v-icon>
            add row
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="new_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">add row</div>
          <v-btn icon color="#7631FF" @click="new_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  label="Client name"
                  placeholder="Body"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  label="Client address"
                  placeholder="Tashkent city Mirobod district"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  filled
                  label="E-mail"
                  placeholder="Enter name package shape"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Phone number"
                  placeholder="(--) --- -- --"
                  filled dense
                  validate-on-blur
                  :rules="[formRules.required]"
                  color="#7631FF"
                  v-mask="`(##) ### ## ##`"
                  prefix="+998"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  label="Contract info"
                  placeholder="Enter name package shape"
                  dense
                  color="#7631FF"
                />
              </v-col>
              <v-col cols="12">
                <v-card
                  style="border: 1px dashed #A5A7AD"
                >
                  <v-card-title>
                    <v-btn type="file" color="#7631FF" text class="text-capitalize font-weight-bold">
                      upload files
                    </v-btn>
                    <v-btn text class="text-capitalize" @click="fileClick">
                      <v-img src="tray-array-up.svg" class="mr-3 font-weight-bold"/>
                      drop files here
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    {{ file_input }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  label="Description"
                  placeholder="Enter package shape description"
                  dense
                  color="#7631FF"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="new_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
          >
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="edit_dialog" width="580">
      <v-card>
        <v-card-title class="d-flex justify-space-between w-full">
          <div class="text-capitalize font-weight-bold">Edit Package shape</div>
          <v-btn icon color="#7631FF" @click="edit_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="new_form">
            <v-text-field
              filled
              label="Name"
              placeholder="Enter name package shape"
              dense
              color="#7631FF"
            />
            <v-textarea
              filled
              label="Description"
              placeholder="Enter package shape description"
              dense
              color="#7631FF"
            />
            <v-select
              filled
              disabled
              append-icon="mdi-chevron-down"
              item-text="name"
              item-value="id"
              label="Measurement unit ID"
              placeholder="Select Measurement unit ID"
              dense
              color="#7631FF"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            outlined color="#7631FF"
            width="163"
            @click="edit_dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            class="rounded-lg text-capitalize ml-4 font-weight-bold"
            color="#7631FF" dark
            width="163"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/error-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">Delete Package shape</v-card-title>
        <v-card-text>
          Are you sure you want to Delete this package shape?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="delete_dialog = false"
          >
            cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
          >
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "ClientsPages",
  data() {
    return {
      file_input: null,
      new_dialog: false,
      edit_dialog: false,
      delete_dialog: false,
      file_data: [],
      header: [
        {text: "Gr. code",},
        {text: "Gr. part code",},
        {text: "Suppliers name",},
        {text: "Delivering pr/ser",},
        {text: "Suppliers addr.",},
        {text: "Email",},
        {text: "Phone ",},
        {text: "Contact info",},
        {text: "File",},
        {text: "Description",},
      ]
    }
  },
  watch: {
    file_input(value) {
      console.log(value)
    },
  },
  methods: {
    fileClick() {
      if (this.file_input !== null) {
        this.file_data.push(this.file_input);
        this.file_input = null;
      }
    },
  },
}
</script>

<style lang="sass" scoped>

</style>
