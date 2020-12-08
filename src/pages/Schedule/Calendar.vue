<template>
  <div id="app">
    <v-app id="inspire" class="calendar_quang_anh">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64" class="display-flex">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <AddNewReservationDialog
                :reload="loadData"
              ></AddNewReservationDialog>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
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
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <h3>Service: {{ selectedEvent.serviceName }}</h3>
                </v-card-text>
                <v-card-text>
                  <h4>Start: {{ selectedEvent.start }}</h4>
                  <h4>End: {{ selectedEvent.checkout_time }}</h4>
                </v-card-text>
                <v-card-actions
                  v-if="selectedEvent.isPassed"
                  class="footer-card"
                >
                  <Bill
                    v-if="!selectedEvent.isPassed"
                    :event="selectedEvent"
                  ></Bill>
                  <Bill
                    v-if="selectedEvent.isPassed"
                    :event="selectedEvent"
                    :isPassed="selectedEvent.isPassed"
                  ></Bill>
                  <v-btn disabled text color="secondary" @click="Remove">
                    Remove
                  </v-btn>
                </v-card-actions>
                <v-card-actions
                  v-if="!selectedEvent.isPassed"
                  class="footer-card"
                >
                  <!-- <v-btn text color="secondary" @click="updateReservation">
                    Update
                  </v-btn> -->
                  <Bill :event="selectedEvent" :reload="loadData"></Bill>

                  <v-btn text color="secondary" @click="Remove">
                    Remove
                  </v-btn>
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
                <v-btn color="primary" text @click="detelefail = false">
                  Close
                </v-btn>
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

    transFormData(data) {
      if (data) {
        data.forEach((element) => {
          let event = {};
          event.name = element.customer.name;
          event.reservation_id = element.reservation_id;
          event.start = element.reservation_date + " " + element.checkin_time;
          event.checkout_time = element.reservation_date;
          event.isPassed = this.compareDate(element.reservation_date);
          if (element.checkout_time != null) {
            event.checkout_time =
              element.reservation_date + " " + element.checkout_time;
          }
          event.color = "red";

          event.isCheck = false;
          event.status = 0;
          event.service = element.sub_service;
          event.serviceName = element.sub_service.name;
          event.serviceTime = element.sub_service.time;
          event.text = "Chưa Thanh Toán";
          if (element.status === 1) {
            event.color = "green";
            event.isCheck = true;
            // if (this.compareDate(element.reservation_date)) {
            //   event.color = "gray";
            // }
            event.text = "Đã Thanh Toán";
            event.status = 1;
          }

          this.events.push(event);
        });
      }
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
      // console.log("today", today.getFullYear() === dateRaw.getFullYear());
      // console.log("return ", today.getMonth() > dateRaw.getMonth());
      // console.log("dateRaw", dateRaw);

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
      axios
        .delete(
          this.host + "/deleteReservation/" + this.selectedEvent.reservation_id
        )
        .then((response) => {
          window.location.reload();
        })
        .catch((e) => {
          this.detelefail = true;
        });
    },
  },
  watch: {
    "selectedEvent.isCheck": function(val) {
      if (val) {
        this.selectedEvent.color = "green";
        this.selectedEvent.text = "Đã Thanh Toán";
        this.selectedEvent.status = 1;
      } else {
        this.selectedEvent.color = "red";
        this.selectedEvent.text = "Chưa Thanh Toán";
        this.selectedEvent.status = 0;
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
</style>
