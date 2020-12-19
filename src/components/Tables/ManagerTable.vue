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
          <AddNewManagerModal
            @close="props.close"
            :reload="loadData"
          ></AddNewManagerModal>
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
          <UpdateManagerModal
            @close="props.close"
            :manager="manager"
            :reload="loadData"
          ></UpdateManagerModal>
        </template>
      </b-modal>
    </section>

    <section>
      <b-table
        :data="managers"
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
            {{ props.row.manager_id }}
          </template>
        </b-table-column>

        <b-table-column label="Account">
          <template v-slot="props">
            {{ props.row.account }}
          </template>
        </b-table-column>

        <b-table-column label="Password">
          <template v-slot="props">
            {{ props.row.password }}
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

        <b-table-column label="Action">
          <template v-slot="props">
            <md-button
              class="md-just-icon md-simple md-primary"
              @click="loadDataByID(props.row.manager_id)"
            >
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
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
import AddNewManagerModal from "../Modal/AddNewManagerModal";
import UpdateManagerModal from "../Modal/UpdateManagerModal";
import config from "../../config/config.js";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { id } from "date-fns/locale";
export default {
  components: {
    AddNewManagerModal,
    UpdateManagerModal,
  },
  data() {
    return {
      managers: [],
      manager: {},
      //data for modal
      isAddNewModalActive: false,
      isUpdateModalActive: false,
      host: config.config.host,
    };
  },
  methods: {
    deleteManager(managerID) {
      Swal.fire({
        title: "Xóa?",
        text: "Chắc chắn muốn xóa tài khoản này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Đúng vậy!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(this.host + "/manager/" + managerID).then((response) => {
            this.loadData();
          });
        }
      });
    },

    loadData() {
      axios
        .get(this.host + "/manager")
        .then((response) => (this.managers = response.data));
    },

    loadDataByID(managerID) {
      this.isUpdateModalActive = true;
      axios
        .get(this.host + "/getManagerByID/" + managerID)
        .then((response) => (this.manager = response.data));
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
