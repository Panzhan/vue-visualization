<template>
  <div class="_pagination" v-show="visible">
    <div>
      <span>共 <em>{{total}}</em>条记录 </span>
      <span v-if="Math.ceil(total / size) > 1 ">第 <i>{{page}} / {{Math.ceil(total / size) || 1}}</i> 页</span>
    </div>
    <a-pagination :showSizeChanger="showSizeChanger" :showQuickJumper="showQuickJumper" :pageSize.sync="currentSize" @change="onPageSizeChange" @showSizeChange="onShowSizeChange" :pageSizeOptions="pageSizeOptions" :total="total" v-model="currentPage" v-bind="$attrs" :size="tableSize" />
  </div>
</template>

<script>
export default {
  name: "V-pagination",
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    currentSize: {
      get() {
        return this.size;
      },
      set(val) {
        this.$emit("update:size", val);
      },
    },
  },
  props: {
    // middle, small
    tableSize: {
      type: String,
      default: "default",
    },
    visible: {
      type: Boolean,
      default: true,
    },
    showSizeChanger: {
      type: Boolean,
      default: true,
    },
    showQuickJumper: {
      type: Boolean,
      default: true,
    },
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    pageSizeOptions: {
      type: Array,
      default: () => ["5", "10", "20", "30", "50"],
    },
    onPageSizeChange: {
      type: Function,
      default: () => {},
    },
    onShowSizeChange: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ant-pagination-item a {
  font-family: OswaldBold;
}
._pagination {
  margin-top: 24px;
  height: 32px;
  font-size: 14px;
  font-family: OswaldBold;
  @include flex(flex, space-between, center);
  flex-wrap: nowrap;
  em {
    font-style: normal;
    color: #3270f5;
    padding: 0 4px;
  }
  i {
    font-style: normal;
    color: #232323;
  }
  > span {
    // margin-left: 23px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
  }
}
</style>