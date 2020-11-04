<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey darken-2" dark v-bind="attrs" v-on="on">
          View Bill
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Bill</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Customer Name"
                  v-model="event.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Service Name"
                  v-model="event.service.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Money"
                  v-model="event.service.money"
                  prefix="$"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Time"
                  v-model="event.service.time"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Checkin Time"
                  v-model="event.start"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Checkout Time"
                  v-model="event.checkout_time"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="footer-card">
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="createBill">
            Create Bill
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="successdialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Create Bill Success</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="successdialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="faildialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Bill Da Dc Tao ROI</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="faildialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  props: {
    reload: {
      type: Function,
    },
    event: {
      type: Object,
    },
  },
  data: () => ({
    dialog: false,
    errors: [],
    successdialog: false,
    faildialog: false,
  }),
  methods: {
    eventload() {
      console.log(this.event);
    },

    createBill() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();

      let time = hour + ":" + minute + ":" + second;

      let date = year + "-" + month + "-" + dt;
      console.log("time", time);
      console.log("date", date);

      axios
        .post("http://localhost:8000/createBill", {
          total_money: this.event.service.money,
          time: time,
          date: date,
          status: 1,
          payment_method_payment_method_id: 1,
          reservation_reservation_id: this.event.reservation_id,
          sub_service_sub_service_id: this.event.service.service_service_id,
        })
        .then((response) => {
          console.log("res", response);
          if (response.status === 200) {
            this.successdialog = true;
          } else {
            this.faildialog = true;
          }
        })
        .catch((e) => {
          this.faildialog = true;
        });
    },
  },
  mounted() {
    this.eventload();
  },
};
</script>

<style scoped>
.footer-card {
  display: flex;
  justify-content: space-between;
}
</style>
