<template>
  <div>
    <v-row class="searchCustomer">
      <v-col cols="12" sm="3">
        <h4>Nhập số điện thoại của KH:</h4>
      </v-col>
      <v-col cols="12" sm="9">
        <multiselect
          v-model="customer"
          id="ajax"
          placeholder="Nhập số điện thoại KH"
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
                <v-card-title> Thông tin dịch vụ </v-card-title>

                <div>
                  <p>
                    Số lần đặt: <span>{{ reservations.length }}</span>
                  </p>
                  <p>Tổng số tiền thu được: {{ totalMoney | priceVndFormat }}</p>
                  <p>Favourite Service:</p>
                </div>
              </v-card-text>
            </v-container>
            <hr />
            <v-container>
              <v-card-text>
                <v-card-title> Lịch sử đặt chỗ </v-card-title>
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
                <v-card-title> Thông tin cá nhân </v-card-title>

                <div class="text--primary">
                  <p>
                    Tên: <span>{{ customer.name }}</span>
                  </p>
                  <p>
                    SĐT: <span>{{ customer.account }}</span>
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
        text: "Ngày",
        align: "start",
        // sortable: false,
        value: "reservation_date",
      },
      { text: "Dịch vụ", value: "sub_service.name" },
      { text: "Thời gian", value: "sub_service.time" },
      { text: "Hóa đơn", value: "bills[0].total_money" },
    ],
  }),
  methods: {
    asyncFind(query) {
      if (query != "") {
        this.isLoading = true;
        axios.get(this.host + "/searchCustomer/" + query).then((response) => {
          // console.log(response);
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
    customer: function (val) {
      let array = ["Stand up", "Lay Down", "Spray"];
      if (val != null) {
        console.log(val);
        this.reservations = val.reservations;
        this.totalMoney = 0;
        val.reservations.forEach((element) => {
          let x = element.sub_service.name + " " + element.sub_service.time;

          if (element.sub_service.type === 2) {
            x = element.sub_service.name + " " + element.sub_service.session;
          }
          this.items.push(x);
          this.value.push(x);

          // console.log("eveveve", element.bills[0].total_money);
          if (element.bills.length > 0) {
            this.totalMoney += element.bills[0].total_money;
          }
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
