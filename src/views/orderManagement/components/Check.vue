<template>
    <div class="model_box">
        <div class="top_opt_container" v-if="images && images.length > 0">
            <div class="flaw_pic_list">
                <a-carousel :after-change="onChange" ref="checkCarousel" arrows :dots="false">
                    <div slot="prevArrow" class="custom_slick_arrow">
                        <img src="../../../assets/img/c_left.png" alt="">
                    </div>
                    <div slot="nextArrow" class="custom_slick_arrow custom_slick_arrow_r">
                        <img src="../../../assets/img/c_right.png" alt="">
                    </div>
                    <div class="swipers" v-for="(item, index) in images" :key="item.id">
                        <div class="flaw_pic_title">
                            <img :src="item.imgurl" alt="">
                        </div>
                    </div>
                </a-carousel>
            </div>
            <div class="img_show">
                <div class="img_box" v-for="(item, index) in images" :key="index">
                    <span @click="handleClick(item, index)">
                        <img :class="defaultIndex == index ? 'picked' : ''" :src="item.imgurl" alt="">
                    </span>
                </div>
            </div>
        </div>
        <div class="btn_box">
            <div v-if="memo" class="order_desc">
                <span>备注：{{memo}}</span>
            </div>
        </div>
        <div class="btn">
            <a-button style="border: 0;width: 108px" type="primary" size="large" @click="btnClick()">
                关闭
            </a-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        images:{
            type: Array
        },
        editId: {
            type: String | Number
        },
        memo:{
            type: String 
        }
    },
    data() {
        return {
            defaultIndex: 0, // 轮播图图片默认index
            pictureId: 0, // 鉴定图片ID
        };
    },
    computed:{
    },
    created() {
        
    },
    methods: {
        onChange(a, b, c) {
            this.defaultIndex = a
        },
        btnClick() {
            this.$emit('handleAddSubmit')
        },
        handleClick(item, index){
            // 跳转至指定位置
            this.defaultIndex = index
            this.$refs['checkCarousel'].$refs.slick.innerSlider.slickGoTo(index); 
        }
    },
};
</script>
<style lang="scss" scoped>
.model_box{
    max-height: 82vh;
    overflow-y: scroll;
    padding: 20px 40px;
}
::v-deep .slick-slide {
    overflow: hidden;
}
::v-deep .ant-input-affix-wrapper.ant-input-affix-wrapper-textarea-with-clear-btn .ant-input {
    width: 100%;
}
.top_opt_container{
    position: relative;
    .flaw_pic_list {
        position: relative;
        height: 402px;
        .swipers{
            position: relative;
            .flaw_pic_title {
                position: relative;
                text-align: center;
                color: black;
                font-family: NoticeTitle;
                font-size: 36px;
                background: gray;
                border-radius: 8px 8px 0 0;
                img {
                    display: block;
                    height: 402px;
                    width: 402px;
                    border-radius: 8px;
                }
            }
        }
    }
    .img_show{
        margin-top: 25px;
        display: flex;
        justify-content: flex-start;
        max-width: 600px;
        flex-wrap: wrap;
        position: relative;
        left: -6px;
        .img_box{
            position: relative;
            margin: 4px;
            img{
                width: 57px;
                height: 60px;
                border-radius: 4px;
                cursor: pointer;
            }
            .picked{
                transform:scale(1.15);
            }
        }
    }
}
.btn {
    margin: 20px auto 0;
    padding: 0 50px;
    display: flex;
    justify-content: space-around;
}
.ant-carousel .custom_slick_arrow {
    width: 50px;
    height: 60px;
    left: 40px;
    top: 168px;
    z-index: 2;
    margin: 0;
    img {
        display: block;
        width: 100%;
    }
}
.ant-carousel .slick-next {
    left: auto;
    right: 40px;
}
.ant-carousel .custom_slick_arrow:before {
    display: none;
}
.ant-carousel .custom_slick_arrow_r{
    
}
.btn_box{
    .order_desc{
        margin: 10px 0;
        color: rgb(118, 118, 118);
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
    }
}
</style>