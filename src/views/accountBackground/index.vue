<template>
    <div>
        111
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Mixin from '@/utils/mixin'
import {searchKeys,columns} from './config/index'
import { SysAccountApi } from '@/api'
import AddUser from './component/AddUser.vue'
import Pwd from './component/Pwd.vue'
import RsetStatus from './component/RsetStatus.vue'
export default {
    name: "accountBackground",
    components: {
        AddUser,
        Pwd,
        RsetStatus
    },
    data() {
        return {
            statusVisible: false,
            updateStatus: '',
            updateStatusId: '',
            pwdVisible: false,
            editId: '',
            addUserVisible: false,
            userTitle: '',
            loading: false,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "check_index" }),
            createFormValues: {},
            columns: columns,
            total: 0,
            page: 1,
            size: 20,
            dataSource: [],
            statusList: [
                { id: 0, name: '正常' },
                { id: 1, name: '停用' }
            ]
        };
    },
    // 可复用过滤方法
    mixins: [Mixin],
    computed: {
        ...mapState('base', ['roleList']),
        
        getDataWithKey() {
            return (key) => {
                switch (key) {
                    case "roleid": 
                        return this.roleList
                    case "status": 
                        return this.statusList
                    default:
                        return [];
                }
            };
        },
        statusText(){
            return (val)=>{
                switch(val){
                    case 0:
                        return '正常'
                    case 1:
                        return '停用'
                    default:
                        return '-'
                }
            }
        },
        // filterRecordValue(){
        //     return (val)=>{
        //         if(val === 0 || val === '0') return 0
        //         return val || '---'
        //     }
        // }
    },
    created() {
        // this.getRolesList()
        // this.getList()
    },
    methods: {
        ...mapActions("base", ["getRolesList"]),
        handleResearch(){
            this.createForm.resetFields();
            this.page = 1;
            this.getList()
        },
        handleResetCancle(){
            this.statusVisible = false
        },
        handleResetSubmitSuccess(){
            SysAccountApi
                .adminuserUpdateStatus({id: this.updateStatusId})
                    .then(()=>{
                        this.toast("操作成功", "success");
                        this.getList()
                        this.updateStatusId = ''
                        this.statusVisible = false
                        this.updateStatus = ''
                    })
        },
        handlePwdCancle(){
            this.updateStatusId = false
            this.pwdVisible = false
        },
        handlePwdSubmitSuccess(){
            SysAccountApi
                .adminuserUpdatePwd({id: this.updateStatusId, password: '123456', type: 0})
                    .then((res)=>{
                        this.toast("操作成功", "success");
                        this.getList()
                        this.pwdVisible = false
                    })
        },
        handleAddCancle(){
            this.updateStatusId = ''
            this.updateStatus = ''
            this.addUserVisible = false
        },
        handleAddSubmitSuccess(){
            this.getList()
            this.updateStatusId = ''
            this.updateStatus = ''
            this.addUserVisible = false
        },
        handleAdd(){
            this.userTitle = '新增用户'
            this.editId = ''
            this.addUserVisible = true
        },
        handleEdit(val){
            this.editId = val.id
            this.userTitle = '编辑用户'
            this.addUserVisible = true
        },
        handleStop(val){
            this.updateStatus = val.status
            this.updateStatusId = val.id
            this.statusVisible = true
        },
        handleReset(val){
            this.updateStatusId = val.id
            this.pwdVisible = true
        },
        handleDetail(val){
            const { checkerid, checktime } = val
            this.$router.push({
                path: `/check/settlement/detail`, 
                query: {
                    checkerid: checkerid,
                    checktime: checktime
                }
            })
        },
        getList(){
            this.loading = true
            this.getFromData()
            let _params = {
                ...this.createFormValues,
                size: this.size,
                page: this.page,
            }
            SysAccountApi
                .adminuserFindpage(_params)
                .then((res)=>{
                    this.loading = false
                    this.dataSource = res.list
                    this.total = res.total
                })
                .catch(()=>{
                    this.dataSource = []
                })
                .finally((e)=>{
                    setTimeout(() => {
                        this.loading = false
                    }, 3000);
                })
        },
        onPageSizeChange(page, size) {
            this.page = page;
            this.getList();
        },
        onShowSizeChange(page, size) {
            this.page = 1;
            this.size = size;
            this.getList();
        },
        getFromData() {
            this.createForm.validateFields(async (err, values) => {
                if (!err) {
                    this.createFormValues = { ...values }
                }
            });
        },
        handleSearch(){
            this.getList()
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
