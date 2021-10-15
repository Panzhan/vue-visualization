<template>
    <a-modal
        :visible="isShowPic"
        :centered="true"
        width="600px"
        @cancel="closeModal"
        :footer="null"
        :destroyOnClose="destroyOnClose"
    >
        <div v-if="previewImageList.length == 1">
            <img alt="" style="width: 100%" :src="previewImageList[0]" />
        </div>
        <div v-else-if="previewImageList.length>1">
            <a-carousel arrows :dots="false">
                <div slot="prevArrow" class="custom_slick_arrow">
                    <img src="../assets/img/c_left.png" alt="">
                </div>
                <div slot="nextArrow" class="custom_slick_arrow">
                    <img src="../assets/img/c_right.png" alt="">
                </div>
                <div v-for="(item, index) in previewImageList" :key="item">
                    <div class="flaw_pic_title">
                        <img style="width: 100%" :src="item" alt="">
                    </div>
                </div>
            </a-carousel>
        </div>
        <div v-else></div>
    </a-modal>
</template>

<script>
import getters from '../store/getters';
export default {
    name: "PreviewPic",
    props: {
        isShowPic: {
            type: Boolean,
            default: false,
        },
        previewImage: {
            type: String,
            default: "",
        },
        destroyOnClose:{
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {};
    },
    computed: {
        previewImageList(){
            if(this.previewImage.indexOf(",") == -1 ){
                return ['https://images.weserv.nl/?url='+this.previewImage]
            }else{
                let imglist = this.previewImage.split(",")
                return imglist.reduce((prev, cur, index, arr)=>{
                    arr[index] ? (cur = 'https://images.weserv.nl/?url=' + cur && prev.push(cur)) : ''
                    return prev
                },[])
            }
        }
    },
    methods: {
        // 关闭弹框
        closeModal() {
            this.$emit("closePreviewpic", "previewpic");
        },
    },
};
</script>
<style lang="scss" scoped>
::v-deep .slick-slide {
    overflow: hidden;
}
.flaw_pic_title {
    text-align: center;
    color: #fff;
    width: 100%;
    font-family: NoticeTitle;
    font-size: 36px;
    background: gray;
    border-radius: 8px 8px 0 0;
    img {
        display: block;
        width: 414px;
        height: 414px;
    }
}

.ant-carousel .custom_slick_arrow {
    width: 50px;
    height: 60px;
    left: 40px;
    top: 190px;
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
::v-deep .ant-modal-body {
    padding: 30px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
}
::v-deep .ant-modal-close-x {
    width: 40px;
    height: 40px;
    line-height: 40px;
}
</style>