<template>
  <div>
    <section>
      <div class="buttons">
        <b-button
          size="is-medium"
          class="fas fa-user-plus"
          @click="isComponentModalActive = true"
        >
        </b-button>
      </div>

      <!-- modal form -->
      <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <template #default="props">
          <AddNewManagerModal
            @close="props.close"
            :callback="loadData"
          ></AddNewManagerModal>
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
            {{ new Date(props.row.dob).toLocaleDateString() }}
          </template>
        </b-table-column>

        <b-table-column label="Gender" v-slot="props">
          <span>
            {{ props.row.gender === 1 ? "Male" : "Female" }}
          </span>
        </b-table-column>

        <b-table-column label="Action">
          <template v-slot="props">
            <md-button class="md-just-icon md-simple md-primary">
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
import { id } from "date-fns/locale";
export default {
  components: {
    AddNewManagerModal,
  },
  data() {
    return {
      managers: [],

      // formProps: {
      //   email: "evan@you.com",
      //   password: "testing",
      //   account: "toilatai",
      // },
      //data for modal
      isComponentModalActive: false,
    };
  },
  methods: {
    edit(customerID) {
      alert("viet function cho bm di");
    },

    deleteManager(managerID) {
      axios
        .delete("http://localhost:8000/manager/" + managerID)
        .then((response) => {
          console.log(response);
          this.loadData();
          // window.location.reload();
        });
    },

    loadData() {
      axios.get("http://localhost:8000/manager").then(
        (response) =>
          // console.log(response)
          (this.managers = response.data)
      );
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
