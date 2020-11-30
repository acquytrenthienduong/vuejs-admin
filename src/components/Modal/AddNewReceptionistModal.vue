<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px;  height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Receptionist</p>
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

          <b-field label="Shift">
            <b-select placeholder="Select a shift" v-model="selected_shift">
              <option
                v-for="shift in shifts"
                :value="shift.shift_id"
                :key="shift.shift_id"
              >
                {{ shift.shift_name }}
              </option>
            </b-select>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">
            Close
          </button>
          <button @click="addNewReceptionist" class="button is-primary">
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
    shifts: {
      type: Array,
    },
  },
  data() {
    return {
      account: "",
      password: "",
      dob: "",
      selected_shift: "",
      errors: null,
      host: config.config.host
    };
  },
  methods: {
    addNewReceptionist() {
      axios
        .post(this.host + "/addReceptionist", {
          account: this.account,  
          password: this.password,
          dob: this.dob,
          shift_shift_id: this.selected_shift,
        })
        .then((response) => {
          this.account = "",
          this.password = "",
          this.dob = "";
          this.selected_shift = "";
          this.$emit("close");
          this.reload();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>
