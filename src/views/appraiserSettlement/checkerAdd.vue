<template>
    <a-card :bordered="false" style="overflow-x: scroll;">
        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" :labelCol="{ style: 'min-width: 100px' }" :form="form">
            <a-form-model-item prop="nickname" label="鉴定师昵称">
                <a-input
                    size="large"
                    @change="e => valTrim(e)"
                    v-model.trim="ruleForm.nickname"
                    placeholder="请输入英文"
                />
            </a-form-model-item>
            <a-form-model-item prop="username" label="账户名称">
                <a-input
                    size="large"
                    v-model.trim="ruleForm.username"
                    @change="e => valTrim(e)"
                    placeholder="请输入"
                />
            </a-form-model-item>
            <a-form-model-item prop="password" label="账户密码">
                <a-input
                    size="large"
                    @change="e => valTrim(e)"
                    v-model.trim="ruleForm.password"
                    placeholder="字母大小写和数字组合，6～18位"
                    :max-length="18"
                />
            </a-form-model-item>
            <a-form-model-item label="可鉴定范围">
                <div class="scope_container">
                    <div class="brand_box">
                        <div class="tag_box" >
                            <div class="brand_text co_text">品牌</div>
                            <!-- <div class="category_text co_text">品类</div> -->
                        </div>
                        <div class="select_box">
                            <div style="white-space: nowrap;" v-for="(it, idx) in selectList" :key="it.key">
                                <a-select placeholder="请选择品牌" v-model="it.name" style="margin-bottom: 12px" size="large" @change="(value) => handleBrandChange(value, idx)">
                                    <a-select-option v-for="item in checkcategorynameList" :value="`${item.id}`+`=`+`${item.name}`" :key="item.id">
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
                                <span class="del_brand" @click="handleBrandDelete(idx)">删除品牌</span>
                                <!-- <div class="category_box" :class="idx !== selectList.length -1 ? 'margin_box' : ''">
                                    <div v-for="(item, index) in it.checkrangeidsList" :key="item.key">
                                        <a-select placeholder="请选择品类" style="width: 120px;margin-left: 10px" @change="(value) => handleCategoryChange(value, idx, index)">
                                            <a-select-option v-for="item in categoryList" :value="`${item.id}`+`=`+`${item.name}`" :key="item.id">
                                                {{item.name}}
                                            </a-select-option>
                                        </a-select>
                                        <span class="del_brand" @click="handleCategoryDelete(idx, index)">删除品类</span>
                                    </div>
                                </div>
                                <span style="margin-left: 10px" @click="handleAddCategory(idx)">添加品类</span> -->
                            </div>
                            <span @click="handleAddBrand">添加品牌</span>
                        </div>
                    </div>
                </div>
            </a-form-model-item>
            <a-form-model-item prop="fastcheck" label="快速鉴定">
                <a-radio-group v-model="ruleForm.fastcheck">
                    <a-radio :value="1">
                        支持
                    </a-radio>
                    <a-radio :value="0">
                        不支持
                    </a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item style="margin-bottom: 0" label="在线时间">
                <div class="time_choose">
                    <a-form-model-item prop="onlinetimebegin" class="search-item-long">
                        <a-time-picker  
                            style="margin-right: 8px"
                            size="large" 
                            v-model="ruleForm.onlinetimebegin"   
                            format="HH:mm" />
                    </a-form-model-item>
                    <a-form-model-item prop="onlinetimeend" class="search-item-long">
                        <a-time-picker  
                            size="large" 
                            v-model="ruleForm.onlinetimeend" 
                            format="HH:mm" />
                    </a-form-model-item>
                    <span>（美国时间）</span>
                </div>
            </a-form-model-item>
            <a-form-model-item prop="paytype" label="结算方式">
                <a-input
                    size="large"
                    @change="e => valTrim(e)"
                    v-model.trim="ruleForm.paytype"
                    placeholder="请输入"
                />
            </a-form-model-item>
            <a-form-model-item prop="paynumber" label="结算账户">
                <a-input
                    size="large"
                    @change="e => valTrim(e)"
                    v-model.trim="ruleForm.paynumber"   
                    placeholder="请输入"
                />
            </a-form-model-item>
        </a-form-model>
        <div class="footer">
            <a-button size="large" class="btn_l" @click="handleAdd(1)">取消</a-button>
            <a-button size="large" type="primary" @click="handleAdd()">{{editId ? '保存' : '创建'}}</a-button>
        </div>
        
    </a-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Mixin from '@/utils/mixin'
import { CheckerApi } from '@/api'
export default {
    name: "checkerAdd",
    components: {
    },
    data() {
        let usernameCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入鉴定师名称'));
            }
            callback()
        };
        let nicknameCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入账户名称'));
            }
            callback()
        };
        let passwordCheck = (rule, value, callback) => {
            if(this.editId && !value){
                callback()
            }
            if (!value) {
                return callback(new Error('请输入账户密码'));
            }
            if(value){
                const PWDREG = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/
                const CHNREG = /[\u4E00-\u9FA5]/g
                if(CHNREG.test(value)){
                    return callback(new Error('不可输入中文'));
                }
                if(!PWDREG.test(value)){
                    return callback(new Error('必须包含大小写字母和数字的组合，可以使用特殊字符，长度在6-18之间'));
                }
            }
            callback()
        };
        let paytypeCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入结算方式'));
            }
            callback()
        };
        let paynumberCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入结算账户'));
            }
            callback()
        };
        return {
            selectBrandIdx: 0,
            selectCategoryIdx: 0,
            selectList: [],
            brand: '',
            ruleForm: {
                fastcheck: 0,
                username: '',
                nickname: '',
                password: '',
                checkrangeids: [],
                onlinetimebegin: '',
                onlinetimeend: '',
                paytype: '',
                paynumber: ''
            },
            rules: {
                username: [{ validator: usernameCheck, trigger: 'change' }],
                nickname: [{ validator: nicknameCheck, trigger: 'change' }],
                password: [{ validator: passwordCheck, trigger: 'change' }],
                paytype: [{ validator: paytypeCheck, trigger: 'change' }],
                paynumber: [{ validator: paynumberCheck, trigger: 'change' }],
            },
            form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        };
    },
    mixins: [Mixin],
    computed: {
        ...mapState('base', ['brandList', 'categoryList', 'checkcategorynameList']),
        editId(){
            return this.$route.query.id
        }
    },
    created() {
        this.getCheckcategorynameList()
        if(this.editId){
            this.getCheckerDetail()
        }
    },
    methods: {
        ...mapActions('base', ['getBrandList','getCategoryList', 'getCheckcategorynameList']),
        getCheckerDetail(){
            CheckerApi
                .checkerDetail({id: this.editId})
                .then((res)=>{
                    this.ruleForm = {...res}
                    res.checkranges.forEach((it, idx)=>{
                        this.selectList.push({
                            key: idx,
                            id: it.id,
                            name: it.name,
                        })
                    })
                    this.ruleForm.onlinetimebegin = this.$moment(
                        res.onlinetimebegin,
                        'HH:mm'
                    ),
                    this.ruleForm.onlinetimeend = this.$moment(
                        res.onlinetimeend,
                        'HH:mm'
                    ),
                    delete this.ruleForm.checkranges
                })
                .catch(()=>{

                })
        },
        handleAddBrand() {
            // 保证key唯一性，加上原数组长度
            this.selectBrandIdx=this.selectList.length && this.selectList.length-1 || 0
            this.selectBrandIdx++
            this.selectList.push({
                key: this.selectBrandIdx,
                id: '',
                name: '',
                // checkrangeidsList: []
            })
        },
        handleAddCategory(idx){
            this.selectCategoryIdx++
            this.selectList[idx].checkrangeidsList.push({
                key: this.selectCategoryIdx,
                id: '',
                name: '',
            })
        },
        handleBrandDelete(idx){
            this.selectList = this.selectList.filter((it, index)=>index !== idx)
        },
        handleCategoryDelete(faIndex, chiIndex){
            this.selectList[faIndex].checkrangeidsList = this.selectList[faIndex].checkrangeidsList.filter((it, index)=>index !== chiIndex)
        },
        handleBrandChange(val, idx){
            let len = this.selectList.length
            let isStop = this.selectList.some((it)=>{
                return len > 1 && it.id == val.split("=")[0]
            })
            if(isStop){
                this.toast("请勿选择相同的品牌", "error");
                this.handleBrandDelete(idx)
                return
            } 
            this.selectList.forEach((it,index)=>{
                if(index === idx){
                    it.id = val.split("=")[0]
                    it.name = val.split("=")[1]
                }
            })
        },
        handleCategoryChange(val, faIndex, chiIndex){
            let isStop = this.selectList.some((it)=>{
                return item.id == val.split("=")[0]
            })
            if(isStop) {
                this.toast("请勿选择相同的品类", "error");
                this.handleCategoryDelete(faIndex, chiIndex)
                return
            }
            this.selectList[faIndex].checkrangeidsList.forEach((it,index)=>{
                if(index === chiIndex){
                    it.id = val.split("=")[0]
                    it.name = val.split("=")[1]
                }
            })
        },
        valTrim(e){
            e.target.value = e.target.value.trim();
            return e
        },
        getCheckrangeids(){
            this.ruleForm.checkrangeids = this.selectList.reduce((prev, cur)=>{
                cur.id && prev.push(cur.id)
                return prev
            },[])
        },
        handleAdd(val){
            if(val){
                this.$refs['ruleForm'].resetFields();
                this.$router.push('/check/user')
                return 
            }
            this.getCheckrangeids()
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    let params = Object.assign({}, this.ruleForm)
                    params.onlinetimebegin = params.onlinetimebegin.format("HH:mm")
                    params.onlinetimeend = params.onlinetimeend.format("HH:mm")
                    if(!this.editId){
                        CheckerApi  
                            .save(params)
                            .then((res)=>{
                                this.$router.push('/check/user')
                            })
                            .catch((err)=>{

                            })
                    }else{
                        CheckerApi  
                            .checkerUpdate({...params, id:this.editId})
                            .then((res)=>{
                                this.$router.push('/check/user')
                            })
                            .catch((err)=>{

                            })
                    }
                }else{
                    return  false
                }
            });
        }
    },
};
</script>
<style lang="scss" scoped>
::v-deep .ant-time-picker-large .ant-time-picker-input {
    font-size: 14px; 
}

.time_choose{
    display: flex;
}
.search-item-long{
    display: inline !important;
    ::-webkit-input-placeholder {
      font-size: 14px;
    }
} 
.scope_container{
    width: 100%;
    min-height: 100px;
    display: flex;
    position: relative;
    .brand_box{
        flex: 1;
        .tag_box{
            display: flex;
            .co_text{
                text-align: center;
                width: 70px;
                height: 40px;
                background: #FAFAFA;
                border-radius: 6px;
                color: #232323;
                font-size: 14px;
                line-height: 40px;
                margin: -2px 0 10px 0;
            }
            .category_text{
                margin-left: 280px;
            }
        }
        .select_box{
            .del_brand{
                margin-left: 54px;
            }
            .category_box{
                display: inline-flex;
                margin-left: 64px;
            }
        }
    }

}
::v-deep .ant-select-lg .ant-select-selection--single {
    height: 40px;
    width: 262px;
}
.footer{
    margin: 0 auto;
    width: 200px;
    display: flex;
    justify-content: space-around;
    .btn_l{
        border: 0;
        background: #F5F5F5;
    }
}
</style>
