<template>
  <v-row>
    <v-menu
      ref="menu"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          label="Chọn Giờ"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        v-model="time"
        full-width
        @click:minute="$refs.menu.save(time)"
      ></v-time-picker>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  props: {
    selectedTime: {
      type: String,
    },
  },
  data() {
    return {
      time: null,
      menu2: false,
      modal2: false,
    };
  },
  method: {
    onInput(val) {
      this.menu = false;
      this.time = val;
      this.$emit("input", val);
    },
  },
};
</script>
