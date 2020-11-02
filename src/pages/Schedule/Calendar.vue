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
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-checkbox
                  v-model="selectedEvent.isCheck"
                  :label="`Trạng Thái: ${selectedEvent.text}`"
                ></v-checkbox>
                <v-card-text>
                  Service: <span v-html="selectedEvent.serviceName"></span
                  ><br />
                  TotalTime: <span v-html="selectedEvent.serviceTime"></span
                  ><br />
                  <!-- TimeLess: <span v-html="selectedEvent.TimeLess"></span><br /> -->
                </v-card-text>
                <v-card-text>
                  Start: <span v-html="selectedEvent.start"></span><br />
                  End: <span v-html="selectedEvent.checkout_time"></span>
                </v-card-text>
                <v-card-text>
                  <Bill></Bill>
                </v-card-text>
                <v-card-actions class="footer-card">
                  <v-btn text color="secondary" @click="updateReservation">
                    Update
                  </v-btn>
                  <v-btn text color="secondary" @click="Remove">
                    Remove
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import AddNewReservationDialog from "../../components/Modal/AddNewReservationDialog";
import Bill from "../../components/Modal/Bill";

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
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get("http://localhost:8000/getAllReservation")
        .then((response) => this.transFormData(response.data));
    },

    transFormData(data) {
      if (data) {
        data.forEach((element) => {
          let event = {};
          event.name = element.customer.account;
          event.reservation_id = element.reservation_id;
          event.start = element.reservation_date + " " + element.checkin_time;
          event.checkout_time = element.reservation_date;
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
          if (element.sub_service.type === 2) {
            console.log(element.sub_service.sesstion);
            event.serviceTime = element.sub_service.sesstion + " Buổi";
          }
          event.text = "Chưa Thanh Toán";
          if (element.status === 1) {
            event.color = "green";
            event.isCheck = true;
            event.text = "Đã Thanh Toán";
            event.status = 1;
          }
          if (element.sub_service.type === 2 && element.status === 1) {
            event.TimeLess = element.sub_service.sesstion - 1;
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
    updateReservation() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();

      console.log(
        'year + "-" + month + "-" + dt',
        year + "-" + month + "-" + dt
      );
      axios
        .post(
          "http://localhost:8000/updateReservation/" +
            this.selectedEvent.reservation_id,
          {
            status: this.selectedEvent.status,
            checkout_time: hour + ":" + minute + ":" + second,
          }
        )
        .then((response) => {
          this.selectedOpen = false;
          this.loadData();
        });
    },
    Remove() {
      console.log("remove");
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
</style>
