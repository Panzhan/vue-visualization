<template>
    <div>
        123
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Mixin from '@/utils/mixin'
import {columns} from './config/index'
import { MenuApi } from '@/api'
import Menu from './component/Menu'
import UpdateStatus from './component/UpdateStatus'
export default {
    name: "menuManagement",
    components: {
        Menu,
        UpdateStatus
    },
    data() {
        return {
            roleName: '',
            updateVisible: false,
            updateStatus: '',
            editId: '',
            menuTitle: '',
            page: 1,
            size: 20,
            loading: false,
            dataSource: [],
            columns: columns,
            total: 0,
            menuVisible: false,
        };
    },
    mixins: [Mixin],
    computed: {
        typeText(){
            return (val)=>{
                switch(val){
                    case 1:
                        return '目录'
                    case 2:
                        return '一级页面'
                    case 3:
                        return '二级'
                    case 4:
                        return '按钮'
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
        ...mapActions('base', ['getMenuList']),
        handleAdd(){
            this.editId = ''
            this.menuTitle = '添加菜单'
            this.menuVisible = true
        },
        handleUpdateCancle(){
            this.updateVisible = false
        },
        async handleUpdateSubmitSuccess(){
            await this.getMenuList()
            this.getList()
            this.updateVisible = false
        },
        handleAddCancle(){
            this.menuVisible = false
        },
        handleAddSubmitSuccess(){
            this.getList()
            this.menuVisible = false
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
            let params = {
                page: this.page,
                size: this.size
            }
            MenuApi
                .findpage(params)
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
        handleEdit(val){
            this.editId = val.id
            this.menuTitle = '编辑菜单'
            this.menuVisible = true
        },
        handleDetail(val){

        },
        handleDelete(val){
            this.updateVisible = true
            this.editId = val.id
        }
    },
};
</script>

<style lang="scss" scoped>

</style>

