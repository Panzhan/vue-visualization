<template>
    <div>
        123444
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {searchKeys,columns} from './config/index'
import { VideoApi } from '@/api'
import AddVideo from './component/AddVideo'
export default {
    name: "brand",
    components: {
        AddVideo
    },
    data() {
        return {
            editId: '',
            addVideoTitle: '',
            page: 1,
            size: 20,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "banner_index" }),
            createFormValues: {},
            loading: false,
            dataSource: [],
            columns: columns,
            total: 0,
            addVideoVisible: false,
            previewVisible: false,
            previewImage: ''
        };
    },
    computed: {

    },
    created() {
        // this.getList()
    },
    methods: {
        previewHandleCancel() {
            this.previewVisible = false;
        },
        preview(previewImage = "") {
            this.previewImage = previewImage;
            this.previewVisible = true;
        },
        handleAddCancle(){
            this.addVideoVisible = false
        },
        handleAddSuccess(){
            this.getList();
            this.addVideoVisible = false
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
                begintime: this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[0].format("YYYY-MM-DD HH:mm:ss") || '',
                endtime: this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[1].format("YYYY-MM-DD HH:mm:ss") || '',
                size: this.size,
                page: this.page
            }
            delete _params.dates
            VideoApi
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
        handleAdd(){
            this.editId = ''
            this.addVideoTitle = '新建video'
            this.addVideoVisible = true
        },
        editorClick(val){
            this.addVideoTitle = '编辑video'
            this.editId = val.id
            this.addVideoVisible = true
        },
        handleDelete(val){
            VideoApi
                .videoDel({id: val.id})
                .then(()=>{
                    this.toast("操作成功", "success");
                    this.getList();
                })
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
