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
            {{ props.row.reservation_id }}
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

        <b-table-column label="Date" centered>
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
                  props.row.customer.customer_id
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
              <md-tooltip md-direction="top">delete</md-tooltip>
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

import { id } from "date-fns/locale";
export default {
  components: {},
  data() {
    return {
      requests: [],
      request: {},

      isActive: false,
    };
  },
  methods: {
    confirm(id, customer_id) {
      this.$buefy.dialog.confirm({
        message: "Accept this request?",
        onConfirm: () => this.acceptRequest(id, customer_id),
      });
    },
    success() {
      this.$buefy.toast.open({
        message: "Something happened correctly!",
        type: "is-success",
        // duration: 5000000,
      });
    },
    loadAllPendingRequests() {
      axios
        .get("http://localhost:8000/getAllReservationNotAccess")
        .then((response) => (this.requests = response.data));
      // .then((response) => console.log(response));
    },

    acceptRequest(requestID, customer_id) {
      // this.success();

      // window.alert("Your request is accpeted!");
      axios
        .post("http://localhost:8000/updateReservation/" + requestID, {
          is_access: 1,
        })
        .then((response) => {
          this.success();
          this.loadAllPendingRequests();

          axios
            .post("http://localhost:8000/createNotification/" + customer_id, {
              content: "Lịch của bạn đã được đặt thành công!",
            })
            .then((response) => {
              console.log(response);
            });
          // console.log(response);
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

.toast {
  flex-basis: 45px !important;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}
</style>
