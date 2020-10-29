<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px;  height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Update info</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Account">
            <b-input
              type="text"
              v-model="manager.account"
              placeholder="Your account"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="manager.password"
              password-reveal
              placeholder="Your password"
              required
            >
            </b-input>
          </b-field>

          <b-field label="DoB">
            <b-input type="date" v-model="manager.dob" required> </b-input>
          </b-field>

          <b-field label="Gender">
            <b-select
              placeholder="Gender"
              icon="fas fa-venus-mars"
              icon-pack="fas"
              v-model="manager.gender"
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
            </b-select>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">
            Close
          </button>
          <button
            class="button is-primary"
            @click="updateManagerByID(manager.manager_id)"
          >
            Update
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    manager: {
      type: Object,
    },
    reload: {
      type: Function,
    },
  },

  data() {
    return {};
  },

  methods: {
    updateManagerByID(managerID) {
      axios
        .post("http://localhost:8000/updateManager/" + managerID, {
          account: this.manager.account,
          password: this.manager.password,
          dob: this.manager.dob,
          gender: this.manager.gender,
        })
        .then((response) => {
          console.log(response);
          this.reload();
          this.$emit("close");
        });
    },
  },
};
</script>
