<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Manager</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Account">
            <b-input
              type="text"
              v-model="account"
              :value="account"
              placeholder="Your account"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              :value="password"
              password-reveal
              placeholder="Your password"
              required
              maxlength="8"
            >
            </b-input>
          </b-field>

          <b-field label="DoB">
            <b-input type="date" v-model="dob" :value="dob" required> </b-input>
          </b-field>

          <b-field label="Gender">
            <b-select
              placeholder="Gender"
              icon="fas fa-venus-mars"
              icon-pack="fas"
              v-model="gender"
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
          <button @click="addNewManager" class="button is-primary">
            Submit
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config/config.js"
export default {
  props: {
    reload: {
      type: Function,
    },
  },
  data() {
    return {
      account: "",
      dob: "",
      password: "",
      gender: "",
      errors: null,
      host: config.config.host
    };
  },
  methods: {
    addNewManager() {
      axios
        .post(this.host + "/addManager", {
          account: this.account,
          password: this.password,
          dob: this.dob,
          gender: this.gender,
        })
        .then((response) => {
          this.account = "";
          this.dob = "";
          this.password = "";
          this.gender = "";
          this.$emit("close");
          this.reload();
        })
        .catch((e) => {
          this.errors.push(e); // co loi o day chua fix duoc 
        });
    },
  },
};
</script>
