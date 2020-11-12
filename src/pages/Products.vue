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

        <b-table-column label="Product Name">
          <template v-slot="props">
            {{ props.row.productName }}
          </template>
        </b-table-column>

        <b-table-column label="URL">
          <template v-slot="props">
            {{ props.row.img_url }}
          </template>
        </b-table-column>

        <b-table-column label="Service">
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

    <div class="file">
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="fields">
          <label> Upload File</label><br>
          <input type="file" ref="file" @change="onSelect">

        </div>

        <div class="fields"> 
          <button>submit</button>
        </div>

        <div class="message">
          <h5> {{message}}</h5>
        </div>


      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { id } from "date-fns/locale";
export default {
  components: {},
  data() {
    return {
      products: [],
      file: "",
      message: "",
    };
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit(){
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await axios.post('/addProduct', formData).then((response) => console.log(response));
        this.message = "Uploaded!";
      } catch (err) {
        console.log(err);
        this.message = "Something went wrong!"
      }
    },

    loadAllProducts() {
      axios
        .get("http://localhost:8000/products")
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
