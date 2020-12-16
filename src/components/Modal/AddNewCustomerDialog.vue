<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <md-list-item v-bind="attrs" v-on="on">
          <i class="material-icons">add</i>
          <p class="hidden-lg hidden-md">Dashboard</p>
        </md-list-item>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Tạo tài khoản nhanh cho khách hàng</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Số điện thoại"
                  v-model="phone"
                  :rules="[rules.required, rules.started]"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field label="Mật khẩu*" type="password" required></v-text-field>
              </v-col> -->
              <v-col cols="12">
                <v-text-field
                  label="Tên*"
                  v-model="name"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="email"
                  :rules="[rules.required, rules.emailRules]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small class="left">*mật khẩu mặc định là 12345678</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"> Đóng </v-btn>
          <v-btn color="blue darken-1" text @click="register"> Tạo mới </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import config from "../../config/config";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    rules: {
      required: (value) => !!value || "Bắt buộc",
      started: (v) => v.startsWith("+84") || "Bắt đầu bằng +84",
      min: (v) => v.length >= 8 || "Ít nhất 8 kí tự",
      passWordMatch: (val) => val === this.repassword || `Mật khẩu đã nhập không khớp`,
      emailRules: (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Hãy nhập 1 email hợp lệ",
    },
    phone: "+84",
    email: "",
    name: "",
    host: config.config.host,
  }),

  methods: {
    register() {
      let dateRaw = new Date();
      let year = dateRaw.getFullYear();
      let month = dateRaw.getMonth() + 1;
      let dt = dateRaw.getDate();
      let hour = dateRaw.getHours();
      let minute = dateRaw.getMinutes();
      let second = dateRaw.getSeconds();
      if (this.account != "" && this.name != "" && this.email != "") {
        axios.get(this.host + "/findOne/" + this.phone).then((response) => {
          if (response.status === 201) {
            axios
              .post(this.host + `/register`, {
                account: this.phone,
                password: 12345678,
                email: this.email,
                gender: 1,
                name: this.name,
                year: year,
                month: month,
                day: dt,
              })
              .then(() => {
                Swal.fire("Thành công!", "Đăng kí thành công.", "success");
                this.reset();
                this.dialog = false;
              })
              .catch((e) => {
                Swal.fire("Không thành công!", "Có lỗi gì đó đã xảy ra.", "warning");
              });
          } else if (response.status === 200) {
            Swal.fire(
              "Số này đã tồn tài trong hệ thống!",
              "Đăng kí không thành công.",
              "warning"
            );
          }
        });
      } else {
        Swal.fire("Oops ...!", "Hãy điền hết các trường bắt buộc", "warning");
      }
    },

    reset() {
      this.name = "";
      this.phone = "";
      this.email = "";
    },
  },
};
</script>

<style scoped>
.left {
  padding-left: 30px;
}
</style>
