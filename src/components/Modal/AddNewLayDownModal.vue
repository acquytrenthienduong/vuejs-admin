<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Lay Down Tanning</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Thời gian">
            <vue-timepicker v-model="time" required format="HH:mm:ss"></vue-timepicker>
          </b-field>

          <b-field label="Giá tiền">
            <b-input
              type="text"
              v-model="money"
              :value="money"
              placeholder="100,000"
              required
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">Đóng</button>
          <button @click="addNewService" class="button is-primary">Xác nhận</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";

import axios from "axios";
import config from "../../config/config.js";
export default {
  components: { VueTimepicker },

  props: {
    reload: {
      type: Function,
    },
  },
  data() {
    return {
      name: "Lay Down",
      time: "",
      money: "",
      type: 2,
      service_service_id: 1,
      session: null,
      host: config.config.host,
    };
  },
  methods: {
    addNewService() {
      axios
        .post(this.host + "/addServices", {
          name: this.name,
          time: this.time,
          money: this.money,
          type: this.type,
          service_service_id: this.service_service_id,
          session: this.session,
        })
        .then((response) => {
          this.name = "";
          this.time = "";
          this.money = "";
          this.type = "";
          this.service_service_id = "";
          this.session = "";
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
