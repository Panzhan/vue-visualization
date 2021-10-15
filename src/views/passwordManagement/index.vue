<template>
    <a-card :bordered="false" style="overflow-x: scroll;">
        <a-form :form="form">
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="原密码"
            >
                <div class="pwd_icon">
                    <a-input
                        autoComplete="off"
                        :type="pawdtype0"
                        size="large"
                        v-decorator="[
                            'pwd0',
                            { rules: [{ required: false, message: '' }] },
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                        placeholder="请输入"
                    />
                    <span @click="isShow(0)"><img class="icon" :src="pwdImg0" alt=""></span>
                </div>
            </a-form-item>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="修改密码"
            >
                <div class="pwd_icon">
                    <a-input
                        autoComplete="off"
                        :type="pawdtype1"
                        size="large"
                        :max-length="18"
                        v-decorator="[
                            'pwd1',
                            { rules: [{ required: false, message: '' }] },
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                        placeholder="字母大小写和数字组合，6～18位"
                    />
                    <span @click="isShow(1)"><img class="icon" :src="pwdImg1" alt=""></span>
                </div>
            </a-form-item>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="确认密码"
            >
                <div class="pwd_icon">
                    <a-input
                        autoComplete="off" 
                        class="ipt_item"
                        :type="pawdtype2"
                        size="large"
                        :max-length="18"
                        v-decorator="[
                            'pwd2',
                            { rules: [{ required: false, message: '' }] },
                        ]"
                        @change="
                            (e) => {
                                e.target.value = e.target.value.trim();
                                return e;
                            }
                        "
                        placeholder="字母大小写和数字组合，6～18位"
                    />
                    <span @click="isShow(2)"><img class="icon" :src="pwdImg2" alt=""></span>
                </div>
            </a-form-item>
            <a-button v-hasPermission="['check:pwd:edit']" style="margin-left: 40px" type="primary" @click="handleSubmit">
                修改
            </a-button>
        </a-form>
    </a-card>
</template>

<script>
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 2 },
};
import { mapState, mapGetters, mapMutations } from "vuex";
import { SysAccountApi } from '@/api'
import store from '@/store'

export default {
    name: "passwordManagement",
    components: {
    },
    data() {
        return {
            formItemLayout,
            form: this.$form.createForm(this, { name: 'dynamic_rule' }),
            pawdtype0: 'text', // password text
            pawdtype1: 'text', // password text
            pawdtype2: 'text', // password text
            pwd0: '',
            pwd1: '',
            pwd2: '',
            pwdImg0: '',
            pwdImg1: '',
            pwdImg2: '',
            seeImg: require('../../assets/img/passwd/see.png'),
            notSeeImg: require('../../assets/img/passwd/not_see.png'),
            createFormValues: {}
        };
    },
    computed: {
         ...mapState('base', ['userInfo']),
         userId(){
             return this.userInfo.id || ''
         }
    },
    created() {
        this.pwdImg0 = this.seeImg
        this.pwdImg1 = this.seeImg
        this.pwdImg2 = this.seeImg
    },
    methods: {
        getFromData() {
            this.form.validateFields(async (err, values) => {
                this.createFormValues = { ...values }
            });
        },
        handleSubmit(){
            this.getFromData()
            const PWDREG = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/
            const CHNREG = /[\u4E00-\u9FA5]/g
            if(!this.createFormValues.pwd0){
                this.toast("请输入原密码", "error");
                return
            }
            if(!this.createFormValues.pwd1){
                this.toast("请输入密码", "error");
                return
            }
            if(this.createFormValues.pwd1 && CHNREG.test(this.createFormValues.pwd1)){
                this.toast('不可输入中文','error')
                return
            }
            if(this.createFormValues.pwd1 && !PWDREG.test(this.createFormValues.pwd1)){
                this.toast("必须包含大小写字母和数字的组合，可以使用特殊字符，长度在6-18之间", "error");
                return
            }
            if(!this.createFormValues.pwd2){
                this.toast("请输入确认密码", "error");
                return
            }
            if(this.createFormValues.pwd1 !== this.createFormValues.pwd2){
                this.toast("两次密码不一致", "error");
                return
            }
            SysAccountApi
            // TODO: 确认原密码参数,新接口
                .adminuserUpdatePwd({id: this.userId, password: this.createFormValues.pwd2, oldpassword: this.createFormValues.pwd0, type: 1})
                .then(()=>{
                    this.toast("操作成功", "success");
                    store.commit('clearState')
                    localStorage.removeItem('vueVisualization')
                    setTimeout(()=>{
                        this.$router.push({ path: "/login" });
                    }, 500)
                })
                .catch()
        },
        isShow(val){
            if(val == 1){
                this.pawdtype1 = this.pawdtype1 === 'password' ? 'text' : 'password',
                this.pwdImg1 = this.pawdtype1 === 'password' ? this.notSeeImg : this.seeImg
            }else if(val == 2){
                this.pawdtype2 = this.pawdtype2 === 'password' ? 'text' : 'password'
                this.pwdImg2 = this.pawdtype2 === 'password' ? this.notSeeImg : this.seeImg
            }else{
                this.pawdtype0 = this.pawdtype0 === 'password' ? 'text' : 'password'
                this.pwdImg0 = this.pawdtype0 === 'password' ? this.notSeeImg : this.seeImg
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.pwd_icon{
    display:flex;
    width: 294px;
    .icon{
        margin-left: 14px;
        width: 14px;
        height: 14px;
        cursor: pointer;
    }
}
</style>
