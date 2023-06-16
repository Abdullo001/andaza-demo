<template >
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title
        class="d-flex w-full align-center justify-space-between "
      >
        <div>Remaining quantity for dom.market</div>
        
        <v-btn
              
              elevation="0"
              color="#7631FF"
              class="text-capitalize rounded-lg "
              width="130"
              height="44"
              dark
            >
            <v-icon>mdi-plus</v-icon> Add Info
        </v-btn>
      </v-toolbar-title>
    </v-toolbar>

    <table 
      border="1px solid #E9EAEB" 
      cellspacing="0" 
      
    >
      <thead>
        <tr>
          <th rowspan="2">Color</th>
          <th :colspan="tableColumn.length">1 sort</th>
          <th rowspan="2">2 sort</th>
        </tr>
        <tr>
          <th v-for="item in tableColumn" :key="item">{{ item }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item,idx) in tableRow" :key="item">
          <td>{{item}}</td>
          <td v-for="el in tableColumn" :key="el" class="p0">
            <v-text-field
                solo
                hide-details
                placeholder="0.0"
                flat
                class="pa-0 ma-0 table-field"
                />
          </td>
          <td  v-if="idx<=0" :rowspan="tableRow.length">50</td>
         

        </tr>
        
      </tbody>

      <tfoot>
        <tr>
          <td>Total:</td>
          <td v-for="(item,idx) in tableTotal" :key="item" class="p0">
            <v-text-field
                solo
                v-model="tableTotal[idx]"
                hide-details
                placeholder="0.0"
                flat
                class="pa-0 ma-0 table-field" 
                readonly
                />
          </td>
          
          <td>
            <v-btn
              outlined
              elevation="0"
              color="#7631FF"
              class="text-capitalize rounded-lg font-weight-bold"
              width="130"
              height="44"
              
            >
          Save
        </v-btn>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tableColumn:[
        "98","98","98","98","98",
      ],
      tableRow:[
        "Red",
        "Black",
        "Blue",
      ],

      tableTotal:[
        "800",
        "900",
        "1000",
        "1100",
        "1200",
      ]

    }
  }
}
</script>
<style lang="scss" scoped>
  table{
    border-color: #E9EAEB50;
    line-height: 30px;
    font-size: 16px;

    th,td{
      padding:0 16px;
      color: #1D2433;
      
    }

    thead{
      background-color: #F4F5FA;

      th{
        font-weight: 500;
        color:#6B7280

      }

    }

    tfoot{
      font-weight: 700;
    }

    .p0{
      padding:0 !important;
    }


  }

</style>