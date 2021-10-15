<template>
  <div class="chart-mini-progress">
    <div class="target" :style="{ left: percent + '%' }">
      <span :style="{ backgroundColor: markColor }" />
      <span :style="{ backgroundColor: markColor }" />
    </div>
    <div class="progress-wrapper">
      <div
        class="progress"
        :style="{
          backgroundColor: markColor,
          width: percent + '%',
          height: height
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniProgress",
  props: {
    height: {
      type: String,
      default: "10px"
    },
    markColor: {
      type: String,
      default: "#13C2C2"
    },
    percent: {
      type: Number,
      default: 0
    },
    bgcolor: {
      type: String,
      default: "#6770E8"
    },
    progressColor: {
      type: String,
      default:
        "linear-gradient(270deg,rgba(97,174,233,1) 0%,rgba(88,217,217,1) 100%)"
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-mini-progress {
  padding: 5px 0;
  position: relative;
  width: 100%;
  border-radius: 1px;
  .target {
    position: absolute;
    top: 0;
    bottom: 0;
    span {
      border-radius: 100px;
      position: absolute;
      top: 0;
      left: 0;
      height: 4px;
      width: 2px;

      &:last-child {
        top: auto;
        bottom: 0;
      }
    }
  }
  .progress-wrapper {
    background-color: #6770e8;
    position: relative;
    border-radius: 1px;
    .progress {
      transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
      border-radius: 1px 0 0 1px;
      background: linear-gradient(
        270deg,
        rgba(97, 174, 233, 1) 0%,
        rgba(88, 217, 217, 1) 100%
      );
      width: 0;
      height: 100%;
    }
  }
}
</style>
