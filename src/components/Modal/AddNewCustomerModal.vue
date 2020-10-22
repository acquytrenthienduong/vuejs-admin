<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px;  height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Staff</p>
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

          <b-field label="Email">
            <b-input
              type="email"
              v-model="email"
              :value="email"
              placeholder="Your email"
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
          <button @click="addNewCustomer" class="button is-primary">
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
        type: Function
      }
    },
  // props: ["email", "password", "account"],
  data() {
    return {
      account: "",
      email: "",
      password: "",
      gender: "",
    };
  },
  methods: {
    addNewCustomer() {
      axios
        .post("http://localhost:8000/addNewCustomer", {
          account: this.account,
          email: this.email,
          password: this.password,
          gender: this.gender,
        })
        .then((response) => {
          console.log(response);
          this.account = "";
          this.email = "";
          this.password = "";
          this.gender = "";
          this.$emit('close');
          this.reload();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
