<template>
    <div>
        <a-card class="details" :bordered="false">
            <span class="box">
                <span class="item"><span class="it_title">鉴定师：</span><span class="it_value">{{filterRecordValue(nickname)}}</span></span>
                <span class="item"><span class="it_title">鉴定完成数量：</span><span class="it_value">{{filterRecordValue(checkcount)}}</span></span>
                <span class="item"><span class="it_title">收入：</span><span class="it_value">{{filterRecordValue(checkerincome)}}</span></span>
                <span class="item"><span class="it_title">账单时间：</span><span class="it_value">{{begintime+'——'+endtime}}</span></span>
                <span class="item"><span class="it_title">超时未鉴定数量：</span><span class="it_value">{{filterRecordValue(nocheckcount)}}</span></span>
                <span class="item"><span class="it_title">扣除：</span><span class="it_value">{{filterRecordValue(deductincome)}}</span></span>
                <span class="item"><span class="it_title">最终收入：</span><span class="it_value">{{Number(checkerincome)+Number(deductincome)}}</span></span>
            </span>
        </a-card>

        <a-card style="margin-top: 24px" :bordered="false">
            <a-table
                :pagination="false"
                :dataSource="dataSource"
                :columns="columns"
                :rowKey="(it, i) => i"
                :loading="loading"
            >   
                <template
                    v-for="{ key } in columns"
                    :slot="key"
                    slot-scope="text, record, index"
                >
                    <span v-if="key == 'status'">
                        <span>{{statusText(record.status)}}</span>
                    </span>
                    <span v-else-if="key =='type'">
                        <span>{{typeText(record.type)}}</span>
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
import { mapState, mapGetters, mapMutations } from "vuex";
import Mixin from '@/utils/mixin'
import {detailColumn} from './config/index'
import { CheckerApi } from '@/api'
export default {
    name: "detail",
    components: {},
    data() {
        return {
            loading: false,
            columns: detailColumn,
            total: 0,
            page: 1,
            size: 20,
            dataSource: [],
            begintime: '', //账单开始时间
            endtime: '', //账单结束时间
            nickname: '', //鉴定师名称
            checkcount: '', //鉴定完成数量
            checkerincome: '', // 鉴定完成收入
            nocheckcount: '', // 未鉴定数量
            deductincome: '', // 未鉴定扣除
            checkerid: '',
            checktime: ''
        };
    },
    mixins: [Mixin],
    computed: {
        statusText(){
            return (val)=>{
                switch(val){
                    case 1:
                        return '鉴定完成'
                    case 2:
                        return '超时未鉴定'
                    default:
                        return '-'
                }
            }
        },
        typeText(){
            return (val)=>{
                switch(val){
                    case 0:
                        return '普通鉴定'
                    case 1:
                        return '快速鉴定'
                    case 2:
                        return 'AI鉴定'
                    default:
                        return '-'
                }
            }
        }
    },
    created() {
        let routes = this.$route.query
        this.checkerid = routes.checkerid || ''
        this.checktime = routes.checktime || ''
        // 详情
        this.findone()
        // 详情列表
        this.getitemlist()
    },
    methods: {
        handleDetail(val){},
        findone(){
            let params = {
                checkerid: this.checkerid,
                time: this.checktime,
            }
            CheckerApi
                .findone(params)
                .then((res)=>{
                    for(let item in res){
                        if(res[item] === 0 || res[item] === "0"){
                            this[item] = res[item]
                        }else{
                            this[item] = res[item] || '---'
                        }
　　　　　　　　　      }
                })
                .catch(()=>{

                })

        },
        getitemlist(){
            this.loading = true
            let params = {
                checkerid: this.checkerid,
                time: this.checktime,
                size: this.size,
                page: this.page,
            }
            CheckerApi
                .getitemlist(params)
                .then((res)=>{
                    this.loading = false
                    this.dataSource = res.list
                    this.total = res.total
                })
                .finally((e)=>{
                    setTimeout(() => {
                        this.loading = false
                    }, 3000);
                })
        },
        onPageSizeChange(page, size) {
            this.page = page;
            this.getitemlist();
        },
        onShowSizeChange(page, size) {
            this.page = 1;
            this.size = size;
            this.getitemlist();
        },
    },
};
</script>

<style lang="scss" scoped>
.details{
    font-family: PingFangSC;
    font-size: 14px;
    color: #000000;
    width: 100%;
    .box{
        width: inherit;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item{
            display: block;
            min-width: 30%;
            flex: 1 auto auto;
            margin: 4px 0;
            .it_title{
                display: inline-block;
                min-width: 114px;
                text-align: right;
            }
            .it_value{
                color: #646464;
            }
        }
    }
}
</style>
