<template>
    <div class="constainer">
        <div class="constainer-header">
            <a-form :labelCol="{ style: 'width: 85px' }" :form="editorForm">
                <a-form-item label="账户名称">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'username',
                            {
                                rules: [
                                    { required: true, message: '请输入账户名称!' },
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
                <a-form-item label="员工姓名">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'realname',
                            {
                                rules: [
                                    { required: true, message: '请输入员工姓名!' },
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
                <a-form-item label="角色类型">
                    <a-select 
                        size="large" 
                        placeholder="请选择" 
                        v-decorator="[
                            'roleid',
                            {
                                rules: [
                                    { required: true, message: '请选择角色类型!' },
                                ],
                            },
                        ]"
                    >
                        <a-select-option v-for="item in roleList" :key="item.id" :disabled="!item.status==0">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="所属公司">
                    <a-select 
                        size="large" 
                        placeholder="请选择" 
                        v-decorator="[
                            'companyid',
                            {
                                rules: [
                                    { required: true, message: '请选择所属公司!' },
                                ],
                            },
                        ]"
                    >
                        <a-select-option v-for="item in companyList" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="所属部门">
                    <a-select 
                        size="large" 
                        placeholder="请选择" 
                        v-decorator="[
                            'departmentid',
                            {
                                rules: [
                                    { required: true, message: '请选择所属部门!' },
                                ],
                            },
                        ]"
                    >
                        <a-select-option v-for="item in departmentList" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="联系方式">
                    <a-input
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        :max-length="50"
                        v-decorator="[
                            'mobile',
                            {
                                rules: [
                                    { required: true, message: '请输入联系方式!' },
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
                <div v-if="!editId">
                    <a-form-item label="登陆密码">
                        <a-input
                            autoComplete="off" 
                            size="large"
                            placeholder="请输入"
                            :max-length="50"
                            v-decorator="[
                                'password',
                                {
                                    rules: [
                                        { required: true, message: '请输入登陆密码!' },
                                        {
                                            validator: validateToNextPassword,
                                        },
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
                    <a-form-item label="确认密码">
                        <a-input
                            autoComplete="off" 
                            size="large"
                            placeholder="请输入"
                            :max-length="50"
                            v-decorator="[
                                'passwordConfirm',
                                {
                                    rules: [
                                        { required: true, message: '请输入确认密码!' },
                                        {
                                            validator: compareToFirstPassword,
                                        },
                                    ],
                                },
                            ]"
                            @change="
                                (e) => {
                                    e.target.value = e.target.value.trim();
                                    return e;
                                }
                            "
                            @blur="handleConfirmBlur"
                        />
                    </a-form-item>
                </div>
                <a-form-item style="display: flex; justify-content: space-between;">
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
                </a-form-item>
            </a-form>
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
import { mapState, mapGetters, mapActions } from "vuex";
import UploadImg from "@/components/UploadImg";
import { SysAccountApi } from '@/api'

export default {
    name: "AddUser",
    components: {
        UploadImg,
    },
    props: {
        editId: String | Number,
    },
    data() {
        return {
            confirmDirty: false,
            isEndtimeRequired: false,
            type: 1,
            isEdit: '',
            preVisible: false,
            editorForm: this.$form.createForm(this),
            previewImage: "",
            previewVisible: false,
            content: "",
        };
    },
    computed: {
        ...mapState('base', [
            'userInfo',
            'roleList',
            'companyList',
            'departmentList'
        ]),
        filterRoleList(){
            return this.roleList.filter(it=>it.status==0)
        }
    },
    created() {
        if(this.editId){
            this.getAdminuserDetail()
        }
        this.getcompanyanddepartment()
        this.getRolesList()
    },
    methods: {
        ...mapActions('base', ['getcompanyanddepartment', 'getRolesList']),
        validateToNextPassword(rule, value, callback) {
            const form = this.editorForm;
            // const reg = /^(.)\1*$/
            const reg = /^(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)|([a-z]+[@#%$!&./<>^,]?)|([0-9]+[@#%$!&./<>^,?]))([a-zA-Z0-9@#%]*)$/
            if(value && value.length<6){
                callback('请输入6位数以上账户密码');
            }
            if(value && !reg.test(value)){
                callback('请输入2种字符以上账户密码')
            }
            if (value && this.confirmDirty) {
                form.validateFields(['passwordConfirm'], { force: true });
            }
            callback();
        },
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.editorForm;
            if (value && value !== form.getFieldValue('password')) {
                callback('两次密码不一致！');
            } else {
                callback();
            }
        },
        getAdminuserDetail(){
            SysAccountApi
                .adminuserDetails({id: this.editId})
                .then((res)=>{
                    this.editorForm.setFieldsValue({
                        companyid: res.companyid,
                        departmentid: res.departmentid,
                        mobile: res.mobile,
                        name: res.name,
                        username: res.username,
                        realname: res.realname,
                        roleid: res.roleid,
                    });
                })

        },
        cancle(){
            this.$emit('handleAddCancle')
        },
        submit(){
            this.editorForm.validateFields(async (err, values) => {
                if (!err) {
                    if(values.type == 0 && !values.endtime){
                        this.isEndtimeRequired = true
                        return
                    }
                    this.isEndtimeRequired = false
                    let params = { ...values }
                    if(params.passwordConfirm){
                        delete params.passwordConfirm
                    }
                    if(!this.editId){
                        SysAccountApi
                            .adminuserSave(params)
                            .then(()=>{
                                this.$emit('handleAddSubmit')
                            }) 
                    }else{
                        SysAccountApi
                            .adminuserUpdate({...params, id: this.editId})
                            .then(()=>{
                                this.$emit('handleAddSubmit')
                            }) 
                    }
                }
            });
        },
        handleCancel() {
            this.previewVisible = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.constainer{
    padding: 0 40px;
}
.ant-form-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
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
