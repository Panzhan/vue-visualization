<template>
    <div>
        <a-card v-if="Object.keys(queryObj).length" class="details" :bordered="false" style="overflow-x: scroll;">
            <span class="box">
                <span class="item"><span class="it_title">订单编号：</span><span class="it_value">{{filterRecordValue(queryObj.orderno)}}</span></span>
                <span class="item"><span class="it_title">状态：</span><span class="it_value">{{statusTxt(queryObj.status)}}</span></span>
                <span class="item"><span class="it_title">鉴定结果：</span><span class="it_value">{{filterRecordValue(queryObj.result)}}</span></span>
                <span class="item"><span class="it_title">类目：</span><span class="it_value">{{filterRecordValue(queryObj.categoryname)}}</span></span>
                <span class="item"><span class="it_title">品牌：</span><span class="it_value">{{filterRecordValue(queryObj.brandname)}}</span></span>
                <span class="item"><span class="it_title">鉴定类型：</span><span class="it_value">{{typeTxt(queryObj.type)}}</span></span>
            </span>
        </a-card>
        <a-card :bordered="false" style="overflow-x: scroll;margin-top: 24px;">
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
                    <span v-if="key == 'usertype'">
                        <span>{{usertypeText(record[key])}}</span>
                    </span>
                    <span v-else-if="key == 'items'">
                        <span v-if="record.items && record.items.length">
                            <img 
                                class="previe_img"
                                :src="coverImg(record.items)"
                                @click="preview(record.items)"
                            />
                            <span @click="handleDetail(record.items)" style="color: #3270F5;margin-left: 10px;cursor: pointer;">查看</span>
                        </span>
                        <span v-else> --- </span>
                    </span>
                    <span v-else-if="key == 'name'">
                        <span>{{record.usertype== '1' || record.usertype== '0' ? (record.username?record.username:'---') : (record.nickname?record.nickname:'---')}}</span>
                    </span>
                    <span v-else>{{ filterRecordValue(record[key])}}</span>
                </template>
            </a-table>
            <div class="footer">
                <a-button size="large" type="primary" @click="handleBack()">返回</a-button>
            </div>
        </a-card>
        <!-- 图片详情 -->
        <PreviewPic
            :isShowPic="previewVisible"
            @closePreviewpic="previewHandleCancel"
            :previewImage="previewImage"
        ></PreviewPic>
        <DPopup 
            :modalWidth="'529px'"
            :title="checkTitle" 
            :comVisible="checkVisible"
        >
            <template v-slot:form>
                <Check 
                    :memo="memo"
                    :images="images"
                    @handleAddSubmit="handleAddSubmitSuccess"
                ></Check>
            </template>
        </DPopup>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Check from './components/Check.vue'
import Mixin from '@/utils/mixin'
import { CheckerApi } from '@/api'
import {detailColumns} from './config'
export default {
    name: "orderDetail",
    components: {
        Check
    },
    data() {
        return {
            loading: false,
            queryObj: {},
            columns: detailColumns,
            dataSource: [],
            previewVisible: false,
            previewImage: '',
            checkTitle: '',
            checkVisible: false,
            images: [],
            memo: ''
        };
    },
    mixins: [Mixin],
    computed: {
        editId(){
            return this.queryObj.id 
        },
        usertypeText(){
            return (key)=>{
                switch(key){
                    case 0:
                        return '系统'  
                    case 1:
                        return 'app用户' 
                    case 2:
                        return '鉴定师'           
                }
            } 
        },
        coverImg(){
            return (val)=>{
                return 'https://images.weserv.nl/?url='+val[0].imgurl;
            }
        },
    },
    created() {
        let queryObj = this.$route.query.obj && JSON.parse(this.$route.query.obj)
        this.queryObj = queryObj || {}
        this.getOrderDetail()
    },
    methods: {
        handleDetail(val){
            this.checkTitle = `${this.queryObj.brandname} ${this.queryObj.categoryname}`
            this.images = val
            this.memo = this.queryObj.memo || ''
            this.checkVisible = true
        },
        handleAddSubmitSuccess(){
            this.checkVisible = false
        },
        previewHandleCancel() {
            this.previewVisible = false;
        },
        preview(items) {
            this.previewImage = ''
            for(let i=0;i<items.length;i++){
                this.previewImage += items[i].imgurl+','
            }
            this.previewVisible = true;
        },
        getOrderDetail(){
            this.loading = true
            CheckerApi
                .getcheckloglist({id: this.editId})
                .then((res)=>{
                    this.loading = false
                    this.dataSource = res
                })
                .catch(()=>{
                    setTimeout(()=>{
                        this.loading = false
                        this.dataSource = []
                    }, 1500)
                })
        },
        handleBack(){
            this.$router.push('/check/index')
        }
    },
};
</script>

<style lang="scss" scoped>
.footer{
    margin: 20px auto 0;
    width: 200px;
    display: flex;
    justify-content: space-around;
    .btn_l{
        border: 0;
        background: #F5F5F5;
    }
}
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
.previe_img{
    width: 60px;
    height: 60px;
}
</style>
