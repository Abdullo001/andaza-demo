<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card color="#fff" elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>45687</div>
        <div>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg mr-4"
          >
            <v-img src="/trash.svg" class="mr-1"/>
            {{ $t('fraudUsers.child.delete') }}
          </v-btn>
          <v-btn
            outlined
            elevation="0"
            color="#777C85"
            class="text-capitalize rounded-lg"
            @click="fields_status = !fields_status"
            :color="!fields_status ? 'green' : null"
          >
            <v-img :src="fields_status ? '/edit.svg' : '/edit-active.svg'" class="mr-1"/>
            {{ $t('fraudUsers.child.edit') }}
          </v-btn>
        </div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form lazy-validation ref="device_info" v-model="valid">
          <v-row>
            <v-col>
              <div class="mb-1 text-body-1 mt-4">{{ $t('fraudUsers.child.accountId') }}</div>
              <v-text-field
                v-model="account.accountId"
                filled
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
              <div class="mb-1 text-body-1 mt-4">{{ $t('fraudUsers.child.blockedBy') }}</div>
              <v-text-field
                v-model="account.blockedBy"
                filled
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />

            </v-col>
            <v-col>
              <div class="mb-1 text-body-1 mt-4">{{ $t('fraudUsers.child.blockedTime') }}</div>
              <v-text-field
                v-model="account.blockedDate"
                filled
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
              <div class="mb-1 text-body-1 mt-4">{{ $t('fraudUsers.child.unblockedTime') }}</div>
              <v-text-field
                v-model="account.unblockedDate"
                filled
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
            </v-col>
            <v-col>
              <div class="mb-1 text-body-1 mt-4">{{ $t('fraudUsers.child.status') }}</div>
              <v-select
                v-model="account.status"
                :items="status_enums"
                filled
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
                append-icon="mdi-chevron-down"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="#7631FF"
          dark
          class="text-capitalize font-weight-medium mx-3 mb-4"
          width="150"
          @click="saveChanges"
        >{{ $t('fraudUsers.child.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  data() {
    return {
      map_links: [
        {
          text: this.$t('fraudUsers.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('fraudUsers.child.account'),
          disabled: false,
          to: this.localePath('/fraud-users'),
          icon: true
        },
        {
          text: this.$t('fraudUsers.child.details'),
          disabled: true,
          to: this.localePath('/fraud-account/2'),
          icon: false
        },
      ],
      fields_status: true,
      status_list: ['ACTIVE', 'DISABLED', 'PENDING'],
      valid: true,
      account: {
        accountId: '48966',
        status: 'BLOCKED',
        blockedDate: '15.11.2022 17:16:32',
        unblockedDate: '16.11.2022 17:16:32',
        blockedBy: 'John Doe',
      },
      status_enums: ['BLOCKED', 'UNBLOCKED']
    }
  },
  computed: {
    ...mapGetters({})
  },
  watch: {},
  methods: {
    ...mapActions({
      updateUser: "users/updateUser"
    }),
    saveChanges() {
    }
  },
  mounted() {
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
