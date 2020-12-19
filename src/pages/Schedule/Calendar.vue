<template>
  <div id="app">
    <v-app id="inspire" class="calendar_quang_anh">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64" class="display-flex">
            <v-toolbar flat>
              <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                Hôm Nay
              </v-btn>
              <AddNewReservationDialog :reload="loadData"></AddNewReservationDialog>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right> </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="700">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-if="selectedEvent.isPassed || selectedEvent.status === 1"
                    disabled
                    class="margin-top"
                    v-model="selectedEvent.isCheckIn"
                  ></v-checkbox>
                  <v-checkbox
                    v-if="!selectedEvent.isPassed && selectedEvent.status === 0"
                    class="margin-top"
                    v-model="selectedEvent.isCheckIn"
                  ></v-checkbox>
                </v-toolbar>
                <v-card-text>
                  <h3>Dịch vụ: {{ selectedEvent.serviceName }}</h3>
                  <h3>Thời gian: {{ selectedEvent.serviceTime }}</h3>
                </v-card-text>
                <v-card-text>
                  <h4>Ngày giờ hẹn: {{ selectedEvent.start }}</h4>
                  <h4>Giờ đến : {{ selectedEvent.reservation_time }}</h4>
                  <h4>Giờ kết thúc: {{ selectedEvent.checkout_time }}</h4>
                </v-card-text>
                <v-card-actions
                  v-if="selectedEvent.isPassed || !selectedEvent.isCheckIn"
                  class="footer-card"
                >
                  <Bill
                    v-if="!selectedEvent.isPassed && selectedEvent.isCheckIn"
                    :event="selectedEvent"
                  ></Bill>
                  <Bill
                    v-if="selectedEvent.isPassed || !selectedEvent.isCheckIn"
                    :event="selectedEvent"
                    :isPassed="selectedEvent.isPassed"
                  ></Bill>
                  <v-btn text color="secondary" @click="Remove"> Xóa Lịch </v-btn>
                </v-card-actions>
                <v-card-actions
                  v-if="!selectedEvent.isPassed && selectedEvent.isCheckIn"
                  class="footer-card"
                >
                  <!-- <v-btn text color="secondary" @click="updateReservation">
                    Update
                  </v-btn> -->
                  <Bill
                    :event="selectedEvent"
                    :reload="loadData"
                    :isPassed="selectedEvent.isPassed"
                    :isCheckIn="selectedEvent.isCheckIn"
                    @clicked="onClickChild"
                    @clicked1="onClickChild1"
                  ></Bill>

                  <v-btn text color="secondary" @click="Remove"> Xóa Lịch </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
          <v-dialog v-model="detelefail" max-width="500px">
            <v-card>
              <v-card-title>
                <span>Khong The Xoa Cuoc Hen Nay Vi Ban Da Tao Bill</span>
              </v-card-title>
              <v-card-actions>
                <v-btn color="primary" text @click="detelefail = false"> Đóng </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import AddNewReservationDialog from "../../components/Modal/AddNewReservationDialog";
import Bill from "../../components/Modal/Bill";
import config from "../../config/config";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  components: {
    AddNewReservationDialog,
    Bill,
  },
  data: () => ({
    allReservationDetail: null,
    focus: "",
    type: "week",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    checkbox: false,
    text: "",
    detelefail: false,
    host: config.config.host,
    role: localStorage.getItem("username"),
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get(this.host + "/getAllReservationAccess")
        .then((response) => this.transFormData(response.data));
    },

    onClickChild(value) {
      this.selectedEvent.color = value;
    },
    onClickChild1(value) {
      this.selectedEvent.checkout_time = value;
    },

    transFormData(data) {
      if (data) {
        console.log(data);
        this.events = [];
        data.forEach((element) => {
          let event = {};
          event.name = element.customer.name;
          event.customer_id = element.customer.customer_id;
          event.reservation_date = element.reservation_date;
          event.reservation_id = element.reservation_id;
          event.start = element.reservation_date + " " + element.checkin_time;
          let x = element.checkin_time.split(":");
          let b = parseInt(x[1], 10) + 1;
          event.end =
            element.reservation_date +
            " " +
            this.addMinutes(
              element.checkin_time,
              this.transform1(element.sub_service.time)
            ) +
            ":00";
          // event.checkout_time = element.reservation_date;

          event.isPassed = this.compareDate(element.reservation_date);
          if (element.checkout_time != null) {
            event.checkout_time = element.checkout_time;
          }
          event.color = "red";
          event.reservation_time = element.reservation_time;
          if (event.reservation_time != null) {
            event.isCheckIn = true;
          } else {
            event.isCheckIn = false;
          }

          event.isCheck = false;
          event.status = 0;
          event.service = element.sub_service;
          event.serviceName = element.sub_service.name;
          event.serviceTime = this.transform(element.sub_service.time);
          event.text = "Chưa Thanh Toán";
          if (element.status === 1) {
            event.color = "green";
            event.isCheck = true;
            event.text = "Đã Thanh Toán";
            event.status = 1;
          }

          this.events.push(event);
        });
      }
    },

    addMinutes(time, minsToAdd) {
      function D(J) {
        return (J < 10 ? "0" : "") + J;
      }
      var piece = time.split(":");
      var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

      return D(((mins % (24 * 60)) / 60) | 0) + ":" + D(mins % 60);
    },

    convertDate(date) {
      let dateRaw = new Date(date);
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours() - 7;
      let minute = dateRaw.getMinutes();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return year + "-" + month + "-" + dt + " " + hour + ":" + minute;
    },

    compareDate(date) {
      let today = new Date();
      let dateRaw = new Date(date);

      if (today.getFullYear() > dateRaw.getFullYear()) {
        return true;
      }

      if (today.getMonth() > dateRaw.getMonth()) {
        return true;
      }

      if (today.getDate() > dateRaw.getDate()) {
        return true;
      }

      return false;
      // console.log(today.getTime() === dateRaw.getTime());
      // return today.getTime() === dateRaw.getTime();
    },

    transform(time) {
      // var hms = "02:04:33";
      var a = time.split(":");

      // Hours are worth 60 minutes.
      var minutes = +a[0] * 60 + +a[1] + " phút";
      return minutes;
    },

    transform1(time) {
      // var hms = "02:04:33";
      var a = time.split(":");

      // Hours are worth 60 minutes.
      var minutes = +a[0] * 60 + +a[1];
      return minutes;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    Remove() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();

      let logTime =
        year + "-" + month + "-" + dt + " " + hour + ":" + minute + ":" + second;
      Swal.fire({
        title: "Xóa cuộc hẹn?",
        text: "Chắc chắn muốn xóa!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Đúng vậy!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(this.host + "/deleteReservation/" + this.selectedEvent.reservation_id)
            .then((response) => {
              window.location.reload();
              axios
                .post(
                  this.host + "/createNotification/" + this.selectedEvent.customer_id,
                  {
                    content:
                      "Chúng tôi rất tiếc khi phải từ chối cuộc hẹn của bạn " +
                      this.selectedEvent.reservation_date,
                  }
                )
                .then((response) => {});
              axios.post(this.host + "/createActivity", {
                content:
                  logTime +
                  " " +
                  this.role +
                  " đã xóa cuộc hẹn của khách hàng " +
                  this.selectedEvent.name,
              });
            })
            .catch((e) => {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Không xóa được cuộc hẹn này vì đã thanh toán rồi!",
              });
            });
        }
      });
    },

    updateReservation() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();
      console.log("checkin ", hour + ":" + minute + ":" + second);
      let checkin = hour + ":" + minute + ":" + second;

      axios
        .post(this.host + "/updateReservation/" + this.selectedEvent.reservation_id, {
          reservation_time: checkin,
        })
        .then((response) => {
          // this.selectedOpen = false;
          console.log(response);
          this.loadData();
        });
    },
  },
  watch: {
    "selectedEvent.isCheckIn": function (val) {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();
      let logTime =
        year + "-" + month + "-" + dt + " " + hour + ":" + minute + ":" + second;
      if (val) {
        this.updateReservation();
        this.selectedEvent.reservation_time = hour + ":" + minute + ":" + second;
        axios
          .post(this.host + "/createActivity", {
            content:
              logTime +
              " " +
              this.role +
              " đã tạo checkin cho khách hàng " +
              this.selectedEvent.name +
              " cuộc hẹn vào lúc " +
              hour +
              ":" +
              minute +
              ":" +
              second +
              " ngày " +
              dt +
              "-" +
              month +
              "-" +
              year,
          })
          .then(() => {});
      } else {
        // this.updateReservation();
        this.selectedEvent.reservation_time = null;
        axios
          .post(this.host + "/updateReservation/" + this.selectedEvent.reservation_id, {
            reservation_time: null,
          })
          .then((response) => {
            // this.selectedOpen = false;
            console.log(response);
            this.loadData();
          });
      }
      this.checkbox = val;
    },
  },
};
</script>

<style>
.display-flex {
  display: flex;
}
.v-menu__content--fixed {
  margin-left: 0px !important;
}
.calendar_quang_anh .v-menu__content {
  margin-left: -250px;
}
.footer-card {
  display: flex;
  justify-content: space-between;
}

.v-btn--contained {
  box-shadow: none !important;
}

.margin-top {
  margin-top: 20px !important;
}
</style>
