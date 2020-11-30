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
      ></v-data-table>
    </v-card-text>
    <download-excel
      class="btn btn-default"
      :data="json_data"
      :fields="json_fields"
      worksheet="My Worksheet"
      name="report.xls"
    >
      Download Excel (you can customize this with html code!)
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
        total_money: "total_money",
        // "Telephone 2": {
        //   field: "phone.landline",
        //   callback: (value) => {
        //     return `Landline Phone - ${value}`;
        //   },
        // },
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
          text: "Date",
          align: "start",
          // sortable: false,
          value: "reservation_date",
        },
        { text: "Service", value: "sub_service.name" },
        { text: "Type", value: "" },
        { text: "Bill", value: "sub_service.time" },
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
      axios
        .get(this.host + "/findAllBill")
        .then((response) => console.log("findAllBill", response));
    },
  },

  mounted() {
    this.loadData();
    this.loadData1();
  },
};
</script>
