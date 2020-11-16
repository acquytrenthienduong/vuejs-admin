<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Reservation in week</h4>
            <p class="category"></p>
            <h4>Total: {{ totalInWeek }}</h4>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Email Subscription</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 10 days ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          :chart-data="dataCompletedTasksChart.data"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">Completed Tasks</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              campaign sent 26 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Money</p>
            <h3 class="title">${{ totalMoney }}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <p class="category">This Month</p>
            <h3 class="title">${{ moneyMonth }}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <p class="category">This Week</p>
            <h3 class="title">${{ moneyInWeek }}</h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>attach_money</md-icon>
          </template>

          <template slot="content">
            <p class="category">Today</p>
            <h3 class="title">${{ moneyToday }}</h3>
          </template>
          <!-- 
          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template> -->
        </stats-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components";
import axios from "axios";
export default {
  components: {
    StatsCard,
    ChartCard,
  },
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[0, 0, 0, 0, 0, 0, 0]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 8, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },

      totalMoney: 0,
      moneyInWeek: 0,
      totalInWeek: 0,
      moneyToday: 0,
      moneyMonth: 0,
    };
  },
  methods: {
    loadReservationInWeek() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();

      var current_day = dateRaw.getDay();

      // Biến lưu tên của thứ
      var day_name = "";
      let from = "";
      let to = "";
      let temp = parseInt(dt, 10);
      let start;
      let end;
      // Lấy tên thứ của ngày hiện tại
      switch (current_day) {
        case 0:
          start = temp;
          end = temp + 6;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 1:
          start = temp - 1;
          end = temp + 5;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 2:
          start = temp - 2;
          end = temp + 4;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 3:
          start = temp - 3;
          end = temp + 3;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 4:
          start = temp - 4;
          end = temp + 2;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 5:
          start = temp - 5;
          end = temp + 1;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 6:
          start = temp - 6;
          end = temp;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
      }

      axios
        .get("http://localhost:8000/findReservation/" + from + "/" + to)
        .then((response) => {
          // console.log(response);
          this.totalInWeek = response.data.length;
          this.convertToChartData(response.data);
        });
    },

    convertToChartData(array) {
      // console.log("array", array);

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
      let x = [[0, 0, 0, 0, 0, 0, 0]];

      array.forEach((element) => {
        let day = new Date(element.reservation_date);
        let thutrongtuan = days[day.getDay()];
        switch (thutrongtuan) {
          case "Sunday":
            // this.dailySalesChart.data.series[0][0]++;
            x[0][6]++;
            break;
          case "Monday":
            // this.dailySalesChart.data.series[0][1]++;
            x[0][0]++;
            break;
          case "Tuesday":
            // this.dailySalesChart.data.series[0][2]++;
            x[0][1]++;
            break;
          case "Wednesday":
            // this.dailySalesChart.data.series[0][3]++;
            x[0][2]++;
            break;
          case "Thursday":
            // this.dailySalesChart.data.series[0][4]++;
            x[0][3]++;
            break;
          case "Friday":
            // this.dailySalesChart.data.series[0][5]++;
            x[0][4]++;
            break;
          case "Saturday":
            // this.dailySalesChart.data.series[0][6]++;
            x[0][5]++;
            break;
        }
      });
      this.dailySalesChart.data.series = x;
      // console.log(this.dailySalesChart.data.series);
    },

    loadTotalBill() {
      axios.get("http://localhost:8000/findAllBill").then((response) => {
        // console.log("getlogin ", response);
        response.data.forEach((data) => {
          this.totalMoney += data.total_money;
        });
      });
    },

    loadMoneyInWeek() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();

      var current_day = dateRaw.getDay();

      // Biến lưu tên của thứ
      var day_name = "";
      let from = "";
      let to = "";
      let temp = parseInt(dt, 10);
      let start;
      let end;
      // Lấy tên thứ của ngày hiện tại
      switch (current_day) {
        case 0:
          start = temp;
          end = temp + 6;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 1:
          start = temp - 1;
          end = temp + 5;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 2:
          start = temp - 2;
          end = temp + 4;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 3:
          start = temp - 3;
          end = temp + 3;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 4:
          start = temp - 4;
          end = temp + 2;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 5:
          start = temp - 5;
          end = temp + 1;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
        case 6:
          start = temp - 6;
          end = temp;
          from = year + "-" + month + "-" + start;
          to = year + "-" + month + "-" + end;
          break;
      }
      axios
        .get("http://localhost:8000/findBill/" + from + "/" + to)
        .then((response) => {
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

      axios.get("http://localhost:8000/findBillToday").then((response) => {
        // console.log("today  ", response);
        response.data.forEach((data) => {
          this.moneyToday += data.total_money;
        });
      });
    },

    loadMoneyMonth() {
      axios.get("http://localhost:8000/findBillMonth").then((response) => {
        // console.log("today  ", response);
        response.data.forEach((data) => {
          this.moneyMonth += data.total_money;
        });
      });
    },

    // testGetLogin() {
    //   axios.defaults.withCrendentails = true;
    //   axios.get("http://localhost:8000/loginReceptionist").then((response) => {
    //     console.log("getlogin ", response);
    //   });
    // },
  },
  mounted() {
    this.loadReservationInWeek();
    // this.testGetLogin();
    // this.convertToChartData();
    this.loadTotalBill();
    this.loadMoneyInWeek();
    this.loadMoneyToday();
    this.loadMoneyMonth();
  },
  // watch: {
  //   "dailySalesChart.data.series": function(val) {
  //     console.log("val", val);
  //     // this.dailySalesChart.data.series = val;
  //   },
  // },
};
</script>
