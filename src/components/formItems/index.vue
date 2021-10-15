<template>
    <span>
        <span
            v-for="{
                key,
                label,
                maxLable = false, // label比较长
                placeholder,
                sizeType = 'large',
                input,
                cascader,
                textarea,
                inputNumber,
                conutmin = 0,
                conutmax = 1,
                step,
                select,
                date,
                dates,
                provinceAndCity,
                expressAndPaytype,
                areaAndDetail,
                button,
                group,
                checkbox,
                slot = 'ext',
                initialValue,
                checkboxsingle,
                format,
                upload,
                max = 1,
                imgSize = 6,
                extra,
                disabled = false,
                rules = [{ required: false }],
                children,
                hidden = false, // 为了控制因为某个筛选项变化导致某个某个搜索项显示或者隐藏
            } in searchKeys"
            :key="key"
            :class="[{ _modalItems: isInModal }, '_formItems']"
        >
            <a-form-item
                v-if="upload"
                :label="label"
                class="select-upload"
                :extra="extra || ''"
            >
                <UploadImg
                    @previewImg="previewImg"
                    listType="picture-card"
                    :max="max"
                    :imgSize="imgSize * 1024"
                    v-decorator="[key, { rules: rules, initialValue: '' }]"
                ></UploadImg>
            </a-form-item>
            <a-form-item
                class="_formItems_input"
                v-if="cascader"
                :label="label"
            >
                <a-cascader 
                    :allowClear="false"
                    :size="sizeType"
                    :options="getDataWithKey(key)" 
                    :placeholder="placeholder" 
                    v-decorator="[key, { rules }]"
                />
            </a-form-item>
            <a-form-item
                class="_formItems_input"
                v-if="input && !hidden"
                :label="label"
            >
                <a-input
                    autoComplete="off" 
                    :size="sizeType"
                    :disabled="disabled"
                    class="_formItems_input_action"
                    :placeholder="placeholder"
                    @blur="(e) => onBlur(e.target.value, key)"
                    @change="(e) => inputChange(e.target.value = e.target.value.trim(), key)"
                    v-decorator="[key, { rules }]"
                />
            </a-form-item>
            <a-form-item
                class="_formItems_input"
                v-if="inputNumber"
                :label="label"
            >
                <a-input-number
                    size="large"
                    :min="conutmin"
                    :max="conutmax"
                    :step="step"
                    :disabled="disabled"
                    class="_formItems_input_action"
                    :placeholder="placeholder"
                    @blur="(e) => onBlur(e.target.value, key)"
                    @change="
                        (e) => {
                            e.target.value = e.target.value.trim();
                            return e;
                        }
                    "
                    v-decorator="[key, { rules }]"
                />
                <span class="extra" v-if="extra">{{ extra }}</span>
            </a-form-item>
            <template v-if="textarea && !hidden">
                <a-form-item class="_modal-form-textarea" :label="label">
                    <a-input
                        size="large"
                        :placeholder="placeholder"
                        maxlength="100"
                        type="textarea"
                        style="height: 80px"
                        v-decorator="[key, { rules }]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
            </template>
            <a-form-item
                class="_formItems_select"
                :label="label"
                v-if="select && !hidden"
            >
                <a-select
                    showSearch
                    :disabled="disabled"
                    optionFilterProp="children"
                    :size="sizeType"
                    :placeholder="placeholder"
                    class="_formItems_select_action"
                    :class="maxLable && 'max'"
                    @change="(value, option) => onSelectChange(option.key, key)"
                    v-decorator="[key, { rules: rules, initialValue }]"
                >
                    <a-select-option
                        v-for="(it, index) in getDataWithKey(key)"
                        :key="(it.id || it.id == 0) ? it.id : index"
                        :value="(it.id || it.id == 0) ? it.id : it"
                        :disabled="paymethodType == 1 && it.id == 2"
                        >{{ it.name ? it.name : (it.nickname ? it.nickname : it) }}</a-select-option
                    >
                </a-select>
            </a-form-item>
            <a-form-item class="_formItems_dates" :label="label" v-if="dates">
                <a-range-picker
                    :disabled="disabled"
                    :size="sizeType"
                    :show-time="{
                        defaultValue:[moment('00:00:00','HH:mm:ss'), moment('23:59:59','HH:mm:ss')]
                    }"
                    :format="format"
                    :disabledDate="disabledDate"
                    @change="onDateChange"
                    v-decorator="[key, { rules: rules }]"
                >
                    <a-icon slot="suffixIcon" type="schedule" />
                </a-range-picker>
            </a-form-item>
            <a-form-item class="_formItems_date" v-if="date" :label="label">
                <a-date-picker
                    :disabled="disabled"
                    @change="onDateChange"
                    :placeholder="placeholder"
                    :format="format"
                    :disabledDate="disabledDate"
                    class="_formItems_date_action"
                    :class="maxLable && 'max'"
                    :size="sizeType"
                    v-decorator="[key, { rules }]"
                >
                    <a-icon slot="suffixIcon" type="schedule" />
                </a-date-picker>
            </a-form-item>
            <template v-if="checkbox">
                <a-form-item class="_formItems_checkbox agent" :label="label">
                    <slot name="checkbox"></slot>
                </a-form-item>
            </template>
            <template v-if="checkboxsingle">
                <a-form-item class="_formItems_checkbox" :label="label">
                    <a-checkbox-group
                        :disabled="disabled"
                        :options="getDataWithKey(key)"
                        v-decorator="[key, { rules: rules, initialValue }]"
                    />
                </a-form-item>
            </template>

            <template v-if="group">
                <a-form-item class="_formItems_group" :label="label">
                    <a-radio-group
                        :disabled="disabled"
                        v-decorator="[key, { rules, initialValue }]"
                        @change="(e) => groupChange(e, key)"
                    >
                        <a-radio
                            v-for="(item, index) in getDataWithKey(key)"
                            :key="item.id + index"
                            :value="item.id"
                            >{{ item.name }}</a-radio
                        >
                    </a-radio-group>
                    <slot :name="slot"></slot>
                </a-form-item>
            </template>
            <a-form-item v-if="expressAndPaytype" :label="label">
                <a-row type="flex" class="_formItems_province" :gutter="0">
                    <a-col
                        v-for="{
                            childKey,
                            childLabel,
                            childPlaceholder,
                            childRules,
                            childDisabled = false,
                            childSizeType = 'large',
                        } in children"
                        :key="childKey"
                        class="_formItems_province_col"
                    >
                        <a-form-item :label="childLabel">
                            <a-select
                                v-if="childKey == 'express'"
                                :size="childSizeType"
                                :disabled="childDisabled"
                                :placeholder="childPlaceholder"
                                class="_formItems_province_action"
                                v-decorator="[childKey, { rules: childRules }]"
                            >
                                <a-select-option
                                    v-for="(name, k) in getDataWithKey(
                                        childKey
                                    )"
                                    :value="name"
                                    :key="k"
                                    >{{ name }}</a-select-option
                                >
                            </a-select>
                            <a-select
                                v-else
                                :size="childSizeType"
                                :disabled="childDisabled"
                                :placeholder="childPlaceholder"
                                class="_formItems_province_action"
                                @change="
                                    (value, option) =>
                                        childSelectChange(option.key, childKey)
                                "
                                v-decorator="[childKey, { rules: childRules }]"
                            >
                                <a-select-option
                                    v-for="it in getDataWithKey(childKey)"
                                    :key="it.id"
                                    :value="it.id"
                                    :disabled="outType == 2 && it.id == 1"
                                    >{{ it.name }}</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form-item>
            <a-form-item v-if="provinceAndCity" :label="label">
                <a-row type="flex" class="_formItems_province" :gutter="0">
                    <a-col
                        v-for="{
                            childKey,
                            childLabel,
                            childPlaceholder,
                            childRules,
                            childDisabled = false,
                            childSizeType = 'large',
                        } in children"
                        :key="childKey"
                        class="_formItems_province_col"
                    >
                        <a-form-item :label="childLabel">
                            <a-select
                                :size="childSizeType"
                                :disabled="childDisabled"
                                :placeholder="childPlaceholder"
                                class="_formItems_province_action"
                                @change="
                                    (name, option) =>
                                        onAddressChange(option, childKey)
                                "
                                v-decorator="[childKey, { rules: childRules }]"
                            >
                                <a-select-option
                                    v-for="item in getDataWithKey(childKey)"
                                    :value="item.name"
                                    :key="item.id"
                                    >{{ item.name }}</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form-item>
            <a-form-item v-if="areaAndDetail">
                <a-row type="flex" class="_formItems_address" :gutter="0">
                    <a-form-item
                        v-for="{
                            childKey,
                            childLabel,
                            childPlaceholder,
                            childRules,
                            childSelect,
                            childInput,
                            childSizeType = 'large',
                            childDisabled = false,
                        } in children"
                        :key="childKey"
                        :label="childLabel"
                    >
                        <a-select
                            :size="childSizeType"
                            :disabled="childDisabled"
                            v-if="childSelect"
                            :placeholder="childPlaceholder"
                            class="_formItems_address_select"
                            @change="
                                (name, option) =>
                                    onAddressChange(option, childKey)
                            "
                            v-decorator="[childKey, { rules: childRules }]"
                        >
                            <a-select-option
                                v-for="item in getDataWithKey(childKey)"
                                :value="item.name"
                                :key="item.id"
                                >{{ item.name }}</a-select-option
                            >
                        </a-select>
                        <a-input
                            :size="childSizeType"
                            v-if="childInput"
                            :disabled="childDisabled"
                            class="_formItems_address_input"
                            :placeholder="childPlaceholder"
                            @change="
                                (e) => {
                                    e.target.value = e.target.value.trim();
                                    return e;
                                }
                            "
                            v-decorator="[childKey, { rules: childRules }]"
                        />
                    </a-form-item>
                </a-row>
            </a-form-item>
            <a-form-item class="_formItems_button" v-if="button">
                <slot name="button"></slot>
            </a-form-item>
        </span>
    </span>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import UploadImg from "@/components/UploadImg";
import lodash from "lodash"; //导入loadsh插件
const moment = require('moment')
export default {
    components: { UploadImg },
    name: "V-formItems",
    props: {
        supplierCoverageList: {
            type: Array,
        },
        visible: {
            type: Boolean,
            default: true,
        },
        searchKeys: {
            type: Array,
            required: true,
        },
        getDataWithKey: {
            type: [Function, Array, Object],
            default: () => {},
        },
        onDateChange: {
            type: Function,
            default: () => {},
        },
        calendarChange: {
            type: Function,
            default: () => {},
        },
        onAddressChange: {
            type: Function,
            default: () => {},
        },
        onExpressChange: {
            type: Function,
            default: () => {},
        },
        disabledDate: {
            type: Function,
            default: () => {},
        },
        isInModal: {
            type: Boolean,
            default: false,
        },
        inputChange: {
            type: Function,
            default: () => {},
        },
        onBlur: {
            type: Function,
            default: () => {},
        },
        onSelectChange: {
            type: Function,
            default: () => {},
        },
        isPlatform: {
            type: Boolean,
            default: false,
        },
        groupChange: {
            type: Function,
            default: () => {},
        },
        previewImg: {
            type: Function,
            default: () => {},
        },
        childSelectChange: {
            type: Function,
            default: () => {},
        },
        paymethodType: {
            type: Number,
            default: 0,
        },
        outType: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: { moment },
};
</script>

<style lang="scss" >
::v-deep .ant-calendar-picker {
    width: 260px !important;
}
form .ant-select, form .ant-cascader-picker {
    width: 221px;
}
._formItems {
    .extra {
        color: #646464;
        font-size: 12px;
        padding-left: 10px;
    }
    &_input_action {
        width: 262px;
    }
    &_select_action {
        width: 262px !important;
    }
    &_date {
    }
    &_address_select {
        min-width: 123px;
    }
    &_address_input {
        min-width: 500px;
    }
    &_province {
        &_col {
            margin-right: 16px;
            width: 123px;
            .ant-form-item-control-wrapper {
                width: 100%;
            }
            .ant-form-item {
                width: 100%;
            }
        }
    }
    textarea {
        resize: none;
        width: 260px;
    }
}
</style>
