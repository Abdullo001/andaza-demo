import Vue from 'vue';

export default (context, inject) => {
  Vue.mixin({
    computed: {
      formRules() {
        return {
          required: (value) => !!value || 'This item is required',
          phone: val => /^[0-9]{13}$/.test(val) || "Write here only phone number",
          onlyNumber: v => !v || /^\d+$/.test(v) || 'This field only accept numbers',
          limitImage20: v => !v || v.size < 20000000 || 'Image size should be less than 20 MB!',
          limitImage10: v => !v || v.size < 10000000 || 'Image size should be less than 10 MB!',
          confirmPassword: (a, b) => a === b || 'Password must match',
          email:  (v) => {
            if(v)
              return v && !!v.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || 'Email not valid'
            else
              return true
          },
        }
      },
      formatAmount() {
        return {
          amount: (sum) => (sum / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ,')
        }
      },
      statusEnums() {
        return ['ACTIVE', 'DISABLED', 'PENDING']
      },
      statusColor() {
        return {
          color(color) {
            switch (color) {
              case 'ACTIVE': return '#10BF41'
              case 'DISABLED': return '#FF4E4F'
              case 'PENDING': return 'amber'
              case 'UNBLOCKED': return '#10BF41'
              case 'BLOCKED': return '#FF4E4F'
            }
          },
          modelColor(color) {
            switch (color) {
              case 'Finished': return '#10BF41'
              case 'Cancelled': return '#FF4E4F'
              case 'Pending': return 'amber'
              case 'In process': return 'blue'
            }
          },
          licenseColor(color) {
            switch (color) {
              case 'Yes': return '#10BF41'
              case 'No': return '#FF4E4F'

            }
          },
        }

      },
    }
  })

}
