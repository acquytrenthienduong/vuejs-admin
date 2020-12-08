<template>
  <md-card class="new-chart">
    <div>
      <highcharts :options="chartOptions"></highcharts>
    </div>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left" v-if="this.$slots.footer">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>
<script>
import { Chart } from 'highcharts-vue'
export default {
  name: "newchart-card",
  components: {
    highcharts: Chart
  },
  props: {
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
  },
  data() {
    return {
      chartId: "no-id"
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>
