<template>
  <transition name="fade">
    <div v-if="visible" class="custom-dialog">
      <div class="dialog-detail">
        <div class="top-view">
          <span v-if="title" class="title" v-text="title" />
          <template v-else>
            <span v-if="message" class="message" v-text="message" />
          </template>
        </div>
        <div v-if="single" class="bottom-view-single">
          <span class="left" @click="cancel" v-text="cancelTitle" />
        </div>
        <div v-else class="bottom-view">
          <span class="left" @click="cancelClick" v-text="cancelTitle" />
          <span
            class="right"
            @click="okClick"
            v-text="configTitle"
            :class="configBgType == 'nomal'? 'nomal' : 'warning'"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CustomDialog",
  methods: {
    cancelClick() {
      this.visible = false;
      this.cancel();
    },
    okClick() {
      this.visible = false;
      this.ok(this.inputValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-dialog {
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 1.5s;
    opacity: 1;
  }

  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
  }
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.65);
  .dialog-detail {
    width: 360px;
    min-height: 132px;
    border-radius: 6px;
    background-color: #ffffff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 24px 0;
    .top-view {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 17px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #333333;
        line-height: 24px;
        margin: 0 32px;
        white-space: pre-wrap;
      }
      .message {
        padding: 0 32px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.7);
        text-align: center;
        white-space: pre-wrap;
        width: 100%;
      }
    }
    .bottom-view {
      margin-top: 16px;
      height: 40px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      > span {
        font-size: 14px;
        width: 90px;
        height: 40px;
        text-align: center;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 40px;
        &.left {
          color: rgba(0, 0, 0, 0.65);
          background-color: rgba(0, 0, 0, 0.05);
        }
        &.right {
          margin-left: 12px;
          border: none;
          background-color: #3270F5;
          color: #fff;
          &.nomal {
            background-color: #3270F5;
          }
          &.warning {
            background-color: rgba(236, 0, 0, 0.7);
          }
        }
        &.single {
          display: none;
        }
      }
    }
  }
}
</style>
