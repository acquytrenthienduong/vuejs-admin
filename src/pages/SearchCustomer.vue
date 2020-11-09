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
            <v-text-field
              label="Customer Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Service Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Money"
              prefix="$"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Time"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Checkin Time"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Checkout Time"
            ></v-text-field>
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
          .get("http://localhost:8000/findAllByAccount/" + query)
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
};
</script>
