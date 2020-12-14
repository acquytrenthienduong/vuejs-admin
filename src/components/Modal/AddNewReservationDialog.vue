<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey darken-2" dark v-bind="attrs" v-on="on">
          New Reservation
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Reservation</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <multiselect
                  v-model="customer"
                  id="ajax"
                  placeholder="Customer Name"
                  open-direction="bottom"
                  :options="customers"
                  :multiple="false"
                  :searchable="true"
                  :loading="isLoading"
                  :internal-search="false"
                  :clear-on-select="false"
                  :close-on-select="false"
                  :options-limit="1000"
                  :limit="3"
                  :max-height="600"
                  :show-no-results="false"
                  label="account"
                  track-by="account"
                  @search-change="asyncFind"
                >
                </multiselect>
              </v-col>
              <v-col v-if="customer != null" cols="12">
                <v-text-field
                  label="Customer Name"
                  v-model="customer.name"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="chooseServices"
                  item-text="name"
                  item-value="value"
                  label="Service"
                  class="duration-selector"
                  single-line
                  v-model="selectType"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="selectSubService"
                  :items="items"
                  item-text="name"
                  item-value="value"
                  label="Duration"
                  return-object
                  single-line
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <DatePicker
                  v-model="selectedDate"
                  :selectedDate="selectedDate"
                ></DatePicker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Pick Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="createNewReservation">
            Create
          </v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
        <v-overlay :z-index="0" :value="overlay">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DatePicker from "../../pages/Schedule/DatePicker";
import Multiselect from "vue-multiselect";
import axios from "axios";
import config from "../../config/config.js";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  components: {
    DatePicker,
    Multiselect,
  },
  props: {
    reload: {
      type: Function,
    },
  },
  data: () => ({
    chooseServices: [
      { value: 1, name: "Stand Up" },
      { value: 2, name: "Lay Down" },
      { value: 3, name: "Spray" },
    ],
    dialog: false,
    selectedDate: new Date().toISOString().substr(0, 10),
    customer: null,
    customers: [],
    isLoading: false,
    time: null,
    menu2: false,
    modal2: false,
    selectSubService: null,
    items: [],
    selectType: null,
    overlay: false,
    host: config.config.host,
  }),

  mounted() {
    this.loadSubService(this.selectType);
  },
  methods: {
    transform(time) {
      // var hms = "02:04:33";
      var a = time.split(":");

      // Hours are worth 60 minutes.
      var minutes = +a[0] * 60 + +a[1] + " phút";
      return minutes;
    },
    asyncFind(query) {
      if (query != "") {
        this.isLoading = true;
        axios.get(this.host + "/findAllByAccount/" + query).then((response) => {
          // customers = [];
          this.customers = response.data;
          this.isLoading = false;
        });
      } else {
        this.customers = [];
      }
    },

    createNewReservation() {
      let dateRaw = new Date(this.selectedDate);
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      if (
        this.selectSubService != null &&
        this.customer != null &&
        this.time != null
      ) {
        console.log("hahha" + this.selectSubService.value);
        // setTimeout(() => (this.isHidden = false), 500);

        axios
          .post(this.host + "/createNewReservation", {
            customer_id: this.customer.customer_id,
            checkin_time: this.time,
            reservation_date: this.selectedDate,
            status: 0,
            sub_service_sub_service_id: this.selectSubService.value,
            is_access: 1,
            year: year,
            month: month,
            day: dt,
          })
          .then((response) => {
            console.log("res", response);
            if (response.status === 200) {
              this.overlay = true;
              setTimeout(() => {
                this.dialog = false;
                this.reload();
                this.overlay = false;
                this.closeDialog();
              }, 1000);
            } else {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Hệ thống đã có tối đa lịch vào giờ này!",
              });
            }
          })
          .catch((e) => {
            this.errors.push(e);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hãy chọn hết cách trường bắt buộc đã nhé!",
        });
      }
    },

    closeDialog() {
      this.dialog = false;
      this.selectedDate = new Date().toISOString().substr(0, 10);
      this.customer = null;
      this.customers = [];
      this.isLoading = false;
      this.time = null;
      this.menu2 = false;
      this.modal2 = false;
      this.selectSubService = null;
      this.items = [];
      this.selectType = null;
    },

    loadSubService(type) {
      axios
        .get(this.host + "/getAllSubService/" + type)
        .then((res) => {
          this.items = [];
          res.data.forEach((element) => {
            let selectItem = {};
            if (element.type === 1) {
              selectItem.name = this.transform(element.time);
              selectItem.value = element.sub_service_id;
            }
            if (element.type === 2) {
              selectItem.name = this.transform(element.time);
              selectItem.value = element.sub_service_id;
            }
            if (element.type === 3) {
              selectItem.name = element.session;
              selectItem.value = element.sub_service_id;
            }
            this.items.push(selectItem);
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },

  watch: {
    selectType: function(val) {
      this.loadSubService(val);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
label {
  margin-bottom: unset !important;
}
</style>
