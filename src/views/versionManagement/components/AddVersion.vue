<template>
    <div class="constainer">
        <div class="constainer-header">
            <a-form :labelCol="{ style: 'width: 85px' }" :form="editorForm">
                <a-form-item label="更新端">
                    <a-radio-group :disabled="isDisabled" v-decorator="['type', { rules: [], initialValue: 1 }]" name="radioGroup">
                        <a-radio :value="1">
                            IOS
                        </a-radio>
                        <a-radio :value="2">
                            安卓
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="更新版本号">
                    <a-input
                        autoComplete="off" 
                        :disabled="isDisabled"
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-decorator="[
                            'version',
                            {
                                rules: [
                                    { required: true, message: '请输入版本号!' },
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
                <a-form-item label="更新文案">
                    <a-textarea
                        autoComplete="off" 
                        :disabled="isDisabled"
                        size="large" 
                        :rows="4"
                        placeholder="请输入" 
                        v-decorator="[
                            'copywriting',
                            {
                                rules: [
                                    { required: true, message: '请输入更新文案!' },
                                ],
                            },
                        ]"
                    >
                    </a-textarea>
                </a-form-item>
                <a-form-item label="下载链接">
                    <a-input
                        autoComplete="off" 
                        :disabled="isDisabled"
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-decorator="[
                            'linkurl',
                            {
                                rules: [
                                    { required: true, message: '请输入下载链接!' },
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
                <a-form-item label="强制更新">
                    <a-radio-group :disabled="isDisabled" v-decorator="['forceupdate', { rules: [], initialValue: 0 }]" name="radioGroup">
                        <a-radio style="margin-left: -8px" :value="0">
                            否
                        </a-radio>
                        <a-radio :value="1">
                            是
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item style="display: flex; justify-content: space-between;">
                    <span v-if="updateStatus == 0">
                        <a-button
                            style="background: #F5F5F5;border: 0"
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
                    <span v-if="updateStatus == 1">
                        <a-button 
                            style="margin-left: 10px"
                            class="btn btn_r" 
                            size="large" 
                            type="primary"
                            @click="cancle"
                        >{{'确定'}}</a-button>
                    </span>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UploadImg from "@/components/UploadImg";
import { VersionApi } from '@/api'

export default {
    name: "AddVersion",
    components: {
        UploadImg,
    },
    props: {
        editId: String | Number,
        updateStatus: String | Number,
    },
    data() {
        return {
            editorForm: this.$form.createForm(this)
        };
    },
    computed: {
        ...mapState('base', [
            'userInfo',
            'roleList',
            'companyList',
            'departmentList'
        ]),
        isDisabled(){
            return this.updateStatus == 1
        }
    },
    created() {
        if(this.editId){
            this.getVersionDetail()
        }
    },
    methods: {
        getVersionDetail(){
            VersionApi
                .findone({id: this.editId})
                .then((res)=>{
                    this.editorForm.setFieldsValue({
                        type: res.type,
                        version: res.version,
                        copywriting: res.copywriting,
                        linkurl: res.linkurl,
                        forceupdate: res.forceupdate
                    });
                })

        },
        cancle(){
            this.$emit('handleAddCancle')
        },
        submit(){
            this.editorForm.validateFields(async (err, values) => {
                if (!err) {
                    if(!this.editId){
                        VersionApi
                            .versionconfigSave({...values})
                            .then((res)=>{
                                this.toast("操作成功", "success");
                                this.$emit('handleAddSubmit')
                            })
                    }else{
                        VersionApi
                            .edit({...values, id: this.editId})
                            .then((res)=>{
                                this.toast("操作成功", "success");
                                this.$emit('handleAddSubmit')
                            })
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.ant-form-item {
    // display: -webkit-box;
    // display: -ms-flexbox;
    // display: flex;
    // justify-content: space-around;
}
:v-deep span.ant-radio{
    padding-right: 0px;
}
::v-deep .ant-form-item-required::before {
    display: none;
}
form .ant-select, form .ant-cascader-picker {
    width: 262px;
}
</style>
