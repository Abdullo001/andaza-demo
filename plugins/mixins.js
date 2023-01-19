import Vue from 'vue';

export default (context, inject) => {
  Vue.mixin({
    computed: {
      formRules() {
        return {
          required: (value) => !!value || 'This item is required',
          phone: val => /^[0-9]{13}$/.test(val) || "Write here only phone number",
          onlyNumber: v => /^\d+$/.test(v) || 'This field only accept numbers',
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
              case 'ACTIVE': return 'green'
              case 'DISABLED': return 'red'
              case 'PENDING': return 'amber'
              case 'UNBLOCKED': return 'green'
              case 'BLOCKED': return 'red'
            }
          }
        }

      },
    }
  })

}
