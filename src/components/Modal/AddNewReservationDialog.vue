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
              </v-col>
              <!-- {{ selectedDate }} -->
              <v-col cols="12" sm="6">
                <TimePicker></TimePicker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DatePicker from "../../pages/Schedule/DatePicker";
import TimePicker from "../../pages/Schedule/TimePicker";
import Multiselect from "vue-multiselect";
import axios from "axios";

export default {
  components: {
    DatePicker,
    TimePicker,
    Multiselect,
  },
  data: () => ({
    dialog: false,
    selectedDate: new Date().toISOString().substr(0, 10),
    selectedTime: null,
    customer: null,
    customers: [],
    isLoading: false,
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
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
