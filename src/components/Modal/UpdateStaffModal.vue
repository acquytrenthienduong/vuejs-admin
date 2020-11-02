<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px;  height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Staff Info</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="DoB">
            <b-input
              type="date"
              v-model="staff.dob"
              :value="staff.dob"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Gender">
            <b-select
              placeholder="Gender"
              icon="fas fa-venus-mars"
              icon-pack="fas"
              v-model="staff.gender"
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
            </b-select>
          </b-field>

          <b-field label="Shift">
            <b-select
              placeholder="Select a shift"
              v-model="staff.shift_shift_id"
            >
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
          <button
            @click="updateStaffByID(staff.staff_id)"
            class="button is-primary"
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
    staff: {
      type: Object,
    },
    reload: {
      type: Function,
    },
    shifts: {
      type: Array,
    },
  },

  methods: {
    updateStaffByID(staffID) {
      axios
        .post("http://localhost:8000/staffUpdate/" + staffID, {
            dob: this.staff.dob,
            gender: this.staff.gender,
            shift_shift_id: this.staff.shift_shift_id,

        })
        .then((response) => {
          this.reload();
          this.$emit("close");
        });
    },
  },
};
</script>
