<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Receptionist Info</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Account">
            <b-input
              type="text"
              v-model="receptionist.account"
              placeholder="Your account"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="receptionist.password"
              password-reveal
              placeholder="Your password"
              required
            >
            </b-input>
          </b-field>
          <b-field label="DoB">
            <b-input
              type="date"
              v-model="receptionist.dob"
              :value="receptionist.dob"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Shift">
            <b-select placeholder="Select a shift" v-model="receptionist.shift_shift_id">
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
          <button class="button" type="button" @click="$emit('close')">Đóng</button>
          <button
            @click="updateReceptionistByID(receptionist.receptionist_id)"
            class="button is-primary"
          >
            Xác nhận
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config/config.js";

export default {
  props: {
    receptionist: {
      type: Object,
    },
    reload: {
      type: Function,
    },
    shifts: {
      type: Array,
    },
  },

  data() {
    return {
      host: config.config.host,
    };
  },

  methods: {
    updateReceptionistByID(id) {
      axios
        .post(this.host + "/updateReceptionist/" + id, {
          account: this.receptionist.account,
          password: this.receptionist.password,
          dob: this.receptionist.dob,
          shift_shift_id: this.receptionist.shift_shift_id,
        })
        .then((response) => {
          this.reload();
          this.$emit("close");
        });
    },
  },
};
</script>
