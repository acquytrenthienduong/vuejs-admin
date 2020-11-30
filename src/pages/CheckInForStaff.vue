<template>
  <div>
    <section>
      <b-table
        :data="data"
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
            {{ props.row.timekeeping_id }}
          </template>
        </b-table-column>

        <b-table-column label="Name">
          <template v-slot="props">
            {{ props.row.staff.name }}
          </template>
        </b-table-column>

        <b-table-column label="Shift Name">
          <template v-slot="props">
            {{ props.row.staff.shift.shift_name }}
          </template>
        </b-table-column>

        <b-table-column label="start time">
          <template v-slot="props">
            {{ props.row.staff.shift.start_time }}
          </template>
        </b-table-column>

        <b-table-column label="end time" centered>
          <template v-slot="props">
            {{ props.row.staff.shift.end_time }}
          </template>
        </b-table-column>

        <b-table-column label="Date">
          <template v-slot="props">
            {{ props.row.date }}
          </template>
        </b-table-column>

        <b-table-column label="Action">
          <template v-slot="props">
            <md-button
              class="md-just-icon md-simple md-primary"
              @click="acceptRequest(props.row.reservation_id)"
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
      </b-table>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { id } from "date-fns/locale";
import config from "../config/config"

export default {
  components: {},
  data() {
    return {
      data: [],
      request: {},
      isActive: false,
      host: config.config.host
    };
  },
  methods: {
    loadData() {
      axios
        .get(this.host + "/getAllStaff")
        .then((response) => (this.data = response.data));
      // .then((response) => console.log(response));
    },

    acceptRequest(requestID) {
      window.alert("Your request is accpeted!");
      axios
        .post(this.host +"/updateReservation/" + requestID, {
          is_access: 1,
        })
        .then((response) => {
          this.loadAllPendingRequests();
          console.log(response);
        });
    },
  },
  mounted() {
    this.loadData();
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
</style>
