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
        <span class="content">
            <slot name="form"></slot>
        </span>
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
        // 标题
        title: {
            type: String,
            default: () => '',
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
.content{
    width: 100%;
    display: block;
}
</style>