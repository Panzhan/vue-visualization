<template>
  <div class="group-bar-box">
    <div id="groupBarChart" :style="{ width: '100%', height: `${height}px` }"></div>
  </div>
</template>

<script>
import { groupBarConfig } from "./config";
let echarts = require("echarts/lib/echarts");
export default {
  name: "GroupBarEcharts",
  mounted() {
    this.dealData();
  },
  watch: {
    nextList(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.dealData();
      }
    },
  },
  methods: {
    dealData() {
      if (this.nextList.length > 0) {
        let myChart = echarts.init(document.getElementById("groupBarChart"));
        const option = { ...groupBarConfig };
        option.xAxis.data = this.xList;
        option.series[0].data = this.preList;
        option.series[1].data = this.nextList;
        option.legend.data = this.legend;
        option.series[0].name = this.legend[0];
        option.series[1].name = this.legend[1];
        window.addEventListener("resize", () => {
          myChart.resize();
        });
        myChart.setOption(option);
      }
    },
  },
  props: {
    xList: {
      type: Array,
      required: true,
    },
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
  },
};
</script>

<style lang="scss" scoped>
.group-bar-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
