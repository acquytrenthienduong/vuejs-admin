<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px;  height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Staff</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
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
          <button @click="addNewStaff" class="button is-primary">
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
    shifts: {
      type: Array,
    },
  },
  data() {
    return {
      dob: "",
      gender: "",
      selected_shift: "",
      errors: null,
    };
  },
  methods: {
    addNewStaff() {
      axios
        .post("http://localhost:8000/addStaff", {
          dob: this.dob,
          gender: this.gender,
          shift_shift_id: this.selected_shift,
        })
        .then((response) => {
          console.log(response);
          this.dob = "";
          this.gender = "";
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
