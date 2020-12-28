<template>
  <div>
    <section>
      <div class="buttons" style=".buttons:not(:last-child) : margin-bottom: 1rem">
        <b-button
          size="is-medium"
          class="fas fa-user-plus"
          @click="isAddNewModalActive = true"
        >
        </b-button>
      </div>

      <!-- modal form -->
      <b-modal
        v-model="isAddNewModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <template #default="props">
          <AddNewStaffModal
            @close="props.close"
            :reload="loadData"
            :shifts="shifts"
          ></AddNewStaffModal>
        </template>
      </b-modal>
      <!-- UpdateManagerModal -->
      <b-modal
        v-model="isUpdateModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <template #default="props">
          <UpdateStaffModal
            @close="props.close"
            :staff="staff"
            :reload="loadData"
            :shifts="shifts"
          ></UpdateStaffModal>
        </template>
      </b-modal>
    </section>

    <section>
      <b-table
        :data="staffs"
        ref="table"
        paginated
        per-page="5"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column label="ID" width="40" numeric>
          <template v-slot="props">
            {{ props.row.staff_id }}
          </template>
        </b-table-column>

        <b-table-column label="DoB" centered>
          <template v-slot="props">
            {{ props.row.dob }}
          </template>
        </b-table-column>

        <b-table-column label="Gender" v-slot="props">
          <span>
            {{ props.row.gender === 1 ? "Male" : "Female" }}
          </span>
        </b-table-column>

        <b-table-column label="shift">
          <template v-slot="props">
            {{ props.row.shift.shift_name }}
          </template>
        </b-table-column>

        <b-table-column label="Action">
          <template v-slot="props">
            <md-button
              class="md-just-icon md-simple md-primary"
              @click="loadStaffByID(props.row.staff_id)"
            >
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>
            <md-button
              class="md-just-icon md-simple md-danger"
              @click="deleteStaff(props.row.staff_id)"
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
import AddNewStaffModal from "../Modal/AddNewStaffModal";
import UpdateStaffModal from "../Modal/UpdateStaffModal";
import config from "../../config/config.js";

import { id } from "date-fns/locale";
export default {
  components: {
    AddNewStaffModal,
    UpdateStaffModal,
  },
  data() {
    return {
      shifts: [],
      staffs: [],
      staff: {},
      //data for modal
      isAddNewModalActive: false,
      isUpdateModalActive: false,
      host: config.config.host,
    };
  },
  methods: {
    deleteStaff(staffID) {
      axios.delete(this.host + "/deleteStaff/" + staffID).then((response) => {
        this.loadData();
      });
    },
    loadShift() {
      axios.get(this.host + "/shift").then((response) => {
        this.shifts = response.data;
      });
    },
    loadData() {
      axios.get(this.host + "/staff").then((response) => (this.staffs = response.data));
    },

    loadStaffByID(staffID) {
      this.isUpdateModalActive = true;
      axios
        .get(this.host + "/findId/" + staffID)
        .then((response) => (this.staff = response.data));
    },

    reloadPage() {
      window.location.reload();
    },
  },
  mounted() {
    this.loadData();
    this.loadShift();
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
