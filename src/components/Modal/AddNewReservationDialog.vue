<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey darken-2" dark v-bind="attrs" v-on="on">
          Create new reservation
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">new reservation</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <multiselect
                  v-model="customer"
                  id="ajax"
                  placeholder="Type to search"
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
                <!-- {{ customer }} -->
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <DatePicker
                  v-model="selectedDate"
                  :selectedDate="selectedDate"
                ></DatePicker>
                {{ selectedDate }}
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
                      label="Chọn Giờ"
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
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="createNewReservation">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DatePicker from "../../pages/Schedule/DatePicker";
import Multiselect from "vue-multiselect";
import axios from "axios";

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
    dialog: false,
    selectedDate: new Date().toISOString().substr(0, 10),
    customer: null,
    customers: [],
    isLoading: false,
    time: null,
    menu2: false,
    modal2: false,
  }),
  methods: {
    asyncFind(query) {
      if (query != "") {
        this.isLoading = true;
        axios
          .get("http://localhost:8000/findAllByAccount/" + query)
          .then((response) => {
            // customers = [];
            this.customers = response.data;
            this.isLoading = false;
          });
      } else {
        this.customers = [];
      }
    },

    createNewReservation() {
      axios
        .post("http://localhost:8000/createNewReservation", {
          customer_id: this.customer.customer_id,
          checkin_time: this.time,
          reservation_date: this.selectedDate,
          status: 0,
        })
        .then((response) => {
          console.log(response);
          this.dialog = false;
          this.reload();
        })
        .catch((e) => {
          this.errors.push(e); // co loi o day chua fix duoc
        });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
