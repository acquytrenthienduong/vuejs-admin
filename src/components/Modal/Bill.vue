<template>
  <v-row>
    <v-btn v-if="!isPassed && isCheckIn" @click.stop="dialog = true"> Thanh toán </v-btn>
    <v-btn
      style="background-color='#f5f5f5'"
      v-if="isPassed || !isCheckIn"
      disabled
      @click.stop="dialog = true"
    >
      Thanh toán
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Hóa đơn</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  disabled
                  class="color"
                  label="Tên khách hàng"
                  v-model="event.name"
                ></v-text-field>
              </v-col>
              <!-- <h3>Customer Name: {{event.name}}</h3> -->
              <v-col cols="12">
                <v-text-field
                  disabled
                  label="Dịch vụ"
                  v-model="event.service.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  disabled
                  label="Số tiền"
                  v-model="event.service.money"
                  prefix="$"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  disabled
                  label="Thời gian"
                  v-model="event.service.time"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  disabled
                  label="Giờ đến"
                  v-model="event.reservation_time"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  disabled
                  label="Giờ hoàn thành"
                  v-model="event.checkout_time"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="footer-card">
          <v-btn color="blue darken-1" text @click="dialog = false"> Đóng </v-btn>
          <v-btn color="blue darken-1" text @click="createBill"> Tạo hóa đơn </v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="successdialog" max-width="500px">
        <v-card>
          <v-card-title>
            <md-icon>mood</md-icon>
            <span>Create Bill Success</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="successdialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="faildialog" max-width="500px">
        <v-card>
          <v-card-title>
            <md-icon>mood_bad</md-icon>
            <span>Bill has been created already</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="faildialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import config from "../../config/config.js";
import swal from "sweetalert";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  components: {},
  props: {
    reload: {
      type: Function,
    },
    event: {
      type: Object,
    },
    isPassed: {
      type: Boolean,
    },
    isCheckIn: {
      type: Boolean,
    },
  },
  data: () => ({
    dialog: false,
    errors: [],
    successdialog: false,
    faildialog: false,
    host: config.config.host,
    role: localStorage.getItem("username"),
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

      axios
        .post(this.host + "/createBill", {
          total_money: this.event.service.money,
          time: time,
          date: date,
          status: 1,
          payment_method_payment_method_id: 1,
          reservation_reservation_id: this.event.reservation_id,
          sub_service_sub_service_id: this.event.service.service_service_id,
          year: year,
          month: month,
          day: dt,
        })
        .then((response) => {
          if (response.status === 200) {
            this.updateReservation();
            axios
              .post(this.host + "/createActivity", {
                content:
                  this.role +
                  " đã tạo bill cho khách hàng " +
                  this.event.name +
                  " cuộc hẹn vào lúc " +
                  this.event.start,
              })
              .then(() => {
                this.createBillSuccess();
                this.createBillSuccess1();
              });
            Swal.fire("Thành công!", "Tạo bill thành công!", "success");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Bill đã được tạo rồi!",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bill đã được tạo rồi!",
          });
        });
    },
    createBillSuccess() {
      this.$emit("clicked", "green");
    },
    createBillSuccess1() {
      let dateRaw = new Date();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();
      let checkout = hour + ":" + minute + ":" + second;
      this.$emit("clicked1", checkout);
    },
    updateReservation() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();
      console.log("checkout  ", hour + ":" + minute + ":" + second);
      let checkout = hour + ":" + minute + ":" + second;
      axios
        .post(this.host + "/updateReservation/" + this.event.reservation_id, {
          status: 1,
          checkout_time: checkout,
        })
        .then((response) => {
          // this.selectedOpen = false;
          this.reload();
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

.md-icon {
  margin: 0 !important;
}

.disable {
  background-color: #f5f5f5 !important;
}

.theme--light.v-input--is-disabled,
.theme--light.v-input--is-disabled input,
.theme--light.v-input--is-disabled textarea {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
