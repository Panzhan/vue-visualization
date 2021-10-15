<template>
  <a-row type="flex" class="_modal-form">
    <a-col :span="24" v-for="({
                key,
                label,
                placeholder,
                input,
                select,
                textarea,
                group,
                dividing,
                button,
                layout,
                rules,
                hidden = false
                }) in searchKeys" :key="key">
      <template v-if="textarea && !hidden">
        <a-form-item class="_modal-form-textarea" :label="label">
          <a-input size="large" :placeholder="placeholder" maxlength="100" type="textarea" style="height: 80px" v-decorator="[ key,{ rules }]" @change="e => {e.target.value = e.target.value.trim();return e}" />
        </a-form-item>
      </template>
      <template v-if="dividing">
        <div class="_modal-form-line"></div>
      </template>
      <template v-if="group && !hidden">
        <a-form-item :label="label" class="_modal-form-group" v-bind="layout">
          <a-radio-group v-decorator="[key, { rules }]" @change="e => groupChange(e, key)">
            <a-radio v-for="(item, index) in getDataWithKey(key)" :key="item.id + index" :value="item.id">{{ item.name }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </template>
      <template v-if="input && !hidden">
        <a-form-item class="_modal-form-input">
          <a-input size="large" :placeholder="placeholder" class="_modal-form-input-action" v-decorator="[key,{ rules }]"></a-input>
          <span class="_modal-form-title">{{ label }}</span>
        </a-form-item>
      </template>
      <template v-if="select && !hidden">
        <a-form-item class="_modal-form-select">
          <a-select size="large" :placeholder="placeholder" class="_modal-form-select-action" v-decorator="[key,{ rules }]">
            <a-select-option v-for="(item, index) in getDataWithKey(key)" :value="item.id" :key="item.id + index">{{ item.name }}</a-select-option>
          </a-select>
          <span class="_modal-form-title">{{label}}</span>
        </a-form-item>
      </template>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "V-modalForm",
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    searchKeys: {
      type: Array,
      required: true,
    },
    getDataWithKey: {
      type: Function,
      default: () => {},
    },
    onDateChange: {
      type: Function,
      default: () => {},
    },
    onAddressChange: {
      type: Function,
      default: () => {},
    },
    disabledDate: {
      type: Function,
      default: () => {},
    },
    onBlur: {
      type: Function,
      default: () => {},
    },
    onSelectChange: {
      type: Function,
      default: (id, key) => {},
    },
    groupChange: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
._modal-form {
  &-textarea {
    margin-bottom: 12px;
    ::v-deep .ant-form-item-label label {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.7);
    }
    ::v-deep .ant-input {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  &-group {
    display: flex;
    margin-bottom: 12px !important;
    max-height: 44px;
    min-height: 32px;
    ::v-deep .ant-form-item-label {
      width: 156px !important;
      text-align: left;
    }
    ::v-deep .ant-radio-wrapper {
      margin-right: 51px;
    }
    ::v-deep .ant-radio-checked + span {
      color: #3270f5;
    }
  }
  &-input {
    position: relative;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
    &-action {
      padding-left: 108px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      &::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.25);
        font-weight: 500;
      }
      &:-moz-placeholder {
        color: rgba(0, 0, 0, 0.25);
        font-weight: 500;
      }
      &:-ms-input-placeholder {
        color: rgba(0, 0, 0, 0.25);
        font-weight: 500;
      }
    }
  }
  &-select {
    position: relative;
    margin-bottom: 12px;
    &-action {
      border-radius: 4px;
      &.max {
        .ant-select-selection__placeholder {
          padding-left: 107px;
        }
        .ant-select-selection--single {
          height: 40px;
          .ant-select-selection__rendered {
            line-height: 38px;
            padding-left: 107px;
            font-weight: 600;
            .ant-select-selection__placeholder,
            .ant-select-search__field__placeholder {
              color: rgba(0, 0, 0, 0.25);
            }
          }
        }
      }
      ::v-deep .ant-select-selection__placeholder {
        padding-left: 97px;
      }
      ::v-deep .ant-select-selection--single {
        height: 40px;
        .ant-select-selection__rendered {
          line-height: 38px;
          padding-left: 97px;
          font-weight: 600;
          .ant-select-selection__placeholder,
          .ant-select-search__field__placeholder {
            color: rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
    ::v-deep .ant-select-open .ant-select-selection,
    .ant-select-focused .ant-select-selection,
    .ant-select-selection:focus,
    .ant-select-selection:active {
      box-shadow: none;
    }
  }
  &-line {
    border-bottom: 1px dashed rgba(232, 232, 232, 1);
  }
  &-title {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 16px;
    line-height: 16px;
    top: 50%;
    margin-top: -8px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 600;
    left: 16px;
    border-right: 1px solid #d9d9d9;
    &.max {
      width: 90px;
    }
  }
  ::v-deep .ant-form-inline,
  .ant-form-item-with-help {
    margin-bottom: 0px;
  }
  textarea {
    resize: none;
  }
}
</style>