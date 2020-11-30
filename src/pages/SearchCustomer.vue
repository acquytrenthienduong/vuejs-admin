<template>
  <div>
    <v-row class="searchCustomer">
      <v-col cols="12" sm="3">
        <h4>Enter Phone Number:</h4>
      </v-col>
      <v-col cols="12" sm="9">
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
    </v-row>

    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="12" sm="8">
          <v-card v-if="customer != null" class="pa-2" outlined tile>
            <v-container>
              <v-card-text>
                <v-card-title>
                  Data Services
                </v-card-title>

                <div>
                  <p>
                    Total Visit: <span>{{ items.length }}</span>
                  </p>
                  <p>Total Money:</p>
                  <p>Favourite Service:</p>
                  <!-- <v-col cols="12">
                  <v-select
                    v-model="items"
                    :items="value"
                    attach
                    chips
                    label="Used Services"
                    multiple
                  ></v-select>
                </v-col> -->
                </div>
              </v-card-text>
            </v-container>
            <hr />
            <v-container>
              <v-card-text>
                <v-card-title>
                  Lastest Visit
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="reservations"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card v-if="customer != null" class="pa-2" outlined tile>
            <v-container>
              <v-card-text>
                <v-card-title>
                  Profile
                </v-card-title>

                <div class="text--primary">
                  <p>
                    Name: <span>{{ customer.name }}</span>
                  </p>
                  <p>
                    Account: <span>{{ customer.account }}</span>
                  </p>
                  <p>
                    Email: <span>{{ customer.email }}</span>
                  </p>
                </div>
              </v-card-text>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import axios from "axios";
import config from "../config/config";

export default {
  components: {
    Multiselect,
  },
  data: () => ({
    host: config.config.host,
    isLoading: false,
    customer: null,
    customers: [],
    items: [],
    value: [],
    totalMoney: 0,
    reservations: [],
    headers: [
      {
        text: "Date",
        align: "start",
        // sortable: false,
        value: "reservation_date",
      },
      { text: "Service", value: "sub_service.name" },
      { text: "Type", value: "" },
      { text: "Bill", value: "sub_service.time" },
    ],
  }),
  methods: {
    asyncFind(query) {
      if (query != "") {
        this.isLoading = true;
        axios.get(this.host + "/searchCustomer/" + query).then((response) => {
          console.log(response);
          // customers = [];
          this.customers = response.data;
          this.isLoading = false;
        });
      } else {
        this.customers = [];
      }
    },
  },

  watch: {
    customer: function(val) {
      this.reservations = val.reservations;
      if (val != null) {
        val.reservations.forEach((element) => {
          let x = element.sub_service.name + " " + element.sub_service.time;

          if (element.sub_service.type === 2) {
            x = element.sub_service.name + " " + element.sub_service.session;
          }
          this.items.push(x);
          this.value.push(x);
        });
      } else {
        this.items = [];
        this.value = [];
      }
    },
  },
};
</script>

<style scoped>
.searchCustomer {
  padding-left: 30px;
  padding-right: 30px;
}

.customerTable {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
