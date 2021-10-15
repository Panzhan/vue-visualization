<template>
  <div class="pie-box">
    <div id="pieChart" :style="{ width: '100%', height: `${height}px` }"></div>
    <!-- <div class="pie-layer">
      <div class="pie-layer-left">
        <div class="title-pie-box">寄存中{{100-percentOne.toFixed(0) || 0}}%</div>
        <div class="total-pie-box">共 {{dataArrs[1].value}}件</div>
        <div>现货<span>{{dataArrs[1].stokcount}}</span>件</div>
        <div>瑕疵<span>{{dataArrs[1].nostokcount}}</span>件</div>
      </div>
      <div class="pie-layer-middle"></div>
      <div class="pie-layer-right">
        <div class="tap-pie-box">在售中{{percentOne? percentOne.toFixed(0): 0}}%</div>
        <div class="total-pie-box">共 {{dataArrs[0].value}}件</div>
        <div>现货<span>{{dataArrs[0].stokcount}}</span>件</div>
        <div>瑕疵<span>{{dataArrs[0].nostokcount}}</span>件</div>
      </div>
    </div> -->

  </div>
</template>

<script>
import { pieConfig } from "./config";
let echarts = require("echarts/lib/echarts");
export default {
  name: "BarEcharts",
  props: {
    pieData: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      default: 114,
    },
    startAngle: {
      type: Number,
      default: 45,
    },
  },
  watch: {
    pieData: {
      handler: function (nVal, oVal) {
        this.dealData(nVal);
      },
      deep: true,
    },
  },
  data() {
    return {
      dataArrs: [],
      percentOne: 0,
    };
  },
  created() {
    let temVal = this.pieData;
    this.dataArrs = temVal;
    this.percentOne =
      (temVal[0].value / (temVal[0].value + temVal[1].value)) * 100;
  },
  mounted() {
    this.dealData(this.pieData);
  },
  methods: {
    dealData(newValue) {
      this.dataArrs = newValue;
      this.percentOne =
        (newValue[0].value / (newValue[0].value + newValue[1].value)) * 100;

      let myChart = echarts.init(document.getElementById("pieChart"));
      const option = { ...pieConfig };
      option.series[0].data = newValue;
      option.series[0].startAngle = this.startAngle;
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.pie-box {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  .pie-layer {
    position: absolute;
    width: 100%;
    height: 112px;
    top: 19%;
    z-index: 99;
    @include flex(flex, flex-start, center, nowrap);
    &-middle {
      width: 116px;
      flex-shrink: 0;
      height: 112px;
      // background: rgba(0, 0, 0, .3);
    }
    &-left,
    &-right {
      width: 50%;
      flex-shrink: 1;
      height: 112px;
      background: #f9f9f9;
      border-radius: 6px;
      padding: 10px 8px;
      > div {
        white-space: nowrap;
        overflow: hidden;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 400;
        line-height: 20px;
        &.title-pie-box {
          color: #2c8cbf;
          font-weight: 500;
        }
        &.total-pie-box {
          font-weight: 500;
        }
        &.tap-pie-box {
          color: #db65d1;
          font-weight: 500;
        }
      }
    }
    &-right {
      left: 62%;
    }
  }
}
</style>
