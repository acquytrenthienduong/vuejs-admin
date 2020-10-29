<template>
  <v-row>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Chọn Ngày"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        @input="onInput"
      ></v-date-picker>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  props: {
    selectedDate: {
      type: String
    }
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    pickerDate: null
  }),
  methods: {
    emitToParent(event) {
      this.$emit("selectdDate", this.date);
    },
    getSelectedDate() {
      this.selectedDate = date;
    },
    click() {
      console.log("click", this.date);
    },
    onInput(val) {
      this.menu = false
      this.date = val
      this.$emit('input', val)
      
    }
  },
  watch: {
    pickerDate(val) {
      console.log("sadasdas", val);
    }
  }
};
</script>