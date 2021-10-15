<template>
    <div class="constainer">
        <div class="constainer-header">
            <a-form :labelCol="{ style: 'width: 85px' }" :form="editorForm">
                <a-form-item label="标题">
                    <a-input
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-decorator="[
                            'title',
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
                <a-form-item label="封面图">
                    <UploadImg
                        @previewImg="previewImg"
                        listType="picture-card"
                        :max="1"
                        :supportImgType="'.jpg'"
                        :pixelSize="'1035*390'"
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
                <a-form-item label="链接">
                    <a-input
                        size="large"
                        placeholder="请输入"
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
            </a-form>
            <a-form-item style="display: flex; justify-content: space-between;">
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
import { VideoApi } from '@/api'

export default {
    name: "AddVideo",
    components: {
        UploadImg,
    },
    props: {
        editId: String | Number
    },
    data() {
        return {
            type: 1,
            isEdit: '',
            preVisible: false,
            editorForm: this.$form.createForm(this),
            previewImage: "",
            previewVisible: false,
            fetching: false,
            currentId: "new",
            currentTime: "",
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
    },
    created() {
        if(this.editId){
            this.getBannerDetail()
        }
    },
    methods: {
        getBannerDetail(){
            VideoApi
                .videoDetail({id: this.editId})
                .then((res)=>{
                    this.editorForm.setFieldsValue({
                        picurl: res.picurl,
                        linkurl: res.linkurl,
                        title: res.title
                    });
                })

        },
        cancle(){
            this.$emit('handleAddCancle')
        },
        submit(){
            this.editorForm.validateFields(async (err, values) => {
                if (!err) {
                    let params = { ...values }
                    if(!this.editId){
                        VideoApi
                            .videoUpdate(params)
                            .then(()=>{
                                this.$emit('handleAddSubmit')
                            }) 
                    }else{
                        VideoApi
                            .videoUpdate({...params, id: this.editId})
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
