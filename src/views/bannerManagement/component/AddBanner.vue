<template>
    <div class="constainer">
        <div class="constainer-header">
            <a-form :labelCol="{ style: 'width: 85px' }" :form="editorForm">
                <a-form-item label="banner名称">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        :disabled="isDisabled"
                        v-decorator="[
                            'name',
                            {
                                rules: [
                                    { required: true, message: '请输入banner名称!' },
                                ],
                            },
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item label="banner图片">
                    <UploadImg
                        @previewImg="previewImg"
                        :disabled="isDisabled"
                        listType="picture-card"
                        :max="1"
                        :pixelSize="['1035*390']"
                        :memorySize="'200kb'"
                        v-decorator="[
                            'picurl',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请上传图片',
                                    },
                                ],
                                initialValue: '',
                            },
                        ]"
                    ></UploadImg>
                </a-form-item>
                <a-form-item label="链接地址">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :disabled="isDisabled"
                        maxlength="50"
                        v-decorator="[
                            'linkurl',
                            {
                                rules: [
                                    { required: true, message: '请输入链接地址!' },
                                ],
                            },
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                    />
                </a-form-item>
                <a-form-item label="开始时间">
                    <a-date-picker
                        size="large"
                        placeholder="开始时间"
                        :disabled="isDisabled"
                        :disabled-date="disabledDate"
                        :disabled-time="disabledRangeTime"
                        :show-time="{
                            defaultValue:moment('00:00:00','HH:mm:ss')
                        }"
                        v-decorator="[
                            'begintime',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择开始时间!',
                                    },
                                ],
                                initialValue: currentTime,
                            },
                        ]"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                    <span style="margin-left: 15px">(美国时间)</span>
                </a-form-item>
                <a-form-item style="margin: 0 -12px 0 12px" label="结束时间">
                    <a-radio-group 
                        :disabled="isDisabled"
                        name="radioGroup" 
                        v-decorator="[
                            'type',
                            {
                                rules: []
                            }
                        ]">
                        <a-radio :value="0">
                            <a-date-picker
                                :disabled="isDisabled"
                                size="large"
                                placeholder="结束时间"
                                :disabled-date="disabledDate"
                                :disabled-time="disabledRangeTime"
                                v-decorator="[
                                    'endtime',
                                    {
                                        rules: [
                                            {   
                                                validator: endValidator,
                                                message: '结束时间不能小于开始时间!',
                                            }
                                        ],
                                    },
                                ]"
                                 :show-time="{
                                    defaultValue:moment('23:59:59','HH:mm:ss')
                                }"
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </a-radio>
                        <a-radio style="margin-left: -5px;margin-right: 0" :value="1">
                            <span>长期</span>
                        </a-radio>
                        <span style="display: block; color: red" v-if="isEndtimeRequired">请选择结束时间</span>
                        <span style="display: block; color: red" v-if="isEndtimeTrue">结束时间不能小于开始时间!</span>
                    </a-radio-group>
                    <span>(美国时间)</span>
                </a-form-item>
            </a-form>
            <a-form-item style="display: flex; justify-content: space-between;">
                <a-button
                    v-if="status == 3"
                    class="btn btn_l"
                    size="large"
                    type="primary"
                    @click="cancle"
                >{{"确定"}}</a-button>
                <span v-else>
                    <a-button
                        class="btn btn_l"
                        size="large"
                        @click="cancle"
                    >{{"取消"}}</a-button>
                    <a-button 
                        style="margin-left: 10px"
                        class="btn btn_r" 
                        size="large" 
                        type="primary"
                        @click="submit"
                    >{{editId ? '保存' : "创建"}}</a-button>
                </span>
            </a-form-item>
        </div>
        <a-modal
            :visible="preVisible"
            width="460px"
            :centered="true"
            :maskClosable="false"
            :closable="true"
            :destroyOnClose="true"
            :footer="null"
            @cancel="preVisible = false"
            title="预览"
        >
            <div class="preExposure-box">
                <div v-html="content"></div>
            </div>
        </a-modal>
        <PreviewPic
            :isShowPic="previewVisible"
            @closePreviewpic="handleCancel"
            :previewImage="previewImage"
        ></PreviewPic>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import UploadImg from "@/components/UploadImg";
import { BannerApi } from '@/api'
const moment = require('moment')

export default {
    name: "AddBanner",
    components: {
        UploadImg,
    },
    props: {
        editId: String | Number,
        status: String | Number,
        bannerTitle: String
    },
    data() {
        return {
            isEndtimeRequired: false,
            isEndtimeTrue: false,
            type: 1,
            isEdit: '',
            preVisible: false,
            editorForm: this.$form.createForm(this),
            previewImage: "",
            previewVisible: false,
            fetching: false,
            currentId: "new",
            currentTime: "",
            beginTime: "",
            endTime: "",
            disabledTime: {
                hour: "", //存放被ban掉的时
                minute: "", //存放被ban掉的分
            },
            content: "",
            showReleasetime: true,
            disabledLoading: false,
        };
    },
    computed: {
        ...mapState('base', ['userInfo']),
        isDisabled(){
            return this.bannerTitle == '查看Banner'
        }
    },
    created() {
        if(this.editId){
            this.getBannerDetail()
        }else{
            this.$nextTick(()=>{
                this.editorForm.setFieldsValue({
                    type: 0
                });
            })
        }
        // this.editorForm.resetFields();
    },
    methods: {
        moment,
        endValidator(rule,value,callback) {
            let startTime = this.editorForm.getFieldValue('begintime')._d.getTime()
            let endTime = value._d.getTime()
            if(endTime && startTime){
                if(startTime > endTime){
                    callback('结束时间不能小于开始时间!');
                }
                callback()
            }else{
                callback();
            }
        },
        getBannerDetail(){
            BannerApi
                .bannerDetail({id: this.editId})
                .then((res)=>{
                    this.editorForm.setFieldsValue({
                        name: res.name,
                        picurl: res.picurl,
                        linkurl: res.linkurl,
                        begintime: this.$moment(res.begintime, "YYYY-MM-DD HH:mm:ss"),
                        endtime: this.$moment(res.endtime, "YYYY-MM-DD HH:mm:ss"),
                        type: res.type
                    });
                })

        },
        cancle(){
            this.$emit('handleAddCancle')
        },
        submit(){
            this.editorForm.validateFields(async (err, values) => {
                if(values.begintime._d.getTime() > values.endtime._d.getTime()) {
                    this.isEndtimeTrue = true
                    return false
                } else {
                    this.isEndtimeTrue = false
                }
                values.begintime = values.begintime && values.begintime.format("YYYY-MM-DD HH:mm:ss") || ''
                values.endtime = values.endtime && values.endtime.format("YYYY-MM-DD HH:mm:ss") || ''
                if(values.type == 0 && !values.endtime){
                    this.isEndtimeRequired = true
                }else{
                    this.isEndtimeRequired = false
                }
                if (!err) {
                    let params = { ...values }
                    if(!this.editId){
                        BannerApi
                            .bannerSave(params)
                            .then(()=>{
                                this.$emit('handleAddSubmit')
                            }) 
                    }else{
                        BannerApi
                            .bannerUpdate({...params, id: this.editId, operatorid: this.userInfo.id})
                            .then(()=>{
                                this.$emit('handleAddSubmit')
                            }) 
                    }
                }
            });
        },
        range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        },
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < this.$moment().subtract(1, "day");
        },
        disabledRangeTime(current, type) {
            return {
                disabledHours: () =>
                    this.range(0, 24).splice(0, this.disabledTime.hour), //ban小时
                disabledMinutes: () => this.range(0, this.disabledTime.minute), //ban分
            };
        },
        previewImg(data) {
            this.previewImage = data;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
    },
};
</script>

<style lang="scss" scoped>
:v-deep span.ant-radio{
    padding-right: 0px;
}
::v-deep .ant-form-item-required::before {
    display: none;
}
</style>
