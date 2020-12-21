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
          <AddNewReceptionistModal
            @close="props.close"
            :reload="loadData"
            :shifts="shifts"
          ></AddNewReceptionistModal>
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
          <UpdateReceptionistModal
            @close="props.close"
            :receptionist="receptionist"
            :reload="loadData"
            :shifts="shifts"
          ></UpdateReceptionistModal>
        </template>
      </b-modal>
    </section>

    <section>
      <b-table
        :data="receptionists"
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
            {{ props.row.receptionist_id }}
          </template>
        </b-table-column>

        <b-table-column label="Tài khoản">
          <template v-slot="props">
            {{ props.row.account }}
          </template>
        </b-table-column>

        <b-table-column label="Mật khẩu">
          <template v-slot="props">
            {{ props.row.password }}
          </template>
        </b-table-column>

        <b-table-column label="Ngày sinh" centered>
          <template v-slot="props">
            {{ props.row.dob }}
          </template>
        </b-table-column>

        <b-table-column label="Action">
          <template v-slot="props">
            <md-button
              class="md-just-icon md-simple md-primary"
              @click="loadReceptionistByID(props.row.receptionist_id)"
            >
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>
            <md-button
              class="md-just-icon md-simple md-danger"
              @click="deleteReceptionist(props.row.receptionist_id)"
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
import AddNewReceptionistModal from "../Modal/AddNewReceptionistModal";
import UpdateReceptionistModal from "../Modal/UpdateReceptionistModal";
import config from "../../config/config.js";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { id } from "date-fns/locale";
export default {
  components: {
    AddNewReceptionistModal,
    UpdateReceptionistModal,
  },
  data() {
    return {
      receptionists: [],
      shifts: [],
      receptionist: {},
      //data for modal
      isAddNewModalActive: false,
      isUpdateModalActive: false,
      host: config.config.host,
    };
  },
  methods: {
    deleteReceptionist(id) {
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
          axios.delete(this.host + "/deleteReceptionist/" + id).then((response) => {
            this.loadData();
          });
        }
      });
    },

    loadShift() {
      axios.get(this.host + "/shift").then((response) => {
        // console.log(response);
        this.shifts = response.data;
      });
    },

    loadData() {
      axios
        .get(this.host + "/receptionist")
        .then((response) => (this.receptionists = response.data));
      // .then((response) => console.log(response));
    },

    loadReceptionistByID(receptionist_id) {
      this.isUpdateModalActive = true;
      axios
        .get(this.host + "/getReceptionistByID/" + receptionist_id)
        .then((response) => (this.receptionist = response.data));
      // .then((response) => console.log(response));
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
