<template>
    <div>
        111
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Mixin from '@/utils/mixin'
import {searchKeys,columns} from './config/index'
import { BannerApi } from '@/api'
import AddBanner from './component/AddBanner'
export default {
    name: "bannerManagement",
    components: {
        AddBanner
    },
    data() {
        return {
            editId: '',
            bannerTitle: '',
            titles: [],
            status: 2, //1:进行中 2:未开始 3:已结束
            page: 1,
            size: 20,
            defaultIndex: 0,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "banner_index" }),
            createFormValues: {},
            loading: false,
            dataSource: [],
            columns: columns,
            total: 0,
            addBannerVisible: false,
            previewVisible: false,
            previewImage: '',
        };
    },
    mixins: [Mixin],
    computed: {
    },
    created() {
        // this.getList()
        // this.getBannerCount()
    },
    methods: {
        handleResearch(){
            this.createForm.resetFields();
            this.page = 1;
            this.handleSearch()
        },
        getBannerCount(){
            this.getFromData()
            const {
                name,
                begintime,
                endtime
            } = this.createFormValues
            let params = {
                name,
                begintime,
                endtime
            }
            BannerApi
                .gettabcount(params)
                .then((res)=>{
                    // res = res.sort(this.sortByKey('status'))
                    this.titles = res.map((item,index)=>{
                        return {
                            id: index,
                            key: item.status,
                            name: item.text,
                            count: item.count
                        }
                    })
                })
        },
        copy(e){
            this.toast("复制成功", "success");
        },
        previewHandleCancel() {
            this.previewVisible = false;
        },
        preview(previewImage = "") {
            this.previewImage = previewImage;
            this.previewVisible = true;
        },
        handleAddCancle(){
            this.addBannerVisible = false
        },
        handleAddSubmitSuccess(){
            this.handleSearch()
            this.addBannerVisible = false
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
        getList(params){
            this.loading = true
            this.getFromData()
            let _params = {
                ...this.createFormValues,
                status: this.status,
                size: this.size,
                page: this.page
            }
            BannerApi
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
                    this.createFormValues.begintime = this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[0].format("YYYY-MM-DD HH:mm:ss") || "",
                    this.createFormValues.endtime = this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[1].format("YYYY-MM-DD HH:mm:ss") || "",
                    delete this.createFormValues.dates
                }
            });
        },
        handleSearch(){
            this.getList()
            this.getBannerCount()
        },
        handleAdd(){
            this.editId = ''
            this.bannerTitle = '新建Banner'
            this.addBannerVisible = true
        },
        handleClick(e){
            // this.createForm.resetFields();
            this.defaultIndex = e.id
            this.status = e.key
            this.page = 1
            this.size = 20
            this.handleSearch()
        },
        handleStop(val){
            BannerApi
                .endbanner({id: val.id})
                .then(()=>{
                    this.toast("操作成功", "success");
                    this.getList()
                })
        },
        editorClick(val){
            this.bannerTitle = '编辑Banner'
            this.editId = val.id
            this.addBannerVisible = true
        },
        handleDetail(val){
            this.bannerTitle = '查看Banner'
            this.editId = val.id
            this.addBannerVisible = true
        },
        handleDelete(val){
            BannerApi
                .bannerDelete({id: val.id})
                .then((res)=>{
                    this.toast("操作成功", "success");
                    this.getList()
                })
                .catch((err)=>{
                    
                })
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
