<template>
    <div>
        123
    </div>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Mixin from '@/utils/mixin'
import {columns, searchKeys} from './config/index'
import { CheckerApi } from '@/api'
import AddScope from './component/AddScope.vue'
export default {
    name: "scopeAppraisalManagement",
    components: {
        AddScope
    },
    data() {
        return {
            addScopeTitle: '',
            addScopeVisible: false,
            previewVisible: false,
            previewImage: '',
            loading: false,
            columns: columns,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "banner_index" }),
            total: 0,
            page: 1,
            size: 20,
            dataSource: [],
            editForm: {},
            createFormValues:{},
        };
    },
    mixins: [Mixin],
    computed: {
        ...mapState('base', ['brandList', 'categoryList']),
        secategoryList(){
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
        },
        getDataWithKey() {
            return (key) => {
                switch (key) {
                    case "brandid": 
                        return this.brandList
                    case "categoryid":
                        return this.secategoryList
                    default:
                        return [];
                }
            };
        },

    },
    created() {
        // this.getList()
        // this.getCategoryList()
        // this.getBrandList()
    },
    methods: {
        ...mapActions('base', ['getBrandList','getCategoryList', 'getCheckcategorynameList']),
        handleSearch(){
            this.getList()
        },
        handleResearch(){
            this.page = 1;
            this.createForm.resetFields();
            this.getList()
        },
        handleAddCancle(){
            this.addScopeVisible = false
        },
        handleAddSubmitSuccess(){
            this.addScopeVisible = false
            this.getList()
        },
        handleAdd(){
            this.addScopeTitle = '新建鉴定范围'
            this.editForm = {}
            this.addScopeVisible = true
        },
        previewHandleCancel() {
            this.previewVisible = false;
        },
        preview(previewImage = "") {
            this.previewImage = previewImage;
            this.previewVisible = true;
        },
        handleEdit(val){
            this.addScopeTitle = '编辑鉴定范围'
            this.editForm = JSON.parse(JSON.stringify(val))
            this.addScopeVisible = true
        },
        getFromData() {
            this.createForm.validateFields(async (err, values) => {
                if (!err) {
                    this.createFormValues = { ...values }
                    if(this.createFormValues.categoryid && this.createFormValues.categoryid.length){
                        this.createFormValues.categoryid = this.createFormValues.categoryid[1]
                    }
                }
            });
        },
        getList(){
            this.loading = true
            this.getFromData()
            let _params = {
                ...this.createFormValues,
                size: this.size,
                page: this.page,
            }
            CheckerApi
                .checkrangeList(_params)
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
    },
};
</script>

<style lang="scss" scoped>

</style>
