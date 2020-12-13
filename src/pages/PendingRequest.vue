<template>
  <div>
    <section>
      <b-table
        :data="requests"
        ref="table"
        paginated
        per-page="5"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column label="Stt" width="40" numeric>
          <template v-slot="props">
            {{ props.row.stt }}
          </template>
        </b-table-column>

        <b-table-column label="Customer">
          <template v-slot="props">
            {{ props.row.customer.account }}
          </template>
        </b-table-column>

        <b-table-column label="Name">
          <template v-slot="props">
            {{ props.row.customer.name }}
          </template>
        </b-table-column>

        <b-table-column label="Time">
          <template v-slot="props">
            {{ props.row.checkin_time }}
          </template>
        </b-table-column>

        <b-table-column label="Date">
          <template v-slot="props">
            {{ props.row.reservation_date }}
          </template>
        </b-table-column>

        <b-table-column label="Service">
          <template v-slot="props">
            {{ props.row.sub_service.name }}
          </template>
        </b-table-column>

        <b-table-column label="Action">
          <template v-slot="props">
            <md-button
              class="md-just-icon md-simple md-primary"
              @click="
                confirm(
                  props.row.reservation_id,
                  props.row.customer.customer_id,
                  props.row
                )
              "
            >
              <md-icon>done</md-icon>
              <md-tooltip md-direction="top">Accept</md-tooltip>
            </md-button>
            <md-button
              @click="deleteManager(props.row.manager_id)"
              class="md-just-icon md-simple md-danger"
            >
              <md-icon>delete</md-icon>
              <md-tooltip md-direction="top">Reject</md-tooltip>
            </md-button>
          </template>
        </b-table-column>
        <h3 class="empty" v-if="requests.length == 0">No request Pending</h3>
      </b-table>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/config";

import { id } from "date-fns/locale";
export default {
  components: {},
  data() {
    return {
      requests: [],
      request: {},
      isActive: false,
      host: config.config.host,
      role: localStorage.getItem("username"),
    };
  },
  methods: {
    confirm(id, customer_id, customer) {
      this.$buefy.dialog.confirm({
        message: "Do you want to accept the request?",
        onConfirm: () => this.acceptRequest(id, customer_id, customer),
      });
    },
    success() {
      this.$buefy.toast.open({
        message: "Request Accepted!",
        type: "is-success",
        // duration: 5000000,
      });
    },
    loadAllPendingRequests() {
      this.requests = [];
      var stt = 1;
      axios.get(this.host + "/getAllReservationNotAccess").then((response) => {
        // console.log("response", response.data);
        response.data.forEach((element) => {
          let request = {};
          request = element;
          request.stt = stt++;
          this.requests.push(request);
        });
        // console.log("requests", requests);
      });
    },

    acceptRequest(requestID, customer_id, customer) {
      let dateRaw = new Date();
      axios
        .post(this.host + "/updateReservation/" + requestID, {
          is_access: 1,
        })
        .then((response) => {
          this.success();
          this.loadAllPendingRequests();

          axios
            .post(this.host + "/createNotification/" + customer_id, {
              content: "Lịch của bạn đã được đặt thành công!",
            })
            .then((response) => {
              console.log(response);
            });

          axios
            .post(this.host + "/createActivity", {
              content:
                this.role +
                " chấp nhận lịch hẹn của khách hàng " +
                customer.customer.name +
                "lúc " +
                customer.reservation_date +
                " " +
                customer.checkin_time,
            })
            .then(() => {});
        });
    },
  },
  mounted() {
    this.loadAllPendingRequests();
  },
};
</script>

<style>
.buttons:last-child {
  margin-bottom: 1rem !important;
}

li {
  list-style: none !important;
}

ul {
  margin-bottom: unset !important;
}
.toast {
  flex-basis: 45px !important;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}
table {
  margin-left: 30px;
  width: 94% !important;
}

.level-right {
  margin-right: 33px !important;
}

table td {
  vertical-align: inherit !important;
}
</style>
