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
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="selectType" row>
                  <v-radio label="ByLength" value="1"></v-radio>
                  <v-radio label="BySession" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                {{ selectSubService }}
                <v-select
                  v-model="selectSubService"
                  :items="items"
                  item-text="name"
                  item-value="value"
                  label="Service"
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
          <v-btn color="blue darken-1" text @click="closeDialog">
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
    selectSubService: null,
    items: [],
    selectType: null,
  }),

  mounted() {
    this.loadSubService(this.selectType);
  },
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
      console.log(this.selectSubService.value);
      axios
        .post("http://localhost:8000/createNewReservation", {
          customer_id: this.customer.customer_id,
          checkin_time: this.time,
          reservation_date: this.selectedDate,
          status: 0,
          sub_service_sub_service_id: this.selectSubService.value,
        })
        .then((response) => {
          this.dialog = false;
          this.reload();
          this.closeDialog();
        })
        .catch((e) => {
          this.errors.push(e);
        });
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
        .get("http://localhost:8000/getAllSubService/" + type)
        .then((res) => {
          this.items = [];
          res.data.forEach((element) => {
            let selectItem = {};
            if (element.type === 1) {
              selectItem.name = element.time;
              selectItem.value = element.sub_service_id;
            } else {
              selectItem.name = element.sesstion + " Buổi";
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
