<template>
  <download-excel
    class="btn btn-default"
    :data="json_data"
    :fields="json_fields"
    worksheet="My Worksheet"
    name="report.xls"
  >
    Download Excel (you can customize this with html code!)
  </download-excel>
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
    };
  },

  methods: {
    loadData() {
      axios
        .get(this.host + "/findAllBill")
        .then((response) => (this.json_data = response.data));
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>
