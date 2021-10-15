<template>
    <div>
        <a-card :bordered="false" style="overflow-x: scroll;">
            <DTab :defaultIndex="defaultIndex" :titles="titles" :handleClick="handleClick" :showNumb="true"></DTab>
            <a-form :form="createForm" layout="inline">
                <FormItems
                    :searchKeys="searchKeys"
                    :getDataWithKey="getDataWithKey"
                    :disabledDate="disabledDate"
                >
                    
                    <template v-slot:button>
                        <a-button
                            type="primary"
                            size="large"
                            @click="handleSearch"
                            >查询</a-button
                        >
                        <a-button style="margin-left: 20px; border:0;background: #F5F5F5;" size="large" @click="handleReset"
                            >重置</a-button
                        >
                    </template>
                </FormItems>
            </a-form>
        </a-card>

        <!-- 图片详情 -->
        <PreviewPic
            :isShowPic="previewVisible"
            @closePreviewpic="previewHandleCancel"
            :previewImage="previewImage"
        ></PreviewPic>

        <a-card style="margin-top: 24px" :bordered="false">
            <a-table
                :pagination="false"
                :dataSource="dataSource"
                :columns="columns"
                :rowKey="(it, i) => it.id"
                :loading="loading"
                :rowClassName="setRowClassName"
            >
                <template
                    v-for="{ key } in columns"
                    :slot="key"
                    slot-scope="text, record, index"
                >
                    <span v-if="key == 'checkimg'">
                        <img 
                            v-if="record.checkimg"
                            class="product_img"
                            :src="coverImg(record.checkimg)"
                            @click="preview(record.checkimg)"
                        />
                        <span v-else> --- </span>
                    </span>
                    <span v-else-if="key == 'orderno'">
                        <span @click="handleDetail(record)" style="color: #007AFF;cursor: pointer;" v-if="pagePermissions.includes('/check/detail')">{{record.orderno}}</span>
                        <span v-else>{{record.orderno}}</span>
                    </span>
                    <span v-else-if="key =='completetime'">
                        <span>{{ status == 3 ? (record.completetime ? record.completetime : '---') : '---' }}</span>
                    </span>
                    <span v-else-if="key =='type'">
                        <span>{{ typeTxt(record.type) }}</span>
                    </span>
                    <span v-else-if="key =='status'">
                        <span>{{ statusTxt(record.status) }}</span>
                    </span>
                    <span v-else-if="key == 'result'">
                        <span style="color: #3270F5">{{filterRecordValue(record[key])}}</span>
                    </span>
                    <span v-else>{{ filterRecordValue(record[key])}}</span>
                </template>
            </a-table>
            <pagination
                :total="total"
                :page.sync="page"
                :size.sync="size"
                :onPageSizeChange="onPageSizeChange"
                :onShowSizeChange="onShowSizeChange"
            />
        </a-card>
    </div>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Mixin from '@/utils/mixin'
import {searchKeys,columns} from './config/index'
import { OrderApi } from '@/api'
export default {
    name: "orderManagement",
    components: {
    },
    data() {
        return {
            loading: false,
            titles: [],
            previewVisible: false,
            previewImage: '',
            defaultIndex: 0,
            searchKeys: searchKeys,
            createForm: this.$form.createForm(this, { name: "check_index" }),
            createFormValues: {},
            columns: columns,
            status: 1,
            total: 0,
            page: 1,
            size: 20,
            dataSource: [],
            typeList: [],
            resultList: []
        };
    },
    mixins: [Mixin],
    computed: {
        ...mapState("base", ["checkerList"]),
        getDataWithKey() {
            return (key) => {
                switch (key) {
                    case "type": 
                        return this.typeList
                    case "checkerid": 
                        return this.checkerList
                    case "checkresult": 
                        return this.resultList
                    default:
                        return [];
                }
            };
        },
        coverImg(){
            return (val)=>{
                if(val.indexOf(",") == -1 ){
                    return val
                }else{
                    return val.split(",")[0];
                }
            }
        },
    },
    created() {
        this.getChecker()
        this.getList()
        // this.getConfig()
        this.getFromData()
        this.gettabcount()
    },
    methods: {
        ...mapActions("base", ["getChecker"]),
        handleDetail(val){
            this.$router.push({
                path: `/check/detail`, 
                query: {
                    obj: JSON.stringify(val)
                }
            })
        },
        // 无鉴定师需要标记红色
        setRowClassName (record) {
            if (!record.checkername) {
                return 'red_color_row'
            } else {
                return ''
            }
        },
        onDateChange(dates) {
            // dates[0]._d.getTime()
            // dates[1]._d.getTime()
        },
        calendarChange(dates) {
            // dates[0]._d.setHours(0,0,0,0)
            // dates[1]._d.setHours(23,59,59,59)
            
        },
        disabledDate(current) {
            return ''
            // return current && current < this.$moment().subtract(1, "days"); //当天之前的不可选，不包括当天
        },
        mapToArr(data, target){
            for(let item in data){
                target.push({
                    id:item,
                    name: data[item]
                })
　　　　　　  }
        },
        getConfig(){
            OrderApi
                .getcheckconfig()
                .then((res)=>{
                    this.mapToArr(res.results, this.resultList)
                    this.mapToArr(res.types, this.typeList)
                })
        },
        getList(){
            this.loading = true
            this.getFromData()
            let _params = {
                ...this.createFormValues,
                size: this.size,
                page: this.page,
                status: this.status
            }
            // delete _params.dates
            OrderApi
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
        gettabcount(){
            this.getFromData()
            const {
                orderno,
                type,
                checkerid,
                checkresult,
                begintime,
                endtime
            } = this.createFormValues
            let params = {
                orderno,
                type,
                checkerid,
                checkresult,
                begintime,
                endtime
            }
            OrderApi
                .gettabcount(params)
                .then((res)=>{
                    res = res.sort(this.sortByKey('status'))
                    this.titles = res.map((item,index)=>{
                        return {
                            id: item.status,
                            name: item.text,
                            count: item.count
                        }
                    })
                })
        },
        previewHandleCancel() {
            this.previewVisible = false;
        },
        preview(previewImage = "") {
            this.previewImage = previewImage;
            this.previewVisible = true;
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
                    this.createFormValues.begintime = this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[0].format("YYYY-MM-DD HH:mm:ss") || "",
                    this.createFormValues.endtime = this.createFormValues.dates && this.createFormValues.dates.length && this.createFormValues.dates[1].format("YYYY-MM-DD HH:mm:ss") || "",
                    delete this.createFormValues.dates
                }
            });
        },
        handleClick(e){
            // this.createForm.resetFields();
            this.defaultIndex = e.id - 1
            this.status = e.id
            this.page = 1
            this.size = 20
            this.handleSearch()
        },
        handleSearch(){
            this.getList()
            this.gettabcount()
        },
        handleReset(){
            this.page = 1
            this.size = 20
            this.createForm.resetFields();
            this.handleSearch()
        }
    },
};
</script>

<style lang="scss">
.red_color_row{
    // background: rgb(237, 91, 86);
    color: red !important;
}
</style>
