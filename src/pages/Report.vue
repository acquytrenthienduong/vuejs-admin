<template>
  <div>
    <v-card-text>
      <v-card-title> Lastest Visit </v-card-title>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.total_money="{ item }">
          <span>{{ item.total_money | priceVndFormat }}</span>
        </template>
      </v-data-table>
    </v-card-text>
    <v-row data-app align="center" class="centerx">
      <v-col class="d-flex" cols="12" sm="8">
        <!-- <v-select :items="items"></v-select> -->
      </v-col>
      <v-col class="d-flex" cols="12" sm="2">
        <v-select
          :items="items"
          item-text="name"
          item-value="value"
          label="Filter"
          single-line
          v-model="selectedFilter"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="2">
        <download-excel
          class="btn btn-default floatright"
          :data="json_data"
          :fields="json_fields"
          worksheet="My Worksheet"
          name="report.xls"
        >
          <!-- Download Excel (you can customize this with html code!) -->
          <v-btn color="grey darken-2" dark> Download Excel </v-btn>
        </download-excel>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import axios from "axios";
import config from "../config/config";

Vue.component("downloadExcel", JsonExcel);

export default {
  data() {
    return {
      host: config.config.host,
      items: [
        { name: "Ngày", value: 1 },
        { name: "Tháng", value: 2 },
        { name: "Tất cả", value: 3 },
      ],
      selectedFilter: 3,
      json_fields: {
        "Date bill ": "date",
        total_money: "reservation.sub_service.money",
        Name: "reservation.customer.name",
        Time: "reservation.sub_service.time",
        Service: "reservation.sub_service.name",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      headers: [
        {
          text: "Name",
          align: "start",
          // sortable: false,
          value: "reservation.customer.name",
        },
        {
          text: "Time",
          value: "reservation.sub_service.time",
        },
        { text: "Service", value: "reservation.sub_service.name" },
        { text: "Date", value: "date" },
        { text: "Money", value: "reservation.sub_service.money" },
      ],
      data: [],
    };
  },

  methods: {
    loadData() {
      axios
        .get(this.host + "/findAllBill")
        .then((response) => (this.json_data = response.data));
    },

    loadData1() {
      axios.get(this.host + "/findAllBill").then((response) => {
        this.data = response.data;
      });
    },
    loadDataToDay() {
      axios.get(this.host + "/findBillToday").then((response) => {
        this.data = response.data;
      });
    },
    loadDataMonth() {
      axios.get(this.host + "/findBillMonth").then((response) => {
        this.data = response.data;
      });
    },
  },

  mounted() {
    this.loadData();
    this.loadData1();
  },

  watch: {
    selectedFilter: function (val) {
      if (val === 1) {
        this.loadDataToDay();
      } else if (val === 2) {
        this.loadDataMonth();
      } else {
        this.loadData1();
      }
    },
  },
};
</script>
<style scoped>
.floatright {
  float: right;
}

.centerx {
  display: flex !important;
  align-items: center !important;
}
</style>
