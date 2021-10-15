<template>
  <div class="bar-box">
    <div id="lineChart" :style="{ width: '100%', height: `${height}px` }"></div>
  </div>
</template>

<script>
import { lineConfig } from "./config";
let echarts = require("echarts/lib/echarts");
export default {
  name: "LineEcharts",
  mounted() {
    this.dealData();
  },
  watch: {
    nextList(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.dealData(newValue);
      }
    },
  },
  methods: {
    dealData() {
      let myChart = echarts.init(document.getElementById("lineChart"));
      const option = { ...lineConfig };
      option.xAxis.data = this.xData;
      option.series[0].data = this.nextList;
      option.series[1].data = this.preList;
      option.legend.data = this.legend;
      option.series[0].name = this.legend[0];
      option.series[1].name = this.legend[1];
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption(option);
    },
  },
  props: {
    preList: {
      type: Array,
      required: true,
    },
    nextList: {
      type: Array,
      required: false,
    },
    height: {
      type: Number,
      default: 195,
    },
    legend: {
      type: Array,
      required: true,
    },
    xData: {
      type: Array,
      required: false,
    },
    height: {
      type: Number,
      default: 189,
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
