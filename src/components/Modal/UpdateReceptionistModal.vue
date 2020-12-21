<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Receptionist Info</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Tài khoản">
            <b-input
              type="text"
              v-model="receptionist.account"
              placeholder="Tài khoản"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Mật khẩu">
            <b-input
              type="password"
              v-model="receptionist.password"
              password-reveal
              placeholder="Mật khẩu"
              required
            >
            </b-input>
          </b-field>
          <b-field label="Ngày sinh">
            <b-input
              type="date"
              v-model="receptionist.dob"
              :value="receptionist.dob"
              required
            >
            </b-input>
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
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
          if (response.status === 500) {
            Swal.fire("Không thành công!", "Tài khoản đã tồn tại.", "warning");
          } else {
            this.reload();
            this.$emit("close");
          }
        })
        .catch((e) => {
          Swal.fire("Không thành công!", "Tài khoản đã tồn tại.", "warning");
        });
    },
  },
};
</script>
