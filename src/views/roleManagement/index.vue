<template>
    <div>
        123
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Mixin from '@/utils/mixin'
import {searchKeys,columns} from './config/index'
import { SysAccountApi } from '@/api'
import Permissions from './component/Permissions'
import UpdateStatus from './component/UpdateStatus'
export default {
    name: "roleManagement",
    components: {
        Permissions,
        UpdateStatus
    },
    data() {
        return {
            roleName: '',
            updateVisible: false,
            updateStatus: '',
            editId: '',
            permissionsTitle: '',
            page: 1,
            size: 20,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "banner_index" }),
            createFormValues: {},
            loading: false,
            dataSource: [],
            columns: columns,
            total: 0,
            permissionsVisible: false,
            statusList: [
                { id: 0, name: '正常' },
                { id: 1, name: '停用' }
            ]
        };
    },
    mixins: [Mixin],
    computed: {
        getDataWithKey() {
            return (key) => {
                switch (key) {
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
        }
    },
    created() {
        // this.getList()
    },
    methods: {
        handleResearch(){
            this.createForm.resetFields();
            this.page = 1;
            this.getList()
        },
        handleUpdateCancle(){
            this.updateVisible = false
        },
        handleUpdateSubmitSuccess(){
            this.getList()
            this.updateVisible = false
        },
        handleAdd(){
            this.editId = ''
            this.roleName = ''
            this.permissionsTitle = '新建角色'
            this.permissionsVisible = true
        },
        handleAddCancle(){
            this.permissionsVisible = false
        },
        handleAddSubmitSuccess(){
            this.getList()
            this.permissionsVisible = false
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
        getList(){
            this.loading = true
            this.getFromData()
            let _params = {
                ...this.createFormValues,
                size: this.size,
                page: this.page
            }
            SysAccountApi
                .findpage(_params)
                .then((res)=>{
                    this.loading = false
                    this.dataSource = res.list
                    this.total = res.total
                })
                .catch((err)=>{
                    this.dataSource = []
                })
                .finally(()=>{
                    setTimeout(()=>{
                        this.loading = false
                    }, 3000)
                })
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
        editorClick(val){
            this.editId = val.id
            this.roleName = val.name
            this.permissionsTitle = '角色权限编辑'
            this.permissionsVisible = true
        },
        handleChangeStatus(id, status){
            this.updateStatus = status,
            this.editId = id,
            this.updateVisible = true
        }
    },
};
</script>

<style lang="scss" scoped>

</style>

