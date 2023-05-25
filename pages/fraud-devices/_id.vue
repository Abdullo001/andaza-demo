<template>
  <div>
    <Breadcrumbs :maps="map_links"/>
    <v-card color="#fff" elevation="0">
      <v-card-title class="d-flex justify-space-between">
        <div>45687</div>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form lazy-validation ref="device_info" v-model="valid">
          <v-row>
            <v-col>
              <div class="label mt-4">{{ $t('fraudDevices.child.deviceId') }}</div>
              <v-text-field
                v-model="device.deviceId"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
              <div class="label mt-4">{{ $t('fraudDevices.child.status') }}</div>
              <v-select
                v-model="device.status"
                :items="status_enums"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
                append-icon="mdi-chevron-down"
              />
              <div class="label mt-4">{{ $t('fraudDevices.child.reason') }}</div>
              <v-text-field
                v-model="device.reason"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
            </v-col>
            <v-col>
              <div class="label mt-4">{{ $t('fraudDevices.child.deviceN') }}</div>
              <v-text-field
                v-model="device.deviceNumber"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
              <div class="label mt-4">{{ $t('fraudDevices.child.blockedTime') }}</div>
              <v-text-field
                v-model="device.blockedDate"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
              <div class="label mt-4">{{ $t('fraudDevices.child.deviceType') }}</div>
              <v-text-field
                v-model="device.deviceType"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
            </v-col>
            <v-col>
              <div class="label mt-4">{{ $t('fraudDevices.child.blockedBy') }}</div>
              <v-text-field
                v-model="device.blockedBy"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              />
              <div class="label mt-4">{{ $t('fraudDevices.child.unblockedTime') }}</div>
              <v-text-field
                v-model="device.unblockedDate"
                outlined
                hide-details
                height="44"
                class="rounded-lg base"ed
                dense
                clearable
                style="max-width: 400px"
                :disabled="fields_status"
              >
                <template #append>
                  <v-img src="/date-icon.svg"/>
                </template>
              </v-text-field>
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
        >{{ $t('fraudDevices.child.save') }}
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
          text: this.$t('fraudDevices.child.home'),
          disabled: false,
          to: this.localePath('/'),
          icon: true
        },
        {
          text: this.$t('fraudDevices.child.devices'),
          disabled: false,
          to: this.localePath('/fraud-devices'),
          icon: true
        },
        {
          text: this.$t('fraudDevices.child.details'),
          disabled: true,
          to: this.localePath('/fraud-device/2'),
          icon: false
        },
      ],
      fields_status: true,
      status_list: ['ACTIVE', 'DISABLED', 'PENDING'],
      valid: true,
      device: {
        deviceId: '48966',
        status: 'BLOCKED',
        reason: 'Device is blocked because of too many request',
        deviceNumber: '3548',
        blockedDate: '15.11.2022 17:16:32',
        deviceType: 'WEB',
        blockedBy: 'John Doe',
        unblockedDate: '16.11.2022 17:16:32'
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
