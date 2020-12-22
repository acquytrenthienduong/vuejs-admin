<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: 600px; height: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Thay đổi thông tin gói Lay Down Tanning</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Khoảng thời gian">
            <vue-timepicker
              v-model="service.time"
              required
              format="HH:mm:ss"
            ></vue-timepicker>
          </b-field>

          <b-field label="Giá tiền">
            <b-input
              type="text"
              v-model="service.money"
              password-reveal
              placeholder="pricing"
              required
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">Đóng</button>
          <button
            class="button is-primary"
            @click="updateServiceByID(service.sub_service_id)"
          >
            Thay đổi
          </button>
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
    service: {
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
    updateServiceByID(id) {
      axios
        .post(this.host + "/updateService/" + id, {
          time: this.service.time,
          money: this.service.money,
        })
        .then((response) => {
          this.reload();
          this.$emit("close");
        });
    },
  },
};
</script>
