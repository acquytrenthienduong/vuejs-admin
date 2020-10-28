<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px;  height: 500px">
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
            >
            </b-input>
          </b-field>

          <b-field label="DoB">
            <b-input
              type="date"
              v-model="dob"
              :value="dob"
              placeholder="Your email"
              required
            >
            </b-input>
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
export default {
  props: {
    reload: {
      type: Function,
    },
  },
  // props: ["dob","gender", "password", "account"],
  data() {
    return {
      account: "",
      dob: "",
      password: "",
      gender: "",
      errors : null
    };
  },
  methods: {
    addNewManager() {
      axios
        .post("http://localhost:8000/addManager", {
          account: this.account,
          password: this.password,
          dob: this.dob,
          gender: this.gender,
        })
        .then((response) => {
          console.log(response);
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
