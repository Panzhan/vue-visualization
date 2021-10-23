<template>
    <div>
        <div class="h5_drag_and_drop">
            <!--使用draggable组件-->
            <a-button style="margin-left: 10px" @click="handleRePick">重选</a-button>
            <div class="itxst">
                <!-- 左侧列表 -->
                <div class="col col_left">
                    <draggable v-model="arrLeft" @end="endLeft" :options="{group:{name: 'itxst',pull:'clone'},sort: false}" animation="300" :move="onMove">
                        <transition-group>
                            <div class="item" v-for="(item, index) in arrLeft" :key="`${item.id}${item.key}${index}`">{{item.name}}</div>
                        </transition-group>
                    </draggable>
                </div>
                <!-- 待添加元素列表 -->
                <div class="col col_right">
                    <draggable v-model="arrRight" @end="endRight" group="itxst" animation="300" :move="onMove">
                        <transition-group>
                            <div 
                                class="item_rgiht" 
                                v-for="(item,index) in arrRight" 
                                :key="`${item.id}${item.key}${index}`"
                            >
                                <div @click="handleDeleteItem(item, index)" class="delete"><a-icon type="close-circle" /></div>
                                <span @click="handleClickAdd(item, index)">{{item.data[0].desc}}</span>
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <!-- 渲染区域 -->
                <div class="page_display_box" :style="bgStyle(arrRight)">
                    <div class="page_display" v-for="(item, index) in arrRight" :key="index">
                        <div v-if="item.type === 99">
                            <p class="top_title">{{item.data[0].text}}</p>
                        </div>
                        <div class="carousel_box" v-if="item.type === 4 && item.data[0].imageurl.length">
                            <a-carousel autoplay :after-change="onChange">
                                <div class="img_item" v-for="(it, idx) in item.data[0].imageurl" :key="idx">
                                    <img :src="it" alt="">
                                </div>
                            </a-carousel>
                        </div>
                        <div class="single_picture" v-if="item.type === 2 && item.data[0].imageurl.length">
                            <div class="img_item">
                                <img :src="item.data[0].imageurl[0]" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- JSON格式展示区域 -->
                <div class="page_display_json">
                    <json-viewer :value="arrRight" :expand-depth="999" :copyable="true">
                    </json-viewer>
                </div>
                <!-- 添加元素弹窗 -->
                <a-modal :title="operationVisibleTitle" :visible="operationVisible" width="660px" :centered="true" :destroyOnClose="true" :footer="null" :closable="false">
                    <a-form :form="bannerForm">
                        <a-form-item v-if="optItem.type === 99" label="标题">
                            <a-input size="large" placeholder="请输入标题" @change="
                                (e) => {
                                    e.target.value = e.target.value.trim();
                                    return e;
                                }
                            " v-decorator="[
                                'coupons',
                                {
                                    rules: [{ required: true, message: '请输入排序' }],
                                    initialValue: ''
                                },
                            ]" />
                        </a-form-item>
                        <a-form-item v-if="[1,2,4].includes(optItem.type)" :label="optItem.name">
                            <UploadImg :classname="'applets-banner-bgimg'" listType="picture-card" :max="upLoadImgLength" v-decorator="[
                                `${optItem.key}`,
                                {
                                    rules: [{ required: true, message: '请添加图片' }],
                                    initialValue: ''
                                },
                            ]"></UploadImg>
                        </a-form-item>
                    </a-form>
                   <div style="margin-top: 10px">
                        <a-button @click="() => (operationVisible = false)">
                            取消
                        </a-button>
                        <a-button type="primary" @click="handleSubmit">
                            确定
                        </a-button>
                   </div>

                </a-modal>
            </div>
        </div>
    </div>
</template>

<script>
Array.prototype.filter = Array.prototype.filter || function (func) {
    let arr = this;
    let r = [];
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i], i, arr)) {
            r.push(arr[i]);
        }
    }
    return r;
}
const TYPE_TEXT_MAP = {
    1: 'bgImg', //背景图片
    2: 'singlePicture', //图片
    3: 'singleVideo', //视频
    4: 'multiplePicture', //轮播图
    5: 'multipleVideo', //轮播视频
    99: 'coupons', //标题
}
const arrLeft = [
    {
        'name': '图片', //名称
        'key': 'singlePicture',
        'id': 2,
        'type': 2, //类型
        'data': [{
            'desc': '点击上传单张图片',
            'isGroup': false, // 是否为组图/视频
            'imageurl': [], // 图/视频地址
            'text': '', // 文案
        }]
    },
    {
        'name': '视频',
        'key': 'singleVideo',
        'id': 3,
        'type': 3,
        'data': [{
            'desc': '点击上传单个视频',
            'isGroup': false,
            'imageurl': [],
            'text': '', // 文案
        }]
    },
    {
        'name': '轮播图',
        'key': 'multiplePicture',
        'id': 4,
        'type': 4,
        'data': [{
            'desc': '点击上传多张图片',
            'isGroup': true,
            'imageurl': [],
            'text': '', // 文案
        }]
    }, 
    {
        'name': '轮播视频',
        'key': 'multipleVideo',
        'id': 5,
        'type': 5,
        'data': [{
            'desc': '点击上传多个视频',
            'isGroup': true,
            'imageurl': [],
            'text': '', // 文案
        }]
    },
    {
        'name': '标题',
        'key': 'coupons',
        'id': 99,
        'type': 99,
        'data': [{
            'desc': '点击添加标题',
            'isGroup': false,
            'imageurl': [],
            'text': '', // 文案
        }]
    },
    {
        'name': '背景图片', //名称
        'key': 'bgImg',
        'id': 1,
        'type': 1, //类型
        'data': [{
            'desc': '点击上传背景图片',
            'isGroup': false, // 是否为组图/视频
            'imageurl': [], // 图/视频地址
            'text': '', // 文案
        }]
    }
]
const arrRight = [
    {
        'name': '背景图片', //名称
        'key': 'bgImg',
        'id': 1,
        'type': 1, //类型
        'data': [{
            'desc': '点击上传背景图片',
            'isGroup': false, // 是否为组图/视频
            'imageurl': [], // 图/视频地址
            'text': '', // 文案
        }]
    },
    {
        'name': '标题',
        'key': 'coupons',
        'id': 99,
        'type': 99,
        'data': [{
            'desc': '点击添加标题',
            'isGroup': false,
            'imageurl': [],
            'text': '', // 文案
        }]
    }
]
import draggable from 'vuedraggable'
import UploadImg from "@/components/UploadImg"
export default {
    components: {
        draggable,
        UploadImg
    },
    name: "drag-and-drop",
    data() {
        return {
            upLoadImgLength: 1,
            bannerForm: this.$form.createForm(this, { name: "h5-loading-page" }),
            operationVisibleTitle: '', //弹窗标题
            coupons: '', //h5标题
            operationVisible: false,
            // moveId: -1,
            arrLeft: JSON.parse(JSON.stringify(arrLeft)),
            arrRight: JSON.parse(JSON.stringify(arrRight)),
            newArrLeft: JSON.parse(JSON.stringify(arrLeft)),
            newArrRight: JSON.parse(JSON.stringify(arrRight)),
            optItem: {},
            clickIndex: ''
        };
    },
    created() { 
        // 读取缓存
        this.arrRight = localStorage.getItem('h5config') && JSON.parse(localStorage.getItem('h5config')) || JSON.parse(JSON.stringify(arrRight))
        // 缓存数据为空则添加两天数据
        if(!this.arrRight.length){
            this.arrRight = arrRight
            this.handleSetLocalStorage()
        }
    },
    methods: {
        onChange(a,b,c){

        },
        bgStyle(val){
            let bgItem = val.filter(it=>it.key === 'bgImg')
            if(!bgItem) return ''
            if(bgItem[0] && bgItem[0].data[0].imageurl.length){
                return {
                    background: `url('${bgItem[0].data[0].imageurl[0]}') no-repeat`, 
                    backgroundSize: '100%'
                }
            }
        },
        handleSubmit(){
            this.bannerForm.validateFields(async (err, values) => {
                if (!err) {
                    let { coupons, bgImg, singlePicture, singleVideo, multiplePicture, multipleVideo } = values
                    this.optItem.data[0].text = coupons || ''
                    bgImg && this.optItem.data[0].imageurl.splice(0, 1, bgImg)
                    multiplePicture && this.optItem.data[0].imageurl.unshift(...multiplePicture)
                    singlePicture && this.optItem.data[0].imageurl.splice(0, 1, singlePicture)
                    this.handleSetLocalStorage()
                    this.arrRight.splice(this.clickIndex,1,this.optItem)
                    this.operationVisible = false
                }
            })
        },
        // 写缓存
        handleSetLocalStorage(){
            localStorage.setItem('h5config', JSON.stringify(this.arrRight))
        },
        // 添加图片
        handleClickAdd(item, index){
            this.clickIndex = index
            this.optItem = JSON.parse(JSON.stringify(item))
            this.upLoadImgLength = item.data[0].isGroup ? 99 : 1
            this.operationVisibleTitle = item.data[0].desc
            this.operationVisible = true
        },
        // 删除元素
        handleDeleteItem(item, index){
            this.arrRight.splice(index, 1)
            this.handleSetLocalStorage()
        },
        // 重选
        handleRePick(){
            this.arrLeft = this.newArrLeft
            this.arrRight = this.newArrRight
            this.optItem = {}
            this.clickIndex = ''
            this.upLoadImgLength = 1
        },
        //左边往右边拖动时的事件
        endLeft(e) {
        },
        //右边往左边拖动时的事件
        endRight(e) {
            return
        },
        //move回调方法
        onMove(e, originalEvent) {
        },
    },
};
</script>
<style lang="scss" scoped>
.h5_drag_and_drop{
    position: relative;
    padding: 0;
}
.itxst {
    margin: 10px;
    text-align: left;
}

.col {
    width: 40%;
    flex: 1;
    padding: 10px;
    border: solid 1px #eee;
    border-radius: 5px;
    float: left;
}
.col_left{
    width: 200px;
    background: white;
}
.col_right{
    width: 240px;
    background: white;
    min-height: 57px;
    position: relative;
    margin-left: 10px;
    padding: 10px 16px 10px 10px;
    .delete{
        position: absolute;
        right: 6px;
    }
}

.item {
    padding: 6px 12px;
    margin: 0px 10px 0px 10px;
    border: solid 1px #eee;
    background-color: #f5f5f5;
    text-align: left;
    margin-top: 6px;
    :hover {
        background-color: #fdfdfd;
        cursor: move;
    }
}

.item_rgiht {
    padding: 6px 12px;
    margin: 0px 10px 0px 10px;
    border: solid 1px #eee;
    background-color: #f5f5f5;
    text-align: left;
    margin-top: 6px;
}

.item_rgiht:hover {
    outline: solid 1px #ddd;
    cursor: move;
}
.page_display_box{
    border: 1px dotted rgb(207, 207, 207);
    position: absolute;
    left: 470px;
    width: 375px;  
    height: 667px;
    overflow-y: scroll;
    overflow-x: hidden;
    .page_display{
        
        .top_title{
            text-align: center;
            font-size: 24px;
            margin: 20px 0;
        }
        .carousel_box{
            .img_item{
                width: 100%;
                height: 200px;
            }
        }
        .single_picture{
            .img_item{
                text-align: center;
                img{
                    max-width: 375px;
                    height: 100%;
                }
            }
        }
    }

}
.page_display_json{
    // border: 1px solid red;
    position: absolute;
    left: 860px;
    width: 375px;
    min-height: 57px;
}
</style>
