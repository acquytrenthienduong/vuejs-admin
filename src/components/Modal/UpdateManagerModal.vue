<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Manager info</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Tài khoản">
            <b-input
              type="text"
              v-model="manager.account"
              placeholder="Tài khoản"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Mật khẩu">
            <b-input
              type="password"
              v-model="manager.password"
              password-reveal
              placeholder="Mật khẩu"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Ngày sinh">
            <b-input type="date" v-model="manager.dob" required> </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">Đóng</button>
          <button
            class="button is-primary"
            @click="updateManagerByID(manager.manager_id)"
          >
            Cập nhật
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
    manager: {
      type: Object,
    },
    reload: {
      type: Function,
    },
  },

  data() {
    return {
      host: config.config.host,
    };
  },

  methods: {
    updateManagerByID(managerID) {
      axios
        .post(this.host + "/updateManager/" + managerID, {
          account: this.manager.account,
          password: this.manager.password,
          dob: this.manager.dob,
          gender: this.manager.gender,
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
