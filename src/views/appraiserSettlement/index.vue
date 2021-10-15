<template>
    <div>
        111
    </div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Mixin from '@/utils/mixin'
import {columns} from './config/index'
import { CheckerApi } from '@/api'
export default {
    name: "appraiserSettlement",
    components: {
    },
    data() {
        return {
            tipsDesc: '',
            isDeleteVisible: false,
            loading: false,
            columns: columns,
            total: 0,
            page: 1,
            size: 20,
            dataSource: [],
            operateId: ''
        };
    },
    mixins: [Mixin],
    computed: {
        fastcheckTxt(){
            // 0普通鉴定 1快速鉴定 2 AI鉴定
            return (val)=>{
                switch (val) {
                    case 0: 
                        return '否'
                    case 1: 
                        return '是'
                    default:
                        return '-'
                }
            }
        },
    },
    created() {
        // this.getList()
    },
    methods: {
        handleCancle(){
            this.isDeleteVisible = false
        },
        handleSubmit(){
            CheckerApi
                .deleteChecker({id: this.operateId})
                .then((res)=>{
                    this.size = 20
                    this.page = 1
                    this.toast("操作成功", "success");
                    this.isDeleteVisible = false
                    this.getList()
                })
                .catch((err)=>{
                    this.isDeleteVisible = false
                })
        },
        getList(){
            this.loading = true
            let params = {
                size: this.size,
                page: this.page,
            }
            CheckerApi
                .findpage(params)
                .then((res)=>{
                    // TODO: 更新时间 创建时间取值
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
        editorClick(val){
            this.$router.push({
                path: `/check/user/edit`, 
                query: {
                    id: val.id
                }
            })
        },
        handleDelete(val){
            this.tipsDesc = '确定删除该账户吗，删除后该账户无法登陆鉴定师系统！'
            this.isDeleteVisible = true
            this.operateId = val.id
        },
        handleAdd(){
            this.$router.push('/check/user/add')
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
