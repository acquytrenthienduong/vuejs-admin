<template>
  <div>
    <v-row>
      <v-col cols="12" sm="3">
        Enter number of customer:
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
    <v-card-text v-if="customer != null">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h3>
              Customer Name: <span>{{ customer.name }}</span>
            </h3>
            <!-- <v-text-field v-model="customer.name" label="Name"></v-text-field> -->
          </v-col>
          <v-col cols="12">
            <h3>
              Customer Account: <span>{{ customer.account }}</span>
            </h3>
            <!-- <v-text-field
              v-model="customer.account"
              label="Customer Account"
            ></v-text-field> -->
          </v-col>
          <v-col cols="12">
            <v-col cols="12">
              <v-select
                v-model="items"
                :items="value"
                attach
                chips
                label="Chips"
                multiple
              ></v-select>
            </v-col>
          </v-col>
          <v-col cols="12">
            <h3>
              Customer Email: <span>{{ customer.email }}</span>
            </h3>
            <!-- <v-text-field
              v-model="customer.email"
              label="xxx"
              prefix=""
            ></v-text-field> -->
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import axios from "axios";

export default {
  components: {
    Multiselect,
  },
  data: () => ({
    isLoading: false,
    customer: null,
    customers: [],
    items: [],
    value: [],
    totalMoney: 0,
    headers: [
      {
        text: "account",
        align: "start",
        sortable: false,
        value: "account",
      },
      { text: "email", value: "email" },
      { text: "gender", value: "gender" },
      { text: "password", value: "password" },
    ],
  }),
  methods: {
    asyncFind(query) {
      if (query != "") {
        this.isLoading = true;
        axios
          .get("http://localhost:8000/searchCustomer/" + query)
          .then((response) => {
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
      console.log(val);
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
