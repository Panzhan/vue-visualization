<template>
    <div>
        123
    </div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Mixin from '@/utils/mixin'
import {searchKeys,columns} from './config/index'
import { CheckerApi } from '@/api'
export default {
    name: "expertManagement",
    components: {
    },
    data() {
        return {
            loading: false,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "check_index" }),
            createFormValues: {},
            columns: columns,
            total: 0,
            page: 1,
            size: 20,
            dataSource: [],
        };
    },
    mixins: [Mixin],
    computed: {
        monthList(){
            return ['01','02','03','04','05','06','07','08','09','10','11','12'].reduce((prev, cur, index)=>{
                prev[index]={value: cur, label: cur}
                return prev
            },[])
        },
        nowDate(){
            let arr = []
            let starYear = 2021
            let fullYear = new Date().getFullYear() //当前年
            for(let i=starYear;i<=fullYear;i++){
                arr.push({
                    value: i,
                    label: i,
                    children: this.monthList
                })
            }
            return arr
        },
        getDataWithKey() {
            return (key) => {
                switch (key) {
                    case "year": 
                        return this.nowDate
                    default:
                        return [];
                }
            };
        },
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
            let params = {
                ...this.createFormValues,
                size: this.size,
                page: this.page,
                time: this.createFormValues.year && (this.createFormValues.year[0]+'-'+this.createFormValues.year[1]) || ''
            }
            delete params.year
            CheckerApi
                .settlementList(params)
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
