<template>
    <div>
        123
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Mixin from '@/utils/mixin'
import {columns} from './config/index'
import { VersionApi } from '@/api'
import AddVersion from './components/AddVersion.vue'
import UpdateStatus from './components/UpdateStatus.vue'
export default {
    name: "versionManagement",
    components: {
        AddVersion,
        UpdateStatus
    },
    data() {
        return {
            updateVisible: false,
            editId: '',
            loading: false,
            columns: columns,
            total: 0,
            page: 1,
            size: 20,
            dataSource: [],
            versionTitle: '',
            addVersionVisible: false,
            updateStatus: '',
        };
    },
    mixins: [Mixin],
    computed: {
        typeText(){
            return (val)=>{
                switch(val){
                    case 1:
                        return 'IOS'
                    case 2:
                        return '安卓'
                    default:
                        return '-'
                }
            }
        },
        forceupdateText(){
            return (val)=>{
                switch(val){
                    case 0:
                        return '否'
                    case 1:
                        return '是'
                    default:
                        return '-'
                }
            }
        },
        statusText(){
            return (val)=>{
                switch(val){
                    case 0:
                        return '生效中'
                    case 1:
                        return '已过期'
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
        copy(e){
            this.toast("复制成功", "success");
        },
        handleStop(val){
            this.editId = val.id
            this.updateVisible = true
        },
        handleUpdateCancle(){
            this.updateVisible = false
        },
        handleUpdateSubmitSuccess(){
            this.getList()
            this.updateVisible = false
        },
        handleAddCancle(){
            this.addVersionVisible = false
        },
        handleAddSubmitSuccess(){
            this.getList()
            this.addVersionVisible = false
        },
        handleUpdateDetail(val){
            this.versionTitle = val.status == 0 ?'新建版本更新' : '查看版本更新详情'
            this.updateStatus = val.status
            this.editId = val.id
            this.addVersionVisible = true
        },
        getList(){
            this.loading = true
            let _params = {
                size: this.size,
                page: this.page,
            }
            VersionApi
                .findpage(_params)
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
        handleAdd(){
            this.editId = ''
            this.updateStatus = ''
            this.versionTitle = '新建版本更新'
            this.addVersionVisible = true
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
