<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Thêm mới quản lí</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Tài Khoản">
            <b-input
              type="text"
              v-model="account"
              :value="account"
              placeholder="Tài khoản"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Mật khẩu">
            <b-input
              type="password"
              v-model="password"
              :value="password"
              password-reveal
              placeholder="Mật khẩu"
              required
              maxlength="8"
            >
            </b-input>
          </b-field>

          <b-field label="Ngày sinh">
            <b-input type="date" v-model="dob" :value="dob" required> </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">Đóng</button>
          <button @click="addNewManager" class="button is-primary">Xác nhận</button>
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
      host: config.config.host,
    };
  },
  methods: {
    addNewManager() {
      if (this.account != "" && this.password != "" && this.dob != "") {
        axios
          .post(this.host + "/addManager", {
            account: this.account,
            password: this.password,
            dob: this.dob,
            gender: this.gender,
          })
          .then((response) => {
            if (response.status === 201) {
              Swal.fire("Không thành công!", "Tài khoản đã tồn tại.", "warning");
            } else {
              this.account = "";
              this.dob = "";
              this.password = "";
              this.gender = "";
              Swal.fire("Thành công!", "Tạo tài khoản thành công.", "success");
              this.$emit("close");
              this.reload();
            }
          })
          .catch((e) => {
            Swal.fire("Không thành công!", "Có lỗi đã xảy ra.", "warning");

            // this.errors.push(e); // co loi o day chua fix duoc
          });
      } else {
        Swal.fire(
          "Không thành công!",
          "Vui lòng điền hết những trường bắt buộc",
          "warning"
        );
      }
    },
  },
};
</script>
