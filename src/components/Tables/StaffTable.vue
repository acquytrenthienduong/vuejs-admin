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
          <AddNewCustomerModal @close="props.close" :callback="loadData"></AddNewCustomerModal>
        </template>
      </b-modal>
    </section>
    <b-table :data="customers">
      <b-table-column
        field="customers.customer_id"
        label="ID"
        width="40"
        numeric
      >
        <template v-slot="props">
          {{ props.row.customer_id }}
        </template>
      </b-table-column>

      <b-table-column field="customers.account" label="Account">
        <template v-slot="props">
          {{ props.row.account }}
        </template>
      </b-table-column>

      <b-table-column field="customers.password" label="Password">
        <template v-slot="props">
          {{ props.row.password }}
        </template>
      </b-table-column>

      <b-table-column field="customers.email" label="Email" centered>
        <template v-slot="props">
          {{ props.row.email }}
        </template>
      </b-table-column>

      <b-table-column label="Gender" v-slot="props">
        <span>
          <b-icon
            pack="fas"
            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"
          >
          </b-icon>
          {{ props.row.gender }}
        </span>
      </b-table-column>

      <b-table-column label="Action">
        <template>
          <a
            href="#modal"
            @click="edit(customer_id)"
            class="btn waves-effect waves-light yellow darken-2"
            ><i class="material-icons">edit</i>
          </a>
          <a
            href="#!"
            class="btn waves-effect waves-light red darken-2"
            @click="archive(index)"
            ><i class="material-icons">archive</i>
          </a>
        </template>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import AddNewCustomerModal from "../Modal/AddNewCustomerModal";
export default {
  components: {
    AddNewCustomerModal,
  },
  data() {
    return {
      customers: [],
      customerName: null,
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

    loadData() {
      axios
        .get("http://localhost:8000/customer")
        .then((response) => 
        // console.log(response)
        (this.customers = response.data));
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
