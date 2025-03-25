<template>
  <div>
    <Breadcrumbs :maps="map_links" />
    <v-row>
      <v-col cols="6">
        <v-card elevation="0">
          <v-toolbar elevation="0">
            <v-toolbar-title class="d-flex justify-center w-full">
              <div class="text-h6">Select notification channel</div>
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text class="d-flex justify-space-around">
            <!-- <v-checkbox v-model="checkbox">
              <template v-slot:label>
                <div class="notification-type" :class="checkbox?'selected-type':''">
                 <img src="/push.svg" alt="">
                </div>
              </template>
            </v-checkbox> -->

            <v-btn
              color="#f9f4fe"
              :dark="pushNot"
              :outlined="!pushNot"
              class="text-capitalize rounded-lg notification-type"
              @click="changeState('PUSH')"
            >
              <div class="d-flex align-center flex-column">
                <img
                  v-if="!pushNot"
                  class="mb-2"
                  src="/push-dark.svg"
                  alt=""
                  width="63"
                  height="60"
                />
                <img
                  v-else
                  class="mb-2"
                  src="/push.svg"
                  alt=""
                  width="63"
                  height="60"
                />
                <div>Notifications</div>
              </div>
            </v-btn>
            <v-btn
              color="#f9f4fe"
              :dark="mailNot"
              :outlined="!mailNot"
              class="text-capitalize rounded-lg notification-type"
              @click="changeState('MAIL')"
            >
              <div class="d-flex flex-column">
                <img
                  v-if="!mailNot"
                  src="/mail-dark.svg"
                  class="mb-2"
                  alt=""
                  width="63"
                  height="60"
                />
                <img
                  v-else
                  src="/mail-big.svg"
                  class="mb-2"
                  alt=""
                  width="63"
                  height="60"
                />
                <div>Email</div>
              </div>
            </v-btn>
            <v-btn
              color="#f9f4fe"
              :dark="botNot"
              :outlined="!botNot"
              class="text-capitalize rounded-lg notification-type"
              @click="changeState('BOT')"
            >
              <div>
                <img
                  v-if="!botNot"
                  class="mb-2"
                  src="/bot.svg"
                  alt=""
                  width="63"
                  height="60"
                />
                <img
                  v-else
                  class="mb-2"
                  src="/telegram-light.svg"
                  alt=""
                  width="63"
                  height="60"
                />
                <div>Telegram bot</div>
              </div>
            </v-btn>
          </v-card-text>

          <v-toolbar elevation="0">
            <v-toolbar-title class="d-flex justify-center w-full">
              <div class="text-h6">Select notification type</div>
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-radio-group
              row
              v-model.trim="selectedItem.type"
              class="mb-4 d-flex"
            >
              <v-radio color="#544B99" label="Text" value="TEXT"></v-radio>
              <v-radio color="#544B99" label="Photo" value="PHOTO"></v-radio>
              <v-radio
                color="#544B99"
                label="Document"
                value="DOCUMENT"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card elevation="0">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="label text-capitalize mb-2">Title</div>
                <v-text-field
                  outlined
                  single-line
                  placeholder="Enter notification title"
                  v-model="selectedItem.title"
                  color="#544B99"
                  dense
                  class="rounded-lg base mb-8"
                  height="44"
                  hide-details
                />
                <div class="label">Message body</div>
                <quill-editor v-model="selectedItem.body" :options="editorOptions" class="bg-white p-2 rounded shadow-md" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" v-if="selectedItem.type==='DOCUMENT'&&$route.params.id==='add-notification'">
                <div class="label">Upload document</div>
                <v-file-input
                  outlined
                  hide-details
                  placeholder="Upload document"
                  height="44"
                  class="rounded-lg base mb-4"
                  show-size
                  prepend-icon=""
                  dense
                  prepend-inner-icon="mdi-file-document-outline"
                  color="#544B99"
                  v-model="selectedItem.file"
                  validate-on-blur
                  :rules="[formRules.required]"
                />
              </v-col>
              <v-col cols="12" lg="12" v-if="selectedItem.type==='DOCUMENT'&&$route.params.id!=='add-notification'">
                <div class="label">Upload document</div>
                <v-btn :href="selectedItem.file" target="_blank" color="#544B99" outlined>Download document</v-btn>
              </v-col>

              <v-col v-if="selectedItem.type==='PHOTO'" cols="12" lg="12">
                <ImageUploader :label="`Upload photo`" v-model="selectedItem.file"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card elevation="0" class="mt-6">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :no-data-text="$t('noDataText')"
          :items-per-page="10"
          :footer-props="{
            itemsPerPageOptions: [10, 20, 50, 100],
            itemsPerPageText: this.$t('allDataTableText'),
          }"
          :loading="loading"
          class="mt-4 rounded-lg custom-checkbox-table"
          @update:items-per-page="getItemSize"
          @update:page="page"
          :server-items-length="totalElements"
          show-select
          v-model="selectedItems"
          color="#544b99"

        >
          <template #top>
            <v-toolbar elevation="0">
              <v-toolbar-title class="d-flex justify-space-between w-full">
                <div class="font-weight-medium">
                  Select receivers
                </div>

              </v-toolbar-title>
            </v-toolbar>
            <v-divider />
          </template>
          <template v-slot:[`header.data-table-select`]="{ props, on }">
            <v-simple-checkbox
              :value="props.value || props.indeterminate"
              v-on="on"
              :indeterminate="props.indeterminate"
              color="#544B99"
            />
          </template>
          <template v-slot:item.data-table-select="{ isSelected, select }">
            <v-simple-checkbox
              :value="isSelected"
              color="#544B99"
              @input="select($event)"
            />
          </template>

          <template #item.phoneNumber="{ item }">
            <div class="d-flex align-center">
              {{ item.phoneNumber }}
              <v-tooltip top color="green">
                <template #activator="{ on, attrs }">
                  <div
                    @click.stop="getCopyKey(item.phoneNumber)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-img src="/copy.svg" width="15" class="ml-2 pointer" />
                  </div>
                </template>
                <span>{{ $t("userManagement.dialog.copy") }}</span>
              </v-tooltip>
            </div>
          </template>

          <template #item.firstName="{ item }">
            {{ item.firstName }} {{ item.lastName }}
          </template>

          <template #item.checkbox="{ item }">
            <!-- <v-checkbox v-model="item.isChecked" color="#544B99" /> -->
          </template>
        </v-data-table>

        <div class="d-flex mt-8">
          <v-spacer/>
          <v-btn
            color="#544B99"
            outlined
            width="200"
            class="text-capitalize rounded-lg mr-6"
            @click="resetAll"
            :disabled="this.$route.params.id!=='add-notification'"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#544B99"
            width="200"
            :dark="this.$route.params.id=='add-notification'"
            class="text-capitalize rounded-lg"
            @click="saveAll"
            :disabled="this.$route.params.id!=='add-notification'"
          >
            Send
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="warningDialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/warning-icon.svg" max-width="40"/>
        </div>
        <v-card-title class="d-flex justify-center">
          Sending notification
        </v-card-title>
        <v-card-text>
          Are you sure you want to send this notification?
        </v-card-text>
        <v-card-actions class="px-16">
          <v-btn
            outlined
            class="rounded-lg text-capitalize font-weight-bold"
            color="#777C85"
            width="140"
            @click.stop="warningDialog = false"
          >
            No
          </v-btn>
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="#FF4E4F"
            width="140"
            elevation="0"
            dark
            @click="confirmNotification"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="successDialog" max-width="500">
      <v-card class="pa-4 text-center">
        <div class="d-flex justify-center mb-2">
          <v-img src="/success.svg" max-width="100"/>
        </div>
        <v-card-title class="d-flex justify-center">
          Success!
        </v-card-title>
        <v-card-text>
          You have sent notification successfully
        </v-card-text>
        <v-card-actions class="px-16">
          <v-spacer/>
          <v-btn
            class="rounded-lg text-capitalize font-weight-bold"
            color="green"
            width="140"
            elevation="0"
            dark
            @click="successDialog=false"
          >
            Continue
          </v-btn>
          <v-spacer/>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ImageUploader from "../../components/UI/ImageUploader.vue";
export default {
  components: {
    ImageUploader,
  },
  data() {
    return {
      warningDialog:false,
      successDialog:false,
      selectedItems:[],
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "checkbox",
          width: 62,
        },
        {
          text: this.$t("userManagement.table.firstName"),
          align: "start",
          sortable: true,
          value: "firstName",
        },
        {
          text: this.$t("userManagement.table.email"),
          align: "start",
          sortable: false,
          value: "email",
        },
        {
          text: this.$t("userManagement.table.phoneNumber"),
          align: "start",
          sortable: false,
          value: "phoneNumber",
        },
      ],
      editorOptions: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['clean']
          ]
        },
        formats: ['bold', 'italic', 'underline', 'size', 'color', 'background', 'list', 'align']
      },
      itemPerPage: 50,
      current_page: 0,
      users: [],
      pushNot: false,
      mailNot: false,
      botNot: false,
      selectedItem: {},
      map_links: [
        {
          text: "Home",
          disabled: false,
          to: "/",
          icon: true,
        },
        {
          text: "Notifications",
          disabled: false,
          to: "/notification",
          icon: true,
        },
        {
          text: "add notification",
          disabled: true,
          to: "/notification/7",
          icon: false,
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      all_users: "users/users",
      loading: "users/loading",
      totalElements: "users/totalElements",
      notification: "notification/notification",
    }),
  },

  watch: {
    all_users(val) {
      this.users = JSON.parse(JSON.stringify(val));
    },
    notification(val){
      this.selectedItem.body=val.body
      this.selectedItem.title=val.title
      this.selectedItem.type=val.type
      this.selectedItem.file=val.file

      val.channels.forEach((item)=>{
        switch(item){
          case "PUSH":
            this.pushNot=true
          break
        case "MAIL":
          this.mailNot=true
          break
        case "BOT":
          this.botNot=true
          break
        }
      })
      this.selectedItems = this.users.filter(user =>
        val.receiverIds.some(id => id === user.id)
      );
    },
  },

  methods: {
    ...mapActions({
      getUsers: "users/getUsers",
      createNotification: "notification/createNotification",
      getNotification: "notification/getNotification",
    }),
    getItemSize(val) {
      this.itemPerPage = val;
      this.getUsers({ page: this.current_page, size: this.itemPerPage });
    },
    page(val) {
      this.current_page = val - 1;
      this.getUsers({ page: this.current_page, size: this.itemPerPage });
    },
    changeState(item) {
      if (item === "PUSH") {
        this.pushNot = !this.pushNot;
      }
      if (item === "MAIL") {
        this.mailNot = !this.mailNot;
      }
      if (item === "BOT") {
        this.botNot = !this.botNot;
      }
    },
    confirmNotification(){
      this.warningDialog=false
      this.successDialog=true
      const receivers=[]
      const channels=[]

      if(this.pushNot) channels.push("PUSH")
      if(this.mailNot) channels.push("MAIL")
      if(this.botNot) channels.push("BOT")
      this.selectedItems.forEach((item)=>{
        receivers.push(item.id)
      })


      const formData = new FormData();
      formData.append("body", this.selectedItem.body??'');
      formData.append("title", this.selectedItem.title??'');
      formData.append("type", this.selectedItem.type);
      formData.append("receivers", receivers.toString());
      formData.append("channels", channels.toString());
      if(this.selectedItem.file){
        formData.append("file", this.selectedItem.file);
      }
      this.createNotification(formData)
    },

    resetAll() {},
    saveAll() {
      this.warningDialog=true
    },
  },

  mounted() {
    this.$store.dispatch("users/getUsers", {
      page: this.current_page,
      size: this.itemPerPage,
    });
    const id=this.$route.params.id
    if(id!=="add-notification"){
      this.getNotification(id)
    }
  },
};
</script>
<style lang="scss" scoped>
.notification-type {
  min-width: 140px !important;
  padding: 15px !important;
  min-height: 140px !important;
  color: #544b99 !important;
}

.selected-type {
  background-color: #f9f4fe;
}
</style>
