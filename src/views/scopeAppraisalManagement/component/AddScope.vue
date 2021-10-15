<template>
    <div class="constainer">
        <div class="constainer-header">
            <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout" :form="form">
                <a-form-model-item prop="brandid" label="品牌名称">
                    <a-select size="large" placeholder="请选择" v-model="ruleForm.brandid">
                        <a-select-option v-for="item in brandList" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item prop="categoryid" label="品类名称">
                    <a-cascader size="large" v-model="ruleForm.categoryid" :options="category" placeholder="请选择" />
                </a-form-model-item>
                <a-form-model-item label="普通鉴定/币" prop="checkmoney">
                    <a-input-number
                        :precision="precision"
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="ruleForm.checkmoney"
                        :min="0.01"
                    />
                </a-form-model-item>
                <a-form-model-item label="快速鉴定/币" prop="fastcheckmoney">
                    <a-input-number
                        :precision="precision"
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="ruleForm.fastcheckmoney"
                        :min="0.01"
                    />
                </a-form-model-item>
                <a-form-model-item label="AI鉴定/币" prop="aicheckmoney">
                    <a-input-number
                        :precision="precision"
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="ruleForm.aicheckmoney"
                        :min="0.01"
                    />
                </a-form-model-item>
                <a-form-model-item label="普通鉴定结算/RMB" prop="settlement">
                    <a-input-number
                        :precision="precision"
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="ruleForm.settlement"
                        :min="0.00"
                    />
                </a-form-model-item>
                <a-form-model-item label="快速鉴定结算/RMB" prop="fastsettlement">
                    <a-input-number
                        :precision="precision"
                        autoComplete="off" 
                        size="large"
                        placeholder="请输入"
                        maxlength="50"
                        v-model.trim="ruleForm.fastsettlement"
                        :min="0.00"
                    />
                </a-form-model-item>
                <a-form-model-item style="display: flex; justify-content: space-between;">
                    <a-button
                        class="btn btn_l"
                        size="large"
                        @click="cancle"
                    >{{"取消"}}</a-button>
                    <a-button 
                        class="btn btn_r" 
                        size="large" 
                        type="primary"
                        @click="submit"
                    >{{isEdit ? '保存' : "创建"}}</a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { numberReg } from '@/utils/regular.js'
import { CheckerApi } from '@/api'
export default {
    name: "AddScope",
    components: {
    },
    props: {
        editForm: Object
    },
    data() {
        let brandidCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择品牌'));
            }
            callback()
        };
        let categoryidCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请选择品类'));
            }
            callback()
        };
        let checkmoneyCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('普通鉴定/币'));
            }
            callback()
        };
        let fastcheckmoneyCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('快速鉴定/币'));
            }
            callback()
        };
        let aicheckmoneyCheck = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('AI鉴定/币'));
            }
            callback()
        };
        let settlementCheck = (rule, value, callback) => {
            if (!value && value!=0.00) {
                return callback(new Error('普通鉴定结算/RMB'));
            }
            callback()
        };
        let fastsettlementCheck = (rule, value, callback) => {
            if (!value && value!=0.00) {
                return callback(new Error('快速鉴定结算/RMB'));
            }
            callback()
        };
        return {
            precision: 2,
            categoryidFaid: '',
            cascaderSelect: [],
            options: [],
            ruleForm: {
                brandid: '',
                categoryid: [],
                checkmoney: '',
                fastcheckmoney: '',
                aicheckmoney: '',
                settlement: '',
                fastsettlement: '',
            },
            layout: {
                labelCol: { span: 8 },
            },
            rules: {
                brandid: [{ validator: brandidCheck, trigger: 'change' }],
                categoryid: [{ validator: categoryidCheck, trigger: 'change' }],
                checkmoney: [{ validator: checkmoneyCheck, trigger: 'change' }],
                fastcheckmoney: [{ validator: fastcheckmoneyCheck, trigger: 'change' }],
                aicheckmoney: [{ validator: aicheckmoneyCheck, trigger: 'change' }],
                settlement: [{ validator: settlementCheck, trigger: 'change' }],
                fastsettlement: [{ validator: fastsettlementCheck, trigger: 'change' }],
            },
            form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        };
    },
    computed: {
        ...mapState('base', ['brandList', 'categoryList']),
        isEdit(){
            return Object.keys(this.editForm).length
        },
        category(){
            let data = JSON.parse(JSON.stringify(this.categoryList))
            return data.map(item=>{
                return {
                    value: item.id,
                    label: item.name,
                    children: item.items.map(it=>{
                        return {
                            value: it.id,
                            label: it.name,
                        }
                    })
                }
            })
        }
    },
    async created() {
        await this.getBrandList()
        await this.getCategoryList()
        if(this.isEdit){
            this.getFaid(this.editForm.categoryid)
            this.ruleForm = {...this.editForm, categoryid: [this.categoryidFaid, this.editForm.categoryid]}
        }
    },
    methods: {
        ...mapActions('base', ['getBrandList','getCategoryList']),
        getFaid(val){
            this.category.forEach(faItem=>{
                faItem.children.forEach((chilItem)=>{
                    if(val == chilItem.value){
                        this.categoryidFaid = faItem.value
                    }
                })
            })
        },
        cancle(){
            this.$emit('handleAddCancle')
        },
        submit(){
            this.$refs['ruleForm'].validate(valid => {
                if (!valid) {
                    return false;
                }else{
                    if(this.isEdit){
                        const {
                            id,
                            brandid,
                            categoryid,
                            checkmoney,
                            fastcheckmoney,
                            aicheckmoney,
                            settlement,
                            fastsettlement
                        } = this.ruleForm
                        CheckerApi
                            .checkrangeUpdate({
                                id,
                                brandid,
                                categoryid: categoryid[1],
                                checkmoney,
                                fastcheckmoney,
                                aicheckmoney,
                                settlement,
                                fastsettlement
                            })
                            .then(()=>{
                                this.toast("操作成功", "success");
                            })
                            .finally(()=>{
                                this.$emit('handleAddSubmit')
                            })
                    }else{
                        CheckerApi
                            .checkrangeSave({...this.ruleForm, categoryid: this.ruleForm.categoryid[1]})
                            .then(()=>{
                                this.toast("操作成功", "success");
                            })
                            .finally(()=>{
                                this.$emit('handleAddSubmit')
                            })
                    }
                }
            });
        }
    },
};
</script>

<style lang="scss" scoped>
form .ant-select, form .ant-cascader-picker {
    width: 262px;
}
:v-deep span.ant-radio{
    padding-right: 0px;
}
.btn{
    margin: 0 4px;
}
.btn_l{
    border: 0;
    background: #F5F5F5;
}
::v-deep .ant-input-number-lg {
    width: 262px;
}
::v-deep .ant-input-number-input:placeholder-shown {
    font-size: 14px;
}
</style>
