<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <newchart-card :chartOptions="chartOptions">
          <template slot="content">
            <h4>Total: {{ totalInWeek }}</h4>
          </template>
        </newchart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <newchart-card :chartOptions="chartOptions1">
          <template slot="content">
            <h4>Total: {{ totalInYear }}</h4>
          </template>
        </newchart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <newchart-card :chartOptions="chartOptions2">
          <template slot="content">
            <h4>Total: {{ totalRegister }}</h4>
          </template>
        </newchart-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <h2 class="category">Total Money</h2>
            <h3 class="title">{{ totalMoney | priceVndFormat }}</h3>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <h2 class="category">This Month</h2>

            <h3 class="title">{{ moneyMonth | priceVndFormat }}</h3>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <h2 class="category">This Week</h2>
            <h3 v-if="moneyInWeek > 0" class="title">
              {{ moneyInWeek | priceVndFormat }}
            </h3>
            <h3 v-if="moneyInWeek === 0" class="title">0 ₫</h3>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <h2 class="category">Today</h2>
            <h3 v-if="moneyToday > 0" class="title">
              {{ moneyToday | priceVndFormat }}
            </h3>
            <h3 v-if="moneyToday === 0" class="title">0 ₫</h3>
          </template>
        </stats-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard } from "@/components";
import axios from "axios";
import config from "../config/config";
export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      host: config.config.host,

      chartOptions: {
        chart: {
          type: "line",
          height: 200,
        },
        title: {
          text: "Reservation in this week",
        },
        //colors: ['#ffffff'],
        series: [
          {
            name: "Reservation",
            data: [1, 3, 2, 4, 10, 6, 7], // sample data
          },
        ],
        xAxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
      },

      chartOptions1: {
        chart: {
          type: "line",
          height: 200,
        },
        title: {
          text: "Reservation in this year",
        },
        //colors: ['#ffffff'],
        series: [
          {
            name: "Reservation",
            data: [1, 3, 2, 4, 10, 6, 7, 10, 6, 7, 4, 6, 7], // sample data
          },
        ],
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
      },

      chartOptions2: {
        chart: {
          type: "line",
          height: 200,
        },
        title: {
          text: "Register in week",
        },
        //colors: ['#ffffff'],
        series: [
          {
            name: "Reservation",
            data: [1, 3, 2, 4, 10, 6, 7], // sample data
          },
        ],
        xAxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
      },
      totalMoney: 0,
      moneyInWeek: 0,
      totalInWeek: 0,
      moneyToday: 0,
      moneyMonth: 0,
      totalRegister: 0,
      totalInYear: 0,
    };
  },
  methods: {
    loadReservationInWeek() {
      let dateRaw = new Date();
      // let month = dateRaw.getMonth() + 1;
      var first = dateRaw.getDate() - dateRaw.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
      var firstday = new Date(dateRaw.setDate(first));
      var lastday = new Date(dateRaw.setDate(last));

      let monthFrom = firstday.getMonth() + 1;
      let monthTo = lastday.getMonth() + 1;

      let from = "";
      let to = "";
      from = firstday.getFullYear() + "-" + monthFrom + "-" + firstday.getDate();
      to = lastday.getFullYear() + "-" + monthTo + "-" + lastday.getDate();
      axios.get(this.host + "/findReservation/" + from + "/" + to).then((response) => {
        this.totalInWeek = response.data.length;
        this.convertToChartData(response.data);
      });
    },
    loadRegisterInWeek() {
      let dateRaw = new Date();
      // let month = dateRaw.getMonth() + 1;
      var first = dateRaw.getDate() - dateRaw.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
      var firstday = new Date(dateRaw.setDate(first));
      var lastday = new Date(dateRaw.setDate(last));

      let monthFrom = firstday.getMonth() + 1;
      let monthTo = lastday.getMonth() + 1;

      let from = "";
      let to = "";
      from = firstday.getFullYear() + "-" + monthFrom + "-" + firstday.getDate();
      to = lastday.getFullYear() + "-" + monthTo + "-" + lastday.getDate();
      axios.get(this.host + "/findRegister/" + from + "/" + to).then((response) => {
        this.totalRegister = response.data.length;
        this.convertToChartData2(response.data);
      });
    },

    loadReservationInYear() {
      axios.get(this.host + "/getAllReservationAccess").then((response) => {
        this.totalInYear = response.data.length;
        this.convertToChartData1(response.data);
      });
    },

    convertToChartData(array) {
      let week = [];
      var now = new Date();
      var current_day = now.getDay();
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      // var day = days[now.getDay()];
      let x = [
        {
          name: "Reservation",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ];

      array.forEach((element) => {
        let day = new Date(element.reservation_date);
        let thutrongtuan = days[day.getDay()];

        switch (thutrongtuan) {
          case "Sunday":
            // this.dailySalesChart.data.series[0][0]++;
            x[0].data[6]++;
            break;
          case "Monday":
            // this.dailySalesChart.data.series[0][1]++;
            x[0].data[0]++;
            break;
          case "Tuesday":
            // this.dailySalesChart.data.series[0][2]++;
            x[0].data[1]++;
            break;
          case "Wednesday":
            // this.dailySalesChart.data.series[0][3]++;
            x[0].data[2]++;
            break;
          case "Thursday":
            // this.dailySalesChart.data.series[0][4]++;
            x[0].data[3]++;
            break;
          case "Friday":
            // this.dailySalesChart.data.series[0][5]++;
            x[0].data[4]++;
            break;
          case "Saturday":
            // this.dailySalesChart.data.series[0][6]++;
            x[0].data[5]++;
            break;
        }
      });
      // this.dailySalesChart.data.series = x;
      this.chartOptions.series = x;
    },

    convertToChartData1(array) {
      var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      let x = [
        {
          name: "Reservation",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ];

      array.forEach((element) => {
        let month = new Date(element.reservation_date);
        let thutrongtuan = months[month.getMonth()];
        switch (thutrongtuan) {
          case 1:
            x[0].data[0]++;
            break;
          case 2:
            x[0].data[1]++;
            break;
          case 3:
            x[0].data[2]++;
            break;
          case 4:
            x[0].data[3]++;
            break;
          case 5:
            x[0].data[4]++;
            break;
          case 6:
            x[0].data[5]++;
            break;
          case 7:
            x[0].data[6]++;
            break;
          case 8:
            x[0].data[7]++;
            break;
          case 9:
            x[0].data[8]++;
            break;
          case 10:
            x[0].data[9]++;
            break;
          case 11:
            x[0].data[10]++;
            break;
          case 12:
            x[0].data[11]++;
            break;
        }
      });

      this.chartOptions1.series = x;
    },

    convertToChartData2(array) {
      let week = [];
      var now = new Date();
      var current_day = now.getDay();
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      // var day = days[now.getDay()];
      let x = [
        {
          name: "Register",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ];

      array.forEach((element) => {
        let day = new Date(element.createAt);
        let thutrongtuan = days[day.getDay()];

        switch (thutrongtuan) {
          case "Sunday":
            // this.dailySalesChart.data.series[0][0]++;
            x[0].data[6]++;
            break;
          case "Monday":
            // this.dailySalesChart.data.series[0][1]++;
            x[0].data[0]++;
            break;
          case "Tuesday":
            // this.dailySalesChart.data.series[0][2]++;
            x[0].data[1]++;
            break;
          case "Wednesday":
            // this.dailySalesChart.data.series[0][3]++;
            x[0].data[2]++;
            break;
          case "Thursday":
            // this.dailySalesChart.data.series[0][4]++;
            x[0].data[3]++;
            break;
          case "Friday":
            // this.dailySalesChart.data.series[0][5]++;
            x[0].data[4]++;
            break;
          case "Saturday":
            // this.dailySalesChart.data.series[0][6]++;
            x[0].data[5]++;
            break;
        }
      });
      this.chartOptions2.series = x;
    },

    loadTotalBill() {
      axios.get(this.host + "/findAllBill").then((response) => {
        response.data.forEach((data) => {
          this.totalMoney += data.total_money;
        });
      });
    },

    loadMoneyInWeek() {
      let dateRaw = new Date();
      var first = dateRaw.getDate() - dateRaw.getDay();
      var last = first + 6;
      var firstday = new Date(dateRaw.setDate(first));
      var lastday = new Date(dateRaw.setDate(last));
      let monthFrom = firstday.getMonth() + 1;
      let monthTo = lastday.getMonth() + 1;
      let from = "";
      let to = "";
      from = firstday.getFullYear() + "-" + monthFrom + "-" + firstday.getDate();
      to = lastday.getFullYear() + "-" + monthTo + "-" + lastday.getDate();
      axios.get(this.host + "/findBill/" + from + "/" + to).then((response) => {
        response.data.forEach((data) => {
          this.moneyInWeek += data.total_money;
        });
      });
    },

    loadMoneyToday() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();

      let today = year + "-" + month + "-" + dt;

      axios.get(this.host + "/findBillToday").then((response) => {
        response.data.forEach((data) => {
          this.moneyToday += data.total_money;
        });
      });
    },

    loadMoneyMonth() {
      axios.get(this.host + "/findBillMonth").then((response) => {
        response.data.forEach((data) => {
          this.moneyMonth += data.total_money;
        });
      });
    },
  },
  mounted() {
    this.loadReservationInWeek();
    this.loadTotalBill();
    this.loadMoneyInWeek();
    this.loadMoneyToday();
    this.loadMoneyMonth();
    this.loadRegisterInWeek();
    this.loadReservationInYear();
  },
};
</script>
