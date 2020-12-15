<template>
  <div>
    <section>
      <b-table
        :data="products"
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
            {{ props.row.product_id }}
          </template>
        </b-table-column>

        <b-table-column label="Services">
          <template v-slot="props">
            {{ props.row.productName }}
          </template>
        </b-table-column>

        <b-table-column label="Details">
          <template v-slot="props">
            {{ props.row.img_url }}
          </template>
        </b-table-column>

        <b-table-column label="Money">
          <template v-slot="props">
            {{ props.row.sub_service_sub_service_id }}
          </template>
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
import config from "../config/config";

import { id } from "date-fns/locale";
export default {
  components: {},
  data() {
    return {
      products: [],
      host: config.config.host,
    };
  },
  methods: {
    loadAllProducts() {
      axios
        .get(this.host + "/products")
        .then((response) => (this.products = response.data));
    },
  },
  mounted() {
    this.loadAllProducts();
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
