<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Thêm mới lễ tân</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Tài khoản">
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
              maxlength="16"
              minlength="8"
            >
            </b-input>
          </b-field>
          <b-field label="Ngày sinh">
            <b-input type="date" v-model="dob" :value="dob" required> </b-input>
          </b-field>

          <!-- <b-field label="Ca làm việc">
            <b-select placeholder="Select a shift" v-model="selected_shift">
              <option
                v-for="shift in shifts"
                :value="shift.shift_id"
                :key="shift.shift_id"
              >
                {{ shift.shift_name }}
              </option>
            </b-select>
          </b-field> -->
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">Đóng</button>
          <button @click="addNewReceptionist" class="button is-primary">Xác nhận</button>
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
      host: config.config.host,
    };
  },
  methods: {
    addNewReceptionist() {
      if (this.account != "" && this.password != "" && this.dob != "") {
        axios
          .post(this.host + "/addReceptionist", {
            account: this.account,
            password: this.password,
            dob: this.dob,
            shift_shift_id: this.selected_shift,
          })
          .then((response) => {
            if (response.status === 201) {
              Swal.fire("Không thành công!", "Tài khoản đã tồn tại.", "warning");
            } else {
              (this.account = ""), (this.password = ""), (this.dob = "");
              this.selected_shift = "";
              Swal.fire("Thành công!", "Tạo tài khoản thành công.", "success");
              this.$emit("close");
              this.reload();
            }
          })
          .catch((e) => {
            Swal.fire("Không thành công!", "Có lỗi đã xảy ra.", "warning");
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
