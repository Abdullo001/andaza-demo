import Vue from 'vue';

export default (context, inject) => {
  Vue.mixin({
    computed: {
      formRules() {
        return {
          required: (value) => !!value || 'This item is required',
          phone: val => /^[0-9]{13}$/.test(val) || "Write here only phone number",
          onlyNumber: v => !v || /^[-+]?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(v) || 'This field only accept numbers',
          limitImage20: v => !v || v.size < 20000000 || 'Image size should be less than 20 MB!',
          limitImage10: v => !v || v.size < 10000000 || 'Image size should be less than 10 MB!',
          confirmPassword: (a, b) => a === b || 'Password must match',
          email: (v) => {
            if (v)
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
          prodColor(color) {
            switch (color) {
              case 'ACTIVE':
                return '#10BF41'
              case 'DISABLED':
                return '#FF4E4F'
              case 'FINISHED':
                return 'primary';
              case '':
                return 'grey'
            }
          },
          color(color) {
            switch (color) {
              case 'ACTIVE':
                return '#10BF41'
              case 'DISABLED':
                return '#FF4E4F'
              case 'PENDING':
                return 'amber'
              case 'UNBLOCKED':
                return '#10BF41'
              case 'BLOCKED':
                return '#FF4E4F'
              case 'CANCELED':
                return '#FF4E4F'
            }
            
          },

          licenseColor(color) {
            const status = color ? 'Yes' : 'No'
            switch (status) {
              case 'Yes':
                return '#10BF41'
              case 'No':
                return '#FF4E4F'
            }
          },

          orderColor(color) {
            switch (color) {
              case 'FINISHED':
                return '#10BF41'
              case 'CANCELED':
                return '#FF4E4F'
              case 'PENDING':
                return 'amber'
              case 'IN_PROCESS':
                return '#544B99'

            }
          },

          priorityColor(color) {
            switch (color) {
              case 'LOW':
                return '#10BF41'
              case 'MEDIUM':
                return 'amber'
              case 'HIGH':
                return '#FF4E4F'
            }
          },

          fabricOrderedStatus(color){
            switch (color) {
              case 'ORDERED':
                return '#10BF41'
              case 'CANCELLED':
                return '#FF4E4F'
              case 'PENDING':
                return 'amber'
              case 'FABRIC_GENERATED':
                return '#6df291'
              case 'RECEIVED':
                return '#1E7722'
            }
          },
          fabricsList(color){
            switch (color) {
              case 'ORDERED':
                return '#27C124'
              case 'CANCELLED':
                return '#FF0C0C'
              case 'RECEIVED':
                return '#1E7722'
              case 'PENDING':
                return '#FFE03C'
            }
          },
          shippingStatusColor(color){
            switch (color) {
              case 'IN_PROGRESS':
                return '#ECF017'
              case 'SHIPPED':
                return '#27C124'
            }
          },

          sampleStatusColor(color) {
            switch (color) {
              case "OK":
                return "#10BF41";
              case "EMPTY":
                return "#FF4E4F";
              case "IN_PROCESS":
                return "amber";
            }
          },

          fabricModelStatus(color){
            switch(color){
              case 'NOT_PLANNED':
                return '#FF4E4F'
              case 'PLANNED':
                return 'amber'
              case 'GENERATED_FABRIC':
                return '#6df291'
              case 'ORDERED':
                return '#10BF41'
              case 'CANCELLED':
                return '#FF4E4F'
            }
          },

          resultColor(color) {
            switch (color) {
              case 'OK':
                return '#10BF41'
              case 'PENDING':
                return 'amber'
              case 'REMAKE':
                return '#FF4E4F'
            }
          },

          subcontractColor(color) {
            switch (color) {
              case 'SENT':
                return '#6df291'
              case 'RECEIVED':
                return '#10BF41'
              case 'PENDING':
                return 'amber'

            }
          },
          inspectionStatus(color) {
            switch (color) {
              case 'OK':
                return '#10BF41'
              case 'NA':
                return '#6DF291'
              case 'PENDING':
                return 'amber'
              case 'REMAKE':
                return '#FF4E4F'

            }
          },
          commonStatus(color) {
            switch (color) {
              case 'FINISHED':
                return '#10BF41'
              case 'IN_PROCESS':
                return 'amber'
              case 'CANCELLED':
                return '#FF4E4F'
              default : return '#c2c8d1'

            }
          },
        }
      },
      pickerShortcuts() {
        return {
          shortcuts: [
            {
              text: "Cегодня",
              onClick(picker) {
                picker.$emit("pick", new Date());
              },
            },
            {
              text: "Вчера",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              },
            },
            {
              text: "Неделя",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              },
            },
          ]
        }
      },
    },

    methods:{
      formatLong(value) {
        return new Date(value).toLocaleString("en-GB").replace('/', '.').replace('/', '.')
      },
    }
  })
}
