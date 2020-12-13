<template>
  <div>
    <v-card-text>
      <v-card-title>
        Lastest Visit
      </v-card-title>
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
    <download-excel
      class="btn btn-default floatright"
      :data="json_data"
      :fields="json_fields"
      worksheet="My Worksheet"
      name="report.xls"
    >
      <!-- Download Excel (you can customize this with html code!) -->

      <v-btn color="grey darken-2" dark>
        Download Excel
      </v-btn>
    </download-excel>
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
        console.log("response.data", response.data);
        this.data = response.data;
      });
    },
  },

  mounted() {
    this.loadData();
    this.loadData1();
  },
};
</script>
<style>
.floatright {
  float: right;
}
</style>
