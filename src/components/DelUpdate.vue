<template>
    <a-modal
        :visible="comVisible"
        :width="modalWidth"
        :centered="isCentered"
        :maskClosable="isMaskClosable"
        :closable="isClosable"
        :destroyOnClose="isDestroyOnClose"
        :footer="null"
        style="padding: 0 10px "
    >   
        <span class="title" v-if="title">{{title}}</span>
        <span class="tips_desc" v-if="tipsDesc">{{tipsDesc}}</span>
        <div style="text-align: center" class="constainer">
            <a-button
                style="background: #F5F5F5;border: 0"
                class="btn btn_l"
                size="large"
                @click="cancle"
            >取消</a-button>
            <a-button 
                style="margin-left: 10px"
                class="btn btn_r" 
                :class="isDelete ? 'del' : ''"
                size="large" 
                type="primary"
                @click="submit"
            >确定</a-button>
        </div>
    </a-modal>
</template>

<script>
export default {
    name: "popup",
    data() {
        return {
        };
    },
    props: {
        // 二次确认文案
        tipsDesc:{
            type: String,
            default: () => '',
        },
        // 是否删除，删除为红色按钮
        isDelete:{
            type: Boolean,
            default: () => false,
        },
        // 标题
        title: {
            type: String,
            default: () => '提示',
        },
        // 是否展示
        comVisible: {
            type: Boolean,
            default: () => false,
        },
        // 宽度
        modalWidth: {
            type: String,
            default: () => '496px',
        },
        // 容器是否垂直居中
        isCentered: {
            type: Boolean,
            default: () => true,
        },
        // 点击蒙层是否允许关闭
        isMaskClosable:{
            type: Boolean,
            default: () => false,
        },
        // 是否展示关闭icon
        isClosable: {
            type: Boolean,
            default: () => false,
        },
        // 关闭时销毁 Modal 里的子元素
        isDestroyOnClose: {
            type: Boolean,
            default: () => true,
        },
    },
    computed: {

    },
    watch: {

    },
    methods: {
        cancle(){
            this.$emit('cancle')
        },
        submit(){
            this.$emit('submit')
        }
    },
};
</script>

<style lang="scss" scoped>
.title{
    display: block;
    width: 100%;
    height: 34px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
    text-align: center;
    color: #232323;
    margin: 0 auto 24px;
}
.tips_desc{
    display: block;
    margin: 0 0 24px 0;
    font-size: 1px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #232323;
    text-align: center;
}
.constainer{
    margin: 0 auto;
    .del{
        border: 0;
        background: #FF6262;
    }
}
</style>