<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card color="#fff" elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>{{ currentUser.username }}</div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="label">{{ $t('userManagement.child.photo') }}</div>
            <div class="overlay" @click="handleFileImport">
              <v-img :src="one_user.photo" class="rounded-lg mb-4" width="120"/>
              <v-icon
                style="position: absolute; top:50%; left: 50%; z-index: 10; transform: translate(-50%, -50%)"
                color="#fff"
              >mdi-square-edit-outline
              </v-icon>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                @change="onFileChanged"
                accept="image/*"
              />
            </div>
            <div class="label">{{ $t('userManagement.child.username') }}</div>
            <v-text-field
              v-model="one_user.username"
              outlined
              class="base rounded-lg"
              dense
              height="44"
              clearable
              style="max-width: 400px"
              :disabled="fields_status"
            />
            <div class="label">{{ $t('userManagement.child.lang') }}</div>
            <v-select
              :items="lang_list"
              v-model="one_user.lang" append-icon="mdi-chevron-down"
              outlined
              height="44"
              class="base rounded-lg"
              dense
              clearable
              :disabled="fields_status"
              style="max-width: 400px;"
            >
              <template #selection="{item, index}">
                <v-img :src="item.icon" max-width="22" class="mr-4" contain/>
                {{ item.title }}
              </template>
              <template #item="{item}">
                <v-img :src="item.icon" max-width="22" class="mr-4" contain/>
                {{ item.title }}
              </template>
            </v-select>
          </v-col>
          <v-col>
            <div class="label">ID</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.id"
              dense
              height="44"
              disabled
              style="max-width: 400px"
            />
            <div class="label">{{ $t('userManagement.child.lastName') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.lastName"
              dense
              height="44"
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="label">{{ $t('userManagement.child.eMail') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.email"
              dense
              height="44"
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="label">{{ $t('userManagement.child.registeredDate') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.registeredDate"
              dense
              height="44"
              disabled
              style="max-width: 400px"
            />
          </v-col>
          <v-col>
            <div class="label">{{ $t('userManagement.child.firstName') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.firstName"
              dense
              height="44"
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="label">{{ $t('userManagement.child.phoneNumber') }}</div>
            <v-text-field
              outlined
              class="base rounded-lg"
              v-model="one_user.phoneNumber"
              dense
              height="44"
              :disabled="fields_status"
              style="max-width: 400px"
            />
            <div class="label">{{ $t('userManagement.child.status') }}</div>
            <v-select
              outlined
              class="base rounded-lg"
              v-model="one_user.status"
              dense
              height="44"
              :items="status_list"
              append-icon="mdi-chevron-down"
              disabled
              style="max-width: 400px"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="#7631FF"
          dark
          class="text-capitalize font-weight-medium mx-3 mb-4"
          width="150"
          @click="saveChanges"
        >{{ $t('userManagement.child.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

export default {
  components: {Breadcrumbs},
  data() {
    return {
      map_links: [
        {
          text: this.$t('userManagement.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('userManagement.child.userManagement'),
          disabled: false,
          to: this.localePath('/user-management'),
          icon: true
        },
        {
          text: this.$t('userManagement.child.details'),
          disabled: true,
          to: this.localePath(`/user-management/${this.$route.params.id}`),
          icon: false
        },
      ],
      fields_status: true,
      lang_list: [
        {title: "EN", code: "en", icon: "/us.svg"},
        {title: "UZ", code: "uz", icon: "/uz.svg"},
        {title: "RU", code: "ru", icon: "/ru.svg"},
      ],
      user_data: {
        photo: null,
        firstname: '',
        lastname: '',
        phone: '',
        username: '',
        email: '',
        lang: {},
        gender: ''
      },
      one_user: {},
      status_list: ['ACTIVE', 'DISABLED', 'PENDING'],
      avatar: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/currentUser'
    })
  },
  watch: {
    currentUser(val) {
      this.one_user = JSON.parse(JSON.stringify(val))
      const langFull = () => {
        switch (this.one_user.lang) {
          case 'UZ':
            return {title: "UZ", code: "uz", icon: "/uz.svg"}
          case 'RU':
            return {title: "RU", code: "ru", icon: "/ru.svg"}
          case 'EN':
            return {title: "EN", code: "en", icon: "/us.svg"}
        }
      }
      this.one_user.lang = langFull()
    }
  },
  methods: {
    ...mapActions({
      updateUser: "users/updateUser"
    }),
    handleFileImport() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.avatar = e.target.files[0];
      if (this.avatar !== undefined) {
        this.one_user.photo = window.URL.createObjectURL(this.avatar);
      }
    },
    saveChanges() {
      let data = JSON.parse(JSON.stringify(this.one_user))
      data.lang = data.lang.title;
      ['registeredDate', 'password', 'status'].forEach(e => delete data[e])
      if (typeof this.avatar === "object") {
        data.photo = this.avatar
      } else data.photo = null
      this.updateUser(data);
    },
    langFlag(lang) {
      switch (lang) {
        case 'UZ':
          return '/flag-uz.svg';
        case 'RU':
          return '/flag-ru.svg';
        case 'EN':
          return '/flag-en.svg';
      }
    },
  },
  mounted() {
    const id = this.$route.params.id
    this.$store.dispatch('users/getOneUser', id)
  }
}
</script>

<style lang="scss">
.overlay {
  position: relative;
  max-width: 120px;

  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    max-width: 120px;
    opacity: 0;
    transition: all linear 0.2s;
  }

  &:hover::after {
    content: '';
    opacity: 1;
  }

  > .v-icon {
    opacity: 0;
  }

  &:hover > .v-icon {
    opacity: 1;
  }
}

.v-btn--outlined {
  border: 1px solid;
}

.base-color {
  color: #7631FF;
}
</style>
