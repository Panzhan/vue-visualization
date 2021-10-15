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
import RsetStatus from './component/RestStatus.vue'
export default {
    name: "userManagement",
    components: {
        RsetStatus
    },
    data() {
        return {
            statusVisible: false,
            updateStatus: '',
            page: 1,
            size: 20,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "banner_index" }),
            createFormValues: {},
            loading: false,
            dataSource: [],
            columns: columns,
            total: 0,
            editId: ''
        };
    },
    mixins: [Mixin],
    computed: {
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
        handleResetCancle(){
            this.statusVisible = false
        },
        handleResetSubmitSuccess(){
            SysAccountApi
                .upUserFindpage({id: this.updateStatusId})
                .then((res)=>{
                    this.toast("操作成功", "success");
                    this.getList()
                    this.statusVisible = false
                })
                .catch(()=>{

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
        getList(){
            this.loading = true
            this.getFromData()
            let _params = {
                ...this.createFormValues,
                size: this.size,
                page: this.page
            }
            SysAccountApi
                .userFindpage(_params)
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
                    this.createFormValues.begintime = this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[0].format("YYYY-MM-DD HH:mm:ss") || "",
                    this.createFormValues.endtime = this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[1].format("YYYY-MM-DD HH:mm:ss") || "",
                    delete this.createFormValues.dates
                }
            });
        },
        handleSearch(){
            this.getList()
        },
        handleStopOpen(val){
            this.updateStatus = val.status
            this.updateStatusId = val.id
            this.statusVisible = true
        }
    },
};
</script>

<style lang="scss" scoped>

</style>

