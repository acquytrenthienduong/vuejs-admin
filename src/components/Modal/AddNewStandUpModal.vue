<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Stand Up Tanning</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Thời gian">
            <!-- <b-input
              type="text"
              
              :value="time"
              placeholder="00:30:00 phút"
              required
            >
            </b-input> -->
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
          <button class="button" type="button" @click="$emit('close')">
            Đóng
          </button>
          <button @click="addNewService" class="button is-primary">
            Xác nhận
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
// Main JS (in UMD format)
import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";
import axios from "axios";
import config from "../../config/config.js";
export default {
  props: {
    reload: {
      type: Function,
    },
  },
  components: { VueTimepicker },
  data() {
    return {
      name: "Stand up",
      time: "",
      money: "",
      type: 1,
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
